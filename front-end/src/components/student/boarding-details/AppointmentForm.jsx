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
      className="bg-white rounded-large p-6 shadow-custom"
    >
      <h3 className="text-xl font-bold text-primary mb-2">Schedule a Visit</h3>
      <p className="text-text-muted text-sm mb-6">Book an appointment to visit this boarding</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">Visit Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-background-light rounded-xl focus:border-accent outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">Preferred Time</label>
          <select
            value={formData.time}
            onChange={(e) => updateField('time', e.target.value)}
            className="w-full px-4 py-3 border-2 border-background-light rounded-xl focus:border-accent outline-none transition-colors"
            required
          >
            <option value="">Select time</option>
            {timeSlots.map(slot => (
              <option key={slot.value} value={slot.value}>{slot.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">Notes (Optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Any special requests or questions..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-background-light rounded-xl focus:border-accent outline-none transition-colors resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-large font-semibold flex items-center justify-center gap-2 transition-all ${
            isSuccess
              ? 'bg-green-600 text-white'
              : 'bg-accent text-white hover:bg-primary'
          } disabled:opacity-50`}
        >
          <FaCalendarPlus />
          {isSubmitting ? 'Scheduling...' : isSuccess ? 'Appointment Scheduled!' : 'Schedule Appointment'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AppointmentForm;