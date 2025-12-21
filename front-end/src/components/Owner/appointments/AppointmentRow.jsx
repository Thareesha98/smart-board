import React from "react";

const AppointmentRow = ({
  appointment,
  config,
  onAction,
  formatDate,
  formatTime,
}) => {
  const isPending = appointment.status === "pending";
  const isConfirmed = appointment.status === "confirmed";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 md:p-6 rounded-report shadow-custom bg-card-bg border border-light transition-all duration-300 hover:shadow-md relative overflow-hidden">
      
      {/* 1. Student & Property Details */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-start md:block">
          <h4 className="font-black text-base md:text-lg text-text tracking-tight uppercase">
            {appointment.student}
          </h4>
          {/* Mobile Only: Status Badge at top right */}
          <span className={`md:hidden px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${config.bgClass} ${config.textClass}`}>
             {appointment.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-muted">
          <i className="fas fa-building text-accent"></i>
          <span className="truncate">{appointment.boardingName}</span>
        </div>
      </div>

      {/* 2. Contact & Date (Grid on Mobile for compactness) */}
      <div className="grid grid-cols-2 md:flex md:flex-row flex-[2] gap-4 md:gap-6 py-3 md:py-0 border-y md:border-y-0 border-light/50">
        
        {/* Contact info */}
        <div className="flex flex-col justify-center gap-1 md:flex-1">
          <div className="flex items-center gap-2 font-bold text-text">
            <i className="fas fa-phone text-info text-[10px]"></i>
            <span className="text-xs md:text-sm">{appointment.contact}</span>
          </div>
          <span className="hidden md:block text-[10px] italic text-muted truncate">
            Note: {appointment.notes?.slice(0, 25)}...
          </span>
        </div>

        {/* Date & Time Section */}
        <div className="text-left md:text-center shrink-0 md:w-32 md:border-x border-light md:px-4">
          <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] text-muted mb-0.5 md:mb-1">
            Visit Date
          </div>
          <div className="text-sm md:text-base font-black text-primary leading-none">
            {formatDate(appointment.date)}
          </div>
          <div className="text-[10px] md:text-xs font-bold text-muted mt-0.5">
            {formatTime(appointment.time)}
          </div>
        </div>
      </div>

      {/* 3. Actions & Desktop Status Badge */}
      <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 mt-2 md:mt-0">
        <div className="flex gap-2 w-full md:w-auto">
          {isPending && (
            <>
              <button
                className="flex-1 md:flex-none px-4 py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all bg-success text-white shadow-sm active:scale-95"
                onClick={() => onAction(appointment.id, "confirmed")}
              >
                Confirm
              </button>
              <button
                className="flex-1 md:flex-none px-4 py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest border-2 transition-all border-error text-error active:scale-95"
                onClick={() => onAction(appointment.id, "cancelled")}
              >
                Reject
              </button>
            </>
          )}

          {isConfirmed && (
            <button
              className="w-full md:w-auto px-6 py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all bg-info text-white shadow-sm active:scale-95"
              onClick={() => onAction(appointment.id, "visited")}
            >
              Mark Visited
            </button>
          )}
        </div>

        {/* Desktop Only Status Badge */}
        <span
          className={`hidden md:block px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-inner shrink-0 ${config.bgClass} ${config.textClass}`}
        >
          {appointment.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentRow;