import { useState } from "react";
import { createPortal } from "react-dom";
import { profile, type SocialPlatform } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { getStaggerDelay } from "../../lib/motion";

function resolvePublicPath(path?: string): string {
  if (!path) return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "github":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.27-1.22-1.6-1.22-1.6-1-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.48-2.42-.27-4.96-1.21-4.96-5.39 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.38.11-2.88 0 0 .92-.29 3 1.12a10.4 10.4 0 015.46 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.6.11 2.88.7.76 1.12 1.73 1.12 2.92 0 4.19-2.55 5.12-4.98 5.39.39.34.74 1.01.74 2.03v3.01c0 .29.18.63.74.52A11 11 0 0012 1.27z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.2 8.2 0 004.76 1.52V6.76a4.85 4.85 0 01-1-.07z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
    case "spotify":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm4.8 15.1a.65.65 0 01-.9.22c-2.46-1.5-5.56-1.84-9.22-1a.65.65 0 01-.29-1.27c4-.92 7.43-.52 10.19 1.16.31.19.41.6.22.87zm1.28-2.85a.82.82 0 01-1.12.27c-2.82-1.73-7.12-2.23-10.46-1.22a.82.82 0 01-.48-1.57c3.81-1.16 8.55-.6 11.79 1.4.38.23.5.73.27 1.12zm.11-2.97c-3.38-2.01-8.96-2.19-12.2-1.21a.98.98 0 01-.57-1.88c3.72-1.13 9.88-.91 13.78 1.4a.98.98 0 01-1.01 1.69z" />
        </svg>
      );
    case "email":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      );
    case "discord":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.73 4.87a18.2 18.2 0 00-4.49-1.4.1.1 0 00-.1.05c-.2.35-.41.8-.56 1.16a16.8 16.8 0 00-5.16 0c-.15-.37-.37-.81-.57-1.16a.1.1 0 00-.1-.05 18.14 18.14 0 00-4.49 1.4.1.1 0 00-.04.04C1.27 9.16.49 13.34.87 17.47a.1.1 0 00.04.07 18.3 18.3 0 005.51 2.79.1.1 0 00.11-.03c.42-.58.8-1.19 1.12-1.83a.1.1 0 00-.05-.14 12.04 12.04 0 01-1.72-.82.1.1 0 01-.01-.17c.12-.09.23-.18.34-.27a.1.1 0 01.1-.01c3.62 1.65 7.54 1.65 11.12 0a.1.1 0 01.1.01c.11.09.23.18.34.27a.1.1 0 01-.01.17c-.55.32-1.12.6-1.72.82a.1.1 0 00-.05.14c.33.64.7 1.25 1.12 1.83a.1.1 0 00.11.03 18.24 18.24 0 005.52-2.79.1.1 0 00.04-.07c.46-4.78-.77-8.92-3.26-12.56a.08.08 0 00-.04-.04zM8.68 14.94c-1.09 0-1.99-1-1.99-2.23s.88-2.23 1.99-2.23c1.12 0 2.01 1.01 1.99 2.23 0 1.23-.88 2.23-1.99 2.23zm6.64 0c-1.09 0-1.99-1-1.99-2.23s.88-2.23 1.99-2.23c1.12 0 2.01 1.01 1.99 2.23 0 1.23-.87 2.23-1.99 2.23z" />
        </svg>
      );
    case "website":
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
}

const RESTRICTED_MESSAGE = "F12 if u wanna see it without Blur.";

function HoverBlurMessageOverlay({ active }: { active: boolean }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-hidden={!active}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: active ? "rgba(6, 15, 36, 0.34)" : "rgba(6, 15, 36, 0)",
        backdropFilter: active ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: active ? "blur(12px)" : "blur(0px)",
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        transition:
          "backdrop-filter 0.35s ease, background 0.35s ease, opacity 0.3s ease, visibility 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          padding: "22px 30px",
          borderRadius: "20px",
          background: "rgba(12, 26, 56, 0.44)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(125, 211, 252, 0.22)",
          boxShadow:
            "0 20px 50px rgba(2, 8, 23, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          textAlign: "center",
          transform: active ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
          transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "clamp(1.05rem, 2.4vw, 1.45rem)",
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: active ? "-0.01em" : "0.035em",
            color: "rgba(248, 250, 252, 0.96)",
            filter: active ? "blur(0px)" : "blur(5px)",
            transition:
              "letter-spacing 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease",
          }}
        >
          {RESTRICTED_MESSAGE}
        </p>
      </div>
    </div>,
    document.body
  );
}

export function Hero() {
  const { identity, status, currentFocus, socials } = profile;
  const [avatarError, setAvatarError] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const avatarSrc = resolvePublicPath(identity.avatar);

  return (
    <section id="top" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <Reveal delayMs={0}>
              <div className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                <span>{status}</span>
              </div>
            </Reveal>

            <Reveal delayMs={getStaggerDelay(1)}>
              <p className="hero-role">{identity.role}</p>
            </Reveal>

            <Reveal delayMs={getStaggerDelay(2)}>
              <h1 className="hero-title">{identity.fullName}</h1>
            </Reveal>

            <Reveal delayMs={getStaggerDelay(3)}>
              <p className="hero-tagline">{identity.tagline}</p>
              <p className="hero-value">{currentFocus}</p>
            </Reveal>

            <Reveal delayMs={getStaggerDelay(4)}>
              <div className="hero-actions">
                <a href="#interests" className="btn-primary">
                  Outside Coding
                </a>
                <a href="#about" className="btn-secondary">
                  More Info
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={getStaggerDelay(5)}>
              <div className="social-row" aria-label="Social media accounts">
                {socials.map((social) => {
                  const isMailto = social.url.startsWith("mailto:");
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target={isMailto ? undefined : "_blank"}
                      rel={isMailto ? undefined : "noopener noreferrer"}
                      className="social-chip"
                    >
                      <SocialIcon platform={social.platform} />
                      <span>{social.label}</span>
                      {social.handle && (
                        <span className="social-handle">{social.handle}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delayMs={getStaggerDelay(2)} className="hero-portrait-wrap">
            <div
              className="avatar-card"
              style={{
                overflow: "hidden",
                cursor: isAvatarHovered ? "not-allowed" : "default",
                userSelect: "none",
              }}
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              {!avatarError && avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={`Profile photo of ${identity.fullName}`}
                  className="avatar-image"
                  draggable={false}
                  style={{
                    filter: "blur(8px)",
                    transform: isAvatarHovered ? "scale(1.09)" : "scale(1.03)",
                    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    pointerEvents: "none",
                  }}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    background: "var(--bg-subtle)",
                    color: "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  <span>{identity.nickname}</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <HoverBlurMessageOverlay active={isAvatarHovered} />
    </section>
  );
}
