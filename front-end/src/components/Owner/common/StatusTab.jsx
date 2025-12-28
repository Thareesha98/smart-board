import React from "react";


const StatusTab = ({ status, count, currentFilter, setFilter, config }) => {
  const isActive = currentFilter === status;

  return (
    <button
      className={`
        relative flex flex-col items-center justify-center transition-all duration-300 w-full
        /* Mobile: Small padding & gap | Desktop: Original p-6 & gap-2 */
        p-2 gap-1 md:p-6 md:gap-2 rounded-report
        ${
          isActive
            ? `${config.colorClass} text-card-bg shadow-lg scale-105`
            : "bg-light text-muted hover:bg-gray-200 shadow-custom"
        }
      `}
      onClick={() => setFilter(status)}
    >
      {/* Icon - Smaller on mobile */}
      <i className={`${config.icon} text-lg md:text-2xl mb-0.5 md:mb-1`}></i>

      {/* Label - Smaller font & tighter tracking on mobile */}
      <span className="text-[8px] md:text-[11px] font-black uppercase tracking-wider md:tracking-[0.2em] truncate w-full text-center">
        {status}
      </span>

      {/* Tab Count Badge - Smaller size & font on mobile */}
      <span
        className={`
          absolute flex items-center justify-center font-black rounded-full shadow-sm transition-colors
          /* Mobile: Small 16px badge | Desktop: Original 24px badge */
          w-4 h-4 text-[8px] -top-1 -right-1
          md:w-6 md:h-6 md:text-[10px] md:-top-2 md:-right-2
          ${isActive ? "bg-card-bg text-text" : "bg-primary text-card-bg"}
        `}
      >
        {count}
      </span>
    </button>
  );
};

export default StatusTab;
