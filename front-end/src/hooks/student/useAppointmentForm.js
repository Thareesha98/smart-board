import { useState } from 'react';

export const useAppointmentForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: 'Priya S.',
    phone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      date: '',
      time: '',
      name: 'Priya S.',
      phone: '',
      notes: ''
    });
    setIsSuccess(false);
  };

  const submitAppointment = async () => {
    if (!formData.date || !formData.time) {
      return { success: false, message: 'Please select both date and time' };
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    return { 
      success: true, 
      message: `Appointment scheduled for ${formData.date} at ${formData.time}` 
    };
  };

  return {
    formData,
    updateField,
    resetForm,
    submitAppointment,
    isSubmitting,
    isSuccess
  };
};