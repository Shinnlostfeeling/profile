import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let visible = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible && glowRef.current) {
        glowRef.current.style.opacity = "1";
        visible = true;
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
        visible = false;
      }
    };

    const animate = () => {
      
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 240}px, ${currentY - 240}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "480px",
        height: "480px",
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0,
        transition: "opacity 0.35s ease",
        background:
          "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(59, 130, 246, 0.06) 42%, rgba(59, 130, 246, 0) 72%)",
        filter: "blur(12px)",
        willChange: "transform",
      }}
    />
  );
}
