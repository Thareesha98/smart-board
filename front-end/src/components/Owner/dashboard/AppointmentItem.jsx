import React from "react";

const AppointmentItem = ({ appointment }) => {
  // Mapping statuses to Tailwind utility classes
  const statusStyles = {
    PENDING: "bg-orange-100 text-orange-700", // Uppercase to match Java Enum
    CONFIRMED: "bg-green-100 text-green-700",
    VISITED: "bg-indigo-100 text-indigo-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  // Safe fallback for status
  const status = appointment.status
    ? appointment.status.toUpperCase()
    : "PENDING";
  const currentStatusStyle = statusStyles[status] || statusStyles.PENDING;

  // ✅ FIX: Use 'studentName' and 'boardingTitle' from Backend DTO
  const studentName =
    appointment.studentName || appointment.student || "Unknown";
  const propertyName =
    appointment.boardingTitle || appointment.property || "Unknown Property";
  const avatarUrl =
    appointment.studentAvatar ||
    appointment.avatar ||
    "https://i.pravatar.cc/150";
  // Note: Backend doesn't send time yet, so we format the date
  const timeDisplay = appointment.requestedStartTime
    ? new Date(appointment.requestedStartTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "TBD";

  return (
    <div className="relative flex items-center gap-3 p-4 transition-colors duration-200 border-b md:gap-4 border-light hover:bg-light/30 bg-card-bg">
      {/* Avatar */}
      <div className="w-10 h-10 overflow-hidden border rounded-full shadow-sm md:w-11 md:h-11 shrink-0 border-light">
        <img
          src={avatarUrl}
          alt={studentName}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info Container */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-bold leading-snug text-text">
              {studentName}
            </h4>
            <p className="text-xs text-muted mt-0.5 truncate">{propertyName}</p>
          </div>

          <span
            className={`shrink-0 ml-2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${currentStatusStyle}`}
          >
            {status}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <i className="far fa-clock text-[10px] text-muted/60"></i>
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide text-muted/80">
            {timeDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
