"use client";

import { useEffect } from "react";

export default function ScrollReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const entries = document.querySelectorAll<HTMLElement>("main .reveal");
    const observer = new IntersectionObserver((changes) => {
      for (const change of changes) {
        if (change.intersectionRatio < 0.12) continue;
        change.target.removeAttribute("data-reveal-pending");
        observer.unobserve(change.target);
      }
    }, { threshold: 0.12 });

    for (const entry of entries) {
      const rect = entry.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) continue;
      entry.setAttribute("data-reveal-pending", "");
      observer.observe(entry);
    }
    return () => {
      observer.disconnect();
      entries.forEach((entry) => entry.removeAttribute("data-reveal-pending"));
    };
  }, []);

  return null;
}
