import { useState } from 'react';
import { sampleBillingData } from '../../data/student/billingData.js';

const useBillingLogic = () => {
  const [overview, setOverview] = useState(sampleBillingData.overview);
  const [paymentMethods, setPaymentMethods] = useState(sampleBillingData.paymentMethods);
  const [billingHistory, setBillingHistory] = useState(sampleBillingData.billingHistory);
  const [billingDetails] = useState(sampleBillingData.billingDetails);
  const [activePaymentMethod, setActivePaymentMethod] = useState(paymentMethods[0]?.id);

  const addPaymentMethod = (paymentData) => {
    const newMethod = {
      id: Date.now(),
      type: 'visa',
      name: `Visa ending in ${paymentData.cardNumber.slice(-4)}`,
      details: `Expires ${paymentData.expiryDate}`,
    };
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const removePaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
    if (activePaymentMethod === methodId) {
      setActivePaymentMethod(paymentMethods[0]?.id);
    }
  };

  const processPayment = (amount) => {
    // Update overview
    setOverview(prev => ({
      ...prev,
      currentBalance: { ...prev.currentBalance, amount: 0 },
      paidThisMonth: { amount, status: 'Payment successful' },
    }));

    // Update billing history
    setBillingHistory(prev =>
      prev.map(payment =>
        payment.status === 'pending'
          ? { ...payment, status: 'paid', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
          : payment
      )
    );
  };

  return {
    overview,
    paymentMethods,
    billingHistory,
    billingDetails,
    activePaymentMethod,
    setActivePaymentMethod,
    addPaymentMethod,
    removePaymentMethod,
    processPayment,
  };
};

export default useBillingLogic;