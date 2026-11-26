import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  getDirectionOffset,
  MOTION_CONFIG,
  type RevealDirection,
} from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delayMs?: number;
  durationMs?: number;
  distancePx?: number;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  direction = "up",
  delayMs = 0,
  durationMs = MOTION_CONFIG.baseMs,
  distancePx = MOTION_CONFIG.defaultDistancePx,
  threshold = MOTION_CONFIG.observerThreshold,
  once = true,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: MOTION_CONFIG.observerRootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, prefersReducedMotion, threshold]);

  const offset = getDirectionOffset(direction, distancePx);

  const style: CSSProperties = prefersReducedMotion
    ? {
        opacity: 1,
        transform: "none",
      }
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: MOTION_CONFIG.easing,
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      };

  return (
    <div
      ref={containerRef}
      className={`reveal-block ${isVisible ? "is-revealed" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}