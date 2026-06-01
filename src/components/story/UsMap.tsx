import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { stateDeathsPer100k, GEO_URL } from "@/data/stateData";

const values = Object.values(stateDeathsPer100k);
const min = Math.min(...values);
const max = Math.max(...values);

// Sequential scale from teal (lower) to deep red (higher)
const palette = [
  "oklch(0.5 0.07 200)",
  "oklch(0.62 0.1 130)",
  "oklch(0.78 0.13 85)",
  "oklch(0.72 0.16 50)",
  "oklch(0.64 0.2 32)",
  "oklch(0.52 0.21 25)",
];

const colorScale = scaleQuantize<string>().domain([min, max]).range(palette);

export function UsMap() {
  const [hover, setHover] = useState<{ name: string; value?: number } | null>(null);

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={900}
          height={520}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name as string;
                const value = stateDeathsPer100k[name];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={value !== undefined ? colorScale(value) : "oklch(0.3 0.014 250)"}
                    stroke="oklch(0.16 0.012 250)"
                    strokeWidth={0.75}
                    onMouseEnter={() => setHover({ name, value })}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      default: { outline: "none", transition: "fill 0.2s" },
                      hover: { outline: "none", fill: "oklch(0.92 0.14 85)", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-3 min-h-[2.5rem] -translate-x-1/2 text-center">
        {hover ? (
          <div className="inline-block rounded-md border border-border bg-popover/95 px-4 py-2 shadow-xl backdrop-blur">
            <div className="font-display text-base font-semibold text-foreground">{hover.name}</div>
            <div className="text-sm text-muted-foreground">
              {hover.value !== undefined
                ? `${hover.value} deaths per 100k`
                : "No data"}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Hover a state to see its cumulative death rate</div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex h-3 w-full max-w-md overflow-hidden rounded-full">
          {palette.map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
        <div className="flex w-full max-w-md justify-between text-xs text-muted-foreground tabular-nums">
          <span>{min} /100k</span>
          <span>fewer deaths → more deaths</span>
          <span>{max} /100k</span>
        </div>
      </div>
    </div>
  );
}
