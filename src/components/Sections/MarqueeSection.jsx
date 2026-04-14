import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'GSAP', 'Vite', 'Three.js'];
const ROW_2 = ['C++', 'React.js', 'HTML5', 'JavaScript', 'CSS3', 'Three.js', 'GSAP'];

/* ─── Single Marquee Row (GSAP-powered) ─────────────────────── */
const MarqueeRow = ({ items, reverse = false, colorType = 'teal' }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure one set of items (first child)
    const firstSet = track.children[0];
    if (!firstSet) return;
    const width = firstSet.offsetWidth;

    // GSAP infinite scroll
    gsap.set(track, { x: reverse ? -width : 0 });

    tweenRef.current = gsap.to(track, {
      x: reverse ? 0 : -width,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [reverse]);

  const handleEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
  };

  const handleLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
  };

  const renderItems = (key) => (
    <div className="flex items-center gap-10 md:gap-20 pr-10 md:pr-20 shrink-0" key={key}>
      {items.map((item, i) => {
        // Alternate between outlined and filled text
        const isOutline = (i % 2) === 0;
        
        return (
          <span
            key={`${item}-${i}`}
            style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.05em' }}
            className={`text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] uppercase select-none whitespace-nowrap leading-none transition-all duration-300 ${
              isOutline
                ? 'text-transparent marquee-outline hover:text-white/5'
                : colorType === 'teal' 
                    ? 'text-brand-teal/60 hover:text-brand-teal/90' 
                    : 'text-white/70 hover:text-white/100'
            }`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      className="flex whitespace-nowrap overflow-hidden py-3 md:py-5 cursor-default"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={trackRef} className="flex">
        {renderItems('a')}
        {renderItems('b')}
        {renderItems('c')}
      </div>
    </div>
  );
};

/* ─── Marquee Section ────────────────────────────────────────── */
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
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-16 overflow-hidden bg-brand-dark"
      style={{ opacity: 0 }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex flex-col gap-0">
        {/* Row 1: left → right */}
        <div className="border-y border-white/[0.04]">
          <MarqueeRow items={ROW_1} colorType="teal" />
        </div>

        {/* Row 2: right → left */}
        <MarqueeRow items={ROW_2} reverse colorType="white" />
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
};

export default MarqueeSection;
