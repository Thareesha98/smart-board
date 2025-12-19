const AppointmentItem = ({ appointment }) => {
  const themes = {
    pending: { color: "#D97706", bg: "#FEF3C7" },
    confirmed: { color: "#065F46", bg: "#D1FAE5" },
    visited: { color: "#3730A3", bg: "#E0E7FF" },
  };
  const theme = themes[appointment.status] || themes.pending;

  return (
    <div 
      className={`flex items-center gap-4 p-5 border-b border-(--light) relative transition ${appointment.isNew ? "bg-orange-50/30" : "bg-[var(--card-bg)]"}`}
    >
      {appointment.isNew && <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--accent)" />}
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
        <img src={appointment.avatar} alt={appointment.student} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <p className="font-semibold mb-0.5 text-(--text)">
          <strong className="text-(--primary)">{appointment.student}</strong> - {appointment.property}
        </p>
        <span className="text-sm block text-(--muted) mb-1">{appointment.time}</span>
        <span className="text-xs px-2 py-1 rounded-xl font-semibold uppercase" style={{ backgroundColor: theme.bg, color: theme.color }}>
          {appointment.status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentItem;