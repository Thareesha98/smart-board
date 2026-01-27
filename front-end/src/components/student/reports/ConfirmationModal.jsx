import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPE_NAMES = {
  BOARDING: 'Boarding Issue',
  OWNER: 'Owner Behavior',
  STUDENT: 'Other Student',
  SAFETY: 'Safety Concern',
  FRAUD: 'Fraudulent Listing',
  OTHER: 'Other Issue',
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, reportData }) => {
  if (!reportData) return null;

  const typeKey = reportData.type ? reportData.type.toUpperCase() : 'OTHER';
  const displayType = TYPE_NAMES[typeKey] || typeKey;

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
            className="bg-card-bg rounded-large shadow-2xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-primary">Confirm Report Submission</h3>
            </div>

            <div className="p-6">
              <p className="text-text-muted mb-4">
                Are you sure you want to submit this report? Once submitted, it will be reviewed by our
                administration team.
              </p>

              <div className="bg-background-light p-4 rounded-large space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-dark">Type:</span>
                  <span className="text-text-muted">{displayType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-text-dark">Title:</span>
                  <span className="text-text-muted">{reportData.reportTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-text-dark">Severity:</span>
                  <span className="text-text-muted uppercase">{reportData.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-text-dark">Date:</span>
                  <span className="text-text-muted">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 px-6 py-3 rounded-large font-semibold bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg"
              >
                Yes, Submit Report
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;