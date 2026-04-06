import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 py-14 sm:px-8">
      <section className="grid w-full items-center gap-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm md:grid-cols-[280px_1fr]">
        <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-zinc-200">
          <Image
            src="/profile.jpg"
            alt="Portrait of Patrick Millegan"
            width={560}
            height={560}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700">
            Product Developer
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Patrick Millegan
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-700">
            Patrick Millegan is a San Mateo based product developer building all
            sorts of fun projects. Reach out via LinkedIn or X and say hi.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/in/pmillegan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              aria-label="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 18.34V10.82H5.84V18.34H8.34M7.09 9.79A1.45 1.45 0 1 0 7.09 6.89A1.45 1.45 0 1 0 7.09 9.79M18.34 18.34V14.22C18.34 12 17.14 10.66 15.35 10.66C13.9 10.66 13.26 11.46 12.89 12.02V10.82H10.39V18.34H12.89V14.17C12.89 13.07 13.1 12 14.47 12C15.82 12 15.84 13.26 15.84 14.24V18.34H18.34Z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/pmillegan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              aria-label="X profile"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M18.9 2H22L15.2 9.78L23.2 22H16.94L12.05 14.62L5.6 22H2.5L9.8 13.65L2.2 2H8.62L13.03 8.74L18.9 2ZM17.81 20.13H19.53L7.68 3.78H5.83L17.81 20.13Z" />
              </svg>
              X
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
