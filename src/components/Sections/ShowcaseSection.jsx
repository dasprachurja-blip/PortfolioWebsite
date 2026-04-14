import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB01wvj851_SewUMwjdnq2mPvWqQjqkRWnB6V655wIxdy1Z8ls0QSwr5FhFeh-6p77cVJo0jJyaSile1iKlC7v6APOe3PuV50t7lfMzy7cqReamipxu_sUjycFUbj5ONXhqgtZCq1Q84756b5IoAHHteVzUcqqu_AVx_ixOH4q_oBkB1Gkqiw7KSio1iGTKbRyAdIL2WcKhxWRVAkvFFETMdbPeQMTcapJqFq85YEEhwdnFGJ0T3zFimtbqEDQsl5KDg4KwDey7eFUR';

const ShowcaseSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      '.showcase-card',
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showcase-card',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Parallax on image
    gsap.to('.showcase-img', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.showcase-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Ping animation
    gsap.fromTo(
      '.showcase-ping',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(3)',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.showcase-card',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-12 pb-20 md:pb-32 bg-brand-dark"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="showcase-card group relative w-full min-h-[400px] md:min-h-[550px] lg:min-h-[650px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          {/* Background image with parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt="Cinematic Showreel"
              className="showcase-img w-full h-[120%] object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              src={SHOWCASE_IMG}
              loading="lazy"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent z-[1]" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-[2]">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 py-1 bg-brand-teal/15 backdrop-blur-md rounded-full font-mono text-[10px] tracking-[0.2em] text-brand-teal mb-3 md:mb-4 uppercase border border-brand-teal/25">
                Live Lab
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter text-white">
                The Obsidian{' '}
                <br className="hidden sm:block" />
                Showcase 2024
              </h2>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 max-w-md">
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-violet to-brand-teal rounded-full transition-all duration-1000"
                  style={{ width: '66%' }}
                />
              </div>
              <span className="font-mono text-[10px] text-gray-500">02:45 / 04:00</span>
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-center">
              {/* Avatars */}
              <div className="flex -space-x-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-brand-dark bg-gray-800" />
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-brand-dark bg-gray-700" />
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-brand-dark bg-gray-600 flex items-center justify-center text-[10px] font-bold text-white">
                  +12
                </div>
              </div>

              {/* CTA */}
              <button className="group/btn relative overflow-hidden bg-white text-brand-dark font-bold px-6 py-3 md:px-8 md:py-4 rounded-full text-sm tracking-wide cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(100,220,180,0.5)]">
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent pointer-events-none" />
                <span className="relative z-10">Start Project</span>
              </button>
            </div>
          </div>

          {/* Live indicator */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[2]">
            <div className="showcase-ping relative">
              <div className="w-3 h-3 rounded-full bg-brand-teal animate-ping absolute inset-0" />
              <div className="w-3 h-3 rounded-full bg-brand-teal relative" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
