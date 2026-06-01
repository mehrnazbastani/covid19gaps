import { motion } from "framer-motion";
import { Reveal, SectionLabel, PullQuote } from "@/components/story/ui";
import nurse from "@/assets/voice-nurse.jpg";
import grandfather from "@/assets/voice-grandfather.jpg";
import teacher from "@/assets/voice-teacher.jpg";
import mother from "@/assets/voice-mother.jpg";

type Voice = {
  img: string;
  alt: string;
  name: string;
  role: string;
  tag: string;
  quote: string;
};

const VOICES: Voice[] = [
  {
    img: nurse,
    alt: "Portrait of Maria, a respiratory therapist in teal scrubs in a hospital corridor",
    name: "Maria, 36",
    role: "Respiratory therapist · Missouri",
    tag: "Supporting healthcare",
    quote:
      "I watched too many people my own age fight to breathe. I got vaccinated so I could keep showing up for them — and so my unit wouldn't break under one more wave.",
  },
  {
    img: grandfather,
    alt: "Portrait of Samuel, a grandfather sitting by a window holding his glasses",
    name: "Samuel, 71",
    role: "Grandfather of six · Georgia",
    tag: "Protecting loved ones",
    quote:
      "My grandkids are my whole world. The day I could finally hug them again — that was my why. I wasn't going to miss another birthday on a screen.",
  },
  {
    img: teacher,
    alt: "Portrait of Lin, a teacher standing in her classroom",
    name: "Lin, 29",
    role: "5th-grade teacher · Washington",
    tag: "Resuming normal life",
    quote:
      "My students learn best in a room together. I got the shot so I could open my classroom door again — and keep it open for the whole year.",
  },
  {
    img: mother,
    alt: "Portrait of Priya, an expectant mother by a window holding her belly",
    name: "Priya, 32",
    role: "Expectant mother · Texas",
    tag: "Trust in science",
    quote:
      "I read the studies until I understood them. Getting vaccinated was the first thing I ever did to protect my daughter — before she was even born.",
  },
];

export function Voices() {
  return (
    <section id="voices" className="scroll-mt-20 pt-24">
      <Reveal>
        <SectionLabel index="07">Voices</SectionLabel>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Behind every line, a why
        </h2>
        <p className="story-prose mt-5">
          The most effective translation of the data was never a chart. It was a person. During the
          pandemic, ordinary people did what dashboards could not: they put a face on the numbers and
          a reason behind the choice. These are the kinds of stories that moved neighbors when
          statistics could not.
        </p>
      </Reveal>

      <div className="my-12 grid gap-6 sm:grid-cols-2">
        {VOICES.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.08}>
            <motion.figure
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-xl border border-border bg-card/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={v.img}
                  alt={v.alt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">
                  {v.tag}
                </span>
              </div>
              <figcaption className="p-5">
                <blockquote className="font-display text-lg italic leading-snug text-foreground">
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-border pt-3">
                  <div className="font-semibold text-foreground">{v.name}</div>
                  <div className="text-sm text-muted-foreground">{v.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>

      <PullQuote cite="The #MyWhy campaign">
        Tell people a statistic and they nod. Tell them why you rolled up your sleeve, and they
        picture their own.
      </PullQuote>

      <Reveal>
        <div className="mt-10 rounded-xl border border-border bg-surface/40 p-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-semibold text-gold">#MyWhy</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <p className="story-prose mt-4 !text-[1.1rem]">
            The <strong>#MyWhy</strong> campaign was a public-health and social-media initiative led
            by organizations like the <strong>American Hospital Association</strong> and the{" "}
            <strong>CDC</strong> to encourage COVID-19 vaccination. It empowered individuals —
            especially healthcare workers — to share personal stories explaining their &ldquo;why&rdquo;
            for getting vaccinated, building vaccine confidence in their communities through trusted,
            familiar voices rather than top-down statistics.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Protecting vulnerable loved ones", "Safeguarding elderly grandparents, immunocompromised friends, and newborn babies."],
              ["Resuming normal life", "Hugging family, returning to in-person school, traveling, and reconnecting safely."],
              ["Supporting healthcare", "Easing the strain on hospitals and preventing severe illness."],
              ["Trust in science", "Believing in the efficacy and safety of the research behind the vaccines."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-border/60 bg-card/40 p-4">
                <div className="font-semibold text-foreground">{title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            To see more stories or learn how to participate, visit the{" "}
            <a
              className="text-vax underline underline-offset-4 hover:text-gold"
              href="https://www.aha.org/"
              target="_blank"
              rel="noreferrer"
            >
              American Hospital Association
            </a>{" "}
            or search the{" "}
            <strong className="text-foreground">#MyWhy</strong> hashtag on platforms like Instagram
            and YouTube.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
