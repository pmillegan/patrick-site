import type { Metadata } from "next";
import Image from "next/image";
import UscProjectPhotoGrid from "@/components/projects/usc-project-photo-grid";
import { projectLinks } from "@/data/site";

const projectsDescription =
  "Projects by Patrick Millegan: Shopify customer accounts, Keap Athletics, Cash Game Host, USC guest lectures, and more.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects",
    description: projectsDescription,
    url: "/projects",
  },
  twitter: {
    description: projectsDescription,
  },
};

function getProjectDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getYoutubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace("/", "") || null;
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function getYoutubeThumbnailUrl(url: string) {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <header className="space-y-3">
        <h1
          id="projects-heading"
          className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Projects
        </h1>
      </header>

      <ul className="flex list-none flex-col gap-3 p-0" aria-labelledby="projects-heading">
        {projectLinks.map((project) => {
          const faviconDomain = project.faviconDomain ?? getProjectDomain(project.url);
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(faviconDomain)}&sz=64`;
          const isUscGuestLecture = project.name === "Guest lecturing for USC";
          const uscGalleryPhotos = [
            { src: "/undergrad.jpg", alt: "USC Marshall undergraduate class", label: "Undergraduate" },
            { src: "/grad.jpg", alt: "USC Marshall graduate class", label: "Graduate" },
          ];
          const hasMediaTiles = Array.isArray(project.mediaLinks) && project.mediaLinks.length > 0;
          const hasCollapsibleMedia = isUscGuestLecture || hasMediaTiles;
          const mediaCount = (isUscGuestLecture ? uscGalleryPhotos.length : 0) + (project.mediaLinks?.length ?? 0);
          const showVisitLink = project.showVisit !== false;
          const mediaToggleId = `media-toggle-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

          return (
            <li
              key={project.name}
              className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Image
                    src={faviconUrl}
                    alt={`${project.name} favicon`}
                    width={20}
                    height={20}
                    className="mt-0.5 shrink-0 rounded-sm"
                  />
                  <p className="min-w-0 font-medium text-zinc-900 dark:text-zinc-100">{project.name}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
              {hasCollapsibleMedia || showVisitLink ? (
                hasCollapsibleMedia ? (
                  <div className="w-full">
                    <input id={mediaToggleId} type="checkbox" className="peer sr-only" />
                    <div className="flex items-center justify-between gap-3">
                      {showVisitLink ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-sm font-medium text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                        >
                          Visit
                        </a>
                      ) : (
                        <span />
                      )}
                      <label
                        htmlFor={mediaToggleId}
                        className="cursor-pointer text-sm leading-6 text-zinc-600 underline underline-offset-2 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-400"
                      >
                        {`Media (${mediaCount})`}
                      </label>
                    </div>
                    <div className="mt-2 hidden space-y-2 peer-checked:block">
                      {isUscGuestLecture ? <UscProjectPhotoGrid photos={uscGalleryPhotos} /> : null}
                      {hasMediaTiles ? (
                        <div className="grid grid-cols-3 gap-1.5">
                          {project.mediaLinks?.map((item) => {
                            const tileThumbnailUrl =
                              item.thumbnailUrl ?? (item.platform === "youtube" ? getYoutubeThumbnailUrl(item.url) : null);

                            return (
                              <a
                                key={item.url}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative overflow-hidden rounded-lg border border-zinc-200 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:hover:border-zinc-600"
                              >
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                  {tileThumbnailUrl ? (
                                    <Image
                                      src={tileThumbnailUrl}
                                      alt={`${item.label} thumbnail`}
                                      fill
                                      className="object-cover object-center"
                                      sizes="(max-width: 1023px) 45vw, 22vw"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800" />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                                  <div className="absolute inset-x-2 bottom-2">
                                    <p className="text-xs font-semibold leading-4 text-white">{item.label}</p>
                                  </div>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    {showVisitLink ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-sm font-medium text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      >
                        Visit
                      </a>
                    ) : null}
                  </div>
                )
              ) : null}
            </li>
          );
        })}
      </ul>

    </main>
  );
}
