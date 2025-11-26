import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useMaintenanceLogic from '../../hooks/useMaintenanceLogic';
import RequestForm from '../../components/student/maintenance/RequestForm';
import RequestCard from '../../components/student/maintenance/RequestCard';
import RequestModal from '../../components/student/maintenance/RequestModal';
import Notification from '../../components/student/maintenance/Notification';
import { FaPlus, FaClipboardList } from 'react-icons/fa';

// EmptyState component moved outside to prevent recreation on each render
const EmptyState = ({ type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center p-12 bg-card-bg rounded-large shadow-custom"
  >
    <FaClipboardList className="text-5xl text-text-muted mb-4 mx-auto" />
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

  return (
    <StudentLayout
      title="Maintenance Requests"
      subtitle="Submit and track maintenance issues for your boarding"
      headerRightContent={
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 py-3 px-5 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus />
          New Request
        </motion.button>
      }
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
        <h2 className="text-primary text-2xl font-bold mb-4">Active Requests</h2>
        {activeRequests.length === 0 ? (
          <EmptyState type="active" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requestHistory.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
    </StudentLayout>
  );
};

export default MaintenancePage;