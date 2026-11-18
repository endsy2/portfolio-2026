/* eslint-disable @next/next/no-img-element -- static export, images are pre-sized */
import Link from "next/link";
import type { Gallery, Layer, Project } from "@/content";

export function Label({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mb-4 scroll-mt-6 font-mono text-sm text-accent">
      {"// "}
      {children}
    </p>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-xs leading-relaxed text-soft">
      {items.map((t) => t.toLowerCase()).join(" · ")}
    </p>
  );
}

// Layered architecture diagram: each layer is a row of boxes, arrows between rows.
export function Layers({ layers }: { layers: Layer[] }) {
  return (
    <div className="flex flex-col items-stretch gap-1">
      {layers.map((row, i) => (
        <div key={i}>
          {i > 0 && <p className="py-1 text-center font-mono text-xs text-muted" aria-hidden>↓</p>}
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((box) => (
              <div key={box} className="rounded-lg border border-line-strong bg-raised px-3 py-2.5 text-center text-xs text-soft sm:text-sm">
                {box}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Horizontal flow of steps (wraps to vertical on phones).
export function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2 sm:flex-1">
          <span className="flex-1 rounded-lg border border-line-strong bg-raised px-3 py-2.5 text-center font-mono text-xs text-soft">
            <span className="text-accent">{i + 1}.</span> {s}
          </span>
          {i < steps.length - 1 && <span className="hidden font-mono text-muted sm:inline" aria-hidden>→</span>}
        </li>
      ))}
    </ol>
  );
}

export function Shots({ gallery }: { gallery: Gallery }) {
  const phone = gallery.device === "phone";
  return (
    <div>
      <h3 className="mb-3 text-base font-medium">{gallery.title}</h3>
      <div className={phone ? "flex flex-wrap gap-4" : "grid gap-4 sm:grid-cols-2"}>
        {gallery.shots.map((s) => (
          <figure key={s.src} className={phone ? "w-[calc(50%-0.5rem)] sm:w-40" : ""}>
            <a href={s.src} target="_blank" rel="noreferrer" className="block transition hover:-translate-y-0.5">
              {phone ? (
                <div className="overflow-hidden rounded-[1.4rem] border-4 border-line-strong bg-black">
                  <img src={s.src} alt={s.caption} loading="lazy" className="w-full" />
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-line-strong bg-card">
                  <div className="flex gap-1.5 border-b border-line px-3 py-2" aria-hidden>
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                  </div>
                  <img src={s.src} alt={s.caption} loading="lazy" className="w-full" />
                </div>
              )}
            </a>
            <figcaption className="mt-2 text-xs text-muted">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, big = false }: { project: Project; big?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group grid gap-5 rounded-xl border bg-raised p-5 transition hover:-translate-y-0.5 hover:border-accent/60 ${
        big ? "border-line-strong md:grid-cols-[1.2fr_1fr]" : "border-line"
      }`}
    >
      <div className="flex flex-col">
        <p className="mb-1 font-mono text-xs text-muted">
          {project.org}
          {project.period && ` · ${project.period}`}
        </p>
        <h3 className="mb-2 text-lg font-medium">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">{project.summary}</p>
        {project.stat && <p className="mb-4 font-mono text-sm text-accent">{project.stat}</p>}
        {big && (
          <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-soft">
            {project.built.slice(0, 3).map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-accent" aria-hidden>›</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {big && project.role && <p className="mb-4 rounded-md border border-line px-3 py-2 text-xs text-muted">{project.role}</p>}
        <div className="mt-auto">
          <Tags items={project.stack.slice(0, 6)} />
          <p className="mt-3 text-sm text-accent">read case study →</p>
        </div>
      </div>
      {big && project.slug === "go-bus" && (
        <div className="flex items-center justify-center gap-3 rounded-lg bg-card p-4">
          {["m-seat-user1", "m-seat-user2"].map((f, i) => (
            <div key={f} className="text-center">
              <div className="w-28 overflow-hidden rounded-2xl border-4 border-line-strong sm:w-32">
                <img src={`/projects/gobus/${f}.jpg`} alt={`User ${i + 1} seat view`} className="w-full" />
              </div>
              <p className="mt-2 font-mono text-xs text-muted">user {i + 1}</p>
            </div>
          ))}
        </div>
      )}
      {big && project.architecture && project.slug !== "go-bus" && (
        <div className="rounded-lg bg-card p-4">
          <Layers layers={project.architecture.layers.slice(0, 3)} />
        </div>
      )}
    </Link>
  );
}
