import Image from "next/image";
import { projectLinks } from "@/data/site";

function getProjectDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
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
          const domain = getProjectDomain(project.url);
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

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
                  <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{project.name}</p>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {project.badge}
                    </span>
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 pt-0.5 text-sm font-medium text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  Visit
                </a>
              </div>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
            </li>
          );
        })}
      </ul>

    </main>
  );
}
