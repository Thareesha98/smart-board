import { Link } from "react-router-dom";

export const AppointmentItem = ({ appointment }) => {
  const statusColor =
    appointment.status === "pending"
      ? "#D97706"
      : appointment.status === "confirmed"
      ? "#065F46"
      : "#3730A3";
  const bgColor =
    appointment.status === "pending"
      ? "#FEF3C7"
      : appointment.status === "confirmed"
      ? "#D1FAE5"
      : "#E0E7FF";

  return (
    <div
      className={`appointment-item flex items-center gap-4 p-5 border-b relative transition duration-300 hover:bg-opacity-50 ${
        appointment.isNew ? "new" : ""
      }`}
      style={{
        borderColor: 'var(--light)',
        backgroundColor: appointment.isNew
          ? "rgba(255, 122, 0, 0.05)"
          : 'var(--card-bg)',
      }}
    >
      {appointment.isNew && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
          style={{ backgroundColor: 'var(--accent)' }}
        ></div>
      )}

      <div className="appointment-avatar w-[45px] h-[45px] rounded-full overflow-hidden shrink-0">
        <img
          src={appointment.avatar}
          alt={appointment.student}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="appointment-content flex-1">
        <p className="font-semibold mb-0.5" style={{ color: 'var(--text)' }}>
          <strong style={{ color: 'var(--primary)' }}>
            {appointment.student}
          </strong>{" "}
          - {appointment.property}
        </p>
        <span
          className="appointment-time text-sm block"
          style={{ color: 'var(--muted)' }}
        >
          {appointment.time}
        </span>
        <span
          className="appointment-status text-xs px-2 py-[0.2rem] rounded-xl font-semibold"
          style={{ backgroundColor: bgColor, color: statusColor }}
        >
          {appointment.status.toUpperCase()}
        </span>
      </div>

    </div>
  );
};