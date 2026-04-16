import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    title: "NeuralCart Ecosystem",
    desc: "A full-stack e-commerce experience powered by real-time recommendation AI, dynamic pricing engine, and a blazing-fast checkout flow.",
    tags: ["Next.js", "TypeScript", "TensorFlow"],
    imgColor: "#FF5C28",
    bg: "#111111",
  },
  {
    id: "02",
    title: "Sketchboard Canvas",
    desc: "A collaborative whiteboard built with WebSockets, CRDT conflict resolution, and GPU-accelerated canvas rendering.",
    tags: ["React", "WebSockets", "Canvas API"],
    imgColor: "#3BC4A2",
    bg: "#161616",
  },
  {
    id: "03",
    title: "Vaultex Dashboard",
    desc: "Cross-chain DeFi portfolio tracker with live on-chain analytics, gas fee alerts, and one-click yield optimisation.",
    tags: ["Ethers.js", "TheGraph", "Tailwind"],
    imgColor: "#7C6FFF",
    bg: "#1a1a1a",
  },
];

const OverlapShowcase = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Subtle parallax for the hero layer
    gsap.to('.overlap-hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.overlap-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Animate cards on scroll for a subtle scale-down effect 
    // when they get stacked behind the next card.
    const cards = gsap.utils.toArray('.overlap-card');
    cards.forEach((card, i) => {
      // We don't scale down the very last card
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: cards[i + 1], // when the NEXT card reaches the top
        start: `top bottom-=100`, 
        end: `top top+=80`, 
        scrub: true,
        animation: gsap.fromTo(card,
          { scale: 1, filter: "brightness(1)", transformOrigin: "top center" },
          { scale: 0.95, filter: "brightness(0.5)", ease: "none" }
        )
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-black w-full text-white rounded-t-3xl md:rounded-t-[40px]">
      {/* ── SECTION 1 (HERO) ── */}
      <section className="overlap-hero relative w-full min-h-[65vh] pt-24 pb-32 flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax Background Gradient */}
        <div 
          className="overlap-hero-bg absolute inset-0 z-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(100, 220, 180, 0.15) 0%, rgba(10, 10, 15, 1) 70%)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-[50px]">
          <h1 className="font-['Syne'] text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
            Crafting Modern<br />
            <span className="text-brand-teal">Web Experiences</span>
          </h1>
          <p className="font-['DM_Sans'] text-lg md:text-xl text-brand-dim max-w-xl font-light">
            Fast, scalable, and visually refined web solutions.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 (OVERLAPPING CARDS) ── */}
      <section className="relative z-20 px-4 md:px-8 pb-32">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-12" style={{ marginTop: '-20vh' }}>
          {PROJECTS.map((project, i) => {
            // Calculate a sticky top offset so cards stack slightly below each other
            // Example: 120px for first, 160px for second, 200px for third...
            const stickyOffset = `calc(10vh + ${i * 40}px)`;

            return (
              <div 
                key={project.id} 
                className="overlap-card sticky w-full rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                style={{ 
                  top: stickyOffset, 
                  zIndex: i + 10,
                  backgroundColor: project.bg,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  {/* Left: Project Image/Visual */}
                  <div 
                    className="relative p-8 flex items-center justify-center min-h-[300px] lg:min-h-full"
                    style={{
                      background: `linear-gradient(135deg, ${project.imgColor}22 0%, #000 100%)`
                    }}
                  >
                    {/* Visual Decor */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${project.imgColor} 0px, ${project.imgColor} 1px, transparent 1px, transparent 10px)`
                      }}
                    />
                    <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full blur-[80px]" style={{ background: project.imgColor }} />
                    <span className="absolute z-20 font-['Syne'] text-8xl md:text-[140px] font-black opacity-20" style={{ color: project.imgColor }}>
                      {project.id}
                    </span>
                  </div>

                  {/* Right: Project Copy */}
                  <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="font-['Syne'] text-4xl md:text-5xl font-bold mb-4">{project.title}</h2>
                    <p className="font-['DM_Sans'] text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-4 py-2 rounded-full text-xs font-mono font-medium border border-white/10 bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      className="mt-12 self-start px-8 py-3 rounded-full font-['Syne'] font-semibold transition-all duration-300 hover:scale-105"
                      style={{ background: project.imgColor, color: '#000' }}
                    >
                      Explore Project →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default OverlapShowcase;
