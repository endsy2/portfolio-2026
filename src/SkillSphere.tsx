"use client";
import { useEffect, useRef } from "react";

export type Logo = { title: string; path: string; hex: string };

// Readable on the navy background: very dark brand colours (Next.js, Express...) switch to light.
const tint = (hex: string) => {
  const n = parseInt(hex, 16);
  const l = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return l < 90 ? "#c9d3ea" : `#${hex}`;
};

type V = [number, number, number];

// Wireframe globe: 5 parallels + 8 meridians, as unit-sphere polylines.
const SEG = 64;
const LINES: V[][] = [
  ...[-60, -30, 0, 30, 60].map((lat) => {
    const y = Math.sin((lat * Math.PI) / 180), r = Math.cos((lat * Math.PI) / 180);
    return Array.from({ length: SEG + 1 }, (_, i): V => {
      const t = (i / SEG) * 2 * Math.PI;
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });
  }),
  ...Array.from({ length: 8 }, (_, m) => {
    const lon = (m / 8) * Math.PI;
    return Array.from({ length: SEG + 1 }, (_, i): V => {
      const t = (i / SEG) * 2 * Math.PI;
      return [Math.cos(t) * Math.cos(lon), Math.sin(t), Math.cos(t) * Math.sin(lon)];
    });
  }),
];

// Tech logos on a rotating 3D wireframe globe. Drag to spin; it keeps turning slowly on its own.
export default function SkillSphere({ logos }: { logos: Logo[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!, cv = canvas.current!, ctx = cv.getContext("2d")!;
    const items = [...el.children] as HTMLElement[];
    const n = items.length;
    // Fibonacci sphere: spreads logos evenly.
    const pts = items.map((_, i): V => {
      const y = 1 - (2 * (i + 0.5)) / n, r = Math.sqrt(1 - y * y), t = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ax = -0.35, ay = 0, vx = 0, vy = 0.004, drag = false, lx = 0, ly = 0, raf = 0, size = 0;

    const resize = () => {
      size = wrap.current!.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      cv.width = cv.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap.current!);
    resize();

    const frame = () => {
      if (!drag) { ax += vx; ay += vy; vx *= 0.95; vy += (0.004 - vy) * 0.02; }
      const R = size * 0.44, c = size / 2;
      const [cx, sx, cy, sy] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay)];
      const rot = ([x, y, z]: V): V => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy; // spin around y
        return [x1, y * cx - z1 * sx, y * sx + z1 * cx]; // tilt around x
      };

      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = 1;
      for (const line of LINES) {
        let prev = rot(line[0]);
        for (let i = 1; i < line.length; i++) {
          const p = rot(line[i]);
          ctx.strokeStyle = `rgba(110,100,230,${0.1 + 0.35 * ((p[2] + 1) / 2)})`; // back lines fainter
          ctx.beginPath();
          ctx.moveTo(c + prev[0] * R, c + prev[1] * R);
          ctx.lineTo(c + p[0] * R, c + p[1] * R);
          ctx.stroke();
          prev = p;
        }
      }
      ctx.strokeStyle = "rgba(110,100,230,0.55)"; // silhouette
      ctx.beginPath();
      ctx.arc(c, c, R, 0, 2 * Math.PI);
      ctx.stroke();

      pts.forEach((p0, i) => {
        const [x, y, z] = rot(p0);
        const d = (z + 1) / 2; // 0 back .. 1 front
        const st = items[i].style;
        st.transform = `translate(-50%,-50%) translate3d(${x * R}px,${y * R}px,0) scale(${0.55 + 0.6 * d})`;
        st.opacity = String(0.35 + 0.65 * d);
        st.filter = `brightness(${0.45 + 0.55 * d})`;
        st.zIndex = String(Math.round(d * 100));
      });
      if (!reduce || drag) raf = requestAnimationFrame(frame);
    };

    const down = (e: PointerEvent) => {
      drag = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId);
      if (reduce) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      vy = (e.clientX - lx) * 0.005; vx = (e.clientY - ly) * 0.005;
      ay += vy; ax += vx; lx = e.clientX; ly = e.clientY;
    };
    const up = () => { drag = false; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    frame();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
    };
  }, [logos]);

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-lg">
      <canvas ref={canvas} className="absolute inset-0 size-full" aria-hidden />
      <div ref={box} className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing" aria-label={`Skills: ${logos.map((l) => l.title).join(", ")}`} role="img">
        {logos.map((l) => (
          <svg key={l.title} viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 size-9" fill={tint(l.hex)}>
            <title>{l.title}</title>
            <path d={l.path} />
          </svg>
        ))}
      </div>
    </div>
  );
}
