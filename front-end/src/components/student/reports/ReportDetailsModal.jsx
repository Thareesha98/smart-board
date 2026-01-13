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
  LOW: 'bg-success/20 text-success',
  MEDIUM: 'bg-info/20 text-info',
  HIGH: 'bg-error/20 text-error',
  CRITICAL: 'bg-error text-white',
};

const TYPE_NAMES = {
  BOARDING: 'Boarding Issue',
  OWNER: 'Owner Behavior',
  STUDENT: 'Other Student',
  SAFETY: 'Safety Concern',
  FRAUD: 'Fraudulent Listing',
  OTHER: 'Other Issue',
};

const ReportDetailsModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  const statusConfig = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
  const severityKey = report.priority ? report.priority.toUpperCase() : 'LOW'; 
  const severityColor = SEVERITY_CONFIG[severityKey] || SEVERITY_CONFIG.LOW;

  const typeKey = report.type ? report.type.toUpperCase() : 'OTHER';
  const typeLabel = TYPE_NAMES[typeKey] || typeKey;

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
                    {report.priority || 'LOW'}
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

              {/* ADDED: EVIDENCE SECTION */}
              {report.evidence && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-text-dark mb-3">Attached Evidence</h4>
                  <div className="flex flex-wrap gap-4">
                     {report.evidence.type === 'image' ? (
                        <div className="relative group">
                            <img 
                                src={report.evidence.url} 
                                alt="Evidence" 
                                className="h-40 w-auto rounded-lg border border-gray-200 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                                onClick={() => window.open(report.evidence.url, '_blank')}
                            />
                            <div className="text-xs text-text-muted mt-1 text-center">Click to enlarge</div>
                        </div>
                     ) : (
                        <a href={report.evidence.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-accent">
                            <FaFileAlt /> View Document
                        </a>
                     )}
                  </div>
                </div>
              )}

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