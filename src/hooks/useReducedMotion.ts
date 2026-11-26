import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialReducedMotion,
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQueryList.matches);
    };

    updatePreference();
    mediaQueryList.addEventListener("change", updatePreference);

    return () => {
      mediaQueryList.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}