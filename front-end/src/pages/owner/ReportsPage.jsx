import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab.jsx";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import { ownerData, mockReports } from "../../data/mockData.js";

// 1. Define the report-specific configuration for the reusable StatusTabs
const REPORT_STATUS_CONFIG = {
  New: { 
    color: "#FF7A00", 
    icon: "fas fa-flag" 
  },
  "In Progress": { 
    color: "#3B82F6", 
    icon: "fas fa-sync-alt" 
  },
  Resolved: { 
    color: "#10B981", 
    icon: "fas fa-check-circle" 
  }
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("New");
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  // 2. Dynamically calculate counts for the StatusTabs
  const counts = useMemo(() => {
    return mockReports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, { New: 0, "In Progress": 0, Resolved: 0 });
  }, []);

  // 3. Filter the reports based on the active StatusTab
  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  const handleOpenDetail = (report) => setSelectedReport(report);
  const handleCloseDetail = () => setSelectedReport(null);

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-10">
      {/* --- Header Section --- */}
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

      {/* --- Reusable Status Tabs Section --- */}
      
      <section className="p-6 rounded-[25px] shadow-lg bg-(--card-bg)">
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
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
            {filter} Reports
          </h3>
          <span className="text-sm text-gray-400 font-medium">
            Showing {filteredReports.length} items
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-6 p-6 bg-white rounded-[30px] shadow-sm hover:shadow-md transition duration-300 border border-gray-50"
              >
                {/* ID & Date */}
                <div className="w-20 text-center border-r pr-6 border-gray-100 flex-shrink-0">
                  <span className="text-[10px] uppercase font-black text-gray-300">ID #{report.id}</span>
                  <p className="text-xs font-bold text-gray-500 mt-1">{report.date}</p>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-lg truncate">{report.student}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <i className="fas fa-building text-blue-400"></i>
                    <span className="truncate">{report.property}</span>
                  </div>
                </div>

                {/* Incident Summary */}
                <div className="flex-1 hidden lg:block">
                  <p className="text-sm font-medium text-gray-600 line-clamp-1 italic">
                    "{report.type}"
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleOpenDetail(report)}
                    className="bg-gray-800 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-black transition-all shadow-sm active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <i className="fas fa-file-invoice text-5xl text-gray-200 mb-4"></i>
              <p className="text-gray-400 font-bold">No {filter} reports to display.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- Detail Modal --- */}
      <ReportDetailModal 
        report={selectedReport} 
        onClose={handleCloseDetail} 
      />
    </div>
  );
}