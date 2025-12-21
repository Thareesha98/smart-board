import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab.jsx";
import ReportRow from "../../components/Owner/report/ReportRow";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import { ownerData, mockReports } from "../../data/mockData.js";

const REPORT_STATUS_CONFIG = {
  New: { 
    colorClass: "bg-accent", // Map to your orange #FF7A00
    textClass: "text-accent",
    bgClass: "bg-accent/10",
    icon: "fas fa-flag" 
  },
  "In Progress": { 
    colorClass: "bg-info",   // Map to your info #3B82F6
    textClass: "text-info",
    bgClass: "bg-info/10",
    icon: "fas fa-sync-alt" 
  },
  Resolved: { 
    colorClass: "bg-success", // Map to your success #10B981
    textClass: "text-success",
    bgClass: "bg-success/10",
    icon: "fas fa-check-circle" 
  }
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("New");
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  // 1. Memoized report counting
  const counts = useMemo(() => {
    return mockReports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, { New: 0, "In Progress": 0, Resolved: 0 });
  }, []);

  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-10 bg-light">
      <HeaderBar
        title="Student Reports Log"
        subtitle="Track and manage formal misconduct and payment issues."
        notificationCount={counts["New"]}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          className="bg-accent text-card-bg px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
          onClick={() => navigate("/ownerLayout/reports/add")}
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Report
        </button>
      </HeaderBar>

      {/* --- Status Tabs Section --- */}
      <section className="p-6 rounded-report shadow-custom bg-card-bg mx-2 border border-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(REPORT_STATUS_CONFIG).map((status) => (
            <StatusTab
              key={status}
              status={status}
              count={counts[status]}
              currentFilter={filter}
              setFilter={setFilter}
              config={REPORT_STATUS_CONFIG[status]} // Passing the v3 config object
            />
          ))}
        </div>
      </section>

      {/* --- Reports List Section --- */}
      <section className="space-y-4 px-2">
        <div className="flex justify-between items-center ml-2">
          <h3 className="text-2xl font-black text-primary uppercase tracking-tight">
            {filter} Reports ({filteredReports.length})
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportRow 
                key={report.id} 
                report={report} 
                config={REPORT_STATUS_CONFIG[report.status]} // v3 Class-based config
                onViewDetails={() => setSelectedReport(report)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-card-bg rounded-boarding border-2 border-dashed border-light">
              <i className="fas fa-file-invoice text-5xl text-muted/30 mb-4"></i>
              <p className="text-muted font-black uppercase tracking-widest text-xs">
                No {filter} reports to display.
              </p>
            </div>
          )}
        </div>
      </section>

      <ReportDetailModal 
        report={selectedReport} 
        onClose={() => setSelectedReport(null)} 
      />
    </div>
  );
}