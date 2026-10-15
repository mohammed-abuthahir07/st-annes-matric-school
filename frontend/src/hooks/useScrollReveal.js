import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver on elements with .reveal, .reveal-fade, etc.
 * Supports dynamically added nodes via MutationObserver and respects reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Respect user's reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, unobserve to avoid repeated triggers
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const elements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    // MutationObserver to catch dynamically rendered elements (e.g. gallery filter tabs)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('.reveal, .reveal-fade, .reveal-left, .reveal-right')) {
              observer.observe(node);
            }
            if (node.querySelectorAll) {
              node.querySelectorAll('.reveal, .reveal-fade, .reveal-left, .reveal-right').forEach((el) => {
                observer.observe(el);
              });
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollReveal;
