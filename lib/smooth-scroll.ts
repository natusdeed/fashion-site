"use client";

/**
 * Smooth scroll utility for anchor links
 * Provides enhanced smooth scrolling behavior
 */
export function smoothScrollTo(elementId: string, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Initialize smooth scroll for all anchor links
 */
export function initSmoothScroll() {
  if (typeof window === "undefined") return;

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        const targetId = href.substring(1);
        smoothScrollTo(targetId);
      }
    });
  });
}
