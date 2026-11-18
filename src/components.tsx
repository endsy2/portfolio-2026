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
              <div key={box} className="rounded-lg border border-line-strong bg-raised px-1.5 py-2.5 text-center text-xs wrap-anywhere text-soft sm:px-3 sm:text-sm">
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
                  <img src={s.src} alt={s.caption} loading="lazy" className="aspect-[9/20] w-full object-contain" />
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
            <figcaption className="mt-2 text-sm leading-snug text-soft">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, big = false }: { project: Project; big?: boolean }) {
  return (
    <article
      className={`reveal group relative grid gap-5 rounded-xl border bg-raised p-5 transition hover:-translate-y-0.5 hover:border-accent/60 ${
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
        <div className="mt-auto">
          <Tags items={project.stack.slice(0, 3)} />
          <Link href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`} className="mt-3 inline-block text-sm text-accent after:absolute after:inset-0 after:rounded-xl hover:underline">read case study →</Link>
        </div>
      </div>
      {big && (
        <div className="grid content-center rounded-lg bg-card p-4">
          {project.problemGallery ? (
            <div className="grid grid-cols-2 items-start justify-items-center gap-3">
              {project.problemGallery.shots.map((shot, i) => (
                <figure key={shot.src} className="w-full max-w-32">
                  <img src={shot.src} alt={shot.caption} loading="lazy" className="aspect-[9/20] w-full rounded-2xl border-4 border-line-strong bg-black object-contain" />
                  <figcaption className="mt-2 text-sm text-soft">
                    {i === 0 ? "Passenger A selects A1" : "Passenger B sees A1 on hold"}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : project.slug === "vtech-management-system" && project.flow ? (
            <figure>
              <figcaption className="mb-3 text-sm font-medium">{project.flow.title}</figcaption>
              <ol className="grid gap-2 border-l border-line-strong pl-4">
                {project.flow.steps.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-3 text-sm text-soft">
                    <span aria-hidden className="font-mono text-xs text-accent">{i + 1}</span>{step}
                  </li>
                ))}
              </ol>
            </figure>
          ) : (
            <Layers layers={project.architecture.layers.slice(0, 3)} />
          )}
        </div>
      )}
    </article>
  );
}
