import React from 'react';

/**
 * PrimaryButton — gradient CTA with glow hover effect
 * 
 * Props:
 *   children  — button label
 *   onClick   — click handler
 *   className — additional classes
 */
const PrimaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        bg-gradient-to-tr from-brand-violet to-brand-teal
        text-white px-10 py-4
        rounded-lg font-bold text-lg tracking-tight
        font-mono cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 active:scale-95
        hover:shadow-[0_0_30px_-5px_var(--color-brand-teal)]
        ${className}
      `}
    >
      {/* Shine sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
