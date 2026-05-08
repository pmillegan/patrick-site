"use client";

import { useState } from "react";

const actionPillWidthClass = "w-[5rem] shrink-0 whitespace-nowrap px-2";

type SocialId = "linkedin" | "twitter" | "calendly" | "projects";

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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h1V3a1 1 0 011-1zm13 8H4v9a1 1 0 001 1h14a1 1 0 001-1v-9zM5 6a1 1 0 00-1 1v1h16V7a1 1 0 00-1-1h-1v1a1 1 0 11-2 0V6H8v1a1 1 0 11-2 0V6H5z" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v1H3V6zm0 4h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
    </svg>
  );
}

const followLinks: Array<{
  id: SocialId;
  label: string;
  href: string;
  icon: "linkedin" | "x" | "calendar" | "projects";
  external?: boolean;
}> = [
  {
    id: "linkedin",
    label: "in/Pmillegan",
    href: "https://linkedin.com/in/pmillegan",
    icon: "linkedin",
    external: true,
  },
  {
    id: "twitter",
    label: "@Pmillegan",
    href: "https://x.com/pmillegan",
    icon: "x",
    external: true,
  },
  {
    id: "calendly",
    label: "Book time with me",
    href: "https://calendly.com/patrickmillegan/30min",
    icon: "calendar",
    external: true,
  },
  {
    id: "projects",
    label: "See what I've worked on",
    href: "/projects",
    icon: "projects",
  },
];

export default function HomeFollowRows() {
  const [clicked, setClicked] = useState<Record<SocialId, boolean>>({
    linkedin: false,
    twitter: false,
    calendly: false,
    projects: false,
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
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          onClick={() => onLinkClick(item.id)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <span className="inline-flex items-center gap-1">
            <span className="text-zinc-700 dark:text-zinc-300">
              {item.icon === "linkedin" ? (
                <LinkedInIcon />
              ) : item.icon === "x" ? (
                <XIcon />
              ) : item.icon === "calendar" ? (
                <CalendarIcon />
              ) : (
                <ProjectsIcon />
              )}
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
              {item.id === "linkedin"
                ? "Connect"
                : item.id === "twitter"
                  ? "Follow"
                  : item.id === "calendly"
                    ? "Book"
                    : "View"}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
