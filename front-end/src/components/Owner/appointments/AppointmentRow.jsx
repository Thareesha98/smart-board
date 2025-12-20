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
    <div className="flex items-center gap-6 p-6 rounded-report shadow-custom bg-card-bg border border-light transition-all duration-300 hover:shadow-md">
      {/* 1. Student Details */}
      <div className="flex flex-col flex-1 gap-1">
        <h4 className="font-black text-lg text-text tracking-tight">
          {appointment.student}
        </h4>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          <i className="fas fa-building text-accent"></i>
          <span>{appointment.boardingName}</span>
        </div>
      </div>

      {/* 2. Contact & Notes */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center gap-2 font-bold text-text">
          <i className="fas fa-phone text-info text-xs"></i>
          <span className="text-sm">{appointment.contact}</span>
        </div>
        <span className="text-xs italic text-muted">
          Note: {appointment.notes?.slice(0, 30)}...
        </span>
      </div>

      {/* 3. Date & Time */}
      <div className="text-center shrink-0 w-32 border-x border-light px-4">
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-1">
          Visit Date
        </div>
        <div className="text-base font-black text-primary leading-none">
          {formatDate(appointment.date)}
        </div>
        <div className="text-xs font-bold text-muted mt-1">
          {formatTime(appointment.time)}
        </div>
      </div>

      {/* 4. Actions & Status Badge */}
      <div className="flex items-center gap-4 ml-auto">
        {isPending && (
          <>
            <button
              className="px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all bg-success text-white shadow-sm hover:scale-105"
              onClick={() => onAction(appointment.id, "confirmed")}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all border-error text-error hover:bg-error hover:text-white hover:scale-105"
              onClick={() => onAction(appointment.id, "cancelled")}
            >
              Reject
            </button>
          </>
        )}

        {isConfirmed && (
          <button
            className="px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all bg-info text-white shadow-sm hover:scale-105"
            onClick={() => onAction(appointment.id, "visited")}
          >
            Mark Visited
          </button>
        )}

        {/* --- FIXED STATUS BADGE --- */}
        <span
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-inner ${config.bgClass} ${config.textClass}`}
        >
          {appointment.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentRow;
