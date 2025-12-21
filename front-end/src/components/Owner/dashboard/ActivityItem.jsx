import React from "react";

const ActivityItem = ({ data }) => (
  <div className="flex items-start md:items-center gap-3 md:gap-4 p-4 md:p-5 border-b border-light transition-all duration-300 hover:bg-light/30 group">
    
    {/* Icon Container - Scaled for mobile */}
    <div className="
      w-9 h-9 md:w-11 md:h-11 rounded-card text-base md:text-lg flex items-center justify-center shrink-0 
      bg-light text-accent transition-transform group-hover:scale-110
    ">
      <i className={data.icon}></i>
    </div>

    {/* Content Area */}
    <div className="flex-1 min-w-0">
      <p className="text-xs md:text-sm font-medium text-text mb-0.5 leading-relaxed break-words">
        {data.text}{" "}
        <strong className="text-primary font-black tracking-tight">{data.bold}</strong>
      </p>
      
      <div className="flex items-center gap-2">
        {/* Decorative dot for mobile timeline feel */}
        <span className="w-1 h-1 rounded-full bg-accent/40 md:hidden"></span>
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted/70">
          {data.time}
        </span>
      </div>
    </div>

    {/* Optional: Right-side chevron for desktop to imply interactivity */}
    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-muted/30">
      <i className="fas fa-chevron-right text-xs"></i>
    </div>
  </div>
);

export default ActivityItem;