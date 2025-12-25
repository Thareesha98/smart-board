import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const NOTIFICATION_CONFIG = {
  success: { icon: FaCheckCircle, bg: 'bg-success', text: 'text-white' },
  info: { icon: FaInfoCircle, bg: 'bg-info', text: 'text-white' },
  warning: { icon: FaExclamationTriangle, bg: 'bg-warning', text: 'text-white' },
  error: { icon: FaExclamationTriangle, bg: 'bg-error', text: 'text-white' },
};

const Notification = ({ notification }) => {
  if (!notification) return null;

  const config = NOTIFICATION_CONFIG[notification.type] || NOTIFICATION_CONFIG.info;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={`fixed top-6 right-6 ${config.bg} ${config.text} px-6 py-4 rounded-large shadow-xl z-[2000] flex items-center gap-3 max-w-md`}
      >
        <Icon size={20} />
        <span className="font-semibold">{notification.message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;