import React from "react";

const StatWidget = ({ icon, title, mainValue, subValue }) => (
  <div className="flex p-6 rounded-report shadow-custom transition-all duration-300 hover:-translate-y-1 relative bg-card-bg border border-light">
    {/* Icon Container */}
    <div className="p-4 rounded-card text-2xl shrink-0 bg-light text-accent flex items-center justify-center">
      <i className={icon}></i>
    </div>

    {/* Content Area */}
    <div className="ml-4 flex-1">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-0.5">
        <strong className="text-xl font-black text-text tracking-tight">
          {mainValue}
        </strong>
        <span className="text-xs font-medium text-muted">{subValue}</span>
      </div>
    </div>
  </div>
);

export default StatWidget;
