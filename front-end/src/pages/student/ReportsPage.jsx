import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useReportsLogic from '../../hooks/student/useReportsLogic.js';
import useBoardingsLogic from '../../hooks/student/useBoardingsLogic.js';
import ReportTypesGrid from '../../components/student/reports/ReportTypesGrid';
import ReportForm from '../../components/student/reports/ReportForm';
import ReportsList from '../../components/student/reports/ReportsList';
import ReportDetailsModal from '../../components/student/reports/ReportDetailsModal';
import ConfirmationModal from '../../components/student/reports/ConfirmationModal';
import Notification from '../../components/student/maintenance/Notification';
import { FaPlus } from 'react-icons/fa';

const ReportsPage = () => {
  const {
    userReports,
    filteredReports,
    submitReport,
    setFilter
  } = useReportsLogic();

  const { currentBoarding, hasBoarding } = useBoardingsLogic();
  const isRegistered = hasBoarding && currentBoarding?.status === 'APPROVED';

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

  // const handleResetForm = () => {
  //   setSelectedReportType(null);
  // };

  const handleFormSubmit = (reportData) => {
    setPendingReport(reportData);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    try {
        await submitReport(pendingReport);
        setShowConfirmation(false);
        setPendingReport(null);
        setSelectedReportType(null);
        showNotification('Report submitted successfully!', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
        showNotification('Failed to submit report.', 'error');
    }
  };

  // const handleViewDetails = (reportId) => {
  //   setSelectedReportId(reportId);
  // };

  // Function to start a new report (resets view to Grid)
  const startNewReport = () => {
    setSelectedReportType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- HEADER BUTTON (Desktop/Tablet) ---
  // Hidden on mobile (sm:hidden), visible on larger screens
  const headerRightContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={startNewReport}
      className="hidden sm:flex items-center gap-2 py-3 px-5 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary whitespace-nowrap"
    >
      <FaPlus />
      New Report
    </motion.button>
  );

  return (
    <StudentLayout
      title="Report Issues"
      subtitle="Report problems with boardings, owners, or other users"
      headerRightContent={headerRightContent}
    >
      {/* Report Types Selection */}
      {!selectedReportType && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">
            What would you like to report?
          </h2>
          <ReportTypesGrid onSelectType={handleSelectReportType} isRegistered={isRegistered} />
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
              onCancel={() => setSelectedReportType(null)}
              boardingData={isRegistered ? currentBoarding : null}
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

      {/* --- MOBILE FLOATING ACTION BUTTON (Visible ONLY on Mobile) --- */}
      {/* Fixed to bottom right, z-index high to float above content */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startNewReport}
        className="fixed bottom-24 right-8 h-14 w-14 rounded-full bg-accent text-white shadow-xl flex items-center justify-center sm:hidden z-50 hover:bg-primary transition-colors"
        aria-label="Create New Report"
      >
        <FaPlus size={24} />
      </motion.button>

    </StudentLayout>
  );
};

export default ReportsPage;