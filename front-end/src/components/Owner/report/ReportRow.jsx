import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import Hook

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ReportRow = ({ report, config, onViewDetails }) => {
  const navigate = useNavigate(); // 2. Initialize Hook

  const statusIcons = {
    New: "fa-flag",
    "In Progress": "fa-sync-alt",
    Resolved: "fa-check-circle",
  };

  // 3. Navigation Handler
  const handleStudentClick = (e) => {
    e.stopPropagation(); // Prevent affecting other click events
    // Ensure your report object has studentId
    if (report.studentId) {
      navigate(`/profile/view/${report.studentId}`);
    } else {
      console.warn("Student ID is missing in report data");
    }
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 md:p-6 rounded-report shadow-custom bg-card-bg border border-light transition-colors duration-300 group relative"
    >
      {/* 1. Header Area */}
      <div className="flex justify-between items-start md:items-center md:flex-1">
        <div className="flex flex-col gap-1">
          
          {/* --- CLICKABLE STUDENT NAME --- */}
          <h4 
            onClick={handleStudentClick}
            className="font-black text-base md:text-lg text-text tracking-tight uppercase cursor-pointer hover:text-accent hover:underline decoration-2 underline-offset-2 transition-all"
            title="View Student Profile"
          >
            {report.student}
          </h4>
          {/* ----------------------------- */}

          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-muted">
            <i className="fas fa-building text-accent"></i>
            <span className="truncate max-w-[150px] md:max-w-none">
              {report.property}
            </span>
          </div>
        </div>

        {/* Mobile-only ID Badge */}
        <div className="md:hidden text-right">
          <div className="text-[8px] font-black uppercase tracking-widest text-muted">
            ID: #{report.id}
          </div>
          <div className="text-[9px] font-bold text-primary">{report.date}</div>
        </div>
      </div>

      {/* 2. Incident Summary */}
      <div className="flex flex-col md:flex-[1.5] gap-1 md:border-l md:pl-6 border-light py-3 md:py-0 border-y md:border-y-0 border-light/50">
        <div className="font-bold text-sm md:text-base text-text">
          {report.type}
        </div>
        <p className="text-xs italic text-muted line-clamp-2 md:line-clamp-1">
          {report.description}
        </p>
      </div>

      {/* 3. MetaData (Desktop) */}
      <div className="hidden md:block text-center shrink-0 w-28 border-x border-light px-4">
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
      <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 mt-2 md:mt-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 md:flex-none flex items-center justify-center px-5 py-3 md:py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest bg-primary text-card-bg shadow-md transition-all"
          onClick={() => onViewDetails(report)}
        >
          <i className="fas fa-eye md:mr-2"></i>
          <span className="ml-2 md:ml-0">Details</span>
        </motion.button>

        <div
          className={`px-4 py-3 md:py-2 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-inner shrink-0 ${config.bgClass} ${config.textClass}`}
        >
          <i
            className={`fas ${statusIcons[report.status] || "fa-file-alt"}`}
          ></i>
          <span className="md:inline">{report.status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportRow;
