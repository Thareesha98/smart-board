import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaHashtag } from 'react-icons/fa';

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', color: 'bg-warning/20 text-warning' },
  'under-review': { label: 'Under Review', color: 'bg-info/20 text-info' },
  resolved: { label: 'Resolved', color: 'bg-success/20 text-success' },
  dismissed: { label: 'Dismissed', color: 'bg-gray-200 text-gray-600' },
};

const SEVERITY_CONFIG = {
  low: 'bg-success/20 text-success',
  medium: 'bg-info/20 text-info',
  high: 'bg-error/20 text-error',
  critical: 'bg-critical text-white',
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
        <div className="space-y-4">
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
  const severityColor = SEVERITY_CONFIG[report.severity] || SEVERITY_CONFIG.low;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      onClick={() => onViewDetails(report.id)}
      className="bg-card-bg rounded-large shadow-custom p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-dark mb-2">{report.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <FaCalendar />
          <span>{formatDate(report.date)}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${severityColor}`}>
          {report.severity}
        </span>
        {report.boarding && <span className="text-sm text-text-muted">{report.boarding}</span>}
      </div>

      <p className="text-text-muted mb-4 line-clamp-2">{report.description}</p>

      <div className="flex justify-between items-center">
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