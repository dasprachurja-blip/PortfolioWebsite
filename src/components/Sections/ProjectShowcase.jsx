import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Theme tokens (matching marinLABS bright) ─────────────────────
const LIGHT = "#EEF3F8";

// ── Project data ─────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    title: "NeuralCart",
    subtitle: "AI-Powered E-Commerce Platform",
    desc: "A full-stack e-commerce experience powered by real-time recommendation AI, dynamic pricing engine, and a blazing-fast checkout flow.",
    tags: ["Next.js", "Python", "TensorFlow", "Stripe"],
    stats: [
      { label: "Conversion lift", value: "+34%" },
      { label: "Avg. load time", value: "0.8s" },
      { label: "Users served", value: "12K+" },
    ],
    accent: "#FF5C28",
    bg: "#0e0e0e",
  },
  {
    id: "02",
    title: "Sketchboard",
    subtitle: "Real-Time Collaborative Canvas",
    desc: "Figma-meets-Miro. A collaborative whiteboard built with WebSockets, CRDT conflict resolution and GPU-accelerated canvas rendering.",
    tags: ["React", "WebSockets", "Node.js", "Canvas API"],
    stats: [
      { label: "Concurrent users", value: "500+" },
      { label: "Latency", value: "<20ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    accent: "#3BC4A2",
    bg: "#080f0e",
  },
  {
    id: "03",
    title: "Vaultex",
    subtitle: "Decentralised Finance Dashboard",
    desc: "Cross-chain DeFi portfolio tracker with live on-chain analytics, gas fee alerts, and one-click yield optimisation routing.",
    tags: ["React", "Ethers.js", "TheGraph", "Tailwind"],
    stats: [
      { label: "Chains tracked", value: "8" },
      { label: "TVL monitored", value: "$2.1M" },
      { label: "Txns indexed", value: "1M+" },
    ],
    accent: "#7C6FFF",
    bg: "#09090f",
  },
  {
    id: "04",
    title: "Lumina CMS",
    subtitle: "Headless Content Management System",
    desc: "A developer-first headless CMS with a visual block editor, instant GraphQL API generation, and multi-tenant workspace support.",
    tags: ["TypeScript", "GraphQL", "PostgreSQL", "Docker"],
    stats: [
      { label: "API latency", value: "12ms" },
      { label: "Content types", value: "Unlimited" },
      { label: "Deploy targets", value: "6" },
    ],
    accent: "#F5C518",
    bg: "#0d0c08",
  },
];

// ── Tag pill ──────────────────────────────────────────────────────
function Tag({ label, accent }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.05em",
        padding: "4px 12px",
        borderRadius: 999,
        border: `1px solid ${accent}44`,
        color: accent,
        background: `${accent}14`,
      }}
    >
      {label}
    </span>
  );
}

// ── Stat block ────────────────────────────────────────────────────
function Stat({ label, value, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontSize: 22,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          color: accent,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 11,
          fontFamily: "'DM Sans', sans-serif",
          color: "#666",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────
function ProjectCard({ project, cardRef }) {
  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          background: project.bg,
          borderRadius: 24,
          border: `1px solid ${project.accent}22`,
          overflow: "hidden",
          minHeight: 420,
          boxShadow: `0 0 60px ${project.accent}18, 0 40px 80px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Responsive grid via CSS class */}
        <div className="project-card-grid">
          {/* LEFT — visual placeholder */}
          <div
            style={{
              position: "relative",
              background: `linear-gradient(135deg, ${project.accent}18 0%, #000 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              minHeight: 240,
            }}
          >
            {/* Grid lines decoration */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={project.accent} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
            </svg>

            {/* Accent circle glow */}
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${project.accent}30 0%, transparent 70%)`,
                position: "absolute",
              }}
            />

            {/* Big project number */}
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(72px, 10vw, 120px)",
                fontWeight: 800,
                color: `${project.accent}22`,
                lineHeight: 1,
                userSelect: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              {project.id}
            </span>

            {/* Corner label */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                color: project.accent,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Project {project.id}
            </div>
          </div>

          {/* RIGHT — copy */}
          <div className="project-card-copy">
            {/* Subtitle */}
            <span
              style={{
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: project.accent,
                opacity: 0.85,
              }}
            >
              {project.subtitle}
            </span>

            {/* Title */}
            <h2
              className="project-card-title"
              style={{
                margin: 0,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.75,
                color: "#888",
                fontWeight: 300,
              }}
            >
              {project.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tags.map((t) => (
                <Tag key={t} label={t} accent={project.accent} />
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(to right, ${project.accent}44, transparent)`,
              }}
            />

            {/* Stats row */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {project.stats.map((s) => (
                <Stat key={s.label} {...s} accent={project.accent} />
              ))}
            </div>

            {/* CTA */}
            <div>
              <button
                style={{
                  background: "transparent",
                  border: `1px solid ${project.accent}66`,
                  color: project.accent,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: "12px 28px",
                  borderRadius: 10,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${project.accent}22`;
                  e.currentTarget.style.borderColor = project.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = `${project.accent}66`;
                }}
              >
                View Project →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const stickyRef    = useRef(null);
  const progressRef  = useRef(null);
  const counterRef   = useRef(null);
  const cardRefs     = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalCards   = PROJECTS.length;
      const scrollHeight = window.innerHeight * (totalCards + 0.5);

      // Set tall scroll container height
      containerRef.current.style.height = `${scrollHeight}px`;

      // ── Show / hide fixed HUD elements ──
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom top",
        onEnter:     () => gsap.to([progressRef.current, counterRef.current], { autoAlpha: 1, duration: 0.3 }),
        onLeave:     () => gsap.to([progressRef.current, counterRef.current], { autoAlpha: 0, duration: 0.3 }),
        onEnterBack: () => gsap.to([progressRef.current, counterRef.current], { autoAlpha: 1, duration: 0.3 }),
        onLeaveBack: () => gsap.to([progressRef.current, counterRef.current], { autoAlpha: 0, duration: 0.3 }),
      });

      // ── Progress bar scrub ──
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // ── Card transitions ──
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLast = i === totalCards - 1;

        // Animate IN
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.93, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${(i / totalCards) * 100}% top`,
              end: `${(i / totalCards) * 100 + 2}% top`,
              scrub: 0.6,
            },
          }
        );

        // Animate OUT — except last card
        if (!isLast) {
          gsap.fromTo(
            card,
            { opacity: 1, y: 0, scale: 1 },
            {
              opacity: 0,
              y: -60,
              scale: 0.94,
              pointerEvents: "none",
              ease: "power2.in",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${((i + 0.72) / totalCards) * 100}% top`,
                end: `${((i + 1) / totalCards) * 100}% top`,
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* ── Fixed progress bar ── */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #3BC4A2, #2E7BB5)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          zIndex: 200,
          pointerEvents: "none",
          visibility: "hidden",
          opacity: 0,
        }}
      />

      {/* ── Fixed card counter ── */}
      <div
        ref={counterRef}
        style={{
          position: "fixed",
          top: 28,
          right: 32,
          zIndex: 200,
          fontFamily: "'Syne', sans-serif",
          fontSize: 12,
          color: "#888",
          letterSpacing: "0.1em",
          pointerEvents: "none",
          visibility: "hidden",
          opacity: 0,
        }}
      >
        {PROJECTS.length} PROJECTS
      </div>

      {/* ── Sticky viewport frame ── */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: `linear-gradient(135deg, ${LIGHT} 0%, #dceaf5 100%)`,
          overflow: "hidden",
        }}
      >
        {/* Ambient blurs */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-15%", right: "-10%",
            width: "45vw", height: "45vw", maxWidth: 550, maxHeight: 550,
            borderRadius: "50%", filter: "blur(120px)",
            background: "rgba(46, 123, 181, 0.06)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", left: "-8%",
            width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
            borderRadius: "50%", filter: "blur(120px)",
            background: "rgba(59, 196, 162, 0.06)",
          }} />
        </div>

        {/* Project cards — stacked absolutely */}
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            cardRef={(el) => (cardRefs.current[i] = el)}
          />
        ))}
      </div>
    </div>
  );
}
