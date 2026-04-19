import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── Data ─────────────────────────────────────────── */
const SOCIALS = [
  {
    label: "Instagram",
    num: "01",
    href: "https://www.instagram.com/prachurja_das_/",
  },
  {
    label: "LinkedIn",
    num: "02",
    href: "https://www.linkedin.com/in/prachurja-das-7136173aa/",
  },
  {
    label: "GitHub",
    num: "03",
    href: "https://github.com/dasprachurja-blip",
  },
  {
    label: "WhatsApp",
    num: "04",
    href: "https://wa.me/8801768002784",
  },
];

const NAV = [
  { label: "Home", path: "#home" },
  { label: "Services", path: "#services" },
  { label: "Showcase", path: "#work" },
  { label: "Contact", path: "#contact" }
];

/* ─── Noise SVG (built as a string to avoid template-literal parse issues) */
const NOISE_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<filter id="n">' +
      '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="4" stitchTiles="stitch"/>' +
      "</filter>" +
      '<rect width="100%" height="100%" filter="url(#n)"/>' +
      "</svg>"
  );

/* ─── Live clock ────────────────────────────────────── */
function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return (
        String(h).padStart(2, "0") +
        ":" +
        String(m).padStart(2, "0") +
        " " +
        ampm
      );
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── Component ─────────────────────────────────────── */
export default function Footer() {
  const localTime = useLocalTime();

  const footerRef  = useRef(null);
  const marqueeRef = useRef(null);
  const gridRef    = useRef(null);
  const dividerRef = useRef(null);
  const legalRef   = useRef(null);
  const socialRefs = useRef([]);
  const navRefs    = useRef([]);

  /* ── GSAP ───────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 2 · Grid slide up */
      if (gridRef.current) {
        gsap.from([...gridRef.current.children], {
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          y: 55,
          opacity: 0,
          stagger: 0.18,
          duration: 1,
          ease: "power3.out",
        });
      }

      /* 3 · Divider draws in */
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scrollTrigger: { trigger: dividerRef.current, start: "top 96%" },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.6,
          ease: "power4.out",
        });
      }

      /* 4 · Legal fade */
      if (legalRef.current) {
        gsap.from(legalRef.current, {
          scrollTrigger: { trigger: legalRef.current, start: "top 99%" },
          opacity: 0,
          y: 18,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      /* 5 · Marquee parallax scrub */
      if (marqueeRef.current && footerRef.current) {
        gsap.to(marqueeRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1.8,
          },
          x: -140,
          ease: "none",
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ── Magnetic socials ───────────────────────────────── */
  const onMagneticMove = (e, i) => {
    const el = socialRefs.current[i];
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
  };

  const onMagneticLeave = (i) => {
    gsap.to(socialRefs.current[i], {
      x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.45)",
    });
  };

  /* ── Nav spring & Scroll ────────────────────────────── */
  const onNavEnter = (i) =>
    gsap.to(navRefs.current[i], { x: 16, duration: 0.3, ease: "power2.out" });
  const onNavLeave = (i) =>
    gsap.to(navRefs.current[i], { x: 0, duration: 0.55, ease: "elastic.out(1,0.5)" });

  const handleNavClick = (e, path) => {
    e.preventDefault();
    const id = path.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, { scrollTo: { y: el }, duration: 1.2, ease: "expo.inOut" });
    }
  };

  /* ── Scroll to top ──────────────────────────────────── */
  const scrollTop = () =>
    gsap.to(window, { scrollTo: 0, duration: 1.2, ease: "power3.inOut" });

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;900&display=swap');

        .f-root { font-family: 'Inter', sans-serif; }

        @keyframes f-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes f-pulse {
          0%, 100% { opacity:1; box-shadow: 0 0 0 0 rgba(57,255,20,.45); }
          50%       { opacity:.7; box-shadow: 0 0 0 6px rgba(57,255,20,0); }
        }

        .f-marquee-inner {
          display: inline-flex;
          white-space: nowrap;
          animation: f-marquee 20s linear infinite;
        }
        .f-marquee-inner:hover { animation-play-state: paused; }

        .f-marquee-word {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.04);
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          padding-right: 60px;
          cursor: default;
          user-select: none;
          transition: -webkit-text-stroke .4s, text-shadow .4s, color .4s;
        }
        .f-marquee-word:hover {
          color: transparent;
          -webkit-text-stroke: 2px #39ff14;
          text-shadow: 0 0 60px rgba(57,255,20,.28);
        }

        .f-nav-link {
          font-size: 26px;
          font-weight: 300;
          color: rgba(255,255,255,.55);
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: color .3s, border-color .3s;
        }
        .f-nav-link:hover { color: #fff; border-bottom-color: rgba(57,255,20,.28); }

        .f-social {
          font-size: 26px;
          font-weight: 300;
          color: rgba(255,255,255,.55);
          text-decoration: none;
          padding: 9px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,.05);
          transition: color .3s, padding-left .3s;
          will-change: transform;
        }
        .f-social:hover { color: #39ff14; padding-left: 8px; }
        .f-social-num {
          font-size: 11px;
          font-family: monospace;
          color: rgba(255,255,255,.18);
          transition: color .3s;
        }
        .f-social:hover .f-social-num { color: rgba(57,255,20,.5); }

        .f-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9999px;
          padding: 14px 26px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,.6);
          text-decoration: none;
          transition: border-color .35s, color .35s, box-shadow .35s;
        }
        .f-pill:hover {
          border-color: #39ff14;
          color: #39ff14;
          box-shadow: 0 0 24px rgba(57,255,20,.18), inset 0 0 18px rgba(57,255,20,.05);
        }
        .f-pill-arrow { transition: transform .3s; display: inline-block; }
        .f-pill:hover .f-pill-arrow { transform: translate(3px,-3px); }

        .f-backtop {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(255,255,255,.8);
          padding: 0;
          transition: color .3s;
        }
        .f-backtop:hover { color: #39ff14; }

        @media (max-width: 767px) {
          .f-grid  { grid-template-columns: 1fr !important; }
          .f-legal { flex-direction: column !important; gap: 12px; text-align: center; }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="f-root relative w-full min-h-screen bg-[#050505] text-[#f2f2f2] flex flex-col justify-between overflow-hidden"
      >
        {/* Grain overlay — uses JS-built string, no template literal encoding */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 opacity-[.04] mix-blend-overlay"
          style={{ backgroundImage: "url('" + NOISE_SVG + "')", backgroundSize: "200px" }}
        />

        {/* Radial neon glow */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none z-0 rounded-full"
          style={{
            width: 720,
            height: 720,
            background: "radial-gradient(circle, rgba(57,255,20,.07) 0%, transparent 70%)",
            bottom: -170,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* ══════════════════════════════
            LEVEL 1 – Scrolling marquee
        ══════════════════════════════ */}
        <div className="relative z-10 pt-16 pb-5 w-full overflow-hidden border-b border-white/[.05]">
          <div ref={marqueeRef} className="f-marquee-inner">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="f-marquee-word"
              >
                {"LET'S BUILD SOMETHING EPIC "}
                <span style={{ color: "#39ff14", WebkitTextStroke: 0 }}>{"✦"}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            LEVEL 2 – Three-column grid
        ══════════════════════════════ */}
        <div
          ref={gridRef}
          className="f-grid relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-20 flex-grow items-center py-16"
        >

          {/* Left · Brand */}
          <div className="flex flex-col space-y-5">

            {/* Available badge */}
            <span
              className="inline-flex items-center gap-2 w-fit rounded-full px-4 py-1.5"
              style={{ border: "1px solid rgba(57,255,20,.22)", background: "rgba(57,255,20,.06)" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#39ff14", animation: "f-pulse 2s infinite" }}
              />
              <span className="text-[11px] tracking-wider font-medium" style={{ color: "rgba(57,255,20,.82)" }}>
                Available for work
              </span>
            </span>

            <h2 className="text-4xl font-black tracking-tight text-white">Portfolio</h2>

            <p
              className="text-sm leading-relaxed max-w-[260px] font-light"
              style={{ color: "rgba(255,255,255,.38)" }}
            >
              Crafting cinematic digital experiences and high-fidelity interfaces from the dark void.
            </p>

            <a href="mailto:dasprachurja@gmail.com" className="f-pill mt-2">
              <span>dasprachurja@gmail.com</span>
              <span className="f-pill-arrow">{"↗"}</span>
            </a>
          </div>

          {/* Middle · Sitemap */}
          <div className="flex flex-col">
            <span
              className="text-[10px] uppercase tracking-[.3em] mb-5 font-medium"
              style={{ color: "rgba(255,255,255,.25)" }}
            >
              Sitemap
            </span>
            <nav className="flex flex-col">
              {NAV.map(({ label, path }, i) => (
                <a
                  key={label}
                  href={path}
                  onClick={(e) => handleNavClick(e, path)}
                  ref={(el) => { navRefs.current[i] = el; }}
                  className="f-nav-link"
                  onMouseEnter={() => onNavEnter(i)}
                  onMouseLeave={() => onNavLeave(i)}
                >
                  <span
                    className="mr-2 text-lg"
                    style={{ color: "#39ff14", opacity: 0, marginLeft: "-20px" }}
                  >
                    {"↗"}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right · Socials */}
          <div className="flex flex-col">
            <span
              className="text-[10px] uppercase tracking-[.3em] mb-5 font-medium"
              style={{ color: "rgba(255,255,255,.25)" }}
            >
              Socials
            </span>
            <div className="flex flex-col">
              {SOCIALS.map(({ label, num, href }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => { socialRefs.current[i] = el; }}
                  className="f-social"
                  onMouseMove={(e) => onMagneticMove(e, i)}
                  onMouseLeave={() => onMagneticLeave(i)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#39ff14";
                    e.currentTarget.style.paddingLeft = "8px";
                  }}
                >
                  <span>{label}</span>
                  <span className="f-social-num">{num}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            LEVEL 3 – Legal strip
        ══════════════════════════════ */}
        <div className="relative z-10 mx-8 md:mx-20">
          <div
            ref={dividerRef}
            className="h-px w-full"
            style={{ background: "rgba(255,255,255,.07)" }}
          />
          <div
            ref={legalRef}
            className="f-legal flex flex-col md:flex-row justify-between items-center py-6 gap-3"
            style={{
              fontSize: "11px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.25)",
            }}
          >
            <p>{"© 2026 Portfolio. All rights reserved."}</p>
            <p>
              {"Local Time "}
              <span className="ml-2 font-mono text-[12px]" style={{ color: "#39ff14" }}>
                {localTime}
              </span>
            </p>
            <button className="f-backtop" onClick={scrollTop}>
              {"[ Scroll to Top ↑ ]"}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
