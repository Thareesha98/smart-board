import { useState, useMemo } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { useNavigate } from "react-router-dom";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import { ownerData ,mockReports } from "../../data/mockData.js";
import { StatusTab, ReportRow } from "../../components/Owner/report/ReportUIComponents";





// Utility styles moved outside
const STATUS_STYLES = {
  New: { background: "rgba(255, 122, 0, 0.1)", color: "#FF7A00", icon: "fas fa-flag" },
  "In Progress": { background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6", icon: "fas fa-sync-alt" },
  Resolved: { background: "rgba(16, 185, 129, 0.1)", color: "#10B981", icon: "fas fa-check-circle" },
};

const SEVERITY_STYLES = {
  High: { color: "#EF4444" },
  Medium: { color: "#F59E0B" },
  Low: { color: "#6B7280" }
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("New");
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  // Memoized counts and filtering
  const counts = useMemo(() => mockReports.reduce((acc, rep) => {
    acc[rep.status] = (acc[rep.status] || 0) + 1;
    return acc;
  }, { New: 0, "In Progress": 0, Resolved: 0 }), []);

  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-[#FDFBF9]">
      <HeaderBar
        title="Student Reports Log"
        subtitle="Manage formal misconduct and payment reports."
        notificationCount={counts["New"]}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button 
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
          onClick={() => navigate("/ownerLayout/reports/add")}
        >
          <i className="fas fa-plus mr-2"></i> Add New Report
        </button>
      </HeaderBar>

      {/* Tabs Section */}
      <section className="bg-white p-6 rounded-[32px] shadow-sm grid grid-cols-3 gap-6">
        {Object.keys(STATUS_STYLES).map(status => (
          <StatusTab
            key={status}
            status={status}
            count={counts[status]}
            currentFilter={filter}
            setFilter={setFilter}
            style={STATUS_STYLES[status]}
          />
        ))}
      </section>

      {/* List Section */}
      <section className="space-y-4 px-2">
        <h3 className="text-xl font-black text-gray-800 ml-2">{filter} Reports</h3>
        
        {filteredReports.length > 0 ? (
          filteredReports.map((rep) => (
            <ReportRow 
              key={rep.id} 
              report={rep} 
              onViewDetails={setSelectedReport} 
              getStatusStyle={(s) => STATUS_STYLES[s]}
              getSeverityStyle={(sv) => SEVERITY_STYLES[sv] || SEVERITY_STYLES.Low}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
            <i className="fas fa-inbox text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-400 font-medium">No {filter} reports found.</p>
          </div>
        )}
      </section>

      <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  );
}
