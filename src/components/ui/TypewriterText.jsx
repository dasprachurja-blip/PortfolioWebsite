import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * TypewriterText — types out text character-by-character with a blinking cursor.
 * Supports highlighted segments via the `highlights` prop.
 */
export default function TypewriterText({
  text = '',
  highlights = [],
  speed = 0.04,
  delay = 0.5,
  className = '',
  cursorColor = 'var(--color-brand-teal)',
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    el.innerHTML = '';

    // Build char map: { char, cls }
    const charMap = [];
    let pos = 0;
    while (pos < text.length) {
      let matched = false;
      for (const hl of highlights) {
        if (text.substring(pos).startsWith(hl.word)) {
          for (let j = 0; j < hl.word.length; j++) {
            charMap.push({ char: hl.word[j], cls: hl.className });
          }
          pos += hl.word.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        charMap.push({ char: text[pos], cls: '' });
        pos++;
      }
    }

    // Group consecutive chars with the same class into wrapper spans
    const allCharSpans = [];
    const wrapperRevealMap = []; // track { wrapper, firstCharIndex }
    let i = 0;
    while (i < charMap.length) {
      const cls = charMap[i].cls;

      if (cls) {
        // Find the end of this highlighted run
        let j = i;
        while (j < charMap.length && charMap[j].cls === cls) j++;

        // Create a wrapper span — starts invisible
        const wrapper = document.createElement('span');
        wrapper.className = cls;
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 0.3s ease';

        const firstCharIndex = allCharSpans.length;

        for (let k = i; k < j; k++) {
          const span = document.createElement('span');
          span.textContent = charMap[k].char;
          span.style.opacity = '0';
          span.style.display = 'inline';
          wrapper.appendChild(span);
          allCharSpans.push(span);
        }

        wrapperRevealMap.push({ wrapper, firstCharIndex });
        el.appendChild(wrapper);
        i = j;
      } else {
        const span = document.createElement('span');
        span.textContent = charMap[i].char;
        span.style.opacity = '0';
        span.style.display = 'inline';
        el.appendChild(span);
        allCharSpans.push(span);
        i++;
      }
    }

    // Append blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    cursor.style.color = cursorColor;
    cursor.style.fontWeight = '300';
    cursor.style.marginLeft = '1px';
    el.appendChild(cursor);

    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    });

    // Type each character, revealing highlight wrappers at the right moment
    const tl = gsap.timeline({ delay });
    allCharSpans.forEach((span, idx) => {
      // Check if a highlight wrapper should be revealed at this index
      for (const { wrapper, firstCharIndex } of wrapperRevealMap) {
        if (idx === firstCharIndex) {
          tl.to(wrapper, { opacity: 1, duration: 0.15, ease: 'power2.out' });
        }
      }
      tl.to(span, { opacity: 1, duration: 0.01, ease: 'none' }, `+=${speed}`);
    });

    tl.call(() => gsap.to(cursor, { opacity: 1, duration: 0 }));
    tl.to(cursor, {
      opacity: 0, duration: 0.5,
      repeat: -1, yoyo: true, ease: 'steps(1)', delay: 0.5,
    });

    return () => tl.kill();
  }, [text, speed, delay, cursorColor]);

  return <span ref={containerRef} className={className} style={{ display: 'inline' }} />;
}
