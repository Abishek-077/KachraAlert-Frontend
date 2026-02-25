"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTORS = [
  "main > *",
  "main section",
  "main form",
  "main [class*='rounded-2xl'][class*='border']",
  "main [class*='rounded-3xl'][class*='border']",
  ".motion-reveal-target",
  "[data-motion-reveal='true']"
];

function collectRevealTargets(): HTMLElement[] {
  const seen = new Set<HTMLElement>();
  REVEAL_SELECTORS.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
      if (seen.has(node)) return;
      if (node.closest("[data-no-motion='true']")) return;
      seen.add(node);
    });
  });
  return Array.from(seen);
}

export default function MotionStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeLayerRef = useRef<HTMLDivElement>(null);

  const routeKey = useMemo(() => pathname || "/", [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    const bindRevealTargets = () => {
      const targets = collectRevealTargets();
      targets.forEach((target, index) => {
        if (!target.classList.contains("motion-reveal")) {
          const delay = Math.min(index * 40, 280);
          target.style.setProperty("--motion-delay", `${delay}ms`);
          target.classList.add("motion-reveal");
        }
        revealObserver.observe(target);
      });
    };

    let frame = 0;
    const mutationObserver = new MutationObserver(() => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        bindRevealTargets();
      });
    });

    bindRevealTargets();
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      mutationObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [routeKey]);

  useEffect(() => {
    const routeLayer = routeLayerRef.current;
    if (!routeLayer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    routeLayer.classList.remove("motion-route-enter-active");
    void routeLayer.offsetWidth;
    routeLayer.classList.add("motion-route-enter-active");
  }, [routeKey]);

  return (
    <div className="motion-studio" data-route={routeKey}>
      <div ref={routeLayerRef} className="motion-route-enter motion-route-enter-active">
        {children}
      </div>
    </div>
  );
}
