import "./AppointmentsList.css";

export default function AppointmentsList({ appointments = [] }) {
  return (
    <section className="sbms-apptlist-card">
      <h3 className="sbms-apptlist-title">Upcoming Appointments</h3>

      {appointments.length === 0 && (
        <p className="sbms-apptlist-empty">No appointments scheduled.</p>
      )}

      {appointments.map((appt, index) => (
        <div key={index} className="sbms-apptlist-item">

          <div className="sbms-apptlist-left">
            <p className="sbms-apptlist-room">{appt.roomName}</p>
            <p className="sbms-apptlist-date">
              {appt.date} • {appt.time}
            </p>
          </div>

          <span
            className={`sbms-apptlist-status ${
              appt.status === "approved"
                ? "approved"
                : appt.status === "pending"
                ? "pending"
                : "declined"
            }`}
          >
            {appt.status}
          </span>
        </div>
      ))}
    </section>
  );
}
