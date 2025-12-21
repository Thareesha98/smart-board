import React from "react";

/**
 * StatusTab component refactored for Tailwind CSS v3.
 * Uses config-based utility classes for dynamic styling.
 */
const StatusTab = ({ status, count, currentFilter, setFilter, config }) => {
  const isActive = currentFilter === status;

  return (
    <button
      className={`
        relative flex flex-col items-center gap-2 p-6 rounded-report transition-all duration-300 w-full
        ${
          isActive
            ? `${config.colorClass} text-card-bg shadow-lg scale-105`
            : "bg-light text-muted hover:bg-gray-200 shadow-custom"
        }
      `}
      onClick={() => setFilter(status)}
    >
      {/* Icon - Inherits color from parent text class or specific config */}
      <i className={`${config.icon} text-2xl mb-1`}></i>

      {/* Label - Architectural Ledger Typography */}
      <span className="text-[11px] font-black uppercase tracking-[0.2em]">
        {status}
      </span>

      {/* Tab Count Badge */}
      <span
        className={`
          absolute -top-2 -right-2 w-6 h-6 text-[10px] flex items-center justify-center font-black rounded-full shadow-sm transition-colors
          ${isActive ? "bg-card-bg text-text" : "bg-primary text-card-bg"}
        `}
      >
        {count}
      </span>
    </button>
  );
};

export default StatusTab;
