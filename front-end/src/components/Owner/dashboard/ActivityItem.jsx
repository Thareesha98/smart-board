import React from "react";

const ActivityItem = ({ data }) => (
  <div className="flex items-center gap-4 p-5 border-b border-light transition-colors duration-300 hover:bg-light/20">
    {/* Icon Container */}
    <div className="w-11 h-11 p-3 rounded-card text-lg flex items-center justify-center shrink-0 bg-light text-accent">
      <i className={data.icon}></i>
    </div>

    {/* Content Area */}
    <div className="flex-1">
      <p className="text-sm font-medium text-text mb-0.5">
        {data.text}{" "}
        <strong className="text-primary font-bold">{data.bold}</strong>
      </p>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
        {data.time}
      </span>
    </div>
  </div>
);

export default ActivityItem;
