import React from "react";

const AppointmentRow = ({ appointment, style, onAction, formatDate, formatTime }) => {
  const isPending = appointment.status === "pending";
  const isConfirmed = appointment.status === "confirmed";

  return (
    <div
      className="appointment-row flex items-center gap-[1.5rem] p-[1.5rem] rounded-[25px] shadow-sm transition duration-300"
      style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
    >
      {/* 1. Student Details */}
      <div className="flex flex-col flex-1 gap-1">
        <h4 className="font-bold text-lg" style={{ color: "var(--text)" }}>{appointment.student}</h4>
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <i className="fas fa-building" style={{ color: "var(--accent)" }}></i>
          <span>{appointment.boardingName}</span>
        </div>
      </div>

      {/* 2. Contact */}
      <div className="flex flex-col flex-1 gap-1 text-sm">
        <div className="flex items-center gap-1 font-semibold" style={{ color: "var(--text)" }}>
          <i className="fas fa-phone" style={{ color: "var(--info)" }}></i>
          <span>{appointment.contact}</span>
        </div>
        <span className="text-xs italic" style={{ color: "var(--muted)" }}>
          Note: {appointment.notes.slice(0, 30)}...
        </span>
      </div>

      {/* 3. Date & Time */}
      <div className="text-center flex-shrink-0 w-32">
        <div className="text-xs uppercase" style={{ color: "var(--muted)" }}>Visit Date</div>
        <div className="text-lg font-bold" style={{ color: "var(--text)" }}>{formatDate(appointment.date)}</div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>{formatTime(appointment.time)}</div>
      </div>

      {/* 4. Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Actions for Pending Status */}
        {isPending && (
          <>
            <button
              className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm transition duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--success)", color: "var(--card-bg)" }}
              onClick={() => onAction(appointment.id, "confirmed")}
            >
              <i className="fas fa-check mr-1"></i> Confirm
            </button>
            <button
              className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm border transition duration-300 hover:scale-105"
              style={{ color: "var(--error)", borderColor: "var(--error)" }}
              onClick={() => onAction(appointment.id, "cancelled")}
            >
              <i className="fas fa-times mr-1"></i> Reject
            </button>
          </>
        )}

        {/* 🌟 New Action for Confirmed Status */}
        {isConfirmed && (
          <button
            className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm transition duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--info)", color: "white" }}
            onClick={() => onAction(appointment.id, "visited")}
          >
            <i className="fas fa-walking mr-1"></i> Mark as Visited
          </button>
        )}

        {/* Status Badge */}
        <span
          className="px-4 py-2 text-xs font-semibold uppercase rounded-[20px]"
          style={{ backgroundColor: style.background, color: style.color }}
        >
          {appointment.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentRow;