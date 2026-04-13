import React from 'react';

/**
 * SecondaryButton — outlined box button with glow hover
 * 
 * Props:
 *   children  — button label
 *   onClick   — click handler
 *   className — additional classes
 *   icon      — optional trailing icon (string or element)
 */
const SecondaryButton = ({ children, onClick, className = "", icon = "→" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        border-2 border-brand-teal/30
        bg-brand-teal/5
        text-brand-teal px-10 py-4
        rounded-lg font-bold text-lg tracking-tight
        font-mono cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 active:scale-95
        hover:border-brand-teal/80
        hover:bg-brand-teal/10
        hover:shadow-[0_0_25px_-5px_var(--color-brand-teal),inset_0_0_15px_-8px_var(--color-brand-teal)]
        ${className}
      `}
    >
      {/* Subtle background glow pulse */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-brand-violet/5 to-brand-teal/5 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-2 text-2xl leading-none">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

export default SecondaryButton;
