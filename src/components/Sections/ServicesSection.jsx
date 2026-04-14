import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB01wvj851_SewUMwjdnq2mPvWqQjqkRWnB6V655wIxdy1Z8ls0QSwr5FhFeh-6p77cVJo0jJyaSile1iKlC7v6APOe3PuV50t7lfMzy7cqReamipxu_sUjycFUbj5ONXhqgtZCq1Q84756b5IoAHHteVzUcqqu_AVx_ixOH4q_oBkB1Gkqiw7KSio1iGTKbRyAdIL2WcKhxWRVAkvFFETMdbPeQMTcapJqFq85YEEhwdnFGJ0T3zFimtbqEDQsl5KDg4KwDey7eFUR';

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
  <div className="svc-card group relative overflow-hidden rounded-2xl border border-white/[0.06] p-8 md:p-10 lg:p-12 transition-all duration-500 hover:border-brand-teal/25 hover:bg-white/[0.03] flex flex-col justify-between backdrop-blur-sm bg-white/[0.015]">
    {/* Hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(100,220,180,0.05) 0%, transparent 70%)' }}
    />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-8 md:mb-10">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal text-xl md:text-2xl transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
        <span className="font-mono text-xs text-gray-600 group-hover:text-brand-teal/70 transition-colors duration-300 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06]">
          {num}
        </span>
      </div>

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

    {extras && (
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 relative z-10">
        {tags.map((tag, i) => (
          <span key={tag} className={`font-mono text-[10px] uppercase tracking-[0.2em] ${i === 0 ? 'text-brand-teal' : 'text-gray-500'}`}>
            {tag}
          </span>
        ))}
      </div>
    )}

    {!extras && tags.length > 0 && (
      <div className="flex flex-wrap gap-2.5 mt-8 relative z-10">
        {tags.map((tag) => (
          <span key={tag} className="font-mono text-[10px] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06] uppercase tracking-[0.15em] text-gray-400">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

/* ─── Showcase Panel ─────────────────────────────────────────── */
const ShowcasePanel = () => (
  <div className="svc-showcase group relative w-full h-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        alt="Cinematic Showreel"
        className="svc-showcase-img w-full h-[120%] object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
        src={SHOWCASE_IMG}
        loading="lazy"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent z-[1]" />
    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-14 z-[2]">
      <div className="mb-6 md:mb-8">
        <span className="inline-block px-4 py-1.5 bg-brand-teal/15 backdrop-blur-md rounded-full font-mono text-[10px] tracking-[0.2em] text-brand-teal mb-4 md:mb-5 uppercase border border-brand-teal/25">
          Live Lab
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter text-white">
          The Obsidian <br />Showcase 2024
        </h2>
      </div>
      <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10">
        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="svc-progress h-full bg-gradient-to-r from-brand-violet to-brand-teal rounded-full" style={{ width: '66%' }} />
        </div>
        <span className="font-mono text-[10px] text-gray-500">02:45 / 04:00</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-brand-dark bg-gray-800" />
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-brand-dark bg-gray-700" />
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-brand-dark bg-gray-600 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
        </div>
        <button className="group/btn relative overflow-hidden bg-white text-brand-dark font-bold px-8 py-4 md:px-10 md:py-5 rounded-full text-sm tracking-wide cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(100,220,180,0.5)]">
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent pointer-events-none" />
          <span className="relative z-10">Start Project</span>
        </button>
      </div>
    </div>
    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-[2]">
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-brand-teal animate-ping absolute inset-0" />
        <div className="w-3 h-3 rounded-full bg-brand-teal relative" />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION — Two cinematic full-screen pages
   ═══════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    /* ── Page 1: Showcase fades up on scroll ── */
    gsap.fromTo(
      '.page1-showcase',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.page1-showcase',
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    /* ── Page 2: Cards stagger in ── */
    const cards = el.querySelectorAll('.svc-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.page2-cards',
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    /* ── Subtle parallax on showcase image ── */
    gsap.to('.svc-showcase-img', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.page1-showcase',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative bg-brand-dark">

      {/* ═══════════════════════════════════════════════════════
           PAGE 1 — Hero Text + Showcase
           ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-32 md:py-40 lg:py-48">
        {/* Background accents */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand-teal/10 to-transparent" />
          <div className="absolute top-[15%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-violet/[0.03] blur-[140px]" />
          <div className="absolute bottom-[15%] left-[-8%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-teal/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
          {/* Header — centered, no animation */}
          <div className="flex flex-col items-center text-center mb-20 md:mb-28 lg:mb-36">
            <span className="block font-mono text-brand-teal uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 md:mb-8 font-bold">
              Crafting the Future
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.92] mb-8 md:mb-10 text-white">
              Premium Websites{' '}
              <br className="hidden sm:block" />
              for{' '}
              <span className="text-brand-teal" style={{ textShadow: '0 0 40px rgba(100,220,180,0.3)' }}>
                Bold Brands.
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
              I design and develop fast, modern, and visually engaging websites with clean UI and smooth animations.
            </p>
          </div>

          {/* Showcase Panel — full width for cinematic impact */}
          <div className="page1-showcase w-full max-w-[1100px] opacity-0">
            <ShowcasePanel />
          </div>
        </div>
      </section>

      {/* Divider — breathing space between pages */}
      <div className="w-full flex justify-center py-8 md:py-12">
        <div className="w-px h-24 md:h-36 bg-gradient-to-b from-brand-teal/20 via-brand-teal/5 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════
           PAGE 2 — Service Cards
           ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-32 md:py-40 lg:py-48">
        {/* Background accents */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-6%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-violet/[0.03] blur-[130px]" />
          <div className="absolute bottom-[20%] right-[-8%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] rounded-full bg-brand-teal/[0.03] blur-[110px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
          {/* Section Label */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 lg:mb-32">
            <span className="block font-mono text-brand-teal uppercase tracking-[0.4em] text-[10px] md:text-xs mb-5 md:mb-6 font-bold">
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
          <div className="page2-cards w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
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
