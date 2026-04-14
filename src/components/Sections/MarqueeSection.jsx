import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = ['HTML', 'JAVASCRIPT', 'CSS', 'REACT', 'TAILWIND', 'GIT', 'GITHUB'];
const ROW_2 = ['VS CODE', 'FIGMA', 'NEXT.JS', 'DOCKER', 'TYPESCRIPT', 'VERCEL', 'NODE'];
const HIGHLIGHTS = ['VS CODE', 'TYPESCRIPT'];

const MarqueeRow = ({ items, reverse = false, highlights = [] }) => {
  const renderItems = (ariaHidden = false) => (
    <div
      className={`flex items-center gap-8 md:gap-16 pr-8 md:pr-16 shrink-0 ${
        reverse ? 'marquee-row-reverse' : 'marquee-row'
      }`}
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      {items.map((item) => {
        const isHighlighted = highlights.includes(item);
        return (
          <span
            key={item}
            className={`font-extrabold text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase select-none whitespace-nowrap leading-none ${
              isHighlighted
                ? 'text-brand-teal/60'
                : 'text-transparent marquee-outline opacity-[0.12]'
            }`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-3 md:py-4">
      {renderItems(false)}
      {renderItems(true)}
    </div>
  );
};

const MarqueeSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 overflow-hidden bg-brand-dark"
      style={{ opacity: 0 }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex flex-col gap-0">
        {/* Row 1: left to right */}
        <div className="border-y border-white/[0.04]">
          <MarqueeRow items={ROW_1} />
        </div>

        {/* Row 2: right to left */}
        <MarqueeRow items={ROW_2} reverse highlights={HIGHLIGHTS} />
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
};

export default MarqueeSection;
