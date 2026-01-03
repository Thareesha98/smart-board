import React from "react";

const BoostButton = ({ isBoosted, onBoostClick }) => {
  // --- Boosted State (Read-Only / Active Listing) ---
  if (isBoosted) {
    return (
      <button
        className="flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-primary text-card-bg cursor-default shadow-lg opacity-90 border border-white/10"
      >
        <i className="fas fa-bolt mr-2 text-white animate-pulse"></i> 
        Boosted
      </button>
    );
  }

  // --- Active State (Actionable / Purchase Boost) ---
  return (
    <button
      className="flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-success text-card-bg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group border border-transparent hover:border-white/20"
      onClick={onBoostClick}
    >
      <i className="fas fa-bolt mr-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"></i> 
      Boost Ad
    </button>
  );
};

export default BoostButton;