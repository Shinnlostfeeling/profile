import { useEffect, useState } from "react";
import { profile } from "../data/profile";

type ThemeMode = "light" | "dark";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#experiments" },
  { label: "Outside Coding", href: "#interests" },
  { label: "Highlights", href: "#highlights" },
] as const;

const THEME_STORAGE_KEY = "biel-profile-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function Navbar() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    const timeout = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [theme]);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const nextProgress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(nextProgress);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#top" className="brand-link">
          <span className="brand-dot" aria-hidden="true" />
          <span>{profile.identity.nickname}</span>
        </a>

        <div className="nav-right">
          <nav className="nav-menu" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-item">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <span key={theme} className="theme-icon-spin">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <div className="scroll-progress-track" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
