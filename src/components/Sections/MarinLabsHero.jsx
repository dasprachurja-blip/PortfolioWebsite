import { useEffect, useRef } from "react";
import gsap from "gsap";
import marinLabLogo from "../../assets/marinlab-logo.jpg";

// ─── Brand tokens (bright theme) ─────────────────────────────────
const NAVY    = "#0D1B4B";
const BLUE    = "#2E7BB5";
const TEAL    = "#3BC4A2";
const LIGHT   = "#EEF3F8";
const DIM     = "#4a6078";
const TEXT    = "#334155";

// ─── Social data ─────────────────────────────────────────────────
const socials = [
  {
    label: "Facebook",
    handle: "@marinLABS",
    color: BLUE,
    bg: "#EBF4FC",
    border: "rgba(46, 123, 181, 0.3)",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill={BLUE}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@marinLABS",
    color: TEAL,
    bg: "rgba(100, 220, 180, 0.08)",
    border: "rgba(100, 220, 180, 0.25)",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill={TEAL} stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    handle: "@marinLABS",
    color: NAVY,
    bg: "#EDF0F6",
    border: "rgba(13, 27, 75, 0.2)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill={NAVY}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.836L1.254 2.25H8.08l4.253 5.622L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
];

// ─── Check item ───────────────────────────────────────────────────
function CheckItem({ text, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.55, delay, ease: "power3.out" }
    );
  }, [delay]);

  return (
    <div ref={ref} className="flex items-center justify-center gap-2.5" style={{ opacity: 0 }}>
      <div className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
        style={{ background: "#E1F5EE", border: "1px solid rgba(59, 196, 162, 0.3)" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="#0F6E56" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-sm" style={{ color: DIM }}>{text}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function MarinLabsHero() {
  const sectionRef = useRef(null);
  const wrapRef    = useRef(null);
  const badgeRef   = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const urgRef     = useRef(null);
  const divRef     = useRef(null);
  const socialRef  = useRef(null);
  const photoRef   = useRef(null);
  const dmRef      = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Card entrance
    tl.fromTo(wrapRef.current,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
    // Photo
    .fromTo(photoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6 }, "-=0.4"
    )
    // Badge
    .fromTo(badgeRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.45 }, "-=0.3"
    )
    // Headline
    .fromTo(headRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55 }, "-=0.2"
    )
    // Subline
    .fromTo(subRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45 }, "-=0.1"
    )
    // Urgency
    .fromTo(urgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }, "+=0.05"
    )
    // Divider
    .fromTo(divRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, transformOrigin: "left" }, "-=0.1"
    )
    // Social row
    .fromTo(socialRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 }, "-=0.2"
    )
    // DM line
    .fromTo(dmRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }, "-=0.1"
    );
  }, []);

  // Hover tilt on photo
  const handlePhotoMove = (e) => {
    const rect = photoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * 6;
    const ry = ((e.clientX - cx) / rect.width) * -6;
    gsap.to(photoRef.current, { rotateX: rx, rotateY: ry, duration: 0.4, ease: "power2.out" });
  };
  const handlePhotoLeave = () => {
    gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.6)" });
  };

  // Social pill hover
  const onSocialEnter = (e) => {
    gsap.to(e.currentTarget, { y: -3, scale: 1.04, duration: 0.25, ease: "power2.out" });
  };
  const onSocialLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.35, ease: "elastic.out(1,0.5)" });
  };

  return (
    <section id="work" ref={sectionRef} className="sticky top-0 z-0 min-h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden rounded-3xl"
      style={{ background: `linear-gradient(135deg, ${LIGHT} 0%, #dceaf5 100%)` }}>

      {/* Background ambient blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[120px]"
          style={{ background: "rgba(46, 123, 181, 0.08)" }} />
        <div className="absolute bottom-[-10%] left-[-8%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(59, 196, 162, 0.08)" }} />
      </div>

      <div ref={wrapRef}
        className="relative z-10 w-full max-w-[1600px] rounded-3xl p-10 md:p-14 lg:p-16"
        style={{
          opacity: 0,
          background: "#ffffff",
          border: "1px solid #cddaeb",
          boxShadow: "0 8px 60px -12px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04)"
        }}>

        {/* ── Badge ── */}
        <div className="flex justify-center mb-8">
          <div ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2"
            style={{
              opacity: 0,
              background: "#E8F1F8",
              border: `1px solid ${BLUE}`,
            }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke={TEAL} strokeWidth="1.2" />
              <path d="M3.5 6.5 L5.5 8.5 L8.5 4" stroke={TEAL} strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium tracking-wide" style={{ color: NAVY }}>
              Web Design & Development · marinLABS
            </span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-14 items-center mb-10">

          {/* Photo placeholder */}
          <div className="md:col-span-2 flex justify-center"
            style={{ perspective: "800px" }}>
            <div ref={photoRef}
              className="w-full max-w-sm rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300"
              style={{
                opacity: 0,
                background: "#f0f4f8",
                border: `1.5px solid ${BLUE}`,
                aspectRatio: "4/5",
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handlePhotoMove}
              onMouseLeave={handlePhotoLeave}>
              <img
                src={marinLabLogo}
                alt="marinLABS Logo"
                className="w-full h-full object-contain"
                style={{ padding: "16px" }}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-3 flex flex-col items-center text-center gap-5">

            {/* Headline */}
            <h2 ref={headRef}
              className="text-3xl md:text-4xl lg:text-5xl leading-snug"
              style={{ opacity: 0, fontWeight: 500, color: NAVY }}>
              Is your business{" "}
              <span style={{ color: BLUE }}>invisible</span>{" "}
              online?<br />Let's fix that. 🌐
            </h2>

            {/* Subline */}
            <p ref={subRef} className="text-base md:text-lg leading-relaxed" style={{ opacity: 0, color: DIM }}>
              At <strong style={{ color: NAVY, fontWeight: 500 }}>marinLABS</strong>, we build
              fast, beautiful websites for startups and small businesses — starting from just{" "}
              <strong style={{ color: NAVY, fontWeight: 500 }}>$100</strong>.
            </p>

            {/* Checks */}
            <div className="flex flex-col gap-2.5 w-full">
              <CheckItem text="No jargon — just results you can see"  delay={0.9} />
              <CheckItem text="Looks great on mobile & desktop"        delay={1.0} />
              <CheckItem text="Friendly team, fast delivery"           delay={1.1} />
            </div>

            {/* Urgency */}
            <p ref={urgRef} className="text-base italic" style={{ opacity: 0, color: DIM }}>
              Your customers are searching for you{" "}
              <strong style={{ color: NAVY, fontWeight: 500, fontStyle: "normal" }}>
                right now
              </strong>. Make sure they find you.
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div ref={divRef} className="w-full mb-8"
          style={{ height: "1px", background: "#d0dce8", scaleX: 0 }} />

        {/* ── Social section ── */}
        <div ref={socialRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
          <p className="text-xs font-medium tracking-widest uppercase"
            style={{ color: BLUE, letterSpacing: "0.12em" }}>
            Follow us for tips, offers & transformations
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  color: NAVY,
                  textDecoration: "none",
                }}
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}>
                {s.icon}
                <span style={{ color: DIM }}>{s.label}</span>
                <span style={{ color: s.color, fontWeight: 600 }}>{s.handle}</span>
              </a>
            ))}
          </div>

          <p ref={dmRef} className="text-sm" style={{ opacity: 0, color: "#64748b" }}>
            DM us to get started today 👋
          </p>
        </div>

      </div>
    </section>
  );
}
