import React from "react";

const StatWidget = ({ icon, title, mainValue, subValue }) => (
  <div className="
    flex p-4 md:p-6 rounded-boarding md:rounded-report shadow-custom 
    transition-all duration-300 hover:-translate-y-1 relative 
    bg-card-bg border border-light w-full
  ">
    {/* Icon Container - Scaled for smaller devices */}
    <div className="
      p-3 md:p-4 rounded-card text-xl md:text-2xl shrink-0 
      bg-light text-accent flex items-center justify-center
      w-12 h-12 md:w-16 md:h-16
    ">
      <i className={icon}></i>
    </div>

    {/* Content Area */}
    <div className="ml-3 md:ml-4 flex-1 min-w-0">
      <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted/80 mb-1 md:mb-2 truncate">
        {title}
      </h3>
      <div className="flex flex-col">
        {/* Main Value - Uses tracking-tighter for large numbers on mobile */}
        <strong className="text-lg md:text-xl font-black text-text tracking-tighter md:tracking-tight truncate">
          {mainValue}
        </strong>
        
        {/* Sub Value - Reduced opacity for cleaner hierarchy on mobile */}
        <span className="text-[10px] md:text-xs font-medium text-muted truncate">
          {subValue}
        </span>
      </div>
    </div>
  </div>
);

export default StatWidget;