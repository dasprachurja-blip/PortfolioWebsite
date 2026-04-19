import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroVideo from '../../assets/hero-2.mp4';
import heroPoster from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    icon: '</>',
    title: ['Frontend', 'Development'],
    desc: 'Next-gen interfaces built with architectural precision and fluid interactions.',
    tags: ['React', 'Three.js', 'GSAP'],
  },
  {
    num: '02',
    icon: '◎',
    title: ['UI/UX', 'Design'],
    desc: 'Editorial precision meets user-centric flows for intuitive digital experiences.',
    tags: ['Figma', 'Prototyping'],
  },
  {
    num: '03',
    icon: '✦',
    title: ['Basic', 'Branding'],
    desc: 'Defining visual souls through kinetic typography and identity systems.',
    tags: ['Logo Design', 'Type Palette', 'Color Motion'],
    extras: true,
  },
  {
    num: '04',
    icon: '⚡',
    title: ['Performance', 'Optimization'],
    desc: 'Fine-tuning every millisecond to achieve obsidian-grade stability and speed.',
    tags: [],
  },
];

/* ─── Service Card ────────────────────────────────────────────── */
const ServiceCard = ({ num, icon, title, desc, tags, extras }) => (
  <div className="svc-card group relative overflow-hidden rounded-2xl border border-white/[0.06] p-6 md:p-8 transition-all duration-500 hover:border-brand-teal/25 hover:bg-white/[0.03] flex flex-col justify-between backdrop-blur-sm bg-white/[0.015]">
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(100,220,180,0.05) 0%, transparent 70%)' }}
    />
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-5 md:mb-6">
        <div className="svc-icon w-14 h-14 md:w-16 md:h-16 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal text-xl md:text-2xl transition-all duration-500 group-hover:scale-110">
          {icon}
        </div>
        <span className="svc-num font-mono text-xs text-gray-600 group-hover:text-brand-teal/70 transition-colors duration-300 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06]">
          {num}
        </span>
      </div>
      <div className="svc-content relative z-10">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-[1.05] mb-4 text-white">
          {title.map((line, i) => (
            <span key={i}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{desc}</p>
      </div>
    </div>
    {extras && (
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 relative z-10">
        {tags.map((tag, i) => (
          <span key={tag} className={`svc-tag font-mono text-[10px] uppercase tracking-[0.2em] ${i === 0 ? 'text-brand-teal' : 'text-gray-500'}`}>
            {tag}
          </span>
        ))}
      </div>
    )}
    {!extras && tags.length > 0 && (
      <div className="flex flex-wrap gap-2.5 mt-8 relative z-10">
        {tags.map((tag) => (
          <span key={tag} className="svc-tag font-mono text-[10px] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06] uppercase tracking-[0.15em] text-gray-400">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC VIDEO HERO + SERVICES — Two full-screen pages
   ═══════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const sectionRef = useRef();
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hasStartedPlaying = useRef(false);

  /* ── Detect mobile ── */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Start video playback on scroll (desktop only) ── */
  const startVideoOnScroll = useCallback(() => {
    if (hasStartedPlaying.current || isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    hasStartedPlaying.current = true;
    video.play().catch(() => {});

    // Remove scroll listener once triggered
    window.removeEventListener('scroll', startVideoOnScroll);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('scroll', startVideoOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', startVideoOnScroll);
  }, [startVideoOnScroll, isMobile]);

  /* ── GSAP scroll animations ── */
  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    /* — Video cinematic reveal on scroll — */
    if (!isMobile) {
      gsap.to('.hero-video-layer', {
        filter: 'blur(0px) brightness(0.55)',
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
        },
      });
    }

    /* — Text parallax — */
    gsap.to('.hero-text-content', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    /* — Heading fade-in + slide-up — */
    gsap.fromTo(
      '.hero-heading-anim',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.3,
      }
    );

    /* — Subtext staggered entrance — */
    gsap.fromTo(
      '.hero-subtext-anim',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        delay: 0.7,
      }
    );

    /* — Label entrance — */
    gsap.fromTo(
      '.hero-label-anim',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      }
    );

    /* ══ Page 2: PINNED scroll-driven reveal ══ */
    const page2 = el.querySelector('.page2-section');
    const cards = el.querySelectorAll('.svc-card');

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: page2,
        start: 'top 80%', // Triggers normally when the section comes into view
        toggleActions: 'play none none none', // Play once, never reverse
      },
    });

    // 1) Header snaps in
    masterTL.fromTo('.page2-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );

    // 2) All cards burst in quickly
    cards.forEach((card, i) => {
      const offset = 0.3 + i * 0.15;

      // Card entrance
      masterTL.fromTo(card,
        { opacity: 0, y: 60, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' },
        offset
      );

      // Icon pop
      masterTL.fromTo(card.querySelector('.svc-icon'),
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.15, ease: 'back.out(2)' },
        offset + 0.1
      );
    });

  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <div id="about" ref={sectionRef} className="relative bg-brand-dark">

      {/* ═══════════════════════════════════════════════════════
           PAGE 1 — Cinematic Video Hero
           ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* ── Video / Image Background ── */}
        <div className="absolute inset-0 z-0">
          {/* Desktop: Video */}
          {!isMobile && (
            <video
              ref={videoRef}
              className="hero-video-layer absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
              poster={heroPoster}
              muted
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={() => setVideoReady(true)}
              style={{
                filter: 'blur(6px) brightness(0.35)',
                transform: 'scale(1.12)',
                transition: 'opacity 0.8s ease',
                opacity: videoReady ? 1 : 0,
              }}
            />
          )}

          {/* Static poster fallback (always present, visible on mobile or before video loads) */}
          <img
            src={heroPoster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0.3)',
              opacity: (isMobile || !videoReady) ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          />
        </div>

        {/* ── Dark Gradient Overlay ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.7) 35%, rgba(10,10,15,0.3) 60%, rgba(10,10,15,0.5) 100%),
              radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.6) 100%)
            `,
          }}
        />

        {/* ── Grain Texture (subtle) ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* ── Text Content ── */}
        <div className="hero-text-content absolute inset-0 z-10 flex flex-col items-center justify-center px-6 md:px-12">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Label */}
            <span className="hero-label-anim block font-mono text-brand-teal uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 font-bold opacity-0">
              Crafting the Future
            </span>

            {/* Main Heading — exactly 2 lines */}
            <h2 className="hero-heading-anim font-extrabold tracking-tighter leading-[0.92] mb-5 md:mb-6 text-white opacity-0" style={{ fontSize: 'clamp(2.2rem, 8vw, 8rem)' }}>
              <span className="block whitespace-nowrap">Premium Websites</span>
              <span className="block whitespace-nowrap">
                for{' '}
                <span
                  className="text-brand-teal"
                  style={{ textShadow: '0 0 60px rgba(100,220,180,0.25)' }}
                >
                  Bold Brands.
                </span>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="hero-subtext-anim text-gray-400/90 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed font-medium opacity-0">
              I design and develop fast, modern, and visually engaging websites
              with clean UI and smooth animations.
            </p>
          </div>
        </div>

        {/* ── Bottom Fade to Dark ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #0a0a0f 0%, transparent 100%)',
          }}
        />
      </section>

      {/* ── Breathing Divider ── */}
      <div className="w-full flex justify-center py-6 md:py-10">
        <div className="w-px h-16 md:h-24 bg-gradient-to-b from-brand-teal/15 via-brand-teal/5 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════
           PAGE 2 — Service Cards
           ═══════════════════════════════════════════════════════ */}
      <section id="services" className="page2-section relative w-full h-screen flex flex-col items-center justify-start px-6 md:px-12 pt-12 md:pt-16 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-6%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-violet/[0.03] blur-[130px]" />
          <div className="absolute bottom-[20%] right-[-8%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] rounded-full bg-brand-teal/[0.03] blur-[110px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
          {/* Section Label */}
          <div className="page2-header flex flex-col items-center text-center mb-6 md:mb-8">
            <span className="block font-mono text-brand-teal uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 md:mb-4 font-bold">
              What I Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95] text-white">
              Services &{' '}
              <span className="text-brand-teal" style={{ textShadow: '0 0 30px rgba(100,220,180,0.2)' }}>
                Expertise
              </span>
            </h2>
          </div>

          {/* Cards — 2×2 grid */}
          <div className="page2-cards w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.num} {...s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
