"use client";

import Image from "next/image";
import { useState } from "react";

const actionPillWidthClass = "w-[5rem] shrink-0 whitespace-nowrap px-2";

type RowId = "linkedin" | "visit";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 18.34V10.82H5.84V18.34H8.34M7.09 9.79A1.45 1.45 0 1 0 7.09 6.89A1.45 1.45 0 1 0 7.09 9.79M18.34 18.34V14.22C18.34 12 17.14 10.66 15.35 10.66C13.9 10.66 13.26 11.46 12.89 12.02V10.82H10.39V18.34H12.89V14.17C12.89 13.07 13.1 12 14.47 12C15.82 12 15.84 13.26 15.84 14.24V18.34H18.34Z" />
    </svg>
  );
}

function UntoilMark() {
  return (
    <Image
      src="/untoil-logo.png"
      alt=""
      width={16}
      height={16}
      className="size-4 shrink-0 rounded-[4px] rounded-br-none dark:invert"
    />
  );
}

const rows: Array<{
  id: RowId;
  label: string;
  href: string;
  pill: string;
  icon: "linkedin" | "untoil";
}> = [
  {
    id: "linkedin",
    label: "company/untoil",
    href: "https://www.linkedin.com/company/untoil",
    pill: "Follow",
    icon: "linkedin",
  },
  {
    id: "visit",
    label: "Visit Untoil",
    href: "https://untoil.com",
    pill: "Visit",
    icon: "untoil",
  },
];

export default function UntoilLinkedInFollowRow() {
  const [clicked, setClicked] = useState<Record<RowId, boolean>>({
    linkedin: false,
    visit: false,
  });

  return (
    <div className="space-y-1">
      {rows.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => setClicked((previous) => ({ ...previous, [item.id]: true }))}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <span className="inline-flex items-center gap-1">
            <span className="text-zinc-700 dark:text-zinc-300">
              {item.icon === "linkedin" ? <LinkedInIcon /> : <UntoilMark />}
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
              {item.pill}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
