import React, { useState } from 'react';
import StudentLayout from '../../components/student/common/StudentLayout';
import useBillingLogic from '../../hooks/student/useBillingLogic';

import OverviewCards from '../../components/student/billing/OverviewCards';
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
    processPayment,
  } = useBillingLogic();

  const [notification, setNotification] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /* =========================
     NOTIFICATION
  ========================= */

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  /* =========================
     ✅ PAYMENT HANDLER (FIXED)
  ========================= */

  const handleProcessPayment = async (payload) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await processPayment(payload);
      showNotification('Payment submitted successfully', 'success');
    } catch (err) {
      console.error(err);
      showNotification(
        err?.response?.data?.message || 'Payment failed. Please try again.',
        'error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  /* =========================
     UI CALLBACKS
  ========================= */

  const handleViewReceipt = (paymentId) => {
    const payment = billingHistory.find(p => p.id === paymentId);
    if (payment?.receiptUrl) {
      window.open(payment.receiptUrl, '_blank');
    } else {
      showNotification('Receipt not available yet', 'info');
    }
  };

  const handleDownloadStatement = () => {
    showNotification('Statement download feature coming soon', 'info');
  };

  return (
    <StudentLayout
      title="Billing & Payments"
      subtitle="Manage your rent payments and billing history"
    >
      {/* Overview */}
      <OverviewCards overview={overview} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 min-[1400px]:grid-cols-2 gap-8 mt-8 items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <QuickPay
            defaultAmount={overview.currentBalance?.amount || 0}
            paymentMethods={paymentMethods}
            activeMethodId={activePaymentMethod}
            onMethodChange={setActivePaymentMethod}
            onPay={handleProcessPayment}
            isProcessing={isProcessing}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <BillingHistory
            history={billingHistory}
            onViewReceipt={handleViewReceipt}
            onDownloadStatement={handleDownloadStatement}
            onPayNow={(amount) =>
              handleProcessPayment({ amount })
            }
          />

          <BillingDetails details={billingDetails} />
        </div>
      </div>

      {/* Payment Method Modal (UI only) */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={() => {
          setIsPaymentModalOpen(false);
          showNotification('Saved locally (UI only)', 'info');
        }}
      />

      {/* Toast */}
      <Notification notification={notification} />
    </StudentLayout>
  );
};

export default BillingPage;
