import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab.jsx";
import ReportRow from "../../components/Owner/report/ReportRow";
import ReportDetailModal from "../../components/Owner/report/ReportDetailModal";
import useReportLogic from "../../hooks/owner/useReportLogic";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);

  // Use the hook inside the component
  const { filteredReports, counts, filter, setFilter, loading, error } =
    useReportLogic();


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-4 space-y-8 min-h-screen pb-10 bg-light"
    >
      <HeaderBar
        title="Reports Management"
        subtitle="Overview of student reports and their statuses"
        navBtnText="Add New Report"
        navBtnPath="/owner/reports/add"
      />

      {/* Tabs */}
      <section className="p-6 rounded-report shadow-custom bg-card-bg mx-2 border border-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(REPORT_STATUS_CONFIG).map((status) => (
            <StatusTab
              key={status}
              status={status}
              count={counts[status] || 0}
              currentFilter={filter}
              setFilter={setFilter}
              config={REPORT_STATUS_CONFIG[status]}
            />
          ))}
        </div>
      </section>

      {/* List */}
      <section className="space-y-4 px-2">
        <div className="flex justify-between items-center ml-2">
          <motion.h3
            layout
            className="text-2xl font-black text-primary uppercase tracking-tight"
          >
            {filter} Reports ({loading ? "..." : filteredReports.length})
          </motion.h3>
        </div>

        {/* --- CONDITIONAL RENDERING AREA --- */}
        
        {/* A. Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-muted">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p className="font-bold text-xs uppercase tracking-widest">Connecting to Server...</p>
          </div>
        )}

        {/* B. Error State */}
        {!loading && error && (
          <div className="py-10 bg-red-50 rounded-xl border border-red-100 text-center">
            <i className="fas fa-exclamation-circle text-3xl text-red-400 mb-3"></i>
            <p className="text-red-600 font-bold mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-xs font-black uppercase tracking-widest text-primary underline hover:text-accent"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* C. Success State (The List) */}
        {!loading && !error && (
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
                    config={REPORT_STATUS_CONFIG[report.status] || REPORT_STATUS_CONFIG["New"]} 
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
                    No {filter} reports found.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
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
