import { useEffect, useRef, RefObject } from "react";

export function useSectionInView(
  onVisible?: () => void,
  threshold = 0.5
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [onVisible, threshold]);

  // TypeScript knows ref.current can be null, but the ref object itself is still usable
  return ref as RefObject<HTMLElement>;
}
