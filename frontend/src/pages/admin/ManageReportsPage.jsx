// src/pages/admin/ManageReportsPage.jsx
import "./ManageReportsPage.css";

export default function ManageReportsPage() {
  const reports = [
    {
      id: "r1",
      type: "Harassment",
      sender: "John Doe (Student)",
      reportedUser: "Lakshan Perera (Owner)",
      description: "Owner behaved rudely during visit.",
      status: "pending",
    },
    {
      id: "r2",
      type: "Fake Image",
      sender: "Anjali Silva (Student)",
      reportedUser: "Kevin Perera (Owner)",
      description: "Boarding images do not match real room.",
      status: "reviewing",
    },
    {
      id: "r3",
      type: "Spam Ad",
      sender: "System Auto Report",
      reportedUser: "N/A",
      description: "Multiple suspicious repeated ads detected.",
      status: "resolved",
    },
  ];

  return (
    <div className="reports-page">
      <h2 className="reports-title">Manage Reports</h2>

      <div className="reports-list">
        {reports.map((r) => (
          <div key={r.id} className="report-card">

            {/* Info Section */}
            <div className="report-info">
              <h3 className="report-type">{r.type}</h3>

              <p className="report-sender">
                <strong>From:</strong> {r.sender}
              </p>

              <p className="report-user">
                <strong>Reported User:</strong> {r.reportedUser}
              </p>

              <p className="report-desc">{r.description}</p>
            </div>

            {/* Status */}
            <span className={`report-status ${r.status}`}>
              {r.status}
            </span>

            {/* Action Buttons */}
            <div className="report-actions">

              {/* Pending */}
              {r.status === "pending" && (
                <>
                  <button
                    className="report-btn review"
                    onClick={() => alert(`Reviewing report ${r.id}`)}
                  >
                    Review
                  </button>

                  <button
                    className="report-btn resolve"
                    onClick={() => alert(`Resolved report ${r.id}`)}
                  >
                    Mark Resolved
                  </button>
                </>
              )}

              {/* Reviewing */}
              {r.status === "reviewing" && (
                <button
                  className="report-btn resolve"
                  onClick={() => alert(`Resolved report ${r.id}`)}
                >
                  Mark Resolved
                </button>
              )}

              {/* Delete (always available) */}
              <button
                className="report-btn delete"
                onClick={() => alert(`Deleted report ${r.id}`)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
