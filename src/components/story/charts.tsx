import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";
import { CHART, ChartTooltip } from "./chart-kit";

type Pt = { week: number; date: string; month: string; vax: number; unvax: number; irr: number };

// Show a tick only at the first appearance of each month
function monthTicks(data: Pt[]) {
  const seen = new Set<string>();
  const ticks: number[] = [];
  data.forEach((d) => {
    if (!seen.has(d.month)) {
      seen.add(d.month);
      ticks.push(d.week);
    }
  });
  return ticks;
}
const monthLabel = (data: Pt[]) => (w: number) => {
  const d = data.find((x) => x.week === w);
  if (!d) return "";
  const [mon, yr] = d.month.split(" ");
  return `${mon[0]}${mon[1].toLowerCase()}${mon[2].toLowerCase()} '${yr.slice(2)}`;
};

const axisStyle = { fontSize: 12, fill: CHART.axis, fontFamily: "Source Sans 3" };

export function RateOverTime({
  data,
  height = 340,
}: {
  data: Pt[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
        <defs>
          <linearGradient id="gUnvax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.unvax} stopOpacity={0.45} />
            <stop offset="100%" stopColor={CHART.unvax} stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gVax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.vax} stopOpacity={0.4} />
            <stop offset="100%" stopColor={CHART.vax} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="week"
          ticks={monthTicks(data)}
          tickFormatter={monthLabel(data)}
          tick={axisStyle}
          tickLine={false}
          axisLine={{ stroke: CHART.grid }}
          minTickGap={10}
        />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={48} />
        <Tooltip
          content={(p: any) => (
            <ChartTooltip
              {...p}
              label={data.find((d) => d.week === p.label)?.month}
              unit=" /100k"
            />
          )}
        />
        <Area
          type="monotone"
          dataKey="unvax"
          name="Unvaccinated"
          stroke={CHART.unvax}
          strokeWidth={2.5}
          fill="url(#gUnvax)"
        />
        <Area
          type="monotone"
          dataKey="vax"
          name="Vaccinated"
          stroke={CHART.vax}
          strokeWidth={2.5}
          fill="url(#gVax)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function IRROverTime({ data, height = 320 }: { data: Pt[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
        <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="week"
          ticks={monthTicks(data)}
          tickFormatter={monthLabel(data)}
          tick={axisStyle}
          tickLine={false}
          axisLine={{ stroke: CHART.grid }}
          minTickGap={10}
        />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={40} />
        <ReferenceLine
          y={1}
          stroke={CHART.axis}
          strokeDasharray="4 4"
          label={{ value: "equal risk (1×)", fill: CHART.axis, fontSize: 11, position: "insideTopRight" }}
        />
        <Tooltip
          content={(p: any) => (
            <ChartTooltip
              {...p}
              label={data.find((d) => d.week === p.label)?.month}
              unit="×"
            />
          )}
        />
        <Line
          type="monotone"
          dataKey="irr"
          name="Risk ratio"
          stroke={CHART.gold}
          strokeWidth={2.75}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

type AgeRow = { age: string; vax: number; unvax: number; irr: number };

export function AgeBars({
  data,
  height = 360,
}: {
  data: AgeRow[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }} barGap={4}>
        <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="age" tick={axisStyle} tickLine={false} axisLine={{ stroke: CHART.grid }} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} width={48} />
        <Tooltip cursor={{ fill: "oklch(0.27 0.016 250 / 0.4)" }} content={(p: any) => <ChartTooltip {...p} unit=" /100k" />} />
        <Bar dataKey="unvax" name="Unvaccinated" fill={CHART.unvax} radius={[3, 3, 0, 0]} />
        <Bar dataKey="vax" name="Vaccinated" fill={CHART.vax} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function IRRByAge({ data, height = 360 }: { data: AgeRow[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }} layout="vertical">
        <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={axisStyle} tickLine={false} axisLine={{ stroke: CHART.grid }} />
        <YAxis type="category" dataKey="age" tick={axisStyle} tickLine={false} axisLine={false} width={56} />
        <Tooltip cursor={{ fill: "oklch(0.27 0.016 250 / 0.4)" }} content={(p: any) => <ChartTooltip {...p} unit="×" />} />
        <Bar dataKey="irr" name="Death risk ratio" radius={[0, 3, 3, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART.gold} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
