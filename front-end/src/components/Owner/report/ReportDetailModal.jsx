import React from "react";
import { motion } from "framer-motion";

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "New":
      return {
        bgClass: "bg-accent/10",
        textClass: "text-accent",
        icon: "fas fa-flag",
      };
    case "In Progress":
      return {
        bgClass: "bg-info/10",
        textClass: "text-info",
        icon: "fas fa-sync-alt",
      };
    case "Resolved":
      return {
        bgClass: "bg-success/10",
        textClass: "text-success",
        icon: "fas fa-check-circle",
      };
    default:
      return {
        bgClass: "bg-muted/10",
        textClass: "text-muted",
        icon: "fas fa-file",
      };
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.5 },
  },
  exit: { scale: 0.8, opacity: 0, y: 50 },
};

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  const statusStyle = getStatusBadgeStyle(report.status);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-md"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-light w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-light"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Header Section --- */}
        <div className="px-8 py-6 bg-light border-b border-muted/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${statusStyle.bgClass} ${statusStyle.textClass}`}
            >
              <i className={statusStyle.icon}></i>
            </motion.div>
            <div>
              <h3 className="text-2xl font-black text-text tracking-tight">
                View Incident Report
              </h3>
              <p className="text-[11px] text-muted font-black uppercase tracking-widest">
                Reference ID: #{report.id}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-card-bg flex items-center justify-center text-muted hover:text-text shadow-sm border border-light"
          >
            <i className="fas fa-times text-lg"></i>
          </motion.button>
        </div>

        {/* --- Content Area --- */}
        <div className="p-8 space-y-6 overflow-y-auto bg-light/30">
          {/* Card 1: Involved Parties */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card-bg p-6 rounded-report shadow-custom border border-light grid grid-cols-2 gap-6 relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent"></div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest">
                Boarding Property
              </label>
              <div className="flex items-center gap-2 text-text">
                <i className="fas fa-building text-info"></i>
                <span className="font-black text-lg">{report.property}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest">
                Assigned Student
              </label>
              <div className="flex items-center gap-2 text-text">
                <i className="fas fa-user-circle text-accent"></i>
                <span className="font-black text-lg">{report.student}</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Incident Details */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card-bg p-8 rounded-report shadow-custom border border-light space-y-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">
                  Incident Category
                </label>
                <p className="text-xl font-black text-text">{report.type}</p>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest">
                  Submission Date
                </label>
                <p className="font-bold text-muted tracking-tight">
                  {report.date}
                </p>
              </div>
            </div>

            <div className="p-6 bg-light/20 rounded-2xl border border-light">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-3 block">
                Full Description
              </label>
              <p className="text-text leading-relaxed font-medium italic">
                "{report.description}"
              </p>
            </div>
          </motion.div>

          {/* Card 3: Evidence Files */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card-bg p-8 rounded-report shadow-custom border border-light"
          >
            <h4 className="text-xs font-black text-text uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-paperclip text-muted"></i> Attached Evidence
            </h4>

            {report.evidenceCount > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(report.evidenceCount)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative aspect-square rounded-2xl bg-light/20 border-2 border-dashed border-light flex flex-col items-center justify-center cursor-default"
                  >
                    <i className="fas fa-file-image text-2xl text-muted/40"></i>
                    <span className="text-[10px] font-bold text-muted mt-2">
                      Evidence_{i + 1}.jpg
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-light/10 rounded-2xl border border-dashed border-light">
                <p className="text-sm text-muted font-medium italic">
                  No evidence files attached.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* --- Footer Section --- */}
        <div className="p-6 bg-light border-t border-muted/10 flex justify-between items-center">
          <div className="text-[10px] font-black text-muted uppercase tracking-widest">
            <i className="fas fa-lock mr-1 opacity-50"></i> Official System Log
            - Read Only
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-10 py-3 bg-text text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all"
          >
            Close Viewer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportDetailModal;
