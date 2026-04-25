import type { Metadata } from "next";
import Link from "next/link";
import Rink from "@/components/crokinole/rink";
import Scorekeeper from "@/components/crokinole/scorekeeper";
import { siteUrl } from "@/lib/seo";

const title = "Crokinole Scorekeeper — Track Rounds, 20s, and Game History";

const description =
  "Free online crokinole scorekeeper. Track rounds, totals, 20s, and full game history. Supports conventional cancellation scoring (play to 100) and tournament scoring (4 rounds, 2/1/0 round wins). Includes a quick reference for the 20-hole, 15s, 10s, and 5s.";

const canonicalPath = "/crokinole";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "crokinole",
    "crokinole scorekeeper",
    "crokinole score keeper",
    "crokinole rules",
    "crokinole scoring",
    "how to score crokinole",
    "crokinole 20 hole",
    "crokinole tournament rules",
    "crokinole cancellation scoring",
    "play to 100",
    "online scorekeeper",
  ],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "How do you score crokinole?",
    answer:
      "Each disc on the board scores by zone: 20 for the centre hole, 15 inside the pegs, 10 outside the pegs, and 5 in the outer ring. A disc touching a line counts as the lower value. 20s are removed as they're sunk and added at the end. Discs on or past the shooting line are out and don't score.",
  },
  {
    question: "What is the 20-hole worth in crokinole?",
    answer:
      "The centre hole is worth 20 points. To count, a disc must be completely in the hole and lying flat. Discs that sink into the 20-hole are removed from the board and set aside, then added to the side's round total at the end of the round.",
  },
  {
    question: "What is conventional (cancellation) scoring?",
    answer:
      "At the end of each round, subtract the lower side's board points from the higher side's. The round winner banks the difference and the loser scores zero for the round. Running totals carry across rounds, and the first side to reach the target score (typically 100) wins the game.",
  },
  {
    question: "How does tournament scoring work?",
    answer:
      "Each round is worth 2 points. The side with more board points wins the round and earns 2; if the round is tied, each side earns 1; the losing side earns 0. A match is typically four rounds, and the side with the most round points at the end wins.",
  },
  {
    question: "What happens if a disc is touching a scoring line?",
    answer:
      "A disc touching the line of a dividing circle counts as the lower of the two zones. The determining factor is whether the bottom edge of the disc is over any part of the line, not how it appears from above.",
  },
  {
    question: "Where did crokinole come from?",
    answer:
      "Eckhardt Wettlaufer of Sebastopol, Ontario, Canada, made the first known crokinole board in 1876 as a fifth-birthday gift for his son. The World Crokinole Championship has been held in Tavistock, Ontario, on the first Saturday of June every year since 1999.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Crokinole Scorekeeper",
    url: `${siteUrl}${canonicalPath}`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Patrick Millegan",
      url: siteUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  },
];

export default function CrokinolePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="grid items-center gap-5 sm:grid-cols-[160px_1fr]">
          <Rink className="mx-auto w-32 sm:w-40" title="Crokinole board" />
          <div className="space-y-3 text-center sm:text-left">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Crokinole Scorekeeper
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
              A free online scorekeeper for crokinole. Track rounds, 20s, and
              full game history with either{" "}
              <strong>conventional cancellation scoring</strong> (play to 100)
              or <strong>tournament scoring</strong> (four rounds, 2/1/0 round
              wins). Games save to your device.
            </p>
          </div>
        </div>
      </section>

      <Scorekeeper />

      <section
        id="rules"
        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          How crokinole scoring works
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          A quick reference covering the scoring zones and the two main game
          modes used in casual and tournament play.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <article>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Scoring zones
            </h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              <li>
                <strong>20</strong> — centre hole (disc must be fully in and
                lying flat)
              </li>
              <li>
                <strong>15</strong> — inside the pegs
              </li>
              <li>
                <strong>10</strong> — outside the pegs
              </li>
              <li>
                <strong>5</strong> — outer ring
              </li>
              <li>
                <strong>0</strong> — on or past the shooting line (out of play)
              </li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              A disc touching a line counts as the lower value.
            </p>
          </article>

          <article>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Conventional play
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              At the end of each round, subtract the lower side&apos;s points
              from the higher side&apos;s. The round winner banks the
              difference. First to a target total (commonly 100) wins.
            </p>
          </article>

          <article>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Tournament play
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Each round is worth 2 points: 2 for a win, 1 for a tie, 0 for a
              loss. A match is typically four rounds; high score wins. This is
              the format used at the World Crokinole Championship.
            </p>
          </article>

          <article>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              About 20s
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              When a disc lands cleanly in the centre 20-hole, remove it and
              set it aside. At the end of the round, add 20 for each one to the
              side&apos;s board total before scoring.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          A brief history of crokinole
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          The earliest known crokinole board was made in 1876 by Eckhardt
          Wettlaufer in Sebastopol, Ontario, Canada, as a fifth-birthday gift
          for his son. The game spread across rural Ontario in the late 19th
          century and is now played around the world. The World Crokinole
          Championship has been held in Tavistock, Ontario every year since
          1999.
        </p>
      </section>

      <section
        id="faq"
        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Frequently asked questions
        </h2>
        <ul className="mt-4 space-y-4">
          {faqs.map((faq) => (
            <li key={faq.question}>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {faq.answer}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-1 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Sources:{" "}
        <a
          href="https://www.worldcrokinole.com/thegame.html"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          World Crokinole Championship
        </a>
        {" · "}
        <a
          href="https://www.crokinoledepot.com/crokinole-rules.html"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Crokinole Depot
        </a>
        {" · "}
        <Link
          href="/projects"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          More projects
        </Link>
      </p>
    </main>
  );
}
