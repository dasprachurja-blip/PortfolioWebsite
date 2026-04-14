import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    icon: '</>', 
    title: ['Frontend', 'Development'],
    desc: 'Next-gen interfaces built with architectural precision and fluid interactions.',
    tags: ['React', 'Three.js', 'GSAP'],
    span: 'single',
  },
  {
    num: '02',
    icon: '◎',
    title: ['UI/UX', 'Design'],
    desc: 'Editorial precision meets user-centric flows for intuitive digital experiences.',
    tags: ['Figma', 'Prototyping'],
    span: 'single',
  },
  {
    num: '03',
    icon: '✦',
    title: ['Basic', 'Branding'],
    desc: 'Defining visual souls through kinetic typography and identity systems.',
    tags: ['Logo Design', 'Type Palette', 'Color Motion'],
    span: 'wide',
    extras: true,
  },
  {
    num: '04',
    icon: '⚡',
    title: ['Performance', 'Optimization'],
    desc: 'Fine-tuning every millisecond to achieve obsidian-grade stability and speed.',
    tags: [],
    span: 'wide',
  },
];

const ServiceCard = ({ num, icon, title, desc, tags, span, extras }) => {
  const isWide = span === 'wide';

  return (
    <div
      className={`service-card glass-panel group relative overflow-hidden rounded-xl border border-white/[0.06] p-7 md:p-8 
        transition-all duration-500 hover:border-brand-teal/20 hover:bg-white/[0.04]
        flex ${isWide ? 'flex-col md:flex-row md:items-center gap-6 md:gap-8 md:col-span-2' : 'flex-col justify-between'}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(100,220,180,0.04) 0%, transparent 70%)' }}
      />

      <div className={`relative z-10 ${isWide ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal text-xl md:text-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            {icon}
          </div>
          <span className="font-mono text-sm text-gray-600 group-hover:text-brand-teal transition-colors duration-300">
            {num}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-[1.05] mb-3 md:mb-4 text-white">
          {title.map((line, i) => (
            <span key={i}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </h3>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
          {desc}
        </p>
      </div>

      {/* Extras — branding breakdown */}
      {extras && (
        <>
          <div className="hidden md:block w-px h-20 bg-white/10 mx-2 shrink-0" />
          <div className="flex flex-col gap-2 min-w-[130px] relative z-10">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  i === 0 ? 'text-brand-teal' : 'text-gray-500'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Tags — non-extras */}
      {!extras && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 md:mt-6 relative z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08] uppercase tracking-[0.15em] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Section header animation
    gsap.fromTo(
      '.services-label',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-label',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.services-headline',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-headline',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.services-desc',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-desc',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Stagger cards
    gsap.fromTo(
      '.service-card',
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 md:px-12 bg-brand-dark overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand-teal/15 to-transparent" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-violet/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-brand-teal/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="max-w-4xl mb-16 md:mb-24">
          <span className="services-label block font-mono text-brand-teal uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 font-bold">
            Crafting the Future
          </span>
          <h2 className="services-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.92] mb-6 md:mb-8 text-white">
            Premium Websites{' '}
            <br className="hidden sm:block" />
            for{' '}
            <span className="text-brand-teal" style={{ textShadow: '0 0 40px rgba(100,220,180,0.3)' }}>
              Bold Brands.
            </span>
          </h2>
          <p className="services-desc text-gray-400 text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-medium">
            I design and develop fast, modern, and visually engaging websites with clean UI and smooth animations.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.num} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
