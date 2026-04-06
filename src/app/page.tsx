import Link from "next/link";
import { profile, projects, timeline } from "@/data/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 py-14 sm:px-8">
      <section className="space-y-6">
        <p className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700">
          Software Engineer
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-700">
          {profile.tagline}
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-100"
          >
            Email
          </a>
          <Link
            href="/projects"
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-100"
          >
            View Projects
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          About
        </h2>
        <p className="max-w-3xl leading-8 text-zinc-700">{profile.about}</p>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Recent Work
          </h2>
          <Link href="/projects" className="text-sm font-medium text-zinc-700 underline">
            See all projects
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <article
              key={project.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">{project.name}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-700">{project.summary}</p>
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
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Experience Snapshot
        </h2>
        <div className="space-y-4">
          {timeline.map((item) => (
            <article key={`${item.role}-${item.company}`} className="rounded-xl border border-zinc-200 p-5">
              <p className="text-sm text-zinc-600">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900">
                {item.role} - {item.company}
              </h3>
              <p className="mt-2 leading-7 text-zinc-700">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
