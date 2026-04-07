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
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-14 sm:px-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Projects
        </h1>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <ul className="space-y-3">
          {projectLinks.map((project) => {
            const domain = getProjectDomain(project.url);
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

            return (
              <li
                key={project.name}
                className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={faviconUrl}
                    alt={`${project.name} favicon`}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{project.name}</p>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {project.badge}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
                  </div>
                </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-700 underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Visit
              </a>
              </li>
            );
          })}
        </ul>
      </section>

    </main>
  );
}
