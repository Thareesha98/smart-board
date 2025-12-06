import React, { useState } from "react";

const RegistrationModal = ({ isOpen, onClose, onSubmit, appointment }) => {
  const [formData, setFormData] = useState({
    moveInDate: "",
    contractDuration: "",
    emergencyContact: "",
    emergencyPhone: "",
    specialRequirements: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.moveInDate ||
      !formData.contractDuration ||
      !formData.emergencyContact ||
      !formData.emergencyPhone ||
      !formData.agreeTerms
    ) {
      alert("Please fill in all required fields and agree to the terms.");
      return;
    }
    onSubmit(formData);
    setFormData({
      // Reset form after submission
      moveInDate: "",
      contractDuration: "",
      emergencyContact: "",
      emergencyPhone: "",
      specialRequirements: "",
      agreeTerms: false,
    });
  };

  if (!isOpen || !appointment) return null;

  const durationOptions = [
    { value: "3", label: "3 Months" },
    { value: "6", label: "6 Months" },
    { value: "12", label: "12 Months" },
    { value: "24", label: "24 Months" },
  ];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card-bg p-8 rounded-large w-11/12 max-w-2xl relative animate-modalSlideIn">
        <span
          className="absolute top-4 right-4 text-2xl cursor-pointer text-text-muted hover:text-text-dark"
          onClick={onClose}
        >
          &times;
        </span>
        <h3 className="text-2xl font-bold text-primary mb-6">
          Register for {appointment.boardingName}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Move-in Date */}
          <div className="form-group">
            <label
              htmlFor="moveInDate"
              className="block font-semibold mb-1 text-primary"
            >
              Move-in Date
            </label>
            <input
              type="date"
              id="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="form-input"
            />
          </div>

          {/* Contract Duration */}
          <div className="form-group">
            <label
              htmlFor="contractDuration"
              className="block font-semibold mb-1 text-primary"
            >
              Contract Duration
            </label>
            <select
              id="contractDuration"
              value={formData.contractDuration}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="" disabled>
                Select duration
              </option>
              {durationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Emergency Contact */}
          <div className="form-group">
            <label
              htmlFor="emergencyContact"
              className="block font-semibold mb-1 text-primary"
            >
              Emergency Contact Name
            </label>
            <input
              type="text"
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Full name of emergency contact"
              required
              className="form-input"
            />
          </div>

          {/* Emergency Phone */}
          <div className="form-group">
            <label
              htmlFor="emergencyPhone"
              className="block font-semibold mb-1 text-primary"
            >
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              id="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="form-input"
            />
          </div>
        </div>

        {/* Special Requirements */}
        <div className="form-group mt-4">
          <label
            htmlFor="specialRequirements"
            className="block font-semibold mb-1 text-primary"
          >
            Special Requirements (Optional)
          </label>
          <textarea
            id="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            placeholder="Any dietary restrictions, allergies, or special needs..."
            rows="3"
            className="form-input"
          ></textarea>
        </div>

        {/* Terms Checkbox */}
        <div className="form-group mt-4">
          <label className="flex items-start gap-3 cursor-pointer text-sm text-text-dark">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="mt-1 appearance-none w-5 h-5 border-2 border-text-muted rounded-md transition-all duration-200 checked:bg-accent checked:border-accent"
            />
            <span className="custom-checkbox-label">
              I agree to the boarding house rules and terms of service
            </span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-8">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>

          {/* Complete Registration Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
          >
            Complete Registration
          </button>
        </div>

        {/* Custom Form Styling */}
        <style jsx>{`
          .form-input {
            @apply w-full p-3 border border-gray-200 rounded-btn text-text-dark transition-colors duration-200 focus:border-accent focus:outline-none;
          }
          .btn-outline {
            @apply px-6 py-2 rounded-large font-semibold transition-all duration-300 border border-accent text-accent hover:bg-accent hover:text-white hover:-translate-y-0.5;
          }
          .btn-primary {
            @apply px-6 py-2 rounded-large font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5;
          }
        `}</style>
      </div>
    </div>
  );
};

export default RegistrationModal;
