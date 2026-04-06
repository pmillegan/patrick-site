import Link from "next/link";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-14 sm:px-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-600">Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          Things I am building
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">
          A mix of shipped work, portfolio projects, and reusable references for
          vibe coding future ideas.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{project.name}</h2>
            <p className="mt-3 flex-1 leading-7 text-zinc-700">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target={project.url.startsWith("http") ? "_blank" : undefined}
              rel={project.url.startsWith("http") ? "noreferrer" : undefined}
              className="mt-5 text-sm font-medium text-zinc-900 underline"
            >
              Open project
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">How to use this page</h2>
        <p className="mt-3 leading-7 text-zinc-700">
          Add links, screenshots, and short writeups to each project so this stays
          useful as both a public portfolio and a personal launchpad.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
          Back to home
        </Link>
      </section>
    </main>
  );
}
