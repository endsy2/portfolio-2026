/* eslint-disable @next/next/no-img-element -- static export */
import { education, experience, profile, projects, skills } from "@/content";
import { Label, ProjectCard } from "@/components";
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
      {/* Hero */}
      <section className="grid items-center gap-10 py-14 md:grid-cols-[1.25fr_1fr] md:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-1 font-mono text-xs text-soft">
            <span className="size-1.5 rounded-full bg-ok" /> open to full stack and backend roles
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Hi, I&apos;m
            <br />
            <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="mb-2 text-lg text-soft">I build banking and business systems end to end.</p>
          <p className="mb-7 text-sm text-muted">
            Full stack developer in {profile.location.split(",")[0]}. I work in {profile.stack.replaceAll(" ·", ",")}.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="rounded-md bg-gradient-to-r from-accent to-[#9b7bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              See my work
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-4 py-2 text-sm text-soft hover:bg-card">
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:items-end">
          <div className="rounded-2xl bg-gradient-to-br from-accent via-[#9b7bff] to-[#2fd3c0] p-[2px]">
            <img src="/me.jpg" alt={profile.name} className="size-44 rounded-[14px] object-cover sm:size-52" />
          </div>
          <pre className="w-full overflow-x-auto rounded-xl border border-line bg-card/90 p-5 font-mono text-[13px] leading-7" aria-label="Profile summary as code">
            <span className="mb-3 flex items-center justify-between" aria-hidden>
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#e24b4a]" />
                <span className="size-2.5 rounded-full bg-[#ef9f27]" />
                <span className="size-2.5 rounded-full bg-ok" />
              </span>
              <span className="text-xs text-muted">me.ts</span>
            </span>
            <span className="text-accent">const</span> me = {"{"}
            {"\n"}  name: <span className="text-[#f0b66b]">&quot;{profile.name}&quot;</span>,
            {"\n"}  role: <span className="text-[#f0b66b]">&quot;{profile.role}&quot;</span>,
            {"\n"}  langs: [{profile.langs.map((l, i) => (
              <span key={l}>
                <span className="text-[#f0b66b]">&quot;{l}&quot;</span>
                {i < profile.langs.length - 1 && ", "}
              </span>
            ))}],
            {"\n"}  current: <span className="text-[#f0b66b]">&quot;VTECH&quot;</span>,
            {"\n"}{"}"}
          </pre>
        </div>
      </section>

      {/* About me */}
      <section className="reveal mb-24 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Label id="about">about</Label>
          <h2 className="mb-5 text-3xl font-semibold">About me</h2>
          <div className="space-y-4 text-sm leading-relaxed text-soft">
            {profile.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
        <dl className="h-fit space-y-3 rounded-xl border border-line bg-card p-5 font-mono text-xs">
          {profile.facts.map((f) => (
            <div key={f.k} className="grid grid-cols-[5.5rem_1fr] gap-3">
              <dt className="text-muted">{f.k}</dt>
              <dd className="text-soft">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work */}
      <section className="reveal mb-24">
        <Label id="work">professional work</Label>
        <h2 className="mb-2 text-3xl font-semibold">Systems people use every day</h2>
        <p className="mb-8 text-sm text-muted">Internal platforms I&apos;ve built for a bank and a growing company.</p>
        <div className="grid gap-4">
          {work.map((p) => (
            <ProjectCard key={p.slug} project={p} big />
          ))}
        </div>
      </section>

      {/* Featured + personal projects */}
      <section className="reveal mb-24">
        <Label id="projects">featured project</Label>
        <h2 className="mb-2 text-3xl font-semibold">Two people, one seat, no double booking.</h2>
        <p className="mb-8 text-sm text-muted">My final-year thesis: the backend behind a real-time bus booking app.</p>
        <div className="grid gap-4">
          <ProjectCard project={featured} big />
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="reveal mb-24">
        <Label id="skills">tech stack</Label>
        <h2 className="mb-2 text-3xl font-semibold">
          My <span className="gradient-text">skills</span>
        </h2>
        <p className="mb-8 text-sm text-muted">The tools I use to build, ship and run systems. Drag the sphere to spin it.</p>
        <SkillSphere logos={logos} />
        <dl className="mx-auto mt-10 max-w-3xl border-t border-line">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-2 border-b border-line py-3.5 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4">
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

      {/* Experience */}
      <section className="reveal mb-24">
        <Label id="experience">career</Label>
        <h2 className="mb-2 text-3xl font-semibold">Experience</h2>
        <p className="mb-8 text-sm text-muted">From internship to banking and enterprise systems.</p>
        <ol className="border-l border-line-strong">
          {experience.map((e) => (
            <li key={e.role + e.org} className="relative mb-10 pl-6 last:mb-0">
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

        <h3 className="mb-4 mt-14 text-xl font-semibold">Education</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <div key={e.name} className="flex gap-4 rounded-xl border border-line bg-raised p-5">
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
