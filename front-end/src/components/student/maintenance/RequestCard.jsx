import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaHashtag, FaImage } from 'react-icons/fa';

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
      // Added h-full and flex flex-col to ensure uniform height in grid
      className="bg-card-bg rounded-large shadow-custom p-6 cursor-pointer transition-shadow duration-300 hover:shadow-xl h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-bold text-text-dark mb-2 line-clamp-1">{request.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm whitespace-nowrap">
          <FaCalendar />
          <span>{formatDate(request.date)}</span>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${urgencyConfig.color}`}>
          {request.urgency}
        </span>
        <span className="text-sm text-text-muted truncate max-w-[200px]">{request.boarding}</span>
      </div>

      {/* Description - flex-1 pushes footer to bottom */}
      <p className="text-text-muted text-sm mb-4 line-clamp-2 flex-1">
        {request.description}
      </p>

      {request.images && request.images.length > 0 && (
        <div className="mb-4 mt-auto">
            <div className="relative h-24 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img 
                    src={request.images[0]} 
                    alt="Evidence" 
                    className="w-full h-full object-cover"
                />
                {request.images.length > 1 && (
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                        <FaImage /> +{request.images.length - 1}
                    </div>
                )}
            </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
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