"use client";

import { useEffect } from "react";

/**
 * Client component that sets up IntersectionObserver for scroll-reveal animations.
 * Must be rendered inside the page to observe sections and .reveal elements.
 */
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            // Find child elements to reveal with stagger
            const children = entry.target.querySelectorAll(
              ".reveal:not(.reveal-visible)",
            );
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("reveal-visible");
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    // Observe sections and reveal elements
    const sections = document.querySelectorAll("section");
    const revealElements = document.querySelectorAll(".reveal");

    sections.forEach((section) => observer.observe(section));
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return null;
}
