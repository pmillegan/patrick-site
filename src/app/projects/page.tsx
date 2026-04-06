import Link from "next/link";
import { projectLinks } from "@/data/site";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-14 sm:px-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-600">Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          Project links
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">
          A simple list for now. As new things ship, they can be added here.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <ul className="space-y-3">
          {projectLinks.map((project) => (
            <li key={project.name} className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-3 last:border-b-0 last:pb-0">
              <span className="font-medium text-zinc-900">{project.name}</span>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-zinc-700 underline hover:text-zinc-900"
              >
                Visit
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-700">
        Add links to new projects in `src/data/site.ts`.
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
          Back to home
        </Link>
      </section>
    </main>
  );
}
