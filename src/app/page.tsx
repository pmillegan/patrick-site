import type { Metadata } from "next";
import Image from "next/image";
import HomeFollowRows from "@/components/home-follow-rows";
import UntoilLinkedInFollowRow from "@/components/untoil-linkedin-follow-row";
import { defaultSiteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Patrick Millegan",
  },
  description: defaultSiteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Patrick Millegan",
    description: defaultSiteDescription,
    url: "/",
  },
  twitter: {
    description: defaultSiteDescription,
  },
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <section className="grid w-full items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:gap-6 md:grid-cols-[280px_1fr] md:gap-6">
        <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <Image
            src="/profile.jpg"
            alt="Portrait of Patrick Millegan"
            width={560}
            height={560}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="space-y-4">
          <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            👋 Hi, nice to meet you. I&apos;m Patrick Millegan, founder and CEO of{" "}
            <a
              href="https://untoil.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Untoil
            </a>{". I'm a product developer in San Mateo, CA. My work spans Shopify, Keap Athletics, guest lectures at USC Marshall, and more."}
          </p>
          <HomeFollowRows />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <span className="inline-flex items-center gap-2">
            <Image
              src="/untoil-logo.png"
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-lg rounded-br-none dark:invert"
            />
            <span>Untoil</span>
          </span>
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
            (currently building)
          </span>
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Untoil&apos;s agents find organizational toil, price what it costs in hours and
          dollars, and surface the most expensive problems so a team knows what to fix
          next.
        </p>
        <div className="mt-3">
          <UntoilLinkedInFollowRow />
        </div>
      </section>
    </main>
  );
}
