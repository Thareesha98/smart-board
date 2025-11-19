import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useReportsLogic from '../../hooks/useReportsLogic';
import ReportTypesGrid from '../../components/student/reports/ReportTypesGrid';
import ReportForm from '../../components/student/reports/ReportForm';
import ReportsList from '../../components/student/reports/ReportsList';
import ReportDetailsModal from '../../components/student/reports/ReportDetailsModal';
import ConfirmationModal from '../../components/student/reports/ConfirmationModal';
import Notification from '../../components/student/maintenance/Notification';

const ReportsPage = () => {
  const {
    userReports,
    filteredReports,
    submitReport,
    setFilter,
  } = useReportsLogic();

  const [notification, setNotification] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [pendingReport, setPendingReport] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSelectReportType = (type, typeName) => {
    setSelectedReportType({ type, typeName });
  };

  const handleResetForm = () => {
    setSelectedReportType(null);
  };

  const handleFormSubmit = (reportData) => {
    setPendingReport(reportData);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    submitReport(pendingReport);
    setShowConfirmation(false);
    setPendingReport(null);
    setSelectedReportType(null);
    showNotification('Report submitted successfully! Our team will review it shortly.', 'success');
  };

  const handleViewDetails = (reportId) => {
    setSelectedReportId(reportId);
  };

  return (
    <StudentLayout
      title="Report Issues"
      subtitle="Report problems with boardings, owners, or other users"
    >
      {/* Report Types Selection */}
      {!selectedReportType && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">
            What would you like to report?
          </h2>
          <ReportTypesGrid onSelectType={handleSelectReportType} />
        </motion.section>
      )}

      {/* Report Form */}
      <AnimatePresence>
        {selectedReportType && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <ReportForm
              reportType={selectedReportType}
              onSubmit={handleFormSubmit}
              onCancel={handleResetForm}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* My Reports List */}
      <section className="mb-8">
        <ReportsList
          reports={filteredReports}
          onViewDetails={handleViewDetails}
          onFilterChange={setFilter}
        />
      </section>

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={selectedReportId !== null}
        onClose={() => setSelectedReportId(null)}
        report={userReports.find(r => r.id === selectedReportId)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
        reportData={pendingReport}
      />

      {/* Notification Toast */}
      <Notification notification={notification} />
    </StudentLayout>
  );
};

export default ReportsPage;