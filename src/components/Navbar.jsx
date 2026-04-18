import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollToPlugin, ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'work',    prefix: '//',  suffix: null, path: '#work'   },
  { label: 'about',   prefix: '{',   suffix: '}',  path: '#about'   },
  { label: 'contact', prefix: '~',   suffix: null, path: '#contact' },
];

const FONT = "'JetBrains Mono','Fira Code',monospace";
const TEAL = '#64dcb4';
const VIOLET = '#7864ff';
const DIM = '#6b7280';

// ─── Component ────────────────────────────────────────────────────
const Navbar = () => {
  const navRef        = useRef();
  const overlayRef    = useRef();
  const overlayBgRef  = useRef();
  const mobileLinkRefs = useRef([]);
  const closeRef      = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ── Desktop entry animation ──────────────────────────────────────
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.logo-bracket',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.18 }
    )
    .to('.logo-text', {
      duration: 1.1,
      text: { value: '\u2009PRACHURJA\u2009', delimiter: '' },
      ease: 'none',
    }, '-=0.05')
    .fromTo('.logo-slash',
      { opacity: 0, scale: 0.4 },
      { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(3)' },
    '-=0.08')
    .fromTo('.nav-link',
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power4.out' },
    '-=0.35');

    // ── Smart Navbar Auto-Hide on Scroll ─────────────────────────────
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.35,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999, // Infinite scroll duration
      onUpdate: (self) => {
        // Hide when scrolling down past 100px, Show when scrolling up
        if (self.direction === 1 && window.scrollY > 100) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      }
    });

  }, { scope: navRef });

  // ── Mobile menu open ─────────────────────────────────────────────
  const openMenu = () => {
    setIsOpen(true);
    const overlay = overlayRef.current;
    const bg      = overlayBgRef.current;
    const links   = mobileLinkRefs.current;
    const closeBtn = closeRef.current;

    // Make overlay visible first
    gsap.set(overlay, { display: 'flex' });

    const tl = gsap.timeline();

    // 1. Background wipes down
    tl.fromTo(bg,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 0.55, ease: 'expo.inOut' }
    )
    // 2. Close button fades in
    .fromTo(closeBtn,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
    '-=0.1')
    // 3. Links stagger up from below
    .fromTo(links,
      { y: 60, opacity: 0, rotateX: -20 },
      {
        y: 0, opacity: 1, rotateX: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power4.out',
      },
    '-=0.15');
  };

  // ── Mobile menu close ────────────────────────────────────────────
  const closeMenu = () => {
    const overlay = overlayRef.current;
    const bg      = overlayBgRef.current;
    const links   = mobileLinkRefs.current;
    const closeBtn = closeRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
        setIsOpen(false);
      },
    });

    tl.to([...links, closeBtn],
      { y: -20, opacity: 0, stagger: 0.05, duration: 0.25, ease: 'power2.in' }
    )
    .to(bg,
      { scaleY: 0, transformOrigin: 'top center', duration: 0.4, ease: 'expo.inOut' },
    '-=0.1');
  };

  // ── Navigate and close ───────────────────────────────────────────
  const executeNav = (path) => {
    if (path.startsWith('#')) {
      if (location.pathname !== '/') navigate('/');
      setTimeout(() => {
        const id = path.replace('#', '');
        const el = document.getElementById(id);
        if (el) gsap.to(window, { scrollTo: { y: el }, duration: 1.2, ease: 'expo.inOut' });
      }, 50);
    } else {
      navigate(path);
    }
  };

  const goTo = (path) => {
    if (isOpen) {
      closeMenu();
      // small delay so close animation plays before route change
      setTimeout(() => executeNav(path), 450);
    } else {
      executeNav(path);
    }
  };

  const active = (path) => location.pathname === path || location.hash === path;

  // ── Desktop link hover ───────────────────────────────────────────
  const onEnter = (e) => {
    const el = e.currentTarget;
    gsap.to(el.querySelector('.link-prefix'), {
      color: VIOLET, textShadow: `0 0 10px ${VIOLET}cc`, duration: 0.2,
    });
    const sfx = el.querySelector('.link-suffix');
    if (sfx) gsap.to(sfx, { color: TEAL, textShadow: `0 0 10px ${TEAL}cc`, duration: 0.2 });
    gsap.to(el.querySelector('.link-text'), {
      x: 4, color: '#fff', textShadow: '0 0 12px rgba(255,255,255,0.25)', duration: 0.2,
    });
    gsap.to(el.querySelector('.link-bar'), { scaleX: 1, duration: 0.25, ease: 'power2.out' });
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    gsap.to(el.querySelector('.link-prefix'), {
      color: DIM, textShadow: '0 0 0px transparent', duration: 0.2,
    });
    const sfx = el.querySelector('.link-suffix');
    if (sfx) gsap.to(sfx, { color: DIM, textShadow: '0 0 0px transparent', duration: 0.2 });
    gsap.to(el.querySelector('.link-text'), {
      x: 0, color: '#9ca3af', textShadow: '0 0 0px transparent', duration: 0.2,
    });
    gsap.to(el.querySelector('.link-bar'), { scaleX: 0, duration: 0.18, ease: 'power2.in' });
  };

  // ── Mobile link hover (glow) ─────────────────────────────────────
  const onMobileEnter = (e) => {
    const el = e.currentTarget;
    gsap.to(el.querySelector('.m-prefix'), {
      color: TEAL, textShadow: `0 0 20px ${TEAL}`, duration: 0.2,
    });
    gsap.to(el.querySelector('.m-label'), {
      color: '#fff',
      textShadow: '0 0 30px rgba(255,255,255,0.15)',
      x: 6,
      duration: 0.2,
    });
    const sfx = el.querySelector('.m-suffix');
    if (sfx) gsap.to(sfx, { color: TEAL, textShadow: `0 0 20px ${TEAL}`, duration: 0.2 });
  };

  const onMobileLeave = (e) => {
    const el = e.currentTarget;
    gsap.to(el.querySelector('.m-prefix'), {
      color: DIM, textShadow: '0 0 0px transparent', duration: 0.2,
    });
    gsap.to(el.querySelector('.m-label'), {
      color: '#e2e8f0', textShadow: '0 0 0px transparent', x: 0, duration: 0.2,
    });
    const sfx = el.querySelector('.m-suffix');
    if (sfx) gsap.to(sfx, { color: DIM, textShadow: '0 0 0px transparent', duration: 0.2 });
  };

  // ── Desktop NavBtn ───────────────────────────────────────────────
  const NavBtn = ({ label, prefix, suffix, path }) => (
    <button
      onClick={() => goTo(path)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="nav-link relative flex items-center opacity-0 bg-transparent border-none cursor-pointer py-1"
      style={{ fontFamily: FONT, fontSize: '0.92rem', gap: '2px', letterSpacing: '0.03em' }}
    >
      <span className="link-prefix" style={{ color: active(path) ? VIOLET : DIM }}>{prefix}</span>
      <span
        className="link-text inline-block"
        style={{
          color: active(path) ? '#fff' : '#9ca3af',
          marginLeft: suffix ? '1px' : '3px',
          marginRight: suffix ? '1px' : 0,
        }}
      >
        {label}
      </span>
      {suffix && (
        <span className="link-suffix" style={{ color: active(path) ? TEAL : DIM }}>{suffix}</span>
      )}
      {active(path) && (
        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
          style={{ background: TEAL }} />
      )}
      <span
        className="link-bar absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg,${VIOLET},${TEAL})`,
          transform: 'scaleX(0)', transformOrigin: 'left',
        }}
      />
    </button>
  );

  return (
    <>
      {/* ── DESKTOP / MOBILE NAV BAR ─────────────────────────── */}
      <div ref={navRef} className="fixed top-0 left-0 w-full z-50">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 4px)',
          }}
        />
        <nav
          className="relative z-10 flex items-center justify-center h-20 px-6 md:px-12 border-b"
          style={{
            background: '#0a0a0f',
            borderColor: 'rgba(100,220,180,0.12)',
            fontFamily: FONT,
          }}
        >
          <div className="w-full max-w-[1440px] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => goTo('/')}
            className="flex items-center bg-transparent border-none cursor-pointer select-none font-bold"
            style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}
          >
            <span className="logo-bracket opacity-0" style={{ color: 'rgba(100,220,180,0.55)' }}>&lt;</span>
            <span className="logo-text" style={{ color: '#e2e8f0' }} />
            <span className="logo-slash opacity-0" style={{ color: VIOLET, fontSize: '0.9em' }}>/</span>
            <span className="logo-bracket opacity-0" style={{ color: 'rgba(100,220,180,0.55)' }}>&gt;</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => <NavBtn key={item.label} {...item} />)}
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={openMenu}
            className="flex md:hidden flex-col items-center gap-[3px] bg-transparent border-none cursor-pointer px-1"
            aria-label="Open menu"
            style={{ fontFamily: FONT }}
          >
            <span style={{ color: TEAL, fontSize: '1rem', lineHeight: 1 }}>[</span>
            <span style={{ color: '#9ca3af', fontSize: '0.6rem', letterSpacing: '0.1em', lineHeight: 1 }}>menu</span>
            <span style={{ color: TEAL, fontSize: '1rem', lineHeight: 1 }}>]</span>
          </button>
          </div>
        </nav>
      </div>

      {/* ── FULL-SCREEN MOBILE OVERLAY ───────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex-col"
        style={{ display: 'none', fontFamily: FONT }}
      >
        {/* Animated background panel */}
        <div
          ref={overlayBgRef}
          className="absolute inset-0"
          style={{ background: '#0a0a0f' }}
        >
          {/* Scanline grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,rgba(100,220,180,0.015) 0px,rgba(100,220,180,0.015) 1px,transparent 1px,transparent 3px)',
            }}
          />
          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: `radial-gradient(circle at bottom right, ${VIOLET}18 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top left, ${TEAL}10 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Close button */}
        <div className="relative z-10 flex justify-end px-6 pt-7">
          <button
            ref={closeRef}
            onClick={closeMenu}
            className="flex flex-col items-center gap-[3px] bg-transparent border-none cursor-pointer opacity-0"
            aria-label="Close menu"
            style={{ fontFamily: FONT }}
          >
            <span style={{ color: TEAL, fontSize: '1rem', lineHeight: 1 }}>[</span>
            <span style={{ color: '#ef4444', fontSize: '0.68rem', lineHeight: 1 }}>x</span>
            <span style={{ color: TEAL, fontSize: '1rem', lineHeight: 1 }}>]</span>
          </button>
        </div>

        {/* Nav links — large cinematic */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-8 gap-6 pb-16">
          {NAV_ITEMS.map(({ label, prefix, suffix, path }, i) => (
            <button
              key={label}
              ref={(el) => (mobileLinkRefs.current[i] = el)}
              onClick={() => goTo(path)}
              onMouseEnter={onMobileEnter}
              onMouseLeave={onMobileLeave}
              className="flex items-baseline gap-3 bg-transparent border-none cursor-pointer text-left opacity-0 group"
              style={{ fontFamily: FONT }}
            >
              {/* Prefix */}
              <span
                className="m-prefix font-light"
                style={{
                  color: active(path) ? TEAL : DIM,
                  fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
              >
                {prefix}
              </span>
              {/* Label */}
              <span
                className="m-label font-bold inline-block"
                style={{
                  color: active(path) ? '#fff' : '#e2e8f0',
                  fontSize: 'clamp(2.8rem, 11vw, 5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                }}
              >
                {label}
              </span>
              {/* Suffix */}
              {suffix && (
                <span
                  className="m-suffix font-light"
                  style={{
                    color: active(path) ? TEAL : DIM,
                    fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {suffix}
                </span>
              )}
            </button>
          ))}

          {/* Footer tag */}
          <p
            className="absolute bottom-8 left-8"
            style={{ color: `${TEAL}55`, fontSize: '0.7rem', letterSpacing: '0.12em' }}
          >
            © {new Date().getFullYear()} &lt;PRACHURJA/&gt;
          </p>
        </div>
      </div>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </>
  );
};

export default Navbar;
