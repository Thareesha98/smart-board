import { useState } from 'react';

export const useAppointmentForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper to trigger loading state from parent
  const setSubmitting = (state) => setIsSubmitting(state);
  
  // Helper to trigger success state from parent
  const setSuccess = (state) => setIsSuccess(state);

  return {
    formData,
    updateField,
    isSubmitting,
    isSuccess,
    setSubmitting,
    setSuccess
  };
};