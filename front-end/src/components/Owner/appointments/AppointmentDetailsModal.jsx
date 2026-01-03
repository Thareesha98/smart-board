import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUser, FaBuilding, FaClock, FaStickyNote, FaEnvelope, FaUsers } from "react-icons/fa";

const AppointmentDetailsModal = ({ isOpen, onClose, appointment, formatDate, formatTime }) => {
  if (!isOpen || !appointment) return null;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close when clicking background
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal
          >
            {/* Header */}
            <div className="bg-primary p-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wide">
                  Appointment Details
                </h3>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  ID: #{appointment.id}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Status Section */}
              <div className="flex items-center justify-between p-4 bg-light rounded-xl border border-gray-200">
                <span className="text-xs font-black text-muted uppercase tracking-widest">Current Status</span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  appointment.status === 'confirmed' ? 'bg-success text-white' :
                  appointment.status === 'rejected' ? 'bg-error text-white' :
                  'bg-accent text-white'
                }`}>
                  {appointment.status}
                </span>
              </div>

              {/* 1. Student Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted uppercase tracking-widest border-b border-light pb-2">
                  Student Information
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FaUser size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text">{appointment.student}</p>
                      <p className="text-[10px] text-muted font-bold uppercase">Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info">
                      <FaEnvelope size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text">{appointment.studentEmail || appointment.contact}</p>
                      <p className="text-[10px] text-muted font-bold uppercase">Contact Email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <FaUsers size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text">{appointment.numberOfStudents || 1} Student(s)</p>
                      <p className="text-[10px] text-muted font-bold uppercase">Group Size</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Property Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted uppercase tracking-widest border-b border-light pb-2">
                  Boarding Request
                </h4>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0">
                      <FaBuilding size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text leading-tight">{appointment.boardingName}</p>
                      <p className="text-[10px] text-muted mt-1">{appointment.boardingAddress || "Address not provided"}</p>
                    </div>
                </div>
              </div>

              {/* 3. Time Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted uppercase tracking-widest border-b border-light pb-2">
                  Timing
                </h4>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                      <FaClock size={12} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                         <span className="text-[10px] font-bold text-muted uppercase">Requested Date</span>
                         <span className="text-xs font-bold text-text">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                         <span className="text-[10px] font-bold text-muted uppercase">Requested Time</span>
                         <span className="text-xs font-bold text-text">{formatTime(appointment.time)}</span>
                      </div>
                      
                      {/* Show Owner Assigned Time if Accepted */}
                      {appointment.status === 'confirmed' && appointment.ownerStartTime && (
                        <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                          <p className="text-[10px] font-black text-success uppercase">Confirmed Slot:</p>
                           <p className="text-xs font-bold text-text">
                              {formatDate(appointment.ownerStartTime)} @ {formatTime(appointment.ownerStartTime.split("T")[1])}
                           </p>
                        </div>
                      )}
                    </div>
                </div>
              </div>

              {/* 4. Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-muted uppercase tracking-widest border-b border-light pb-2">
                  Notes
                </h4>
                
                {/* Student Note */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <div className="flex items-center gap-2 mb-1">
                      <FaStickyNote className="text-muted text-[10px]" />
                      <span className="text-[10px] font-black uppercase text-muted">Student's Note</span>
                   </div>
                   <p className="text-xs text-text italic">
                     "{appointment.notes || "No notes provided."}"
                   </p>
                </div>

                {/* Owner Note (if exists) */}
                {appointment.ownerNote && (
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2 mb-1">
                        <FaStickyNote className="text-primary text-[10px]" />
                        <span className="text-[10px] font-black uppercase text-primary">Your Response</span>
                    </div>
                    <p className="text-xs text-text italic">
                      "{appointment.ownerNote}"
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-muted uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentDetailsModal;