"use client";

import { useEffect, useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Fades in a single element when it enters the viewport.
 * Add className="reveal-hidden" to the target element.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px" } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.remove("reveal-hidden");
      element.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("reveal-hidden");
          element.classList.add("reveal-visible");
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Stagger-reveals children that have the "reveal-hidden" class.
 * Attach to a parent container (e.g., a card grid).
 */
interface UseStaggerRevealOptions extends UseScrollRevealOptions {
  onReveal?: () => void;
}

export function useStaggerReveal<T extends HTMLElement>(
  options: UseStaggerRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.1, rootMargin = "0px 0px -30px 0px", onReveal } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      container.querySelectorAll(".reveal-hidden").forEach((el) => {
        el.classList.remove("reveal-hidden");
        el.classList.add("reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll(".reveal-hidden");
          children.forEach((child, index) => {
            (child as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
            requestAnimationFrame(() => {
              child.classList.remove("reveal-hidden");
              child.classList.add("reveal-visible");
            });
          });
          observer.unobserve(container);
          onReveal?.();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, onReveal]);

  return ref;
}
