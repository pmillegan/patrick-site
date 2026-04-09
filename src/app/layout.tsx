import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeModeSelect from "@/components/theme-mode-select";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://patrickmillegan.com"),
  title: {
    default: "Patrick Millegan",
    template: "%s | Patrick Millegan",
  },
  description:
    "Project playground for Patrick Millegan with experiments, reusable examples, and active builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme-preference')||'system';var s=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=m==='dark'||(m==='system'&&s);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="PMillegan" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
            <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              PATRICK MILLEGAN
            </Link>
            <nav className="flex items-center gap-5 text-sm text-zinc-700 dark:text-zinc-300">
              <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Projects
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-auto border-t border-zinc-200 px-6 py-4 dark:border-zinc-800 sm:px-8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
              <a
                href="https://linkedin.com/in/pmillegan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/pmillegan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Twitter
              </a>
            </div>
            <ThemeModeSelect />
          </div>
        </footer>
      </body>
    </html>
  );
}
