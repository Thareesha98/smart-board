import React from "react";

/**
 * Property Header with status indicator
 */
export const PropertyHeader = ({
  boarding,
  isPaid,
  currentMonth,
  headerBg,
}) => (
  <div
    className={`p-8 ${headerBg} text-white relative transition-all duration-500`}
  >
    {/* Status Light */}
    <div className="absolute top-0 right-0 p-5">
      <div
        className={`w-3 h-3 rounded-full border-2 border-white/30 ${
          isPaid
            ? "bg-green-400 shadow-[0_0_15px_#4ade80]"
            : "bg-white animate-pulse"
        }`}
      ></div>
    </div>

    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
        Ref: {boarding.id}
      </span>
      <h3 className="text-2xl font-black tracking-tight leading-tight">
        {boarding.name}
      </h3>
      <div className="flex items-center gap-2 mt-2 opacity-70">
        <i className="fas fa-calendar-alt text-[10px]"></i>
        <p className="text-[11px] font-bold uppercase tracking-widest">
          Cycle: {currentMonth}
        </p>
      </div>
    </div>
  </div>
);

/**
 * Payment Progress bar using v3 utilities
 */
export const PaymentProgress = ({ isPaid, progress }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
      <span className="text-muted">Payment Progress</span>
      <span className={isPaid ? "text-success" : "text-accent"}>
        {progress}%
      </span>
    </div>

    {/* Progress Track */}
    <div className="h-3 bg-light rounded-full overflow-hidden p-0.5 shadow-inner">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${
          isPaid
            ? "bg-success shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            : "bg-accent shadow-[0_0_10px_rgba(255,122,0,0.3)]"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

/**
 * Small data display box
 */
export const InfoBox = ({ label, value }) => (
  <div className="p-4 bg-light/30 rounded-2xl border border-light flex flex-col items-center text-center transition-colors hover:bg-light/50">
    <span className="text-[8px] font-black text-muted uppercase tracking-widest mb-1">
      {label}
    </span>
    <span className="text-xs font-bold text-text">{value}</span>
  </div>
);
