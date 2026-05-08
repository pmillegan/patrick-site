import type { Metadata } from "next";
import Image from "next/image";
import HomeFollowRows from "@/components/home-follow-rows";
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
            👋 Hi, nice to meet you I&apos;m Patrick Millegan. I&apos;m a product
            developer in San Mateo, CA. My work spans Shopify, Keap Athletics,
            guest lectures at USC Marshall, and more.
          </p>
          <HomeFollowRows />
        </div>
      </section>
    </main>
  );
}
