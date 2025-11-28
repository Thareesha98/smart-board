const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "New":
      return {
        background: "rgba(255, 122, 0, 0.1)",
        color: "var(--accent)",
        icon: "fas fa-flag",
      };
    case "In Progress":
      return {
        background: "rgba(59, 130, 246, 0.1)",
        color: "var(--info)",
        icon: "fas fa-sync-alt",
      };
    case "Resolved":
      return {
        background: "rgba(16, 185, 129, 0.1)",
        color: "var(--success)",
        icon: "fas fa-check-circle",
      };
    default:
      return {};
  }
};

const getSeverityStyle = (severity) => {
  switch (severity) {
    case "High":
      return { color: "var(--error)", background: "rgba(239, 68, 68, 0.1)" };
    case "Medium":
      return { color: "var(--warning)", background: "rgba(245, 158, 11, 0.1)" };
    default:
      return { color: "var(--muted)", background: "var(--light)" };
  }
};

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  const statusStyle = getStatusBadgeStyle(report.status);
  const severityStyle = getSeverityStyle(report.severity);

  return (
    <div
      className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-content w-full max-w-[800px] rounded-[25px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        {/* Header */}
        <div
          className="modal-header flex justify-between items-center p-6 border-b"
          style={{ borderColor: "var(--light)" }}
        >
          <h3
            className="text-[1.5rem] font-bold"
            style={{ color: "var(--primary)" }}
          >
            Incident Report #{report.id}
          </h3>
          <button
            className="close-modal text-3xl cursor-pointer p-1 rounded-sm"
            style={{ color: "var(--muted)" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Body Content */}
        <div className="modal-body p-6 space-y-6 overflow-y-auto">
          {/* Status & Severity Badges */}
          <div
            className="flex items-center gap-4 border-b pb-4"
            style={{ borderColor: "var(--light)" }}
          >
            <span
              className="text-sm font-bold uppercase px-3 py-1 rounded-full"
              style={statusStyle}
            >
              <i className={`${statusStyle.icon} mr-2`}></i>
              {report.status}
            </span>
            <span
              className="text-sm font-bold uppercase px-3 py-1 rounded-full"
              style={severityStyle}
            >
              <i className="fas fa-exclamation-circle mr-2"></i>
              Severity: {report.severity}
            </span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              Submitted: {report.date}
            </span>
          </div>

          {/* Report Summary */}
          <div className="summary grid grid-cols-2 gap-4">
            <div className="detail">
              <h4 className="font-semibold" style={{ color: "var(--muted)" }}>
                Student
              </h4>
              <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                {report.student}
              </p>
            </div>
            <div className="detail">
              <h4 className="font-semibold" style={{ color: "var(--muted)" }}>
                Property
              </h4>
              <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                {report.property}
              </p>
            </div>
            <div className="detail col-span-2">
              <h4 className="font-semibold" style={{ color: "var(--muted)" }}>
                Incident Type
              </h4>
              <p
                className="text-lg font-bold"
                style={{ color: "var(--primary)" }}
              >
                {report.type}
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div
            className="description p-4 rounded-xl border-l-4"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: "var(--light)",
            }}
          >
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--primary)" }}
            >
              Detailed Report
            </h4>
            <p style={{ color: "var(--text)" }}>{report.description}</p>
          </div>

          {/* Evidence & Submission Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="detail">
              <h4 className="font-semibold" style={{ color: "var(--muted)" }}>
                Evidence Attached
              </h4>
              <p className="font-bold" style={{ color: "var(--text)" }}>
                {report.evidenceCount > 0
                  ? `${report.evidenceCount} Files`
                  : "No Files Submitted"}
              </p>
            </div>
            <div className="detail">
              <h4 className="font-semibold" style={{ color: "var(--muted)" }}>
                Submitted By
              </h4>
              <p className="font-bold" style={{ color: "var(--text)" }}>
                {report.submittedBy}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="modal-footer flex justify-between p-6 border-t"
          style={{ borderColor: "var(--light)" }}
        >
          <button
            className="px-4 py-2 rounded-[25px] font-semibold"
            style={{ backgroundColor: "var(--info)", color: "var(--card-bg)" }}
            onClick={() =>
              alert(`Changing status of Report #${report.id} to 'In Progress'`)
            }
          >
            <i className="fas fa-edit mr-2"></i> Update Status
          </button>
          <button
            className="btn btn-secondary px-4 py-2 rounded-[25px] font-semibold"
            style={{ backgroundColor: "var(--light)", color: "var(--text)" }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;