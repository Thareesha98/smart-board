import "./AppointmentCard.css";

export default function AppointmentCard({
  userName,          // Student or Owner
  boardingTitle,
  date,
  time,
  status,
  role,              // "student" or "owner"
  onApprove,
  onReject,
  onCancel,
  onView,
}) {
  return (
    <div className="app-card">

      <div className="app-info">
        <h3 className="app-user">{userName}</h3>
        <p className="app-boarding">{boardingTitle}</p>
        <p className="app-datetime">{date} • {time}</p>
      </div>

      <span className={`app-status ${status}`}>{status}</span>

      <div className="app-actions">

        {/* Owner-side actions */}
        {role === "owner" && status === "pending" && (
          <>
            <button className="app-btn approve" onClick={onApprove}>
              Approve
            </button>

            <button className="app-btn reject" onClick={onReject}>
              Reject
            </button>
          </>
        )}

        {/* Student-side action */}
        {role === "student" && status === "pending" && (
          <button className="app-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        )}

        {/* View is available for all */}
        <button className="app-btn view" onClick={onView}>
          View
        </button>

      </div>
    </div>
  );
}
