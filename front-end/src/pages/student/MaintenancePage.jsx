import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useMaintenanceLogic from '../../hooks/student/useMaintenanceLogic.js';
import RequestForm from '../../components/student/maintenance/RequestForm';
import RequestCard from '../../components/student/maintenance/RequestCard';
import RequestModal from '../../components/student/maintenance/RequestModal';
import Notification from '../../components/student/maintenance/Notification';
import { FaPlus, FaClipboardList } from 'react-icons/fa';

// EmptyState component
const EmptyState = ({ type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center p-12 bg-card-bg rounded-large shadow-custom border border-gray-100/50"
  >
    <FaClipboardList className="text-5xl text-text-muted mb-4 mx-auto opacity-50" />
    <h3 className="text-xl font-bold text-text-dark mb-2">
      No {type} requests found
    </h3>
    <p className="text-text-muted">
      {type === 'active' ? 'All your maintenance issues are resolved!' : 'Your request history will appear here'}
    </p>
  </motion.div>
);

const MaintenancePage = () => {
  const {
    activeRequests,
    requestHistory,
    addRequest,
    cancelRequest,
    getRequestById,
  } = useMaintenanceLogic();

  const [showForm, setShowForm] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleFormSubmit = (formData) => {
    addRequest(formData);
    setShowForm(false);
    showNotification('Maintenance request submitted successfully!', 'success');
  };

  const handleCancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this maintenance request?')) {
      cancelRequest(requestId);
      setSelectedRequestId(null);
      showNotification('Maintenance request cancelled', 'info');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- HEADER BUTTON (Visible on Tablet/Desktop) ---
  const headerRightContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Fixed: Hidden on mobile (sm:hidden), Flex on larger screens
      className="hidden sm:flex items-center gap-2 py-3 px-5 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary whitespace-nowrap"
      onClick={() => setShowForm(!showForm)}
    >
      <FaPlus />
      {showForm ? 'Cancel' : 'New Request'}
    </motion.button>
  );

  return (
    <StudentLayout
      title="Maintenance Requests"
      subtitle="Submit and track maintenance issues"
      headerRightContent={headerRightContent}
    >
      {/* Request Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <RequestForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Active Requests Section */}
      <section className="mb-8">
        <h2 className="text-primary text-2xl font-bold mb-4 flex items-center gap-2">
          Active Requests
          {activeRequests.length > 0 && (
            <span className="text-sm bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20">
              {activeRequests.length}
            </span>
          )}
        </h2>
        {activeRequests.length === 0 ? (
          <EmptyState type="active" />
        ) : (
          // GRID LOGIC: 1 Col < 1400px, 2 Cols >= 1400px
          <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-6">
            {activeRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full" // Ensure card fills height
              >
                <RequestCard
                  request={request}
                  onClick={() => setSelectedRequestId(request.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Request History Section */}
      <section className="mb-8">
        <h2 className="text-primary text-2xl font-bold mb-4">Request History</h2>
        {requestHistory.length === 0 ? (
          <EmptyState type="history" />
        ) : (
          <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-6">
            {requestHistory.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <RequestCard
                  request={request}
                  onClick={() => setSelectedRequestId(request.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Request Details Modal */}
      <RequestModal
        isOpen={selectedRequestId !== null}
        onClose={() => setSelectedRequestId(null)}
        request={getRequestById(selectedRequestId)}
        onCancel={handleCancelRequest}
      />

      {/* Notification Toast */}
      <Notification notification={notification} />

      {/* --- MOBILE FLOATING BUTTON (Visible ONLY on Mobile) --- */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowForm(!showForm)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-accent text-white shadow-xl flex items-center justify-center sm:hidden z-50 hover:bg-primary transition-colors"
        aria-label="New Request"
      >
        <FaPlus size={24} className={`transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`} />
      </motion.button>

    </StudentLayout>
  );
};

export default MaintenancePage;