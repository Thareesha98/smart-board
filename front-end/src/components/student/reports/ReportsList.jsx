import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaHashtag } from 'react-icons/fa';

// UPDATED COLORS: Consistent with ReportForm (Light bg, dark text, border)
const STATUS_CONFIG = {
  pending: { label: 'Pending Review', color: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
  'under-review': { label: 'Under Review', color: 'bg-blue-50 text-blue-700 border border-blue-200' },
  resolved: { label: 'Resolved', color: 'bg-green-50 text-green-700 border border-green-200' },
  dismissed: { label: 'Dismissed', color: 'bg-gray-50 text-gray-600 border border-gray-200' },
};

const SEVERITY_CONFIG = {
  LOW: 'bg-green-50 text-green-700 border border-green-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border border-blue-200',
  HIGH: 'bg-orange-50 text-orange-700 border border-orange-200',
  CRITICAL: 'bg-red-50 text-red-700 border border-red-200', // Fixed Critical visibility
};

const ReportsList = ({ reports, onViewDetails, onFilterChange }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-primary">My Reports</h2>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-btn bg-white transition-colors focus:border-accent focus:outline-none"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="under-review">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {reports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-card-bg rounded-large shadow-custom"
        >
          <div className="text-6xl text-text-muted mb-4">🚩</div>
          <p className="text-text-muted text-lg">No reports found</p>
        </motion.div>
      ) : (
        // GRID LOGIC:
        // 1 Column for Tablet/Mobile (< 1400px)
        // 2 Columns for Desktop (>= 1400px)
        <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <ReportItem
              key={report.id}
              report={report}
              onViewDetails={onViewDetails}
              formatDate={formatDate}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ReportItem = ({ report, onViewDetails, formatDate, index }) => {
  const statusConfig = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
  const severityKey = report.priority ? report.priority.toUpperCase() : 'LOW';
  const severityColor = SEVERITY_CONFIG[severityKey] || SEVERITY_CONFIG.LOW;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      onClick={() => onViewDetails(report.id)}
      // Added h-full and flex-col for uniform height
      className="bg-card-bg rounded-large shadow-custom p-6 cursor-pointer transition-all duration-300 hover:shadow-xl h-full flex flex-col"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-dark mb-2">{report.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm whitespace-nowrap">
          <FaCalendar />
          <span>{formatDate(report.date)}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        {/* ✅ FIX 4: Display the correct field 'priority' */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${severityColor}`}>
          {report.priority || 'LOW'}
        </span>
        
        {/* ✅ FIX 5: Use 'property' (Backend DTO field) instead of 'boarding' */}
        {report.property && <span className="text-sm text-text-muted">{report.property}</span>}
      </div>

      <p className="text-text-muted mb-4 line-clamp-2 flex-1">{report.description}</p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <FaHashtag size={12} />
          <span>{report.id}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(report.id);
          }}
          className="px-4 py-2 rounded-large font-semibold text-sm bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
        >
          View Details →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReportsList;