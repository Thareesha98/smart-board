import React from "react";

const InfoItem = ({ label, value, fullWidth = false }) => (
  <div
    className={`
      info-item flex flex-col gap-0.5 md:gap-1 p-3 md:p-4 rounded-xl transition-all duration-300 
      hover:bg-light/50 border border-transparent hover:border-light/20
      ${fullWidth ? "col-span-full" : "col-span-1"}
    `}
  >
    {/* Label: Slightly smaller on mobile to save vertical space */}
    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted/70 leading-relaxed">
      {label}
    </label>

    {/* Value: Wrapping enabled for long email addresses or physical addresses */}
    <p className="text-sm md:text-base font-bold text-text break-words leading-tight">
      {value}
    </p>
  </div>
);

export default InfoItem;