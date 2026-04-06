import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
    "Personal website and project hub for Patrick Millegan. Built with Next.js for simple publishing now and room to grow later.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-50 text-zinc-900">
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
            <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-900">
              PATRICK MILLEGAN
            </Link>
            <nav className="flex items-center gap-5 text-sm text-zinc-700">
              <Link href="/" className="hover:text-zinc-900">
                Home
              </Link>
              <Link href="/projects" className="hover:text-zinc-900">
                Projects
              </Link>
              <a
                href="https://linkedin.com/in/pmillegan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mx-auto mt-16 w-full max-w-5xl border-t border-zinc-200 px-6 py-8 text-sm text-zinc-600 sm:px-8">
          <p>Built with Next.js and intended to evolve over time.</p>
        </footer>
      </body>
    </html>
  );
}
