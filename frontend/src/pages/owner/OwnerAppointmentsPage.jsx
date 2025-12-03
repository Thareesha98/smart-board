// src/pages/owner/OwnerAppointmentsPage.jsx
import "./OwnerAppointmentsPage.css";

export default function OwnerAppointmentsPage() {
  const appointments = [
    {
      id: "oa1",
      student: "John Doe",
      boarding: "Cozy Room in Colombo 07",
      date: "2025-02-22",
      time: "2:00 PM",
      status: "pending",
    },
    {
      id: "oa2",
      student: "Sarah Silva",
      boarding: "Shared Room for Girls",
      date: "2025-02-25",
      time: "10:00 AM",
      status: "approved",
    },
    {
      id: "oa3",
      student: "Kevin Perera",
      boarding: "Studio Apartment",
      date: "2025-03-01",
      time: "4:00 PM",
      status: "rejected",
    },
  ];

  const formatDate = (d) => new Date(d).toDateString();

  return (
    <div className="owner-app-page">

      <h2 className="owner-app-title">Appointments</h2>

      <div className="owner-app-list">
        {appointments.map((a) => (
          <div key={a.id} className="owner-app-card">

            <h3 className="owner-app-student">{a.student}</h3>

            <p className="owner-app-boarding">{a.boarding}</p>

            <p className="owner-app-datetime">
              {formatDate(a.date)} • {a.time}
            </p>

            <span className={`owner-app-status ${a.status}`}>
              {a.status}
            </span>

            <div className="owner-app-actions">

              {a.status === "pending" && (
                <>
                  <button
                    className="owner-app-btn approve"
                    onClick={() => alert("Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="owner-app-btn reject"
                    onClick={() => alert("Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                className="owner-app-btn view"
                onClick={() => alert("View details coming soon")}
              >
                View
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
