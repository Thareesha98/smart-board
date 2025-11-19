import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPaperPlane,
  FaSync,
  FaCloudUploadAlt,
  FaTimes,
  FaInfoCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaSkullCrossbones,
  FaLock,
} from 'react-icons/fa';

const SEVERITY_LEVELS = [
  { value: 'low', label: 'Low', icon: FaInfoCircle, color: 'bg-success/20 text-success' },
  { value: 'medium', label: 'Medium', icon: FaExclamationCircle, color: 'bg-info/20 text-info' },
  { value: 'high', label: 'High', icon: FaTimesCircle, color: 'bg-error/20 text-error' },
  { value: 'critical', label: 'Critical', icon: FaSkullCrossbones, color: 'bg-critical text-white' },
];

const BOARDING_OPTIONS = [
  { value: '', label: 'Select a boarding' },
  { value: 'sunshine-hostel', label: 'Sunshine Hostel' },
  { value: 'city-view-apartments', label: 'City View Apartments' },
  { value: 'green-garden-residence', label: 'Green Garden Residence' },
  { value: 'other', label: 'Other (not listed)' },
];

const ReportForm = ({ reportType, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    reportTitle: '',
    incidentDate: '',
    reportDescription: '',
    severity: '',
    boarding: '',
    reportedPerson: '',
    allowContact: true,
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const showBoardingSelection = ['boarding', 'safety'].includes(reportType.type);
  const showPersonSelection = ['owner', 'student'].includes(reportType.type);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(selectedFiles);

    const newPreviews = selectedFiles.map(file => ({
      name: file.name,
      type: file.type,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    setPreviews(newPreviews);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    if (previews[index].url) {
      URL.revokeObjectURL(previews[index].url);
    }
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (!formData.reportTitle || !formData.reportDescription || !formData.severity) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      ...formData,
      type: reportType.type,
      evidence: files,
    });
  };

  const charCount = formData.reportDescription.length;
  const charLimitColor =
    charCount > 1000 ? 'text-error' : charCount > 800 ? 'text-warning' : 'text-text-muted';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card-bg rounded-large shadow-custom p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Submit Report</h2>
        <div className="flex items-center gap-4 px-4 py-2 bg-background-light rounded-large">
          <span className="font-semibold text-text-dark">{reportType.typeName}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="flex items-center gap-2 px-3 py-1 rounded-btn text-sm font-semibold bg-white text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
          >
            <FaSync />
            Change Type
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        {showBoardingSelection && (
          <div>
            <label className="block font-semibold text-text-dark mb-2">Select Boarding</label>
            <select
              name="boarding"
              value={formData.boarding}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none"
            >
              {BOARDING_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {showPersonSelection && (
          <div>
            <label className="block font-semibold text-text-dark mb-2">Person to Report</label>
            <input
              type="text"
              name="reportedPerson"
              value={formData.reportedPerson}
              onChange={handleChange}
              placeholder="Enter name or identifier"
              className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block font-semibold text-text-dark mb-2">
            Report Title <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="reportTitle"
            value={formData.reportTitle}
            onChange={handleChange}
            placeholder="Brief description of the issue"
            required
            className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-text-dark mb-2">
            Date of Incident (if applicable)
          </label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-text-dark mb-2">
            Detailed Description <span className="text-error">*</span>
          </label>
          <textarea
            name="reportDescription"
            value={formData.reportDescription}
            onChange={handleChange}
            placeholder="Please provide a detailed description of what happened..."
            required
            rows="6"
            maxLength="1000"
            className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none resize-vertical"
          />
          <div className={`text-right text-sm mt-1 ${charLimitColor}`}>
            {charCount}/1000 characters
          </div>
        </div>

        <div>
          <label className="block font-semibold text-text-dark mb-2">
            Severity Level <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEVERITY_LEVELS.map(level => {
              const Icon = level.icon;
              return (
                <label key={level.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="severity"
                    value={level.value}
                    checked={formData.severity === level.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-3 rounded-btn font-semibold text-sm text-center transition-all duration-300 border-2 flex items-center justify-center gap-2 ${
                      formData.severity === level.value
                        ? 'border-current scale-105'
                        : 'border-transparent'
                    } ${level.color}`}
                  >
                    <Icon />
                    {level.label}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-text-dark mb-2">Evidence (Optional)</label>
          <p className="text-sm text-text-muted mb-2">
            Upload photos, screenshots, or documents that support your report
          </p>
          <div className="relative">
            <input
              type="file"
              id="evidence"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="evidence"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-btn cursor-pointer transition-colors hover:border-accent"
            >
              <FaCloudUploadAlt className="text-4xl text-text-muted mb-2" />
              <span className="text-text-dark font-medium">Choose files or drag and drop</span>
              <small className="text-text-muted mt-1">Max 5 files, 10MB each</small>
            </label>
          </div>

          {previews.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-4">
              {previews.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-20 h-20 rounded-lg overflow-hidden bg-background-light flex items-center justify-center group"
                >
                  {preview.url ? (
                    <img src={preview.url} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaTimes className="text-2xl text-text-muted" />
                      <small className="text-xs text-text-muted mt-1">
                        {preview.name.split('.').pop().toUpperCase()}
                      </small>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="allowContact"
            checked={formData.allowContact}
            onChange={handleChange}
            className="mt-1 w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm text-text-dark">
            I allow SmartBoAD administrators to contact me for additional information about this report
          </span>
        </label>

        <div className="flex gap-4 p-4 bg-info/10 border border-info/30 rounded-large">
          <FaLock className="text-info text-xl flex-shrink-0 mt-1" />
          <div className="text-sm text-text-muted">
            <strong className="text-text-dark">Confidentiality Notice:</strong> Your report will be handled
            confidentially. We will not disclose your identity to the reported party without your consent, except
            where required by law or to prevent imminent harm.
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-large font-semibold bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg"
          >
            <FaPaperPlane />
            Submit Report
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportForm;