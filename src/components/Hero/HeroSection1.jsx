import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import profileImg from '../../assets/profile.jpg';
import Signature from '../Signature';
import NeonText from '../NeonText';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';
import TypewriterText from '../ui/TypewriterText';

gsap.registerPlugin(ScrollToPlugin);

const HeroSection1 = () => {
  const containerRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case it's already scrolled on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background shapes subtle animation
    tl.to('.hero-bg-blob', {
      scale: 1.1,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 2,
    });

    // Fade in hero heading
    gsap.fromTo(
      '.hero-heading',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );

    // Fade in metadata
    gsap.fromTo(
      '.hero-metadata',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
    );

    // Reveal buttons
    gsap.fromTo(
      '.hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
    );

    // Image reveal (Removed blur to prevent breaking effect, using smooth clip-path like reveal)
    gsap.fromTo(
      '.hero-img-container',
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    // Floating tag
    gsap.fromTo(
      '.floating-tag',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(2)', delay: 1.5 }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen pt-20 flex flex-col justify-center overflow-hidden bg-brand-dark">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hero-bg-blob absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-teal/5 blur-[100px]"></div>
        <div className="hero-bg-blob absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-violet/5 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 z-10 order-2 lg:order-1 pb-10 md:pb-0">
          <div className="space-y-6 md:space-y-8">
            <div className="hero-heading opacity-0 font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white m-0 hidden md:flex flex-col gap-4 md:gap-6">
              <span>Hi, I'm</span>
              <div className="flex flex-wrap items-end gap-x-2">
                <Signature className="transform translate-y-1 md:-translate-y-2" />
                <span className="text-brand-teal animate-pulse -translate-y-2 md:-translate-y-4">_</span>
              </div>
            </div>
            <p className="max-w-xl text-gray-400 text-base md:text-xl font-medium leading-relaxed font-mono mt-4 md:mt-0">
              <TypewriterText
                text="I build modern, responsive, and interactive web interfaces with clean code and smooth animations."
                highlights={[
                  { word: 'clean code', className: 'hero-highlight' },
                ]}
                speed={0.035}
                delay={1.2}
              />
            </p>
          </div>

          <div className="flex flex-row gap-3 md:gap-6 items-center pt-2 md:pt-6 w-full">
            <PrimaryButton
              className="hero-btn opacity-0 flex-1 md:flex-none justify-center px-4 py-4 md:px-10 text-sm md:text-lg"
              onClick={() => {
                const el = document.getElementById('work');
                if (el) gsap.to(window, { scrollTo: { y: el, offsetY: 0 }, duration: 1.2, ease: 'expo.inOut' });
              }}
            >
              View My Work
            </PrimaryButton>
            <SecondaryButton className="hero-btn opacity-0 flex-1 md:flex-none justify-center px-4 py-4 md:px-10 text-sm md:text-lg text-center" icon="→">
              Let's Talk
            </SecondaryButton>
          </div>

          <div className="w-full text-center md:text-left mt-6 md:mt-0 overflow-hidden">
             <NeonText 
                text="OPEN TO FREELANCE & COLLABORATIVE PROJECTS"
                style={{ fontSize: 'clamp(9px, 2.8vw, 24px)', justifyContent: 'center', whiteSpace: 'nowrap' }}
                className="md:!justify-start w-full"
             />
          </div>

          {/* Editorial Metadata */}
          <div className="hero-metadata opacity-0 flex flex-row justify-between md:justify-start gap-4 md:gap-12 pt-6 md:pt-10 mt-2 border-t border-gray-800">
            <div className="flex-1 md:flex-none">
              <div className="text-brand-dim text-[10px] uppercase tracking-widest mb-2 font-mono">Location</div>
              <div className="uppercase tracking-wide">
                <NeonText text="REMOTE / GLOBAL" style={{ fontSize: 'clamp(12px, 3.5vw, 18px)', justifyContent: 'flex-start', whiteSpace: 'nowrap' }} />
              </div>
            </div>
            <div className="flex-1 md:flex-none">
              <div className="text-brand-dim text-[10px] uppercase tracking-widest mb-2 font-mono">Focus</div>
              <div className="uppercase tracking-wide">
                <NeonText text="FRONTEND ENGINEERING" style={{ fontSize: 'clamp(12px, 3.5vw, 18px)', justifyContent: 'flex-start', whiteSpace: 'nowrap' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Large Visual Anchor */}
        <div className="lg:col-span-5 relative order-1 lg:order-2 w-full max-w-[400px] md:max-w-none mx-auto mt-6 md:mt-0">
          {/* Tonal Layering Frames */}
          <div className="absolute -top-4 -left-4 lg:-top-10 lg:-left-10 w-full h-full bg-gray-900/50 rounded-xl translate-x-4 translate-y-4 hidden md:block"></div>
          <div className="absolute -top-4 -left-4 lg:-top-10 lg:-left-10 w-full h-full border border-gray-800 rounded-xl hidden md:block"></div>
          
          <div className="hero-img-container opacity-0 relative aspect-square md:aspect-[4/5] overflow-hidden rounded-xl shadow-2xl group w-full" style={{ WebkitTransform: 'translateZ(0)' }}>
            <img 
              alt="Prachurja's portrait" 
              className={`w-full h-full object-cover transition-all duration-700 md:contrast-125 md:grayscale md:group-hover:grayscale-0 ${isScrolled ? 'grayscale-0' : 'grayscale'}`}
              src={profileImg}
            />
            
            {/* Mobile Title Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent flex flex-col justify-end p-6 md:hidden">
              <div className="hero-heading opacity-0 font-extrabold text-white m-0 flex flex-col gap-2">
                <span className="text-3xl leading-none">Hi, I'm</span>
                <div className="flex items-end gap-x-2">
                  <Signature className="w-56 transform translate-y-2" />
                  <span className="text-brand-teal animate-pulse text-4xl leading-none -translate-y-2">_</span>
                </div>
              </div>
            </div>

            {/* Desktop Glass Reveal Card on Hover */}
            <div className="hidden md:flex absolute bottom-0 left-0 w-full p-8 bg-black/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex-col">
              <span className="text-[10px] text-brand-teal font-mono uppercase tracking-widest mb-2">Frontend Developer</span>
              <h3 className="text-2xl font-bold text-white">Prachurja</h3>
            </div>
          </div>

          {/* Floating Kinetic Tag */}
          <div className="floating-tag opacity-0 absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 bg-brand-violet/20 backdrop-blur-xl border border-brand-violet/30 px-6 py-4 rounded-lg shadow-2xl hidden sm:block">
             <div className="flex items-center gap-4">
               <span className="text-brand-teal text-4xl drop-shadow-md">{'</>'}</span>
               <span className="font-bold text-gray-200 text-sm tracking-wider font-mono">FRONTEND EXPERT</span>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-btn absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex">
        <span className="text-[10px] text-brand-dim uppercase tracking-[0.4em] rotate-180 font-mono" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-brand-teal to-transparent opacity-50"></div>
      </div>
    </main>
  );
};

export default HeroSection1;
