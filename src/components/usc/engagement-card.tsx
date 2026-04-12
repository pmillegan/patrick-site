"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type EngagementKey = "twitter" | "linkedin" | "post" | "slides" | "darkvoid";
type EngagementIcon = "x" | "linkedin" | "slides" | "diamond";

/** Google Slides deck for the USC guest lecture (shared with undergrad/grad pages). */
export const USC_GUEST_LECTURE_SLIDES_HREF =
  "https://docs.google.com/presentation/d/1t-QWHfj7BuqiJWnbgr-dNz-pRr7dnfvd0ZR2lQnJOK8/edit?slide=id.g3dd2f17c201_0_247#slide=id.g3dd2f17c201_0_247";

const engagementLinks: Array<{ id: Exclude<EngagementKey, "slides">; label: string; href: string; icon: EngagementIcon }> = [
  {
    id: "linkedin",
    label: "Connect with me on LinkedIn",
    href: "https://linkedin.com/in/pmillegan",
    icon: "linkedin",
  },
  {
    id: "post",
    label: "Like, comment, or repost!",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7448413039529422848/",
    icon: "linkedin",
  },
  {
    id: "twitter",
    label: "Follow me on X",
    href: "https://x.com/pmillegan",
    icon: "x",
  },
];

function RowIcon({ icon }: { icon: EngagementIcon | "email" }) {
  if (icon === "diamond") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 5 16.5 12 12 19 7.5 12 12 5z" />
      </svg>
    );
  }

  if (icon === "slides") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4 4a2 2 0 012-2h12a2 2 0 012 2v2H4V4zm0 6h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10zm3 2v2h10v-2H7zm0 4v2h7v-2H7z" />
      </svg>
    );
  }

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

export type UscEngagementPhotoLayout = "both" | "undergrad" | "grad";

type UscEngagementCardProps = {
  /** Which class photo(s) to show beside the action links on md+ (stacked below on small screens). Default: both columns. */
  photoLayout?: UscEngagementPhotoLayout;
  /** `split`: tasks | photo side-by-side from md up. `stack`: tasks full width, then photo full width at all breakpoints. */
  layout?: "split" | "stack";
  /** When set, adds a row after “Follow me on X” linking to the guest lecture slides (undergrad/grad). */
  presentationHref?: string;
  /** Shorter “you” intro for `/usc-undergrad` and `/usc-grad`; default keeps Marshall wording for `/usc`. */
  personalIntro?: boolean;
};

export default function UscEngagementCard({
  photoLayout = "both",
  layout = "split",
  presentationHref,
  personalIntro = false,
}: UscEngagementCardProps) {
  const isStacked = layout === "stack";
  /** Undergrad + grad pages: whole email row copies; combined `/usc` keeps a dedicated Copy control. */
  const emailRowFullyClickable = isStacked && photoLayout !== "both";
  const linkRows: Array<{ id: EngagementKey; label: string; href: string; icon: EngagementIcon }> = presentationHref
    ? [
        ...engagementLinks,
        {
          id: "slides",
          label: "View presentation slides",
          href: presentationHref,
          icon: "slides",
        },
      ]
    : [...engagementLinks];
  const [clicked, setClicked] = useState<Record<EngagementKey, boolean>>({
    linkedin: false,
    post: false,
    twitter: false,
    slides: false,
    darkvoid: false,
  });
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (!emailCopied) {
      return;
    }
    const id = window.setTimeout(() => setEmailCopied(false), 3000);
    return () => window.clearTimeout(id);
  }, [emailCopied]);

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

  const allLinksClicked = linkRows.every((item) => clicked[item.id]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <span aria-hidden="true" className="mr-2">
            👋
          </span>
          I had a blast chatting with you all!
        </h2>
        {personalIntro ? (
          <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            I would love to stay connected. Keep in touch through the links below.
          </p>
        ) : (
          <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            I would love to stay connected with everyone from USC Marshall. Keep in touch through the links below.
          </p>
        )}
      </div>

      <div
        className={
          isStacked
            ? "mt-5 flex flex-col gap-6"
            : "mt-5 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-stretch md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
        }
      >
        <div className="min-w-0 w-full space-y-2">
          {linkRows.map((item) => (
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
              Hey, you&apos;ve completed this state.
            </p>
          ) : null}

          {photoLayout === "undergrad" ? (
            <Link
              href="/darkvoid"
              target="_blank"
              rel="noopener noreferrer"
              title="In-class exercise — the Dark Void page on patrickmillegan.com"
              onClick={() => onLinkClick("darkvoid")}
              className="mt-3 flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <span className="text-zinc-700 dark:text-zinc-300">
                  <RowIcon icon="diamond" />
                </span>
                <span>View Dark Void</span>
              </span>
              {clicked.darkvoid ? (
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
            </Link>
          ) : null}

          <div className="mt-3">
            {emailRowFullyClickable ? (
              <div className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                <span className="inline-flex min-w-0 flex-1 items-center gap-2 pr-3">
                  <span className="shrink-0 text-zinc-700 dark:text-zinc-300">
                    <RowIcon icon="email" />
                  </span>
                  <span className="shrink-0 font-medium">Email</span>
                  <span className="min-w-0 flex-1 cursor-text truncate font-bold select-text">
                    PatrickMillegan@gmail.com
                  </span>
                </span>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  aria-label={
                    emailCopied
                      ? "Email copied to clipboard"
                      : "Copy email address PatrickMillegan@gmail.com"
                  }
                  className={
                    emailCopied
                      ? `shrink-0 cursor-pointer inline-flex items-center justify-center rounded-full border border-green-600 bg-green-600 py-1 text-xs font-semibold text-white ${actionPillWidthClass}`
                      : `shrink-0 cursor-pointer inline-flex items-center justify-center rounded-full border border-zinc-300 py-1 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 ${actionPillWidthClass}`
                  }
                >
                  {emailCopied ? "Copied" : "Copy"}
                </button>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                <span className="inline-flex min-w-0 flex-1 items-center gap-2 pr-3">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    <RowIcon icon="email" />
                  </span>
                  <span className="min-w-0 font-medium">Email</span>
                  <span className="min-w-0 cursor-text truncate font-bold select-text">
                    PatrickMillegan@gmail.com
                  </span>
                </span>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className={
                    emailCopied
                      ? `cursor-pointer inline-flex items-center justify-center rounded-full border border-green-600 bg-green-600 py-1 text-xs font-semibold text-white ${actionPillWidthClass}`
                      : `cursor-pointer inline-flex items-center justify-center rounded-full border border-zinc-300 py-1 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 ${actionPillWidthClass}`
                  }
                >
                  {emailCopied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={
            isStacked
              ? "w-full"
              : "mx-auto min-h-0 w-full max-w-2xl md:mx-0 md:h-full md:max-w-none"
          }
        >
          {photoLayout === "both" ? (
            <div
              className={
                isStacked
                  ? "grid w-full grid-cols-2 gap-2 sm:gap-3"
                  : "grid min-h-0 w-full grid-cols-2 gap-2 sm:gap-3 md:h-full md:gap-2 lg:gap-3"
              }
            >
              <figure
                className={
                  isStacked
                    ? "relative aspect-[4/3] min-h-0 w-full"
                    : "relative min-h-0 max-md:aspect-[4/3] md:h-full"
                }
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src="/undergrad.jpg"
                    alt="USC Marshall undergraduate class"
                    fill
                    className="object-cover object-center"
                    sizes={isStacked ? "(max-width: 1280px) 45vw, 400px" : "(max-width: 767px) 45vw, 200px"}
                  />
                </div>
              </figure>
              <figure
                className={
                  isStacked
                    ? "relative aspect-[4/3] min-h-0 w-full"
                    : "relative min-h-0 max-md:aspect-[4/3] md:h-full"
                }
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src="/grad.jpg"
                    alt="USC Marshall graduate class"
                    fill
                    className="object-cover object-center"
                    sizes={isStacked ? "(max-width: 1280px) 45vw, 400px" : "(max-width: 767px) 45vw, 200px"}
                  />
                </div>
              </figure>
            </div>
          ) : (
            <figure
              className={
                isStacked
                  ? "relative aspect-[4/3] w-full"
                  : "relative w-full max-md:aspect-[4/3] md:h-full md:min-h-0"
              }
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                <Image
                  src={photoLayout === "undergrad" ? "/undergrad.jpg" : "/grad.jpg"}
                  alt={photoLayout === "undergrad" ? "USC Marshall undergraduate class" : "USC Marshall graduate class"}
                  fill
                  className="object-cover object-center"
                  sizes={
                    isStacked
                      ? "(max-width: 1280px) min(100vw, 64rem), 896px"
                      : "(max-width: 767px) min(100vw, 42rem), 320px"
                  }
                />
              </div>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
