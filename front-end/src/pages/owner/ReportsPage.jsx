import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab.jsx";
import ReportRow from "../../components/Owner/report/ReportRow";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import { mockReports } from "../../data/mockData.js";
const { 
    filteredReports, 
    counts, 
    filter, 
    setFilter, 
    loading, 
    error 
  } = useReportLogic();

const REPORT_STATUS_CONFIG = {
  New: {
    colorClass: "bg-accent",
    textClass: "text-accent",
    bgClass: "bg-accent/10",
    icon: "fas fa-flag",
  },
  "In Progress": {
    colorClass: "bg-info",
    textClass: "text-info",
    bgClass: "bg-info/10",
    icon: "fas fa-sync-alt",
  },
  Resolved: {
    colorClass: "bg-success",
    textClass: "text-success",
    bgClass: "bg-success/10",
    icon: "fas fa-check-circle",
  },
};

// Handling Loading/Error states in UI
  if (loading) return <div className="p-10 text-center">Loading Reports...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("New");
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  const counts = useMemo(() => {
    return mockReports.reduce(
      (acc, report) => {
        acc[report.status] = (acc[report.status] || 0) + 1;
        return acc;
      },
      { New: 0, "In Progress": 0, Resolved: 0 }
    );
  }, []);

  const filteredReports = mockReports.filter((rep) => rep.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-4 space-y-8 min-h-screen pb-10 bg-light"
    >
      <HeaderBar
        title="Reports Management"
        subtitle="Overview of student reports and their statuses"
        navBtnText="Add New Report"
        navBtnPath="/owner/reports/add"
      />

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
              config={REPORT_STATUS_CONFIG[status]}
            />
          ))}
        </div>
      </section>

      {/* --- Reports List Section --- */}
      <section className="space-y-4 px-2">
        <div className="flex justify-between items-center ml-2">
          <motion.h3
            layout
            className="text-2xl font-black text-primary uppercase tracking-tight"
          >
            {filter} Reports ({filteredReports.length})
          </motion.h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportRow
                  key={report.id}
                  report={report}
                  config={REPORT_STATUS_CONFIG[report.status]}
                  onViewDetails={() => setSelectedReport(report)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20 bg-card-bg rounded-boarding border-2 border-dashed border-light"
              >
                <i className="fas fa-file-invoice text-5xl text-muted/30 mb-4"></i>
                <p className="text-muted font-black uppercase tracking-widest text-xs">
                  No {filter} reports to display.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedReport && (
          <ReportDetailModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
