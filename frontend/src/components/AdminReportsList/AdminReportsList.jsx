import "./AdminReportsList.css";

export default function AdminReportsList({
  reports = [],
  onResolve,
  onRemove,
  onReview,
}) {
  return (
    <section className="sbms-reports-card">

      <h3 className="sbms-reports-title">User Reports</h3>

      {reports.length === 0 && (
        <p className="sbms-reports-empty">No reports found.</p>
      )}

      {reports.map((r, index) => (
        <div key={index} className="sbms-reports-item">

          {/* Info Left Side */}
          <div className="sbms-reports-info">

            <p className="sbms-reports-from">
              <strong>From:</strong> {r.sender}
            </p>

            <p className="sbms-reports-against">
              <strong>Against:</strong> {r.against}
            </p>

            <p className="sbms-reports-type">
              <strong>Type:</strong> {r.type}
            </p>

            <p className="sbms-reports-desc">{r.description}</p>

          </div>

          {/* Action Buttons */}
          <div className="sbms-reports-actions">
            <button className="sbms-reports-btn primary" onClick={() => onReview(r)}>
              Mark Reviewed
            </button>
            <button className="sbms-reports-btn success" onClick={() => onResolve(r)}>
              Resolve
            </button>
            <button className="sbms-reports-btn danger" onClick={() => onRemove(r)}>
              Remove
            </button>
          </div>

        </div>
      ))}
    </section>
  );
}
