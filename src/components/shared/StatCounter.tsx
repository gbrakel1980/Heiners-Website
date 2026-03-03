"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StatCounter({ value, label, prefix = "", suffix = "" }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion() ? value : 0
  );
  const [hasAnimated, setHasAnimated] = useState(() => prefersReducedMotion());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 4000; // 4 seconds
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);

            setDisplayValue(Math.round(easedProgress * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="text-4xl font-bold text-accent" aria-label={`${prefix}${value}${suffix}`}>
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className="mt-1 text-sm text-white/70">{label}</span>
    </div>
  );
}
