import React, { useState } from "react";

// Define the full list of options needed for the select input
const boardingOptions = [
  { value: "sunshine-hostel", label: "Sunshine Hostel" },
  { value: "city-view", label: "City View Apartments" },
  { value: "garden-view", label: "Garden View Rooms" },
  { value: "university-heights", label: "University Heights" },
  { value: "ocean-breeze", label: "Ocean Breeze Hostel" },
  { value: "campus-comfort", label: "Campus Comfort" },
];

const timeOptions = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
].map((time) => ({
  value: new Date(`2000/01/01 ${time}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  label: time,
}));

const ScheduleModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    boardingId: "", // Changed to match select value field
    boardingName: "", // New field for readable name
    visitDate: "",
    visitTime: "",
    visitNotes: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "boardingSelect") {
      const selectedOption = boardingOptions.find((opt) => opt.value === value);
      setFormData({
        ...formData,
        boardingId: value,
        boardingName: selectedOption ? selectedOption.label : "",
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.boardingId || !formData.visitDate || !formData.visitTime) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
    // Resetting form data after submission
    setFormData({
      boardingId: "",
      boardingName: "",
      visitDate: "",
      visitTime: "",
      visitNotes: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card-bg p-8 rounded-large w-11/12 max-w-xl relative animate-modalSlideIn">
        <span
          className="absolute top-4 right-4 text-2xl cursor-pointer text-text-muted hover:text-text-dark"
          onClick={onClose}
        >
          &times;
        </span>
        <h3 className="text-2xl font-bold text-primary mb-6">
          Schedule New Visit
        </h3>

        <div className="space-y-4">
          {/* Boarding Select */}
          <div className="form-group">
            <label
              htmlFor="boardingSelect"
              className="block font-semibold mb-1 text-primary"
            >
              Select Boarding
            </label>
            <select
              id="boardingSelect"
              value={formData.boardingId}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="" disabled>
                Choose a boarding...
              </option>
              {boardingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Visit Date/Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label
                htmlFor="visitDate"
                className="block font-semibold mb-1 text-primary"
              >
                Visit Date
              </label>
              <input
                type="date"
                id="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="visitTime"
                className="block font-semibold mb-1 text-primary"
              >
                Preferred Time
              </label>
              <select
                id="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="" disabled>
                  Select time slot
                </option>
                {timeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-group">
            <label
              htmlFor="visitNotes"
              className="block font-semibold mb-1 text-primary"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              id="visitNotes"
              value={formData.visitNotes}
              onChange={handleChange}
              placeholder="Any specific requirements or questions..."
              rows="3"
              className="form-input"
            ></textarea>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            className="px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-large font-semibold bg-gradient-to-r from-primary to-accent text-white border-2 border-transparent hover:shadow-xl transition-all duration-300"
            onClick={handleSubmit}
          >
            Schedule Visit
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
            @apply px-6 py-2 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary hover:-translate-y-0.5;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ScheduleModal;
