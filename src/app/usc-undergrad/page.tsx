import type { Metadata } from "next";
import Link from "next/link";
import UscEngagementCard, { USC_GUEST_LECTURE_SLIDES_HREF } from "@/components/usc/engagement-card";

export const metadata: Metadata = {
  title: "USC Undergrad",
  description: "Stay-in-touch links for USC Marshall undergraduate Product Management.",
};

export default function UscUndergradPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 pb-14 pt-8 sm:px-8">
      <UscEngagementCard
        photoLayout="undergrad"
        layout="stack"
        presentationHref={USC_GUEST_LECTURE_SLIDES_HREF}
      />

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex justify-center sm:justify-end">
          <Link
            href="/darkvoid"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Darkvoid
          </Link>
        </div>
      </section>
    </main>
  );
}
