"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/content";

type Preview = Pick<Project, "slug" | "title" | "org">;

export default function ProjectTerminal({ projects }: { projects: Preview[] }) {
  const [index, setIndex] = useState(0);
  const [angle, setAngle] = useState(-12);
  const project = projects[index];

  return (
    <figure className="terminal-stage" aria-label="Interactive project computer">
      <div className="terminal-view">
        <div className="terminal-machine" style={{ transform: `rotateX(5deg) rotateY(${angle}deg)` }}>
          <div className="terminal-shell">
            <div className="terminal-bezel">
              <div className="terminal-screen" aria-live="polite">
                <span className="terminal-prompt">~/projects</span>
                <strong>{project.title}</strong>
                <small>{project.org}</small>
                <Link href={`/projects/${project.slug}`}>Open case study ↗</Link>
              </div>
            </div>
            <div className="terminal-panel">
              <span className="terminal-vents" aria-hidden />
              <button type="button" aria-label="Previous project" onClick={() => setIndex((i) => (i + projects.length - 1) % projects.length)}>‹</button>
              <button type="button" aria-label="Next project" onClick={() => setIndex((i) => (i + 1) % projects.length)}>›</button>
            </div>
          </div>
          <div className="terminal-foot" aria-hidden />
        </div>
      </div>
      <label className="terminal-control">Rotate model
        <input aria-label="Rotate model" aria-valuetext={`${angle} degrees`} type="range" min="-25" max="25" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </label>
    </figure>
  );
}
