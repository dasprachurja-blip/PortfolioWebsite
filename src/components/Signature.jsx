import { useRef, useEffect, useState, useCallback } from "react";

const STROKES = [
  // P
  { d: "M 55,55 L 55,178", delay: 0 },
  { d: "M 55,55 C 78,48 108,52 114,72 C 122,96 104,118 55,112", delay: 0.12 },
  // r
  { d: "M 122,112 L 122,162", delay: 0.32 },
  { d: "M 122,126 C 133,112 146,109 154,114", delay: 0.42 },
  // a
  { d: "M 182,118 C 167,108 150,116 150,136 C 150,156 167,163 182,152 L 182,162", delay: 0.56 },
  { d: "M 182,118 L 182,162", delay: 0.56 },
  // c
  { d: "M 218,120 C 204,108 186,114 186,136 C 186,158 204,164 218,152", delay: 0.74 },
  // h
  { d: "M 226,88 L 226,162", delay: 0.9 },
  { d: "M 226,128 C 238,113 258,110 264,124 L 264,162", delay: 1.0 },
  // u
  { d: "M 272,110 C 272,145 272,154 280,158 C 290,163 300,152 310,132", delay: 1.16 },
  { d: "M 310,110 L 310,162", delay: 1.16 },
  // r
  { d: "M 318,110 L 318,162", delay: 1.3 },
  { d: "M 318,124 C 330,110 344,108 352,114", delay: 1.38 },
  // j
  { d: "M 362,110 L 362,172 C 362,186 352,192 342,188", delay: 1.52 },
  { d: "M 358,92 C 360,88 366,88 368,92", delay: 1.58 },
  // a
  { d: "M 398,118 C 383,108 366,116 366,136 C 366,156 383,163 398,152 L 398,162", delay: 1.68 },
  { d: "M 398,118 L 398,162", delay: 1.68 },
  // D
  { d: "M 430,88 L 430,182", delay: 1.92 },
  { d: "M 430,88 C 468,85 492,100 492,135 C 492,170 468,183 430,182", delay: 1.98 },
  // a
  { d: "M 532,118 C 517,108 500,116 500,136 C 500,156 517,163 532,152 L 532,162", delay: 2.22 },
  { d: "M 532,118 L 532,162", delay: 2.22 },
  // s
  { d: "M 568,118 C 554,108 540,116 542,128 C 544,138 560,140 564,150 C 568,162 556,170 540,164", delay: 2.42 },
  // flourish underline
  { d: "M 46,200 C 180,216 360,220 545,206 C 585,202 608,194 622,184 C 594,222 44,226 38,208 Z", delay: 2.85, flourish: true },
];

function Stroke({ d, delay, flourish, animKey, colorPrimary, colorAccent }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const len = el.getTotalLength ? el.getTotalLength() : 800;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.style.animation = "none";
    void el.offsetWidth;
    const dur = flourish ? 1.1 : 0.5;
    el.style.animation = `draw ${dur}s cubic-bezier(0.3,0,0.2,1) ${delay}s forwards`;
  }, [animKey]);

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke={flourish ? colorAccent : colorPrimary}
      strokeWidth={flourish ? 1.8 : 3.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={flourish ? 0.45 : 1}
      style={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
    />
  );
}

export default function Signature({ className = "" }) {
  const [animKey, setAnimKey] = useState(0);

  // We can default back to original colors or use CSS Vars (var(--color-brand-violet))
  const colorPrimary = "#7864ff"; // Using brand-violet
  const colorAccent = "#64dcb4"; // Using brand-teal

  // Adjusted the wrapper slightly so it fits beautifully inline
  return (
    <div className={`inline-flex items-center relative ${className}`}>
      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>

      {/* Replaced fixed widths with highly scalable ones to fit naturally in context */}
      <svg className="w-[180px] sm:w-[220px] md:w-[300px] lg:w-[400px] h-auto drop-shadow-xl" viewBox="0 0 630 245" preserveAspectRatio="xMinYMid meet">
        {STROKES.map((s, i) => (
          <Stroke key={i} {...s} animKey={animKey} colorPrimary={colorPrimary} colorAccent={colorAccent} />
        ))}
      </svg>
    </div>
  );
}
