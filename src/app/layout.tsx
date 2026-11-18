import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { profile } from "@/content";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: `${profile.name} ${profile.tagline} ${profile.stack}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
        <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm text-muted sm:px-6">
            <Link href="/" className="text-base font-semibold text-fg">
              {profile.name}
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/#work" className="hidden hover:text-fg sm:inline">Work</Link>
              <Link href="/#projects" className="hidden hover:text-fg sm:inline">Projects</Link>
              <Link href="/#experience" className="hidden hover:text-fg md:inline">Experience</Link>
              <Link href="/#skills" className="hidden hover:text-fg md:inline">Skills</Link>
              <Link href="/#contact" className="rounded-md border border-line-strong px-3 py-1.5 text-soft hover:bg-card hover:text-fg">Contact</Link>
            </div>
          </nav>
        </header>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {children}
          <footer className="mt-24 border-t border-line py-8 font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name} · built with Next.js and Tailwind
          </footer>
        </div>
      </body>
    </html>
  );
}
