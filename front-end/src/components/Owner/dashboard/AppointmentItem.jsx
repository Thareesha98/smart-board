import React from "react";

const AppointmentItem = ({ appointment }) => {
  // Mapping statuses to Tailwind utility classes instead of hex codes
  const statusStyles = {
    pending: "bg-orange-100 text-orange-700",
    confirmed: "bg-green-100 text-green-700",
    visited: "bg-indigo-100 text-indigo-700",
  };

  const currentStatusStyle =
    statusStyles[appointment.status] || statusStyles.pending;

  return (
    <div
      className={`flex items-center gap-4 p-5 border-b border-light relative transition-colors duration-300 ${
        appointment.isNew ? "bg-accent/5" : "bg-card-bg"
      }`}
    >
      {/* New Appointment Indicator */}
      {appointment.isNew && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
      )}

      {/* Student Avatar */}
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-light">
        <img
          src={appointment.avatar}
          alt={appointment.student}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Appointment Info */}
      <div className="flex-1">
        <p className="font-bold text-sm text-text mb-0.5">
          <strong className="text-primary font-black">
            {appointment.student}
          </strong>{" "}
          — {appointment.property}
        </p>
        <span className="text-[11px] block text-muted mb-1 font-bold uppercase tracking-wider">
          {appointment.time}
        </span>

        {/* Status Badge */}
        <span
          className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${currentStatusStyle}`}
        >
          {appointment.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentItem;
