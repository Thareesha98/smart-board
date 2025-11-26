// src/pages/student/MyAppointmentsPage.jsx
import "./MyAppointmentsPage.css";

export default function MyAppointmentsPage() {
  const appointments = [
    {
      id: "a1",
      boarding: "Cozy Room in Colombo 05",
      location: "Colombo 05",
      date: "2025-02-20",
      time: "2:00 PM",
      status: "approved",
    },
    {
      id: "a2",
      boarding: "Shared Room for Female Students",
      location: "Colombo 07",
      date: "2025-02-25",
      time: "10:00 AM",
      status: "pending",
    },
  ];

  const formatDate = (d) => new Date(d).toDateString();

  return (
    <div className="appointments-page">

      <h2 className="appointments-title">My Appointments</h2>

      <div className="appointments-list">
        {appointments.map((a) => (
          <div key={a.id} className="appointment-card">

            <h3 className="appointment-title">{a.boarding}</h3>

            <p className="appointment-location">{a.location}</p>

            <p className="appointment-datetime">
              {formatDate(a.date)} • {a.time}
            </p>

            <span className={`appointment-status ${a.status}`}>
              {a.status}
            </span>

            <div className="appointment-actions">
              <button
                className="appointment-btn view"
                onClick={() => alert("Details coming soon")}
              >
                View Details
              </button>

              <button
                className="appointment-btn cancel"
                onClick={() => alert("Cancel feature coming soon")}
              >
                Cancel
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
