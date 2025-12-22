import React from 'react';
import { motion } from 'framer-motion';
import { FaReceipt, FaDownload } from 'react-icons/fa';

const BillingHistory = ({ history, onViewReceipt, onDownloadStatement, onPayNow }) => {
  return (
    <section className="bg-card-bg rounded-large shadow-custom p-6 h-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-bold text-primary">Payment History</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownloadStatement}
          className="flex items-center gap-2 px-4 py-2 rounded-large font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          <FaDownload />
          Download
        </motion.button>
      </div>

      <div className="space-y-4">
        {history.map((payment, index) => (
          <HistoryItem
            key={payment.id}
            payment={payment}
            onViewReceipt={onViewReceipt}
            onPayNow={onPayNow}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

const HistoryItem = ({ payment, onViewReceipt, onPayNow, index }) => {
  const isPending = payment.status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-large transition-all duration-300 hover:border-accent"
    >
      <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
        <div className="text-2xl font-bold text-text-dark w-24">LKR {payment.amount}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-text-dark truncate">{payment.title}</h4>
          <span className="text-sm text-text-muted truncate block">{payment.boarding}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:justify-end">
        <div className="text-right">
            <div className="text-sm text-text-muted mb-1">{payment.date}</div>
            <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                isPending
                ? 'bg-info/20 text-info'
                : 'bg-success/20 text-success'
            }`}
            >
            {payment.status}
            </span>
        </div>

        {isPending ? (
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPayNow(payment.amount)}
            className="px-4 py-2 rounded-large font-semibold text-sm bg-accent text-white hover:bg-primary transition-all duration-300 flex-shrink-0"
            >
            Pay Now
            </motion.button>
        ) : (
            <button
            onClick={() => onViewReceipt(payment.id)}
            className="p-2 rounded-lg text-text-muted hover:bg-background-light hover:text-text-dark transition-colors duration-200"
            >
            <FaReceipt />
            </button>
        )}
      </div>
    </motion.div>
  );
};

export default BillingHistory;