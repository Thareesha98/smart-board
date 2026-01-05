import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const CancelModal = ({ isOpen, onClose, onConfirm, appointmentName }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(reason);
    setReason(""); // Reset after sending
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl w-11/12 max-w-md relative text-center shadow-2xl animate-scaleIn">
        
        {/* Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          &times;
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center mb-6">
          <FaTimesCircle className=" text-5xl mb-4 bg-red-50 p-2 rounded-full border-4 border-red-50 text-red-500" />
          <h3 className="text-2xl font-bold text-gray-800">Cancel Appointment?</h3>
          <p className="text-gray-500 mt-2 text-sm">
            Are you sure you want to cancel your visit to <strong className="text-gray-800">{appointmentName}</strong>?
          </p>
        </div>

        {/* Reason Input */}
        <div className="text-left mb-6">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
            Reason (Optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Sorry, I found another place..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none h-24"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleSubmit}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-transform active:scale-95 shadow-lg shadow-red-200"
          >
            Yes, Cancel Appointment
          </button>
          
          <button 
            onClick={onClose}
            className="w-full bg-white border-2 border-gray-200 text-gray-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
          >
            No, Keep It
          </button>
        </div>

      </div>
    </div>
  );
};

export default CancelModal;