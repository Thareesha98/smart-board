import { useState } from 'react';

export const useAppointmentForm = () => {
  const [formData, setFormData] = useState({
    boardingId: '', // Added: Required for backend
    date: '',
    time: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // The actual submission is handled by the parent component (BoardingDetailsPage)
  // passing the data to the Service. This hook manages the form state.
  const submitAppointment = async () => {
    if (!formData.date || !formData.time) {
      return { success: false, message: 'Please select date and time' };
    }

    setIsSubmitting(true);
    // Mimic delay for UI feedback, actual API call happens in parent
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    return { success: true };
  };

  return {
    formData,
    updateField,
    submitAppointment,
    isSubmitting,
    isSuccess
  };
};