import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaShieldAlt, FaSpinner } from 'react-icons/fa';

const QuickPay = ({ defaultAmount, paymentMethods, activeMethodId, onPayment, isProcessing }) => {
  const [amount, setAmount] = useState(defaultAmount);

  const handlePayment = () => {
    onPayment(amount);
  };

  const activeMethod = paymentMethods.find(m => m.id === activeMethodId);

  return (
    <section className="bg-card-bg rounded-large shadow-custom p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Quick Pay</h2>

      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block font-semibold text-text-dark mb-2">Amount to Pay</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-semibold z-10">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
              step="1"
              className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-btn text-xl font-semibold transition-colors duration-200 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Method Select */}
        <div>
          <label className="block font-semibold text-text-dark mb-2">Payment Method</label>
          <select
            value={activeMethodId}
            onChange={(e) => {}}
            className="w-full p-4 border-2 border-gray-200 rounded-btn font-medium transition-colors duration-200 focus:border-accent focus:outline-none"
          >
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pay Button */}
        <motion.button
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-large font-semibold text-lg transition-all duration-300 shadow-lg ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-primary hover:shadow-xl'
          }`}
        >
          {isProcessing ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaCreditCard />
              Pay Now
            </>
          )}
        </motion.button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
          <FaShieldAlt className="text-success" />
          <span>Secure payment encrypted with SSL</span>
        </div>
      </div>
    </section>
  );
};

export default QuickPay;