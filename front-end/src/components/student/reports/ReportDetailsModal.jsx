import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

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
  critical: 'bg-error text-white',
};

const TYPE_NAMES = {
  boarding: 'Boarding Issue',
  owner: 'Owner Behavior',
  student: 'Other Student',
  safety: 'Safety Concern',
  fraud: 'Fraudulent Listing',
  other: 'Other Issue',
};

const ReportDetailsModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  const statusConfig = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
  const severityColor = SEVERITY_CONFIG[report.severity] || SEVERITY_CONFIG.low;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card-bg rounded-large shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-card-bg z-10">
              <h3 className="text-2xl font-bold text-primary">{report.title}</h3>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-dark transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <DetailRow label="Report Type" value={TYPE_NAMES[report.type]} />
              
              <DetailRow
                label="Status"
                value={
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                }
              />
              
              <DetailRow
                label="Severity"
                value={
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${severityColor}`}>
                    {report.severity}
                  </span>
                }
              />
              
              <DetailRow label="Date Submitted" value={formatDate(report.date)} />
              
              {report.incidentDate && (
                <DetailRow label="Incident Date" value={formatDate(report.incidentDate)} />
              )}
              
              {report.boarding && <DetailRow label="Boarding" value={report.boarding} />}
              
              {report.reportedPerson && (
                <DetailRow label="Reported Person" value={report.reportedPerson} />
              )}
              
              <DetailRow label="Report ID" value={`#${report.id}`} />

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-text-dark mb-2">Description</h4>
                <p className="text-text-muted leading-relaxed">{report.description}</p>
              </div>

              {report.adminResponse && (
                <div className="p-4 bg-info/10 border-l-4 border-info rounded-lg">
                  <h4 className="font-semibold text-info mb-2">Admin Response</h4>
                  <p className="text-text-muted">{report.adminResponse}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 gap-2">
    <span className="font-semibold text-text-dark">{label}:</span>
    <span className="text-text-muted">{value}</span>
  </div>
);

export default ReportDetailsModal;