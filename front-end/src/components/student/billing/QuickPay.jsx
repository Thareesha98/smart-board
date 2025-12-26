import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaShieldAlt, FaSpinner, FaMoneyBillWave } from 'react-icons/fa';

const QuickPay = ({ defaultAmount, paymentMethods, activeMethodId, onPayment, isProcessing }) => {
  // Ensure defaultAmount is a number
  const [amount, setAmount] = useState(defaultAmount || 0);

  // Update amount if defaultAmount prop changes (e.g. data load)
  useEffect(() => {
    setAmount(defaultAmount || 0);
  }, [defaultAmount]);

  const handlePayment = () => {
    onPayment(amount);
  };

  return (
    <section className="bg-card-bg rounded-2xl shadow-custom p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
           <FaMoneyBillWave />
        </div>
        <h2 className="text-xl font-bold text-primary">Quick Pay</h2>
      </div>

      <div className="space-y-6">
        
        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amount Input */}
            <div>
            <label className="block font-bold text-text-dark text-xs uppercase tracking-wide mb-2">Amount</label>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg group-focus-within:text-accent transition-colors">LKR</span>
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                step="1"
                className="w-full pl-16 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl text-lg font-bold text-text-dark transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none"
                />
            </div>
            </div>

            {/* Payment Method Select */}
            <div>
            <label className="block font-bold text-text-dark text-xs uppercase tracking-wide mb-2">Pay With</label>
            <div className="relative">
                <select
                value={activeMethodId}
                onChange={(e) => {}}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl font-semibold text-text-dark transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none appearance-none bg-white"
                >
                {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-xs">▼</div>
            </div>
            </div>
        </div>

        {/* Pay Button */}
        <motion.button
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-large font-bold text-lg transition-all duration-300 shadow-lg shadow-accent/25 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-primary hover:shadow-accent/40'
          }`}
        >
          {isProcessing ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FaCreditCard /> Pay Now
            </>
          )}
        </motion.button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-text-muted text-xs font-medium bg-gray-50 py-2 rounded-lg border border-gray-100">
          <FaShieldAlt className="text-green-500" />
          <span>256-bit SSL Secure Payment</span>
        </div>
      </div>
    </section>
  );
};

export default QuickPay;