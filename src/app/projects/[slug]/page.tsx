import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content";
import { Label, Layers, Shots, Steps, Tags } from "@/components";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} · Chin Kong Ming`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="py-10">
      <Link href={p.kind === "work" ? "/#work" : "/#projects"} className="font-mono text-sm text-muted hover:text-fg">
        ← cd ..
      </Link>

      <header className="mb-14 mt-8 max-w-3xl">
        <p className="mb-2 font-mono text-sm text-accent">
          {p.org}
          {p.period && ` · ${p.period}`}
        </p>
        <h1 className="mb-4 text-3xl font-medium sm:text-4xl">{p.title}</h1>
        <p className="mb-5 leading-relaxed text-soft">{p.summary}</p>
        {p.stat && <p className="mb-4 font-mono text-sm text-accent">{p.stat}</p>}
        {p.role && <p className="mb-4 rounded-md border border-line px-3 py-2 text-sm text-muted">{p.role}</p>}
        <Tags items={p.stack} />
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-md border border-line-strong px-4 py-2 text-sm text-soft hover:bg-card">
            View code on GitHub ↗
          </a>
        )}
      </header>

      <section className="mb-14 grid gap-10 md:grid-cols-2">
        <div>
          <Label>the problem</Label>
          <p className="text-sm leading-relaxed text-soft">{p.problem}</p>
          {p.problemGallery && <div className="mt-5"><Shots gallery={p.problemGallery} /></div>}
        </div>
        <div>
          <Label>what i built</Label>
          <ul className="space-y-2.5 text-sm leading-relaxed text-soft">
            {p.built.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-accent" aria-hidden>›</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-14">
        <Label>{p.architecture.title.toLowerCase()}</Label>
        <div className="rounded-xl border border-line bg-card p-5">
          <Layers layers={p.architecture.layers} />
          {p.architecture.note && <p className="mt-4 text-xs leading-relaxed text-muted">{p.architecture.note}</p>}
        </div>
      </section>

      {p.flow && (
        <section className="mb-14">
          <Label>{p.flow.title.toLowerCase()}</Label>
          <div className="rounded-xl border border-line bg-card p-5">
            <Steps steps={p.flow.steps} />
            {p.flow.note && <p className="mt-4 text-xs leading-relaxed text-muted">{p.flow.note}</p>}
          </div>
        </section>
      )}

      {p.galleries && (
        <section className="space-y-12">
          <Label>screens</Label>
          {p.galleries.map((g) => (
            <Shots key={g.title} gallery={g} />
          ))}
        </section>
      )}

      {p.confidential && (
        <p className="mt-4 rounded-lg border border-line px-4 py-3 text-xs text-muted">
          This is an internal company system, so no real screens are shown. The diagrams are redrawn and contain no company data.
        </p>
      )}
    </main>
  );
}
