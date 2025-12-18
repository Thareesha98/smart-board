import React from "react";

const ReportRow = ({ report, style, onViewDetails }) => {
  // Mapping status to specific icons (matches your report logic)
  const statusIcons = {
    New: "fa-flag",
    "In Progress": "fa-sync-alt",
    Resolved: "fa-check-circle",
  };

  return (
    <div
      className="report-row flex items-center gap-[1.5rem] p-[1.5rem] rounded-[25px] shadow-sm transition duration-300 hover:shadow-md"
      style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
    >
      {/* 1. Student & Property Details (Matches Identity Style) */}
      <div className="flex flex-col flex-1 gap-1">
        <h4 className="font-bold text-lg" style={{ color: "var(--text)" }}>
          {report.student}
        </h4>
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <i className="fas fa-building" style={{ color: "var(--accent)" }}></i>
          <span>{report.property}</span>
        </div>
      </div>

      {/* 2. Incident Summary (Middle Column) */}
      <div className="flex flex-col flex-[1.5] gap-1 text-sm border-l pl-6 border-gray-100">
        <div
          className="font-semibold truncate max-w-[250px]"
          style={{ color: "var(--text)" }}
        >
          {report.type}
        </div>
        <span
          className="text-xs italic line-clamp-1"
          style={{ color: "var(--muted)" }}
        >
          {report.description.slice(0, 60)}...
        </span>
      </div>

      {/* 3. Date & ID (MetaData) */}
      <div className="text-center flex-shrink-0 w-28">
        <div
          className="text-[10px] uppercase font-bold tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Report ID
        </div>
        <div
          className="text-base font-bold"
          style={{ color: "var(--primary)" }}
        >
          #{report.id}
        </div>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          {report.date}
        </div>
      </div>

      {/* 4. Actions & Status Badge */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Action Button (Matches Appointment Button Style) */}
        <button
          className="btn btn-sm p-[0.5rem] px-5 rounded-[25px] font-semibold text-xs transition duration-300 hover:scale-105"
          style={{ backgroundColor: "var(--primary)", color: "var(--card-bg)" }}
          onClick={() => onViewDetails(report)}
        >
          <i className="fas fa-eye mr-1"></i> View Details
        </button>

        {/* Status Badge (Using the passed style object) */}
        <div
          className="px-4 py-2 text-[10px] font-black uppercase rounded-[20px] flex items-center gap-2"
          style={{ backgroundColor: style.background, color: style.color }}
        >
          <i
            className={`fas ${statusIcons[report.status] || "fa-file-alt"}`}
          ></i>
          {report.status}
        </div>
      </div>
    </div>
  );
};

export default ReportRow;
