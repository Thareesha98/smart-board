import React from "react";
import { Link } from "react-router-dom";

const DashButton = ({ to, icon, label }) => (
  <Link
    to={to}
    className="
      group flex items-center gap-3 md:gap-4 
      p-3.5 md:p-3 px-4 md:px-5 
      rounded-xl md:rounded-report 
      transition-all duration-300 no-underline
      bg-card-bg text-text border border-light shadow-sm
      w-full sm:w-auto
      
      /* Hover effects only for devices that support hover */
      hover:md:bg-accent hover:md:text-white hover:md:-translate-y-0.5 hover:md:shadow-accent/20
      
      /* Active state for mobile touch feedback */
      active:scale-95 active:bg-accent active:text-white
    "
  >
    {/* Icon - Scaled slightly for mobile visibility */}
    <div className="flex items-center justify-center w-6 h-6 md:w-5 md:h-5 shrink-0">
      <i
        className={`${icon} text-lg md:text-base transition-transform group-hover:scale-110`}
      ></i>
    </div>

    {/* Label - Architectural Ledger Typography */}
    <span className="text-[11px] md:text-xs font-black uppercase tracking-widest md:tracking-tight leading-none">
      {label}
    </span>

    {/* Mobile only: Right arrow to indicate navigation */}
    <i className="fas fa-chevron-right ml-auto text-[10px] opacity-30 md:hidden"></i>
  </Link>
);

export default DashButton;