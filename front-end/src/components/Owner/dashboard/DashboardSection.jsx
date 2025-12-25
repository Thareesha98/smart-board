import React from "react";

const DashboardSection = ({ title, badge, children, className = "" }) => (
  <section className={`space-y-3 md:space-y-4 ${className}`}>
    {/* Section Header - Responsive Sizing */}
    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
      <h2 className="text-xl md:text-2xl font-black flex items-center gap-2 text-primary tracking-tight uppercase">
        {title}
        {badge && (
          <span className="text-[9px] md:text-[10px] px-2 py-0.5 md:py-1 rounded-full font-black bg-accent text-white uppercase tracking-widest shadow-sm">
            {badge}
          </span>
        )}
      </h2>
      
      {/* Optional slot for "View All" links often found in dashboard sections */}
      <div className="hidden sm:block">
        {/* You can pass a 'viewAll' prop if needed in the future */}
      </div>
    </div>

    {/* Section Content Container - Architectural Depth */}
    <div className="bg-card-bg rounded-boarding md:rounded-report shadow-custom overflow-hidden border border-light transition-all duration-300">
      {/* Note: We don't add padding here so that lists (ActivityItem/AppointmentItem) 
          can go edge-to-edge (flush) with the borders.
      */}
      {children}
    </div>
  </section>
);

export default DashboardSection;