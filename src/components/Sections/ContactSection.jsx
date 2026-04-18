import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── SVG Icons ────────────────────────────────────────────────
const EmailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.19 5.06 4.47.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.05 2.04A9.96 9.96 0 0 0 2.09 12c0 1.76.46 3.45 1.33 4.94L2 22l5.25-1.38A9.96 9.96 0 1 0 12.05 2.04zm0 18.18a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 1 1 7 3.86z" />
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);

// ─── Social Button ─────────────────────────────────────────────
const SocialButton = ({ href, icon: Icon, label, colorClass, glowClass }) => {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.to(ref.current, { y: -3, duration: 0.25, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(ref.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer select-none ${colorClass} ${glowClass}`}
    >
      <Icon />
      {label}
    </a>
  );
};

// ─── Morphing Blob ─────────────────────────────────────────────
const Blob = ({ className, style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const radii = [
      "50% 60% 40% 70% / 50% 40% 60% 50%",
      "65% 35% 55% 45% / 35% 65% 45% 55%",
      "40% 70% 30% 60% / 70% 30% 60% 40%",
      "70% 30% 65% 35% / 30% 70% 35% 65%",
      "55% 45% 70% 30% / 45% 55% 30% 70%",
    ];
    let i = 0;
    const tl = gsap.timeline({ repeat: -1 });
    radii.forEach((r) => {
      tl.to(ref.current, { borderRadius: r, duration: 4, ease: "sine.inOut" });
    });
    return () => tl.kill();
  }, []);

  return <div ref={ref} className={className} style={style} />;
};

// ─── Floating Orb ─────────────────────────────────────────────
const Orb = ({ style, size }) => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      x: gsap.utils.random(-20, 20),
      y: gsap.utils.random(-25, 25),
      duration: gsap.utils.random(5, 10),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 35% 35%, rgba(59,196,162,0.95), rgba(20,100,80,0.6))",
        boxShadow:
          "0 0 16px rgba(59,196,162,0.6), 0 0 32px rgba(59,196,162,0.2)",
        position: "absolute",
        ...style,
      }}
    />
  );
};

// ─── Input Field ───────────────────────────────────────────────
const Field = ({ label, type = "text", placeholder, textarea }) => {
  const lineRef = useRef(null);
  const labelRef = useRef(null);

  const onFocus = () => {
    gsap.to(lineRef.current, { width: "100%", duration: 0.35, ease: "power2.out" });
    gsap.to(labelRef.current, { color: "#3BC4A2", duration: 0.3 });
  };
  const onBlur = () => {
    gsap.to(lineRef.current, { width: "0%", duration: 0.3, ease: "power2.in" });
    gsap.to(labelRef.current, { color: "rgba(232,234,236,0.32)", duration: 0.3 });
  };

  const sharedProps = {
    onFocus,
    onBlur,
    placeholder,
    className:
      "w-full bg-transparent border-0 border-b border-white/10 pb-2 pt-1 text-[0.88rem] font-light text-white/80 outline-none placeholder:text-white/20 font-['DM_Sans']",
  };

  return (
    <div className="relative mb-5">
      <label
        ref={labelRef}
        className="block text-[0.65rem] font-semibold tracking-[0.14em] uppercase mb-2"
        style={{ color: "rgba(232,234,236,0.32)" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea rows={3} {...sharedProps} style={{ resize: "none" }} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: 0,
          background: "#3BC4A2",
          boxShadow: "0 0 8px rgba(59,196,162,0.7)",
        }}
      />
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────
export default function ContactSection() {
  const sceneRef = useRef(null);
  const leftRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);
  const [sent, setSent] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // staggered left column
      gsap.from(leftRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
      // card fade up
      gsap.from(cardRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.5,
      });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  // Send button hover
  const handleBtnEnter = () => {
    if (sent) return;
    gsap.to(btnRef.current, { y: -3, scale: 1.02, duration: 0.2, ease: "power2.out" });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { y: 0, scale: 1, duration: 0.2, ease: "power2.out" });
  };
  const handleSend = () => {
    if (sent) return;
    gsap.timeline()
      .to(btnRef.current, { scale: 0.95, duration: 0.1 })
      .to(btnRef.current, { scale: 1, duration: 0.2 });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <div
        id="contact"
        className="min-h-screen flex items-center justify-center overflow-hidden p-6 md:p-12"
        style={{ background: "#0d0f10", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          ref={sceneRef}
          className="relative w-full max-w-[1600px] min-h-[80vh] rounded-3xl border overflow-hidden grid lg:grid-cols-2 gap-12 lg:gap-24 items-center px-8 md:px-16 lg:px-24 py-16 lg:py-20"
          style={{
            borderColor: "rgba(255,255,255,0.09)",
          }}
        >
          {/* ── BACKGROUND ELEMENTS ── */}
          {/* Radial left glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(59,196,162,0.04) 0%, transparent 70%)",
            }}
          />

          {/* Main blob */}
          <Blob
            className="absolute pointer-events-none"
            style={{
              width: 480,
              height: 420,
              right: 10,
              top: 20,
              background:
                "radial-gradient(ellipse at 40% 40%, rgba(59,196,162,0.28) 0%, rgba(20,80,70,0.20) 50%, transparent 80%)",
              filter: "blur(2px)",
            }}
          />
          {/* Secondary blob */}
          <Blob
            className="absolute pointer-events-none"
            style={{
              width: 200,
              height: 180,
              right: -30,
              bottom: 40,
              background:
                "radial-gradient(ellipse, rgba(59,196,162,0.15) 0%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          {/* Roaming blob left */}
          <Blob
            className="absolute pointer-events-none"
            style={{
              width: 150,
              height: 130,
              left: 50,
              bottom: 60,
              background:
                "radial-gradient(ellipse, rgba(59,196,162,0.09) 0%, transparent 70%)",
              filter: "blur(3px)",
            }}
          />

          {/* Orbs */}
          <Orb size={14} style={{ right: 310, top: 80 }} />
          <Orb size={10} style={{ right: 55, top: 120 }} />
          <Orb size={18} style={{ right: 40, bottom: 180 }} />
          <Orb size={8}  style={{ right: 130, bottom: 100 }} />
          <Orb size={12} style={{ left: 200, top: 90 }} />
          <Orb size={7}  style={{ left: 100, bottom: 140 }} />

          {/* Dot grid */}
          <div
            className="absolute bottom-5 right-5 rounded pointer-events-none"
            style={{
              width: 88,
              height: 88,
              backgroundImage:
                "radial-gradient(circle, rgba(59,196,162,0.28) 1.5px, transparent 1.5px)",
              backgroundSize: "10px 10px",
            }}
          />

          {/* Pulsing rings */}
          {[
            { w: 80, h: 80, style: { left: 30, top: 30 } },
            { w: 48, h: 48, style: { right: 200, bottom: 50 } },
          ].map(({ w, h, style }, i) => (
            <RingPulse key={i} w={w} h={h} style={style} delay={i * 1.5} />
          ))}

          {/* ── LEFT COLUMN ── */}
          <div ref={leftRef} className="relative z-10 flex flex-col">
            {/* Eyebrow */}
            <p
              className="text-[11px] font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#3BC4A2", fontFamily: "'Syne', sans-serif" }}
            >
              Available for work
            </p>

            {/* Headline */}
            <h1
              className="text-5xl font-extrabold leading-[1.07] tracking-tight text-white mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's Build
              <br />
              Something{" "}
              <em className="not-italic" style={{ color: "#3BC4A2" }}>
                Real
              </em>
            </h1>

            {/* Subtext */}
            <p
              className="text-[0.9rem] font-light leading-[1.75] mb-8 max-w-sm"
              style={{ color: "rgba(232,234,236,0.48)" }}
            >
              Have an idea, a project, or an opportunity? I'm always open to
              crafting meaningful digital experiences — from concept to launch.
            </p>

            {/* Pills */}
            <div className="flex flex-col gap-2.5 mb-9">
              {["Frontend Development", "Modern UI / UX Design", "Fast & Responsive"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 text-[0.82rem]" style={{ color: "rgba(232,234,236,0.72)" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: "#3BC4A2",
                        boxShadow: "0 0 8px rgba(59,196,162,0.8)",
                      }}
                    />
                    {item}
                  </div>
                )
              )}
            </div>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-2.5">
              <SocialButton
                href="mailto:dasprachurja@gmail.com"
                icon={EmailIcon}
                label="Email"
                colorClass="border-white/20 text-white/60 bg-white/[0.04] hover:bg-white/10 hover:text-white"
                glowClass=""
              />
              <SocialButton
                href="https://www.linkedin.com/in/prachurja-das-7136173aa/"
                icon={LinkedInIcon}
                label="LinkedIn"
                colorClass="border-[#0a66c2]/40 text-[#5aaee8] bg-[#0a66c2]/[0.07] hover:bg-[#0a66c2]/20 hover:text-[#7dc2f5]"
                glowClass=""
              />
              <SocialButton
                href="https://wa.me/8801768002784?text=Hi%20Prachurja!%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                icon={WhatsAppIcon}
                label="WhatsApp"
                colorClass="border-[#25d366]/40 text-[#4cd97e] bg-[#25d366]/[0.07] hover:bg-[#25d366]/20 hover:text-[#6fe896]"
                glowClass=""
              />
              <SocialButton
                href="https://www.facebook.com/prachurjadas103"
                icon={FacebookIcon}
                label="Facebook"
                colorClass="border-[#4267b2]/40 text-[#7a9fe0] bg-[#4267b2]/[0.07] hover:bg-[#4267b2]/20 hover:text-[#9ab8f0]"
                glowClass=""
              />
            </div>
          </div>

          {/* ── GLASS CARD ── */}
          <div
            ref={cardRef}
            className="relative z-10 rounded-2xl p-9"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 0 0 1px rgba(59,196,162,0.08), 0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="text-white font-bold mb-7 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem" }}
            >
              Send a message
            </p>

            <Field label="Your Name" placeholder="Alex Johnson" />
            <Field label="Email Address" type="email" placeholder="alex@example.com" />
            <Field label="Message" placeholder="Tell me about your project…" textarea />

            <button
              ref={btnRef}
              onClick={handleSend}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
              className="mt-7 w-full py-3.5 rounded-full text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-all duration-300"
              style={
                sent
                  ? {
                      background: "rgba(59,196,162,0.10)",
                      color: "#3BC4A2",
                      border: "1px solid rgba(59,196,162,0.3)",
                      fontFamily: "'Syne', sans-serif",
                    }
                  : {
                      background: "linear-gradient(135deg, #3BC4A2 0%, #2a9e84 100%)",
                      color: "#0d0f10",
                      border: "none",
                      boxShadow: "0 0 24px rgba(59,196,162,0.28)",
                      fontFamily: "'Syne', sans-serif",
                    }
              }
            >
              {sent ? "Message Sent ✓" : "Send Message →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Ring Pulse (GSAP) ─────────────────────────────────────────
function RingPulse({ w, h, style, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, {
      scale: 1.25,
      opacity: 0.9,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
  }, [delay]);
  return (
    <div
      ref={ref}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: w,
        height: h,
        border: "1px solid rgba(59,196,162,0.20)",
        opacity: 0.5,
        ...style,
      }}
    />
  );
}
