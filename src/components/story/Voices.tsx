import { Reveal, SectionLabel, PullQuote } from "@/components/story/ui";

type Research = {
  tag: string;
  quote: string;
};

// Verbatim free-text responses from vaccinated adults recently diagnosed with
// COVID-19, as published in the peer-reviewed study (BMC Public Health, 2022).
const RESEARCH: Research[] = [
  {
    tag: "The greater good",
    quote:
      "I wanted it, to protect my family and to show them it is okay to get vaccinated.",
  },
  {
    tag: "Protecting the vulnerable",
    quote:
      "We should protect those that can't protect themselves. I chose the vaccine so I didn't infect 10-year-old, baby granddaughters and other children / high-risk people. I'm also high risk.",
  },
  {
    tag: "Trust in science",
    quote:
      "While I am a Christian, I believe the science and research that has gone into the development and testing of the vaccines. They are safe and effective.",
  },
  {
    tag: "Risk perception",
    quote:
      "COVID-19 is clearly a disease that will be reduced only through herd immunity supported by vaccination. While there is a risk in the vaccine, for most people this is less than the disease itself.",
  },
];

export function Voices() {
  return (
    <section id="voices" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="07">Voices</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Behind every line, a person
        </h2>
        <p className="story-prose mt-5">
          The most effective translation of the data was never a chart — it was a person. To keep
          this section honest, the words below are not invented. They come from a documented patient
          testimonial and from peer-reviewed research that recorded, verbatim, why people chose to be
          vaccinated.
        </p>
      </Reveal>

      {/* Featured real testimonial — Kristin */}
      <Reveal>
        <figure className="my-12 overflow-hidden rounded-xl border border-border bg-card/50">
          <div className="border-b border-border bg-surface/40 px-6 py-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-display text-lg font-semibold text-foreground">Kristin</span>
              <span className="text-sm text-muted-foreground">
                Nurse practitioner, age 31 · Gainesville, Florida
              </span>
              <span className="rounded-full border border-unvax/40 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-unvax">
                Diagnosed before vaccines were available
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="story-prose">
              In December 2020, Kristin was a healthy 31-year-old nurse practitioner running her own
              rural clinic. She wasn't worried for herself — she was waiting her turn so older,
              more vulnerable patients could be vaccinated first. She was diagnosed with COVID-19 on{" "}
              <strong>December 21, 2020</strong>. The first vaccines in her area were given on{" "}
              <strong>December 23</strong> — two days too late.
            </p>
            <p className="story-prose mt-4">
              She spent <strong>111 days in the hospital</strong>: more than 100 days in intensive
              care on a ventilator, 68 days on ECMO, on dialysis, with nearly every organ system
              failing. Today she lives with a pacemaker, chronic shortness of breath, and PTSD — and
              she has since been vaccinated and vaccinated her young son.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-6">
              <p className="font-display text-xl italic leading-snug text-foreground sm:text-2xl">
                &ldquo;Before my illness, I did not realize that young people can be severely impacted
                by COVID. I want everyone to know that they do not ever want to go through what I did.
                Getting vaccinated can help prevent severe illness.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              Source:{" "}
              <a
                className="text-vax underline underline-offset-4 hover:text-gold"
                href="https://vaccinateyourfamily.org/testimonials/kristin/"
                target="_blank"
                rel="noreferrer"
              >
                Kristin&rsquo;s testimonial — Vaccinate Your Family
              </a>
            </figcaption>
          </div>
        </figure>
      </Reveal>

      <PullQuote cite="Why people said they got vaccinated — in their own words">
        Tell people a statistic and they nod. Let them read why a neighbor rolled up their sleeve,
        and they picture their own family.
      </PullQuote>

      {/* Verbatim research quotes */}
      <Reveal>
        <p className="story-prose mb-6">
          When researchers asked adults recently diagnosed with COVID-19 to explain, in their own
          words, why they chose vaccination, a few themes recurred again and again — protecting
          family, looking after the vulnerable, and trusting the science.
        </p>
      </Reveal>
      <div className="my-4 grid gap-6 sm:grid-cols-2">
        {RESEARCH.map((r, i) => (
          <Reveal key={r.tag} delay={i * 0.08}>
            <figure className="h-full rounded-xl border border-border bg-card/50 p-6">
              <span className="rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                {r.tag}
              </span>
              <blockquote className="mt-4 font-display text-lg italic leading-snug text-foreground">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-4 text-sm text-muted-foreground">
          Verbatim survey responses from vaccinated adults. Source: Bennett MM, et al.,{" "}
          <a
            className="text-vax underline underline-offset-4 hover:text-gold"
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9579584/"
            target="_blank"
            rel="noreferrer"
          >
            &ldquo;Attitudes and personal beliefs about the COVID-19 vaccine among people with
            COVID-19&rdquo;
          </a>
          , <em>BMC Public Health</em> (2022).
        </p>
      </Reveal>

      <Reveal>
        <p className="story-prose mt-10">
          Campaigns like <strong>#MyWhy</strong> — led by the American Hospital Association and the CDC —
          tried to bridge that gap by letting healthcare workers and everyday people explain, in their
          own words, why they chose vaccination: to protect a parent, to hold a grandchild, to keep a
          clinic open. The research above shows those same motives recurring across thousands of
          respondents. The honest translation of a rate is not a prettier chart — it is someone
          you know saying why it mattered to them.
        </p>
      </Reveal>
    </section>
  );
}
