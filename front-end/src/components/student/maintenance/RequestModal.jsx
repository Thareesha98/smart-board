import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaHome, FaHashtag } from 'react-icons/fa';

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

const RequestModal = ({ isOpen, onClose, request, onCancel }) => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (!request) return null;

  const statusConfig = STATUS_CONFIG[request.status] || STATUS_CONFIG.pending;
  const urgencyConfig = URGENCY_CONFIG[request.urgency] || URGENCY_CONFIG.low;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageSrc = (img) => {
      return typeof img === 'string' ? img : URL.createObjectURL(img);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card-bg rounded-large shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card-bg border-b border-gray-100 p-6 flex justify-between items-start">
                <h3 className="text-2xl font-bold text-primary">{request.title}</h3>
                <button
                  onClick={onClose}
                  className="text-text-muted hover:text-text-dark transition-colors duration-200"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Status and Urgency */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-muted">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-muted">Urgency:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${urgencyConfig.color}`}>
                      {request.urgency}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaHome className="text-accent" />
                    <div>
                      <p className="text-xs text-text-muted">Boarding</p>
                      <p className="font-semibold text-text-dark">{request.boarding}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-accent" />
                    <div>
                      <p className="text-xs text-text-muted">Date Submitted</p>
                      <p className="font-semibold text-text-dark">{formatDate(request.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaHashtag className="text-accent" />
                    <div>
                      <p className="text-xs text-text-muted">Request ID</p>
                      <p className="font-semibold text-text-dark">#{request.id}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-text-dark mb-2">Description</h4>
                  <p className="text-text-muted leading-relaxed">{request.description}</p>
                </div>

                {/* Images */}
                {request.images && request.images.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-text-dark mb-3">Attached Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {request.images.map((img, index) => (
                        <div 
                            key={index} 
                            className="relative group cursor-pointer"
                            // ✅ Click to maximize
                            onClick={() => setSelectedImage(getImageSrc(img))}
                        >
                            <img
                              src={getImageSrc(img)}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200 group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 rounded-lg transition-opacity">
                                <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">View</span>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions for pending requests */}
                {request.status === 'pending' && (
                  <div className="pt-6 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onCancel(request.id)}
                      className="px-6 py-3 rounded-large font-semibold transition-all duration-300 border-2 border-error text-error hover:bg-error hover:text-white"
                    >
                      Cancel Request
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* FULL SCREEN IMAGE VIEWER OVERLAY */}
          {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // Higher z-index than modal
                className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setSelectedImage(null)}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                >
                    <FaTimes size={30} />
                </button>

                {/* Full Image */}
                <motion.img 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    src={selectedImage} 
                    alt="Full size evidence" 
                    className="max-w-full max-h-screen object-contain rounded-md"
                    onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                />
            </motion.div>
          )}

        </>
      )}
    </AnimatePresence>
  );
};

export default RequestModal;