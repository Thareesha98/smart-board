import React from "react";

/**
 * StatusTab component: Responsive Refactor
 * Mobile: Tighter padding, smaller icons, horizontal scroll support.
 * Tablet/Desktop: Full ledger blocks.
 */
const StatusTab = ({ status, count, currentFilter, setFilter, config }) => {
  const isActive = currentFilter === status;

  return (
    <button
      className={`
        relative flex flex-col items-center justify-center gap-1 md:gap-2 
        p-3 md:p-6 rounded-report transition-all duration-300 
        min-w-[100px] md:w-full shrink-0
        ${
          isActive
            ? `${config.colorClass} text-card-bg shadow-lg scale-105 z-10`
            : "bg-light text-muted hover:bg-gray-200 shadow-custom"
        }
      `}
      onClick={() => setFilter(status)}
    >
      {/* Icon - Scaled for mobile */}
      <i className={`${config.icon} text-lg md:text-2xl mb-0.5 md:mb-1`}></i>

      {/* Label - Typography scales down for narrow screens */}
      <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
        {status}
      </span>

      {/* Tab Count Badge - Positioned closer on mobile */}
      <span
        className={`
          absolute -top-1 -right-1 md:-top-2 md:-right-2 
          w-5 h-5 md:w-6 md:h-6 text-[9px] md:text-[10px] 
          flex items-center justify-center font-black rounded-full shadow-sm 
          transition-colors
          ${isActive ? "bg-card-bg text-text" : "bg-primary text-card-bg"}
        `}
      >
        {count}
      </span>
    </button>
  );
};

export default StatusTab;