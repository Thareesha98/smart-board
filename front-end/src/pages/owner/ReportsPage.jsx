import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab.jsx";
import ReportRow from "../../components/Owner/report/ReportRow";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import { ownerData, mockReports } from "../../data/mockData.js";

const REPORT_STATUS_CONFIG = {
  New: { 
    color: "#FF7A00", 
    background: "rgba(255, 122, 0, 0.1)", // Added background for the row badge
    icon: "fas fa-flag" 
  },
  "In Progress": { 
    color: "#3B82F6", 
    background: "rgba(59, 130, 246, 0.1)",
    icon: "fas fa-sync-alt" 
  },
  Resolved: { 
    color: "#10B981", 
    background: "rgba(16, 185, 129, 0.1)",
    icon: "fas fa-check-circle" 
  }
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("New");
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  const counts = useMemo(() => {
    return mockReports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, { New: 0, "In Progress": 0, Resolved: 0 });
  }, []);

  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-10">
      <HeaderBar
        title="Student Reports Log"
        subtitle="Track and manage formal misconduct and payment issues."
        notificationCount={counts["New"]}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          className="bg-(--accent) text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition"
          onClick={() => navigate("/ownerLayout/reports/add")}
        >
          <i className="fas fa-plus mr-2"></i>
          Add New Report
        </button>
      </HeaderBar>

      {/* --- Status Tabs Section --- */}
      <section className="p-6 rounded-[25px] shadow-lg bg-white mx-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(REPORT_STATUS_CONFIG).map((status) => (
            <StatusTab
              key={status}
              status={status}
              count={counts[status]}
              currentFilter={filter}
              setFilter={setFilter}
              style={REPORT_STATUS_CONFIG[status]}
            />
          ))}
        </div>
      </section>

      {/* --- Reports List Section --- */}
      <section className="space-y-4 px-2">
        <div className="flex justify-between items-center ml-2">
          <h3 className="text-xl font-bold text-(--primary) uppercase tracking-tight">
            {filter} Reports ({filteredReports.length})
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportRow 
                key={report.id} 
                report={report} 
                style={REPORT_STATUS_CONFIG[report.status]} // Pass status-specific colors
                onViewDetails={() => setSelectedReport(report)}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <i className="fas fa-file-invoice text-5xl text-gray-200 mb-4"></i>
              <p className="text-gray-400 font-bold">No {filter} reports to display.</p>
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