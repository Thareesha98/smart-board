import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useBillingLogic from '../../hooks/student/useBillingLogic.js';
import OverviewCards from '../../components/student/billing/OverviewCards';
import PaymentMethodsList from '../../components/student/billing/PaymentMethodsList';
import QuickPay from '../../components/student/billing/QuickPay';
import BillingHistory from '../../components/student/billing/BillingHistory';
import BillingDetails from '../../components/student/billing/BillingDetails';
import PaymentMethodModal from '../../components/student/billing/PaymentMethodModal';
import Notification from '../../components/student/maintenance/Notification';

const BillingPage = () => {
  const {
    overview,
    paymentMethods,
    billingHistory,
    billingDetails,
    activePaymentMethod,
    setActivePaymentMethod,
    addPaymentMethod,
    removePaymentMethod,
    processPayment,
  } = useBillingLogic();

  const [notification, setNotification] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddPaymentMethod = (paymentData) => {
    addPaymentMethod(paymentData);
    setIsPaymentModalOpen(false);
    showNotification('Payment method added successfully!', 'success');
  };

  const handleRemovePaymentMethod = (methodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      removePaymentMethod(methodId);
      showNotification('Payment method removed successfully', 'success');
    }
  };

  const handleEditPaymentMethod = () => {
    showNotification('Edit payment method feature would open here');
  };

  const handleProcessPayment = async (amount) => {
    if (!amount || amount <= 0) {
      showNotification('Please enter a valid amount', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      processPayment(amount);
      setIsProcessing(false);
      showNotification(`Payment of $${amount} processed successfully!`, 'success');
    }, 2000);
  };

  const handleViewReceipt = (paymentId) => {
    showNotification('Opening receipt...');
  };

  const handleDownloadStatement = () => {
    showNotification('Downloading payment statement...', 'info');
  };

  return (
    <StudentLayout
      title="Billing & Payments"
      subtitle="Manage your rent payments and billing history"
    >
      {/* Overview Cards */}
      <OverviewCards overview={overview} />

      {/* Main Billing Layout */}
      <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-8 mt-8 items-start">
        
        {/* Left Column (Payment Methods & Quick Pay) */}
        <div className="space-y-6">
          <PaymentMethodsList
            paymentMethods={paymentMethods}
            activeMethodId={activePaymentMethod}
            onSelectMethod={setActivePaymentMethod}
            onAddMethod={() => setIsPaymentModalOpen(true)}
            onEditMethod={handleEditPaymentMethod}
            onRemoveMethod={handleRemovePaymentMethod}
          />

          <QuickPay
            // FIXED: Passing .amount ensures we pass a Number, not an Object
            defaultAmount={overview.currentBalance?.amount || 0}
            paymentMethods={paymentMethods}
            activeMethodId={activePaymentMethod}
            onPayment={handleProcessPayment}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right Column (History & Details) */}
        <div className="space-y-6">
          <BillingHistory
            history={billingHistory}
            onViewReceipt={handleViewReceipt}
            onDownloadStatement={handleDownloadStatement}
            onPayNow={handleProcessPayment}
          />

          <BillingDetails details={billingDetails} />
        </div>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handleAddPaymentMethod}
      />

      {/* Notification Toast */}
      <Notification notification={notification} />
    </StudentLayout>
  );
};

export default BillingPage;