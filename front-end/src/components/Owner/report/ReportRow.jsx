import React from "react";

const ReportRow = ({ report, config, onViewDetails }) => {
  // Mapping status to specific icons (matches your report logic)
  const statusIcons = {
    New: "fa-flag",
    "In Progress": "fa-sync-alt",
    Resolved: "fa-check-circle",
  };

  return (
    <div
      className="flex items-center gap-6 p-6 rounded-report shadow-custom bg-card-bg border border-light transition-all duration-300 hover:shadow-md group"
    >
      {/* 1. Student & Property Details */}
      <div className="flex flex-col flex-1 gap-1">
        <h4 className="font-black text-lg text-text tracking-tight">
          {report.student}
        </h4>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          <i className="fas fa-building text-accent"></i>
          <span>{report.property}</span>
        </div>
      </div>

      {/* 2. Incident Summary (Middle Column) */}
      <div className="flex flex-col flex-[1.5] gap-1 text-sm border-l pl-6 border-light">
        <div className="font-bold text-text truncate max-w-[250px]">
          {report.type}
        </div>
        <span className="text-xs italic text-muted line-clamp-1">
          {report.description.slice(0, 60)}...
        </span>
      </div>

      {/* 3. Date & ID (MetaData) */}
      <div className="text-center shrink-0 w-28 border-x border-light px-4">
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-1">
          Report ID
        </div>
        <div className="text-base font-black text-primary leading-none">
          #{report.id}
        </div>
        <div className="text-[11px] font-bold text-muted mt-1">
          {report.date}
        </div>
      </div>

      {/* 4. Actions & Status Badge */}
      <div className="flex items-center gap-4 ml-auto">
        {/* View Details Button */}
        <button
          className="flex items-center px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest bg-primary text-card-bg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          onClick={() => onViewDetails(report)}
        >
          <i className="fas fa-eye mr-2"></i> View Details
        </button>

        {/* Status Badge (Using the passed config classes) */}
        <div
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-inner ${config.bgClass} ${config.textClass}`}
        >
          <i className={`fas ${statusIcons[report.status] || "fa-file-alt"}`}></i>
          {report.status}
        </div>
      </div>
    </div>
  );
};

export default ReportRow;