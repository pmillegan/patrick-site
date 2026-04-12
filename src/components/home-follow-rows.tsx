"use client";

import { useState } from "react";

const actionPillWidthClass = "w-[5rem] shrink-0 whitespace-nowrap px-2";

type SocialId = "linkedin" | "twitter";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 18.34V10.82H5.84V18.34H8.34M7.09 9.79A1.45 1.45 0 1 0 7.09 6.89A1.45 1.45 0 1 0 7.09 9.79M18.34 18.34V14.22C18.34 12 17.14 10.66 15.35 10.66C13.9 10.66 13.26 11.46 12.89 12.02V10.82H10.39V18.34H12.89V14.17C12.89 13.07 13.1 12 14.47 12C15.82 12 15.84 13.26 15.84 14.24V18.34H18.34Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 2H22L15.2 9.78L23.2 22H16.94L12.05 14.62L5.6 22H2.5L9.8 13.65L2.2 2H8.62L13.03 8.74L18.9 2ZM17.81 20.13H19.53L7.68 3.78H5.83L17.81 20.13Z" />
    </svg>
  );
}

const followLinks: Array<{
  id: SocialId;
  label: string;
  href: string;
  icon: "linkedin" | "x";
}> = [
  {
    id: "linkedin",
    label: "Patrick",
    href: "https://linkedin.com/in/pmillegan",
    icon: "linkedin",
  },
  {
    id: "twitter",
    label: "@Pmillegan",
    href: "https://x.com/pmillegan",
    icon: "x",
  },
];

export default function HomeFollowRows() {
  const [clicked, setClicked] = useState<Record<SocialId, boolean>>({
    linkedin: false,
    twitter: false,
  });

  function onLinkClick(id: SocialId) {
    setClicked((previous) => ({ ...previous, [id]: true }));
  }

  return (
    <div className="space-y-1" data-nosnippet>
      {followLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => onLinkClick(item.id)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <span className="inline-flex items-center gap-1">
            <span className="text-zinc-700 dark:text-zinc-300">
              {item.icon === "linkedin" ? <LinkedInIcon /> : <XIcon />}
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
              {item.id === "linkedin" ? "Connect" : "Follow"}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
