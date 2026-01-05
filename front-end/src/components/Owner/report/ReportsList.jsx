import React from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaHashtag } from "react-icons/fa";

const STATUS_CONFIG = {
  New: {
    label: "New",
    color: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  "In Progress": {
    label: "In Progress",
    color: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  Resolved: {
    label: "Resolved",
    color: "bg-green-50 text-green-700 border border-green-200",
  },
  Dismissed: {
    label: "Dismissed",
    color: "bg-gray-50 text-gray-600 border border-gray-200",
  },
};

const ReportsList = ({ reports, loading, onViewDetails, onFilterChange }) => {
  if (loading)
    return (
      <div className="p-8 text-center text-text-muted">Loading reports...</div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-primary">History</h2>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-2 border-2 border-light rounded-btn bg-white focus:border-accent focus:outline-none"
        >
          <option value="New">Pending (New)</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-16 bg-card-bg rounded-large shadow-custom border border-light">
          <p className="text-text-muted text-lg">
            No reports found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-4">
          {reports.map((report, index) => {
            const statusConfig =
              STATUS_CONFIG[report.status] || STATUS_CONFIG.New;

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => onViewDetails(report.id)}
                className="bg-card-bg rounded-large shadow-custom p-6 cursor-pointer hover:shadow-xl h-full flex flex-col border border-light"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-dark mb-1">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <FaUser size={12} />
                      <span className="uppercase font-bold tracking-wider text-xs">
                        {report.student}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                <div className="flex gap-3 mb-4 flex-wrap">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase border border-gray-200">
                    {report.severity}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1 bg-gray-50 px-2 rounded">
                    <FaCalendar size={10} /> {report.date}
                  </span>
                </div>

                <p className="text-text-muted mb-4 line-clamp-2 flex-1 text-sm">
                  {report.description}
                </p>

                <div className="mt-auto pt-4 border-t border-light flex justify-between items-center text-xs text-text-muted font-bold uppercase tracking-widest">
                  <span>ID: #{report.id}</span>
                  <span className="text-accent">View Details &rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
