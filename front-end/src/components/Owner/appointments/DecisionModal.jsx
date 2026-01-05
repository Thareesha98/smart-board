import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock, FaStickyNote, FaTimes } from "react-icons/fa";

const DecisionModal = ({ isOpen, onClose, actionType, appointment, onConfirm }) => {
  const [note, setNote] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Initialize fields when modal opens
  useEffect(() => {
    if (appointment && isOpen) {
      // Default note
      setNote(actionType === "confirmed" ? "Request accepted." : "Slot unavailable.");
      
      // Default time: Use the student's requested time
      // format: YYYY-MM-DDTHH:mm (required for datetime-local input)
      if (appointment.originalStart) {
        setStartTime(appointment.originalStart.substring(0, 16));
      }
      if (appointment.originalEnd) {
        setEndTime(appointment.originalEnd.substring(0, 16));
      }
    }
  }, [appointment, isOpen, actionType]);

  const handleSubmit = () => {
    const decisionData = {
      note,
      startTime: actionType === "confirmed" ? startTime : null,
      endTime: actionType === "confirmed" ? endTime : null,
    };
    onConfirm(appointment.id, actionType, decisionData);
    onClose();
  };

  if (!isOpen || !appointment) return null;

  const isConfirm = actionType === "confirmed";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
        >
          {/* Header */}
          <div className={`p-5 flex justify-between items-center ${isConfirm ? 'bg-success' : 'bg-error'}`}>
            <h3 className="text-white font-black uppercase tracking-wide flex items-center gap-2">
              {isConfirm ? <FaCheckCircle /> : <FaTimesCircle />}
              {isConfirm ? "Confirm Appointment" : "Reject Request"}
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1 bg-white/10 rounded-full">
              <FaTimes />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              You are about to <strong>{isConfirm ? "accept" : "reject"}</strong> the request from <span className="font-bold text-gray-800">{appointment.student}</span>.
            </p>

            {/* Time Editor (Only for Confirmation) */}
            {isConfirm && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                  <FaClock /> Verify Time Slot
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase block mb-1">Start Time</label>
                  <input 
                    type="datetime-local" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase block mb-1">End Time</label>
                  <input 
                    type="datetime-local" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Note Input */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                <FaStickyNote /> {isConfirm ? "Add a Note (Optional)" : "Reason for Rejection"}
              </label>
              <textarea
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder={isConfirm ? "e.g., Please call when you arrive at the gate." : "e.g., Sorry, this slot is already booked."}
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 ${isConfirm ? 'bg-success hover:bg-success/90' : 'bg-error hover:bg-error/90'}`}
              >
                {isConfirm ? "Confirm Now" : "Reject Now"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DecisionModal;