import React from "react";

const DashboardSection = ({ title, badge, children, className = "" }) => (
  <section className={`space-y-4 ${className}`}>
    {/* Section Header */}
    <h2 className="text-2xl font-black flex items-center gap-2 text-primary tracking-tight">
      {title}
      {badge && (
        <span className="text-[10px] px-2 py-1 rounded-full font-black bg-accent text-white uppercase tracking-widest">
          {badge}
        </span>
      )}
    </h2>

    {/* Section Content Container */}
    <div className="bg-card-bg rounded-report shadow-custom overflow-hidden border border-light">
      {children}
    </div>
  </section>
);

export default DashboardSection;
