import type { Metadata } from "next";
import UscEngagementCard, { USC_GUEST_LECTURE_SLIDES_HREF } from "@/components/usc/engagement-card";

export const metadata: Metadata = {
  title: "USC Undergrad",
  description: "Stay-in-touch links for USC Marshall undergraduate Product Management.",
};

export default function UscUndergradPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <UscEngagementCard
        photoLayout="undergrad"
        layout="stack"
        presentationHref={USC_GUEST_LECTURE_SLIDES_HREF}
        personalIntro
      />
    </main>
  );
}
