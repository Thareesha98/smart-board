import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarPlus } from 'react-icons/fa';

const AppointmentForm = ({ formData, updateField, onSubmit, isSubmitting, isSuccess, timeSlots }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit();
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-primary mb-1">Schedule a Visit</h3>
        <p className="text-text-muted text-sm">Pick a time to see the property in person.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark uppercase tracking-wide">Visit Date</label>
          <input 
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-medium text-text-dark"
            required
          />
        </div>

        {/* Time Slot Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark uppercase tracking-wide">Preferred Time</label>
          <div className="relative">
             <select 
              value={formData.time}
              onChange={(e) => updateField('time', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all appearance-none font-medium text-text-dark cursor-pointer"
              required
            >
              <option value="">Select a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>{slot.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-xs">▼</div>
          </div>
        </div>

        {/* Notes Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark uppercase tracking-wide">Notes (Optional)</label>
          <textarea 
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="E.g. I will be bringing my parents..."
            rows="3"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none font-medium text-text-dark text-sm"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-2
            ${isSuccess 
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
              : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30'
            } 
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <FaCalendarPlus />
          {isSubmitting ? 'Scheduling...' : isSuccess ? 'Scheduled Successfully' : 'Confirm Appointment'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AppointmentForm;