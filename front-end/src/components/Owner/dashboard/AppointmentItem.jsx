import React from "react";

const AppointmentItem = ({ appointment }) => {
  // Mapping statuses to Tailwind utility classes
  const statusStyles = {
    pending: "bg-orange-100 text-orange-700",
    confirmed: "bg-green-100 text-green-700",
    visited: "bg-indigo-100 text-indigo-700",
  };

  const currentStatusStyle =
    statusStyles[appointment.status] || statusStyles.pending;

  return (
    <div
      className={`
        flex items-start sm:items-center gap-3 md:gap-4 p-4 md:p-5 border-b border-light relative transition-all duration-300
        ${appointment.isNew ? "bg-accent/5" : "bg-card-bg"}
        hover:bg-light/20 active:bg-light/40
      `}
    >
      {/* New Appointment Indicator */}
      {appointment.isNew && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
      )}

      {/* Student Avatar: Scaled slightly smaller for mobile */}
      <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shrink-0 border border-light shadow-sm">
        <img
          src={appointment.avatar}
          alt={appointment.student}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Appointment Info */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="font-bold text-xs md:text-sm text-text mb-1 leading-snug break-words">
          <strong className="text-primary font-black uppercase tracking-tight">
            {appointment.student}
          </strong>{" "}
          <span className="text-muted/60 hidden xs:inline">—</span>{" "}
          <span className="block xs:inline text-muted md:text-text italic md:not-italic">
            {appointment.property}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Time: Scaled down for mobile */}
          <span className="text-[9px] md:text-[11px] block text-muted/80 font-black uppercase tracking-widest leading-none">
            {appointment.time}
          </span>

          {/* Status Badge */}
          <span
            className={`
              w-fit text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest 
              ${currentStatusStyle}
            `}
          >
            {appointment.status}
          </span>
        </div>
      </div>

      {/* Optional: Desktop-only Action Icon */}
      <div className="hidden md:block text-muted/30 group-hover:text-accent transition-colors">
        <i className="fas fa-chevron-right text-xs"></i>
      </div>
    </div>
  );
};

export default AppointmentItem;