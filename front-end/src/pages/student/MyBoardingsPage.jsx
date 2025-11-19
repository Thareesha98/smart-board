import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/student/common/StudentLayout';
import useBoardingsLogic from '../../hooks/useBoardingsLogic';
import BoardingCard from '../../components/student/boardings/BoardingCard';
import InfoCards from '../../components/student/boardings/InfoCards';
import EmptyState from '../../components/student/boardings/EmptyState';
import Notification from '../../components/student/maintenance/Notification';

const MyBoardingsPage = () => {
  const navigate = useNavigate();
  const { currentBoarding, hasBoarding, payRent } = useBoardingsLogic();
  const [notification, setNotification] = useState(null);
  const [isPayingRent, setIsPayingRent] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleViewDetails = () => {
    showNotification('Opening boarding details...');
    // navigate('/boarding-details');
  };

  const handleManage = () => {
    showNotification('Opening boarding management panel...');
    // Open management modal or navigate
  };

  const handlePayRent = async () => {
    setIsPayingRent(true);
    
    // Simulate payment processing
    setTimeout(() => {
      payRent();
      setIsPayingRent(false);
      showNotification('Payment processed successfully!', 'success');
    }, 2000);
  };

  const handleRequestMaintenance = () => {
    navigate('/maintenance');
  };

  const handleContactOwner = () => {
    showNotification('Opening contact form...');
    // Open contact modal
  };

  const handleViewDocuments = () => {
    showNotification('Opening documents panel...');
    // Open documents modal
  };

  return (
    <StudentLayout
      title="My Boardings"
      subtitle="Manage your current boarding place"
    >
      <AnimatePresence mode="wait">
        {hasBoarding ? (
          <motion.div
            key="boarding-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Current Boarding Card */}
            <BoardingCard
              boarding={currentBoarding}
              onViewDetails={handleViewDetails}
              onManage={handleManage}
              onPayRent={handlePayRent}
              onRequestMaintenance={handleRequestMaintenance}
              onContactOwner={handleContactOwner}
              onViewDocuments={handleViewDocuments}
              isPayingRent={isPayingRent}
            />

            {/* Additional Info Cards */}
            <InfoCards
              boarding={currentBoarding}
              onContactOwner={handleContactOwner}
            />
          </motion.div>
        ) : (
          <EmptyState key="empty-state" />
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <Notification notification={notification} />
    </StudentLayout>
  );
};

export default MyBoardingsPage;