import React from "react";

const AppointmentItem = ({ appointment }) => {
  // Mapping statuses to Tailwind utility classes (Preserved from original)
  const statusStyles = {
    pending: "bg-orange-100 text-orange-700",
    confirmed: "bg-green-100 text-green-700",
    visited: "bg-indigo-100 text-indigo-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const currentStatusStyle =
    statusStyles[appointment.status] || statusStyles.pending;

  return (
    <div
      className={`
        group flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 p-4 md:p-5 
        border-b border-light relative transition-all duration-300
        ${appointment.isNew ? "bg-accent/5" : "bg-card-bg"}
        hover:bg-light/30
      `}
    >
      {/* New Appointment Indicator (Left Border) */}
      {appointment.isNew && (
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-accent" />
      )}

      {/* Top Row: Avatar + Info */}
      <div className="flex items-center flex-1 gap-3 md:gap-4">
        {/* Student Avatar */}
        <div className="w-10 h-10 overflow-hidden border rounded-full shadow-sm md:w-11 md:h-11 shrink-0 border-light">
          <img
            src={appointment.avatar}
            alt={appointment.student}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Appointment Text Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <h4 className="text-sm font-bold leading-snug text-text">
              {appointment.student}
            </h4>
            <span className="hidden text-xs xs:inline text-muted/40">•</span>
            <span className="text-xs truncate text-muted">
              {appointment.property}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Time */}
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-muted/80">
              {appointment.time}
            </span>

            {/* Status Badge */}
            <span
              className={`
                px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest
                ${currentStatusStyle}
              `}
            >
              {appointment.status}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Container 
          - Mobile: Always visible, stacked below info if needed or inline
          - Desktop: Hidden by default, appears on Hover
      */}
      <div
        className="flex items-center justify-end w-full gap-2 mt-2 transition-all duration-300 opacity-100 sm:mt-0 sm:w-auto sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0"
      >
        {/* Confirm Button */}
        <button
          className="flex items-center justify-center flex-1 px-3 text-green-600 transition-all border border-green-100 rounded-lg sm:flex-none h-9 sm:h-8 sm:px-0 sm:w-8 sm:rounded-full bg-green-50 hover:bg-green-100 hover:scale-110 sm:border-transparent"
          title="Confirm Appointment"
          onClick={(e) => {
            e.preventDefault();
            // Add your confirm logic here
            console.log("Confirmed", appointment.id);
          }}
        >
          <i className="text-xs fas fa-check"></i>
          <span className="ml-2 text-xs font-bold sm:hidden">Confirm</span>
        </button>

        {/* Reject Button */}
        <button
          className="flex items-center justify-center flex-1 px-3 text-red-600 transition-all border border-red-100 rounded-lg sm:flex-none h-9 sm:h-8 sm:px-0 sm:w-8 sm:rounded-full bg-red-50 hover:bg-red-100 hover:scale-110 sm:border-transparent"
          title="Decline Appointment"
          onClick={(e) => {
            e.preventDefault();
            // Add your reject logic here
            console.log("Rejected", appointment.id);
          }}
        >
          <i className="text-xs fas fa-times"></i>
          <span className="ml-2 text-xs font-bold sm:hidden">Decline</span>
        </button>

        {/* Desktop Details Chevron (Optional, for when not hovering buttons) */}
        <div className="hidden ml-2 sm:block sm:group-hover:hidden text-muted/30">
          <i className="text-xs fas fa-ellipsis-v"></i>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
