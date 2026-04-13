import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * NeonText — reusable neon-pulse character animation
 *
 * Props:
 *   text       string   — the text to animate
 *   replay     any      — change this value to re-trigger 
 *   finalColor string   — the color each character settles on after animation
 *   className  string   — extra class names
 *   style      object   — inline styles
 */
export default function NeonText({ text = "Your text here", replay, className = "", style = {}, finalColor = "var(--color-brand-teal)" }) {
  const textRef = useRef(null);

  // useLayoutEffect runs synchronously before browser paint — no flash
  useLayoutEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;

    // Split into .neon-char spans (synchronously, before paint)
    el.innerHTML = "";
    const chars = text.split("").map((ch) => {
      const span = document.createElement("span");
      span.className = "neon-char";
      span.textContent = ch;
      el.appendChild(span);
      return span;
    });

    // All chars start invisible
    gsap.set(chars, { opacity: 0 });

    // Use rAF so the animation begins on the very next frame — no jank
    const raf = requestAnimationFrame(() => {
      chars.forEach((ch, i) => {
        const delay = i * 0.048;
        gsap
          .timeline({ delay })
          .set(ch, { opacity: 1 })
          .to(ch, {
            duration: 0,
            color: "#ffffff",
            textShadow:
              "0 0 8px #7C5CFF, 0 0 22px #7C5CFF, 0 0 50px #7C5CFF",
          })
          .to(ch, {
            duration: 0.25,
            color: "#e0fff4",
            textShadow: "0 0 5px #2EE6A6, 0 0 16px #2EE6A6",
            ease: "power2.out",
          })
          .to(ch, {
            duration: 0.35,
            color: finalColor,
            textShadow: "none",
            ease: "power2.in",
          });
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [text, replay, finalColor]);

  return <div ref={textRef} className={`neon-text ${className}`} style={style} />;
}

