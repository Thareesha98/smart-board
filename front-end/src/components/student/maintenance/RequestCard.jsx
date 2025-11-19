import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaHashtag } from 'react-icons/fa';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-info/20 text-info' },
  'in-progress': { label: 'In Progress', color: 'bg-info/30 text-info' },
  completed: { label: 'Completed', color: 'bg-success/20 text-success' },
  cancelled: { label: 'Cancelled', color: 'bg-error/20 text-error' },
};

const URGENCY_CONFIG = {
  low: { color: 'bg-success/20 text-success' },
  medium: { color: 'bg-info/20 text-info' },
  high: { color: 'bg-error/20 text-error' },
  emergency: { color: 'bg-error text-white' },
};

const RequestCard = ({ request, onClick }) => {
  const statusConfig = STATUS_CONFIG[request.status] || STATUS_CONFIG.pending;
  const urgencyConfig = URGENCY_CONFIG[request.urgency] || URGENCY_CONFIG.low;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-card-bg rounded-large shadow-custom p-6 cursor-pointer transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-dark mb-2">{request.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <FaCalendar />
          <span>{formatDate(request.date)}</span>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${urgencyConfig.color}`}>
          {request.urgency}
        </span>
        <span className="text-sm text-text-muted">{request.boarding}</span>
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm mb-4 line-clamp-2">
        {request.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <FaHashtag size={12} />
          <span>{request.id}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="text-accent font-semibold text-sm hover:text-primary transition-colors duration-200"
        >
          View Details →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RequestCard;