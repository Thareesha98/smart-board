import React, { useState } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { useNavigate } from "react-router-dom";

// --- Mock Data & Constants (These should be imported from mockData.js) ---
const ownerData = {
  firstName: "Mr.",
  lastName: "Silva",
  avatar: "https://randomuser.me/api/portraits/men/57.jpg",
};

const mockReports = [
  {
    id: 1001,
    date: "2025-11-25",
    property: "Sunshine Hostel",
    student: "Priya Sharma",
    type: "Non-Payment / Late Rent",
    status: "New",
    severity: "High",
  },
  {
    id: 1002,
    date: "2025-11-20",
    property: "City View Apartments",
    student: "Kamal D.",
    type: "Misconduct / Noise Complaint",
    status: "In Progress",
    severity: "Medium",
  },
  {
    id: 1003,
    date: "2025-11-10",
    property: "Green Valley Hostel",
    student: "Anusha K.",
    type: "Property Damage / Vandalism",
    status: "Resolved",
    severity: "High",
  },
  {
    id: 1004,
    date: "2025-11-01",
    property: "Sunshine Hostel",
    student: "Rohan Mehta",
    type: "Lease Violation",
    status: "New",
    severity: "Medium",
  },
];

// --- Helper Functions ---
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

// --- Report Components (Kept local) ---

const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const statusStyle = getStatusBadgeStyle(status);

  return (
    <button
      className={`category-tab flex flex-col items-center gap-1.5 p-6 rounded-[25px] font-semibold cursor-pointer transition duration-300 relative w-full`}
      style={{
        backgroundColor: isActive ? statusStyle.color : "var(--light)",
        color: isActive ? "var(--card-bg)" : "var(--muted)",
        boxShadow: isActive
          ? `0 4px 12px ${statusStyle.color}80`
          : "var(--shadow)",
      }}
      onClick={() => setFilter(status)}
    >
      <i className={`${statusStyle.icon} text-2xl`}></i>
      <span className="text-base">{status}</span>
      <span
        className="tab-count absolute -top-2 -right-2 w-6 h-6 text-xs flex items-center justify-center font-bold rounded-full"
        style={{
          backgroundColor: isActive ? "var(--card-bg)" : "var(--primary)",
          color: isActive ? statusStyle.color : "var(--card-bg)",
        }}
      >
        {count}
      </span>
    </button>
  );
};

const ReportRow = ({ report }) => {
  const statusStyle = getStatusBadgeStyle(report.status);
  const severityColor =
    report.severity === "High" ? "var(--error)" : "var(--warning)";

  return (
    <div
      className="report-row flex items-center gap-6 p-6 rounded-[25px] shadow-sm transition duration-300"
      style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
    >
      {/* 1. Date and ID */}
      <div className="flex flex-col shrink-0 w-24 text-center">
        <span className="text-xs uppercase" style={{ color: "var(--muted)" }}>
          Report ID
        </span>
        <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>
          #{report.id}
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {report.date}
        </span>
      </div>

      {/* 2. Property & Student */}
      <div className="flex flex-col flex-1 gap-1">
        <h4 className="font-bold text-lg" style={{ color: "var(--text)" }}>
          {report.student}
        </h4>
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <i className="fas fa-building" style={{ color: "var(--info)" }}></i>
          <span>{report.property}</span>
        </div>
      </div>

      {/* 3. Type and Status */}
      <div className="flex flex-col flex-1 gap-1 text-sm">
        <span className="font-semibold" style={{ color: "var(--text)" }}>
          {report.type}
        </span>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-xl"
          style={{
            backgroundColor: statusStyle.background,
            color: statusStyle.color,
          }}
        >
          {report.status}
        </span>
      </div>

      {/* 4. Severity and Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-xl"
          style={{ border: `1px solid ${severityColor}`, color: severityColor }}
        >
          Severity: {report.severity}
        </span>
        <button
          className="btn btn-sm p-2 px-4 rounded-[25px] font-semibold text-sm transition duration-300"
          style={{ backgroundColor: "var(--primary)", color: "var(--card-bg)" }}
          onClick={() => alert(`Viewing details for Report #${report.id}`)}
        >
          <i className="fas fa-eye"></i> View Details
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function ReportsPage() {
  const [filter, setFilter] = useState("New");

  const navigate = useNavigate();

  const handleReportAdd = () => {
    navigate("/ownerLayout/reports/add");
  }

  const counts = mockReports.reduce(
    (acc, rep) => {
      acc[rep.status] = (acc[rep.status] || 0) + 1;
      return acc;
    },
    { New: 0, "In Progress": 0, Resolved: 0 }
  );

  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  return (
    <div className="pt-4 space-y-6">
      {/* 🌟 HeaderBar */}
      <HeaderBar
        title="Student Reports Log"
        subtitle="Track and manage formal misconduct and payment reports."
        notificationCount={counts["New"]}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button 
                    className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--card-bg)' }}
                    onClick={handleReportAdd}
                >
                    <i className="fas fa-plus mr-2"></i>
                    Add New Report
                </button>
      </HeaderBar>

      {/* Report Categories */}
      <section
        className="report-categories p-6 rounded-[25px] shadow-lg"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="category-tabs grid grid-cols-3 gap-4">
          <StatusTab
            status="New"
            count={counts["New"]}
            currentFilter={filter}
            setFilter={setFilter}
          />
          <StatusTab
            status="In Progress"
            count={counts["In Progress"]}
            currentFilter={filter}
            setFilter={setFilter}
          />
          <StatusTab
            status="Resolved"
            count={counts["Resolved"]}
            currentFilter={filter}
            setFilter={setFilter}
          />
        </div>
      </section>

      {/* Reports List */}
      <section className="reports-section">
        <h3
          className="text-[1.5rem] font-bold mb-4 capitalize"
          style={{ color: "var(--primary)" }}
        >
          {filter} Reports ({filteredReports.length})
        </h3>

        <div className="reports-grid flex flex-col gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((rep) => (
              <ReportRow key={rep.id} report={rep} />
            ))
          ) : (
            <div
              className="empty-state text-center p-12 rounded-[25px] shadow-lg"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <i
                className="fas fa-file-alt text-6xl mb-4"
                style={{ color: "var(--muted)" }}
              ></i>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text)" }}
              >
                No {filter} Reports
              </h3>
              <p className="text-base" style={{ color: "var(--muted)" }}>
                No reports are currently marked as **{filter}**.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
