import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/student/common/StudentLayout';
import useBoardingsLogic from '../../hooks/student/useBoardingsLogic.js';
import BoardingCard from '../../components/student/boardings/BoardingCard';
import InfoCards from '../../components/student/boardings/InfoCards';
import EmptyState from '../../components/student/boardings/EmptyState';
import Notification from '../../components/student/maintenance/Notification';
import ReviewForm from '../../components/student/boardings/ReviewForm';

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
    navigate('/student/maintenance');
  };

  const handleContactOwner = () => {
    showNotification('Opening contact form...');
  };

  const handleViewDocuments = () => {
    showNotification('Opening documents panel...');
  };

  const handleReviewSubmit = () => {
    showNotification('Review submitted successfully! It will appear on the boarding details page.', 'success');
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
            // LAYOUT LOGIC:
            // < 1400px: Stacked (Flex Col)
            // >= 1400px: Grid (2 Cols Left, 1 Col Right)
            className="flex flex-col min-[1400px]:grid min-[1400px]:grid-cols-3 gap-6 items-start"
          >
            {/* Main Content Area */}
            <div className="w-full min-[1400px]:col-span-2 space-y-6">
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
              
              {/* Review Form - Full width on mobile/tablet, left column on desktop */}
              <ReviewForm 
                boardingId={currentBoarding?.id || 'default-boarding-id'}
                onSubmitSuccess={handleReviewSubmit}
              />
            </div>

            {/* Sidebar / Bottom Area */}
            <div className="w-full min-[1400px]:col-span-1">
              <InfoCards
                boarding={currentBoarding}
                onContactOwner={handleContactOwner}
              />
            </div>
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