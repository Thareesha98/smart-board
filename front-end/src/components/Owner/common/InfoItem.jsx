import React from "react";

const InfoItem = ({ label, value, fullWidth = false }) => (
  <div
    className={`
      info-item flex flex-col gap-1 p-4 rounded-xl transition-colors duration-300 
      hover:bg-light/30 
      ${fullWidth ? "col-span-full" : ""}
    `}
  >
    <label className="text-[10px] font-black uppercase tracking-widest text-muted">
      {label}
    </label>
    <p className="text-base font-medium text-text">{value}</p>
  </div>
);

export default InfoItem;
