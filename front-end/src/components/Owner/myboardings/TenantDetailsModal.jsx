import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaIdBadge } from "react-icons/fa";

const TenantDetailsModal = ({ tenant, onClose }) => {
  // -- Animation Variants --
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {tenant && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-text/60 backdrop-blur-sm" // Higher z-index to sit on top
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-card-bg w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-light relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Banner */}
            <div className="h-24 bg-accent/10 w-full absolute top-0 left-0 z-0"></div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/50 hover:bg-white text-muted hover:text-text flex items-center justify-center transition-all shadow-sm"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Content */}
            <div className="relative z-10 pt-12 px-6 pb-8 flex flex-col items-center text-center">
              
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-accent text-5xl mb-4">
                <FaUserCircle />
              </div>

              {/* Name & ID */}
              <h3 className="text-xl font-black text-text tracking-tight mb-1">{tenant.name}</h3>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1 mb-6">
                <FaIdBadge /> ID: {tenant.id}
              </p>

              {/* Details Grid */}
              <div className="w-full space-y-3 bg-light/30 p-4 rounded-2xl border border-light">
                
                <div className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center text-xs">
                    <FaEnvelope />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[9px] font-black text-muted uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-text truncate w-full">{tenant.email || "No email provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 border-t border-light/50">
                  <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">
                    <FaPhoneAlt />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-muted uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-bold text-text">{tenant.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 border-t border-light/50">
                  <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center text-xs">
                    <FaCalendarAlt />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-muted uppercase tracking-wider">Joined Date</p>
                    <p className="text-sm font-bold text-text">{tenant.joinedDate}</p>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 w-full">
                 <button
                    onClick={onClose}
                    className="w-full py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl active:scale-95 transition-all"
                  >
                    Close Profile
                  </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TenantDetailsModal;