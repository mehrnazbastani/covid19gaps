import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-corridor.jpg";
import covid from "@/data/covidData.json";
import { RateOverTime, IRROverTime, AgeBars, IRRByAge } from "@/components/story/charts";
import { UsMap } from "@/components/story/UsMap";
import { ChartFrame, LegendDot, CHART } from "@/components/story/chart-kit";
import { Reveal, SectionLabel, Stat, PullQuote, TimelineEvent } from "@/components/story/ui";
import { Voices } from "@/components/story/Voices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gap We Could See Coming — COVID-19, Vaccines & the Data We Failed to Explain" },
      {
        name: "description",
        content:
          "A data-driven feature on how COVID-19 vaccination reshaped case and death rates across age groups in the United States — and why clearer communication of that risk still matters.",
      },
      { property: "og:title", content: "The Gap We Could See Coming" },
      {
        property: "og:description",
        content:
          "How vaccination reshaped COVID-19 risk across every age group — told through the data, week by week.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "timeline", label: "Timeline & Map" },
  { id: "cases", label: "Case Rates" },
  { id: "deaths", label: "Death Rates" },
  { id: "irr", label: "Relative Risk" },
  { id: "communicate", label: "Communication" },
  { id: "voices", label: "Voices" },
  { id: "conclusion", label: "What Now" },
];

const deathByAge = covid.avgDeathByAge as { age: string; vax: number; unvax: number; irr: number }[];

function Story() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gold"
      />

      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-display text-sm font-semibold tracking-tight text-foreground">
            The Gap We Could See Coming
          </a>
          <div className="hidden gap-5 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <Hero />

      <main className="mx-auto max-w-3xl px-5 pb-32 sm:px-6">
        <Intro />
        <Timeline />
        <Cases />
        <Deaths />
        <IRRSection />
        <Communication />
        <Voices />
        <Conclusion />
      </main>

      <Footer />
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex h-screen min-h-[640px] items-end overflow-hidden">
      <motion.img
        src={heroImg}
        alt="A single empty wheelchair in a dim, deserted hospital corridor at dusk"
        width={1920}
        height={1080}
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="grain absolute inset-0" />

      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-3xl px-5 pb-20 sm:px-6">
        <div className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          A COVID-19 Data Story
        </div>
        <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground text-balance sm:text-7xl">
          The Gap We Could<br />See Coming
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
          For two years, the United States ran a real-time experiment on 250 million people.
          The vaccines worked. The numbers were never hidden. So why did the message
          so often fail to land?
        </p>
        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px w-10 bg-gold" />
          Scroll to begin
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── 1 · INTRO ───────────────────────── */
function Intro() {
  const cases = covid.caseOverall as any[];
  return (
    <section id="intro" className="scroll-mt-20 pt-20">
      <Reveal>
        <p className="story-prose first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-gold">
          In the summer of 2021, a 34-year-old respiratory therapist in Missouri named Brittany
          described the feeling of intubating patients her own age. They were almost all
          unvaccinated. They had read the same headlines she had, scrolled past the same charts,
          and concluded — sincerely — that the risk did not apply to them. By the time many of
          them changed their minds, they were asking her whether it was too late to get the shot.
          Often, it was.
        </p>
      </Reveal>

      <Reveal>
        <p className="story-prose">
          Her story is not unusual. It is, in a sense, the whole story. The science of the
          COVID-19 vaccines was settled early and decisively. What remained unsolved — what is{" "}
          <em>still</em> unsolved — is a communication problem: how to take a mountain of
          epidemiological data and make a person feel, in their gut, that a number on a dashboard
          is really about them.
        </p>
      </Reveal>

      <Reveal>
        <SectionLabel index="01">Introduction</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          A pandemic measured in rates, lived in lives
        </h2>
        <p className="story-prose mt-5">
          This piece draws on the U.S. Centers for Disease Control and Prevention's{" "}
          <a
            className="text-vax underline underline-offset-4 hover:text-gold"
            href="https://data.cdc.gov/Public-Health-Surveillance/Rates-of-COVID-19-Cases-or-Deaths-by-Age-Group-and/3rge-nu2a"
            target="_blank"
            rel="noreferrer"
          >
            age-stratified surveillance of cases and deaths by vaccination status
          </a>
          , covering roughly 2.7 million records from April 2021 through September 2022. Every
          figure that follows is a <strong>rate</strong> — cases or deaths per 100,000 people —
          which lets us compare a small, highly vaccinated group against a large unvaccinated one
          fairly. Rates are how epidemiologists see clearly. They are also, unfortunately, how the
          public tunes out.
        </p>
      </Reveal>

      <Reveal>
        <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value="2.7M" label="surveillance records analyzed" />
          <Stat value="77" label="weeks, Apr 2021 – Sep 2022" />
          <Stat value="8" label="age groups tracked separately" tone="vax" />
          <Stat value="13×" label="peak case-rate gap, unvax vs. vax" tone="unvax" />
        </div>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="The shape of the pandemic, week by week"
          subtitle="National COVID-19 case rate per 100,000 people, ages 5+, by vaccination status."
          source="Source: CDC, Rates of COVID-19 Cases by Age Group and Vaccination Status. Note the Omicron spike in Dec 2021–Jan 2022, when even vaccinated rates surged — but stayed below unvaccinated rates."
          legend={
            <>
              <LegendDot color={CHART.unvax} label="Unvaccinated" />
              <LegendDot color={CHART.vax} label="Vaccinated" />
            </>
          }
        >
          <RateOverTime data={cases} />
        </ChartFrame>
        <p className="story-prose">
          Read the chart above as the spine of everything that follows. Two waves dominate: the
          Delta surge of late summer 2021, and the enormous Omicron spike that began that December.
          In both, the red line — the unvaccinated — sits above the teal. But notice something the
          early pandemic discourse rarely captured: during Omicron, vaccinated case rates rose
          steeply too. The vaccines were never a force field against infection. The honest story is
          quieter and more durable, and it lives in the gap between the two lines.
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 2 · TIMELINE & MAP ───────────────────────── */
function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="02">Timeline & Map</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Where and when the weight fell
        </h2>
        <p className="story-prose mt-5">
          A rate flattens geography and time into a single number. But people did not experience an
          average. They experienced a specific week in a specific place — a county hospital running
          out of ICU beds, a funeral held over a video call. Before we return to the data, it helps
          to remember the sequence of events the numbers are quietly recording.
        </p>
      </Reveal>

      <div className="my-12 space-y-8">
        <TimelineEvent date="Dec 2020 – Apr 2021" title="The vaccines arrive">
          The first mRNA vaccines roll out to health workers and the elderly. Our dataset opens here,
          with the vaccinated still a small, mostly older slice of the population.
        </TimelineEvent>
        <TimelineEvent date="Summer 2021" title="Delta and the unvaccinated wave">
          The Delta variant drives a sharp surge concentrated almost entirely among the
          unvaccinated. The case-rate gap between groups reaches its widest point of the pandemic.
        </TimelineEvent>
        <TimelineEvent date="Dec 2021 – Jan 2022" title="Omicron breaks the records">
          A far more transmissible variant infects vaccinated and unvaccinated alike. Case rates
          spike to their highest levels ever — yet death rates tell a very different story.
        </TimelineEvent>
        <TimelineEvent date="2022" title="A new, uneasy normal">
          Boosters, prior infection, and milder variants compress the gap. Risk never disappears;
          it recedes into the background, where it becomes easy to ignore.
        </TimelineEvent>
      </div>

      <Reveal>
        <ChartFrame
          title="Where the pandemic hit hardest"
          subtitle="Cumulative COVID-19 deaths per 100,000 residents, by U.S. state."
          source="Source: CDC / Johns Hopkins cumulative mortality, pandemic totals. Mortality was far from uniform — states differed by more than threefold, shaped by age structure, health access, and vaccination uptake."
        >
          <UsMap />
        </ChartFrame>
        <p className="story-prose">
          The map makes a point a national average hides: the pandemic was profoundly unequal across
          places. Death rates ranged from under 170 per 100,000 in some states to nearly 470 in
          others — a gap driven not only by the virus but by age, access to care, and how quickly
          communities took up vaccines. Geography became destiny in part because{" "}
          <em>information</em> traveled unevenly too.
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 3 · CASE RATES ───────────────────────── */
function Cases() {
  const cases = covid.caseOverall as any[];
  const avgCase = covid.avgCaseByAge as any[];
  return (
    <section id="cases" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="03">Case Rates</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Who caught it, and how often
        </h2>
        <p className="story-prose mt-5">
          Infection was the most common outcome and the noisiest signal. Across nearly every week
          of our data, unvaccinated people contracted COVID-19 at higher rates than the vaccinated.
          The gap was largest during Delta, when an unvaccinated person was roughly five to thirteen
          times as likely to be counted as a case in a given week.
        </p>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Average case rate by age group"
          subtitle="Mean weekly cases per 100,000, vaccinated vs. unvaccinated, across the study period."
          source="Source: CDC age-stratified case surveillance. The youngest group (5–11) became eligible late and shows an inverted pattern — a reminder that timing, not just biology, shapes these numbers."
          legend={
            <>
              <LegendDot color={CHART.unvax} label="Unvaccinated" />
              <LegendDot color={CHART.vax} label="Vaccinated" />
            </>
          }
        >
          <AgeBars data={avgCase} />
        </ChartFrame>
        <p className="story-prose">
          The bar chart reveals the texture the headline misses. For working-age and older adults,
          the unvaccinated bars tower over the vaccinated. But among children aged 5–11 — eligible
          only from late 2021, deep into Omicron — the pattern nearly flips, a statistical artifact
          of <em>when</em> they could be protected rather than evidence the vaccine failed. This is
          exactly the kind of nuance that, stripped of context, fueled years of bad-faith argument.
        </p>
      </Reveal>

      <PullQuote cite="The recurring lesson of the case data">
        A vaccine that prevents most infections, but not all, looks like failure to anyone who
        expected perfection — and like a miracle to anyone counting hospital beds.
      </PullQuote>

      <Reveal>
        <ChartFrame
          title="Case rates over time, both groups"
          subtitle="Weekly cases per 100,000, ages 5+. The space between the lines is the vaccine's effect."
          source="Source: CDC. During Omicron the lines converge but never cross — vaccinated rates stayed lower even at the peak."
          legend={
            <>
              <LegendDot color={CHART.unvax} label="Unvaccinated" />
              <LegendDot color={CHART.vax} label="Vaccinated" />
            </>
          }
        >
          <RateOverTime data={cases} height={300} />
        </ChartFrame>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 4 · DEATH RATES ───────────────────────── */
function Deaths() {
  const deaths = covid.deathOverall as any[];
  return (
    <section id="deaths" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="04">Death Rates</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          The number that should have ended the argument
        </h2>
        <p className="story-prose mt-5">
          If case rates were the noisy signal, death rates were the clear one. Here the vaccines did
          something close to what people originally hoped for: they kept people alive. The gap
          between vaccinated and unvaccinated mortality was not just large — it was, for older
          adults, staggering.
        </p>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Death rates over time, both groups"
          subtitle="Weekly COVID-19 deaths per 100,000, ages 5+, by vaccination status."
          source="Source: CDC age-stratified death surveillance. Even as Omicron sent case rates to record highs, the vaccinated death rate stayed a fraction of the unvaccinated rate."
          legend={
            <>
              <LegendDot color={CHART.unvax} label="Unvaccinated" />
              <LegendDot color={CHART.vax} label="Vaccinated" />
            </>
          }
        >
          <RateOverTime data={deaths} />
        </ChartFrame>
        <p className="story-prose">
          Look at the Omicron period again, but on this chart. Cases for everyone exploded — yet the
          vaccinated death line barely lifts off the floor. That decoupling is the single most
          important fact of the entire pandemic, and one of the hardest to communicate: a wave can
          break every infection record while killing comparatively few of the protected.
        </p>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Average death rate by age group"
          subtitle="Mean weekly deaths per 100,000. Note how mortality concentrates almost entirely among the old."
          source="Source: CDC. Among adults 80+, unvaccinated death rates dwarf every other group — yet even there, vaccination cut the rate dramatically."
          legend={
            <>
              <LegendDot color={CHART.unvax} label="Unvaccinated" />
              <LegendDot color={CHART.vax} label="Vaccinated" />
            </>
          }
        >
          <AgeBars data={deathByAge} />
        </ChartFrame>
        <p className="story-prose">
          Death was overwhelmingly a story of age. For adults over 80, the unvaccinated death rate
          ran roughly <strong>{Math.round(deathByAge[6].unvax)}</strong> per 100,000 each week,
          against about <strong>{deathByAge[6].vax}</strong> for the vaccinated. For people under
          30, absolute death rates were small in both groups — which is precisely why young people so
          often concluded the whole thing was overblown. Both readings can be true at once, and that
          contradiction is the communicator's central challenge.
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 5 · IRR ───────────────────────── */
function IRRSection() {
  const cases = covid.caseOverall as any[];
  const deaths = covid.deathOverall as any[];
  return (
    <section id="irr" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="05">Relative Risk</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          One number to compare them all
        </h2>
        <p className="story-prose mt-5">
          To compare risk fairly between a small group and a large one, epidemiologists use the{" "}
          <strong>incidence rate ratio</strong> (IRR): the unvaccinated rate divided by the
          vaccinated rate. An IRR of 1 means equal risk. An IRR of 10 means the unvaccinated faced
          ten times the risk. It is the most honest single number we have — and almost nobody outside
          public health knows what it means.
        </p>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Risk ratio over time — cases"
          subtitle="How many times higher the unvaccinated case rate was, week by week (ages 5+)."
          source="Source: CDC, derived. The ratio peaks above 13× during Delta, then falls toward ~2× as Omicron and prior infection narrow the gap — but it rarely touches 1."
        >
          <IRROverTime data={cases} />
        </ChartFrame>
        <p className="story-prose">
          The case IRR tells a story of <em>erosion</em>. Early on, being unvaccinated multiplied
          your weekly odds of infection more than tenfold. As immunity spread — through shots and
          through infection — that advantage shrank. Crucially, it shrank because the world changed,
          not because the vaccine stopped working. A falling ratio was widely misread as a falling
          benefit.
        </p>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Risk ratio over time — deaths"
          subtitle="How many times higher the unvaccinated death rate was, week by week (ages 5+)."
          source="Source: CDC, derived. The death IRR holds far higher and steadier than the case IRR — protection against dying eroded much more slowly than protection against catching the virus."
        >
          <IRROverTime data={deaths} height={300} />
        </ChartFrame>
      </Reveal>

      <Reveal>
        <ChartFrame
          title="Average death risk ratio by age group"
          subtitle="Mean death IRR across the study period — unvaccinated mortality risk relative to vaccinated, by age."
          source="Source: CDC, derived. For working-age adults the unvaccinated faced roughly 15–19× the death risk on average — among the most lopsided figures in the entire dataset."
        >
          <IRRByAge data={deathByAge} />
        </ChartFrame>
        <p className="story-prose">
          Here is the figure that should have anchored every public-health message. Averaged across
          the pandemic, unvaccinated adults aged 30–64 faced roughly <strong>16 to 19 times</strong>{" "}
          the risk of dying from COVID-19 as their vaccinated peers. Not 16 percent higher —
          sixteen <em>times</em>. The data was public the entire time. The translation was not.
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 6 · COMMUNICATION ───────────────────────── */
function Communication() {
  return (
    <section id="communicate" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="06">Communication</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          The data wasn't missing. The meaning was.
        </h2>
        <p className="story-prose mt-5">
          It is tempting to conclude that the public simply rejected science. The truth is less
          flattering to the rest of us. The numbers in this article were never secret. The CDC
          published them; researchers analyzed them; dashboards displayed them. What broke down was
          the last mile — the act of turning a rate into a reason.
        </p>
      </Reveal>

      <Reveal>
        <p className="story-prose">
          Consider how the same fact reads three ways. <em>"Vaccine efficacy against infection fell
          to 2.1 over the study window"</em> is accurate and incomprehensible. <em>"The vaccinated
          line stayed below the unvaccinated line in 74 of 77 weeks"</em> is a picture. <em>"If you
          were unvaccinated and over 50, you were about fifteen times more likely to die"</em> is a
          decision. Each describes the same dataset. Only the last one changes behavior — and it was
          the rarest of the three in the channels most people actually used.
        </p>
      </Reveal>

      <PullQuote cite="The communication failure, in one line">
        We treated the public like statisticians who lacked data, when they were neighbors who
        lacked context.
      </PullQuote>

      <Reveal>
        <p className="story-prose">
          Research bears this out. Studies of risk perception consistently find that{" "}
          <a
            className="text-vax underline underline-offset-4 hover:text-gold"
            href="https://www.who.int/news-room/spotlight/the-pandemic-of-misinformation"
            target="_blank"
            rel="noreferrer"
          >
            relative-risk framing, concrete comparisons, and visual formats
          </a>{" "}
          move people far more than raw rates or percentages. Yet much official communication
          defaulted to dense tables, shifting "efficacy" figures, and caveats that — however
          scientifically responsible — read as uncertainty to a frightened public. Into that vacuum
          poured something with no caveats at all: confident, emotional, and frequently wrong
          messaging on social platforms.
        </p>
      </Reveal>

      <Reveal>
        <p className="story-prose">
          The asymmetry mattered. A well-made chart competes against a meme that took ten seconds to
          absorb. The lesson of the pandemic is not that we needed more data — we were drowning in
          it — but that we needed more <em>translation</em>: trusted messengers, clear visuals, and
          honesty about what a falling number did and did not mean.
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── 7 · CONCLUSION ───────────────────────── */
function Conclusion() {
  return (
    <section id="conclusion" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="08">What Now</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Before the next one
        </h2>
        <p className="story-prose mt-5">
          There will be another outbreak. When it comes, the bottleneck will not be the science of
          the vaccine or the availability of the data. It will be the same gap we watched widen for
          two years: the distance between a true number and a person who believes it applies to them.
        </p>
      </Reveal>

      <Reveal>
        <div className="my-10 grid gap-4 sm:grid-cols-3">
          <Stat value="74/77" label="weeks vaccinated rates stayed below unvaccinated" tone="vax" />
          <Stat value="~16×" label="death risk for unvaccinated adults 30–64" tone="unvax" />
          <Stat value="1" label="ratio everyone should learn to read: the IRR" />
        </div>
      </Reveal>

      <Reveal>
        <p className="story-prose">
          The work ahead is concrete. Public-health agencies should publish not just dashboards but{" "}
          <strong>stories</strong> — visual, relative-risk-first, updated in plain language. Newsrooms
          and schools should treat data literacy as a survival skill. And all of us should get
          comfortable with a harder kind of honesty: that a vaccine can be a triumph against death
          and an imperfect shield against infection at the very same time.
        </p>
      </Reveal>

      <Reveal>
        <p className="story-prose">
          Brittany, the therapist in Missouri, still thinks about the patients who asked, too late,
          whether the shot would help. The data could have told them. It was right there, the whole
          time. Our job — next time — is to make sure they can hear it.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-12 rounded-xl border border-border bg-card/50 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">Go deeper</h3>
          <ul className="mt-4 space-y-2 text-[1.05rem]">
            {[
              ["CDC: Rates of COVID-19 Cases and Deaths by Vaccination Status", "https://covid.cdc.gov/covid-data-tracker/#rates-by-vaccine-status"],
              ["CDC COVID Data Tracker", "https://covid.cdc.gov/covid-data-tracker"],
              ["WHO: Managing the COVID-19 infodemic", "https://www.who.int/news-room/spotlight/the-pandemic-of-misinformation"],
              ["Our World in Data: COVID-19 vaccinations", "https://ourworldindata.org/covid-vaccinations"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  className="text-vax underline underline-offset-4 hover:text-gold"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10 rounded-xl border border-border/60 bg-surface/40 p-6 text-sm leading-relaxed text-muted-foreground">
          <span className="font-display font-semibold text-foreground">A note on method.</span> All
          rates are drawn from the CDC's age-stratified surveillance of COVID-19 cases and deaths by
          vaccination status (April 2021–September 2022), expressed per 100,000 people. The incidence
          rate ratio (IRR) is the unvaccinated rate divided by the vaccinated rate. National
          time-series use the combined 5+ age band; age-group figures are period averages. The
          choropleth uses cumulative state mortality per 100,000 from CDC and Johns Hopkins for
          geographic context. Rates can be affected by reporting lags and differences in testing
          between groups; they describe association, not individual causation.
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-12 text-sm text-muted-foreground">
        <p className="font-display text-base text-foreground">The Gap We Could See Coming</p>
        <p className="mt-2 max-w-prose">
          A data-storytelling project on COVID-19 vaccination, risk, and the communication of both.
          Built with CDC age-stratified surveillance data.
        </p>
        <p className="mt-4 text-xs">Data: CDC &amp; Johns Hopkins · For educational use.</p>
      </div>
    </footer>
  );
}
