"use client";

import Image from "next/image";
import { useState } from "react";

type EngagementKey = "twitter" | "linkedin" | "post";
type EngagementIcon = "x" | "linkedin";

const engagementLinks: Array<{ id: EngagementKey; label: string; href: string; icon: EngagementIcon }> = [
  {
    id: "twitter",
    label: "Follow me on X",
    href: "https://x.com/pmillegan",
    icon: "x",
  },
  {
    id: "linkedin",
    label: "Connect with me on LinkedIn",
    href: "https://linkedin.com/in/pmillegan",
    icon: "linkedin",
  },
  {
    id: "post",
    label: "Like, Comment, or Repost",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7448413039529422848/",
    icon: "linkedin",
  },
];

function RowIcon({ icon }: { icon: EngagementIcon | "email" }) {
  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.9 2H22L15.2 9.78L23.2 22H16.94L12.05 14.62L5.6 22H2.5L9.8 13.65L2.2 2H8.62L13.03 8.74L18.9 2ZM17.81 20.13H19.53L7.68 3.78H5.83L17.81 20.13Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 18.34V10.82H5.84V18.34H8.34M7.09 9.79A1.45 1.45 0 1 0 7.09 6.89A1.45 1.45 0 1 0 7.09 9.79M18.34 18.34V14.22C18.34 12 17.14 10.66 15.35 10.66C13.9 10.66 13.26 11.46 12.89 12.02V10.82H10.39V18.34H12.89V14.17C12.89 13.07 13.1 12 14.47 12C15.82 12 15.84 13.26 15.84 14.24V18.34H18.34Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4 5H20C21.1 5 22 5.9 22 7V17C22 18.1 21.1 19 20 19H4C2.9 19 2 18.1 2 17V7C2 5.9 2.9 5 4 5M20 7L12 12L4 7V17H20V7Z" />
    </svg>
  );
}

/** Same width for all action pills — tight, sized for longest label (✓ Copied). */
const actionPillWidthClass = "w-[5rem] shrink-0 whitespace-nowrap px-2";

export default function UscEngagementCard() {
  const [clicked, setClicked] = useState<Record<EngagementKey, boolean>>({
    twitter: false,
    linkedin: false,
    post: false,
  });
  const [emailCopied, setEmailCopied] = useState(false);

  function onLinkClick(id: EngagementKey) {
    setClicked((previous) => ({ ...previous, [id]: true }));
  }

  async function onCopyEmail() {
    try {
      await navigator.clipboard.writeText("PatrickMillegan@gmail.com");
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  }

  const allLinksClicked = Object.values(clicked).every(Boolean);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <span aria-hidden="true" className="mr-2">
            👋
          </span>
          I had a blast chatting with you all!
        </h2>
        <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          I would love to stay connected with everyone from USC Marshall. Keep in touch through the links below.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/undergrad.jpg"
                alt="USC Marshall undergraduate class"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 45vw, 400px"
              />
            </div>
            <figcaption className="mt-1.5 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Undergrad
            </figcaption>
          </figure>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/grad.jpg"
                alt="USC Marshall graduate class"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 45vw, 400px"
              />
            </div>
            <figcaption className="mt-1.5 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Grad
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {engagementLinks.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => onLinkClick(item.id)}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-zinc-700 dark:text-zinc-300">
                <RowIcon icon={item.icon} />
              </span>
              <span>{item.label}</span>
            </span>
            {clicked[item.id] ? (
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center gap-0.5 rounded-full border border-green-600 bg-green-600 py-1 text-xs font-semibold text-white ${actionPillWidthClass}`}
              >
                ✓ Done
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center rounded-full border border-zinc-300 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-600 dark:text-zinc-300 ${actionPillWidthClass}`}
              >
                Go
              </span>
            )}
          </a>
        ))}

        {allLinksClicked ? (
          <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-300">
            Hey, you've completed this state.
          </p>
        ) : null}

        <div className="mt-3">
          <div className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <span className="inline-flex items-center gap-2 pr-3">
              <span className="text-zinc-700 dark:text-zinc-300">
                <RowIcon icon="email" />
              </span>
              <span className="font-bold">PatrickMillegan@gmail.com</span>
            </span>
            <button
              type="button"
              onClick={onCopyEmail}
              className={
                emailCopied
                  ? `cursor-pointer inline-flex items-center justify-center gap-0.5 rounded-full border border-green-600 bg-green-600 py-1 text-xs font-semibold text-white ${actionPillWidthClass}`
                  : `cursor-pointer inline-flex items-center justify-center rounded-full border border-zinc-300 py-1 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 ${actionPillWidthClass}`
              }
            >
              {emailCopied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
