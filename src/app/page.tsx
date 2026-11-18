/* eslint-disable @next/next/no-img-element -- static export */
import { education, experience, profile, projects, skills } from "@/content";
import { Label, ProjectCard } from "@/components";
import ScrollReveals from "@/ScrollReveals";
import SkillSphere from "@/SkillSphere";
import * as si from "simple-icons";

// Logos for the skills sphere (concepts like RBAC have no logo; they stay in the list).
const logos = [
  si.siReact, si.siNextdotjs, si.siTypescript, si.siTailwindcss,
  si.siOpenjdk, si.siSpringboot, si.siNodedotjs, si.siLaravel,
  si.siPostgresql, si.siMysql, si.siRedis, si.siRabbitmq,
  si.siDocker, si.siKubernetes, si.siGithubactions, si.siLinux,
  si.siPython, si.siPytorch, si.siFastapi, si.siGit,
].map(({ title, path, hex }) => ({ title, path, hex }));

export default function Home() {
  const work = projects.filter((p) => p.kind === "work");
  const [featured, ...rest] = projects.filter((p) => p.kind === "personal");

  return (
    <main>
      <ScrollReveals />
      <section className="profile-hero grid items-center gap-5 py-10 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-16">
        <div>
          <h1 className="gradient-text mb-4 text-4xl font-semibold leading-tight sm:text-5xl">{profile.name}</h1>
          <p className="mb-6 max-w-xl text-lg leading-relaxed text-soft">{profile.intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="rounded-md bg-gradient-to-r from-accent to-[#9b7bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              See my work
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-4 py-2 text-sm text-soft hover:bg-card">
              GitHub ↗
            </a>
          </div>
        </div>

        <img src="/me.jpg" alt={profile.name} className="row-start-1 size-20 rounded-2xl object-cover sm:col-start-2 sm:size-40" />
      </section>

      {/* Work */}
      <section className="mb-24">
        <h2 id="work" className="reveal mb-6 text-3xl font-semibold">Professional work</h2>
        <div className="grid gap-4">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} big />
          ))}
        </div>
      </section>

      {/* Featured + personal projects */}
      <section className="mb-24">
        <h2 id="projects" className="reveal mb-6 text-3xl font-semibold">Personal projects</h2>
        <div className="grid gap-4">
          <ProjectCard project={featured} big />
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-24">
        <Label id="experience">career</Label>
        <h2 className="reveal mb-2 text-3xl font-semibold">Experience</h2>
        <p id="about" className="mb-8 max-w-2xl text-sm leading-relaxed text-soft">{profile.about}</p>
        <ol className="border-l border-line-strong">
          {experience.map((e) => (
            <li key={e.role + e.org} className="reveal relative mb-10 pl-6 last:mb-0">
              <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent" aria-hidden />
              <p className="mb-1 font-mono text-xs text-accent">{e.period}</p>
              <p className="mb-2 font-medium">
                {e.role}, <span className="text-soft">{e.org}</span>
              </p>
              <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="text-accent" aria-hidden>›</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

      </section>

      {/* Skills */}
      <section className="mb-24">
        <Label id="skills">tech stack</Label>
        <h2 className="reveal mb-2 text-3xl font-semibold">
          My <span className="gradient-text">skills</span>
        </h2>
        <p className="mb-8 text-sm text-muted">The tools I use to build, ship and run systems. Drag the sphere to spin it.</p>
        <SkillSphere logos={logos} />
        <dl className="mx-auto mt-10 max-w-3xl border-t border-line">
          {skills.map((s) => (
            <div key={s.group} className="reveal grid gap-2 border-b border-line py-3.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-[#2fd3c0]">{s.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <span key={i} className="rounded-md border border-line-strong bg-card px-2.5 py-1 text-xs text-soft">{i}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-24">
        <h2 className="reveal mb-6 text-3xl font-semibold">Education</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <div key={e.name} className="reveal flex gap-4 rounded-xl border border-line bg-raised p-5">
              <span className="text-2xl" aria-hidden>{e.icon}</span>
              <div>
                <p className="font-medium">{e.name}</p>
                <p className="text-sm text-muted">{e.org}</p>
                <p className="mt-1 font-mono text-xs text-accent">{e.period}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="reveal rounded-2xl border border-line-strong bg-card p-8 text-center">
        <Label id="contact">contact</Label>
        <h2 className="mb-3 text-3xl font-semibold">Let&apos;s build something</h2>
        <p className="mb-6 text-sm text-muted">Open to full stack and backend roles. I reply in Khmer, English or 中文.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="rounded-md bg-gradient-to-r from-accent to-[#9b7bff] px-4 py-2 text-sm font-medium text-white">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-4 py-2 text-sm text-soft hover:bg-raised">
            GitHub ↗
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-4 py-2 text-sm text-soft hover:bg-raised">
              LinkedIn ↗
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
