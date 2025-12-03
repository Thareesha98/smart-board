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

// FIXED: 'critical' now uses red text on light red background for better visibility
const SEVERITY_LEVELS = [
  { value: 'low', label: 'Low', icon: FaInfoCircle, color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { value: 'medium', label: 'Medium', icon: FaExclamationCircle, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { value: 'high', label: 'High', icon: FaTimesCircle, color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
  { value: 'critical', label: 'Critical', icon: FaSkullCrossbones, color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' },
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
    charCount > 1000 ? 'text-red-500' : charCount > 800 ? 'text-orange-500' : 'text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card-bg rounded-large shadow-custom p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">Submit Report</h2>
        <div className="flex items-center gap-4 px-4 py-2 bg-background-light rounded-large">
          <span className="font-semibold text-text-dark text-sm">{reportType.typeName}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="flex items-center gap-2 px-3 py-1 rounded-btn text-xs font-semibold bg-white text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
          >
            <FaSync />
            Change
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
              className="w-full p-3 border-2 border-gray-200 rounded-btn transition-colors focus:border-accent focus:outline-none bg-white"
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
            Report Title <span className="text-red-500">*</span>
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
            Date of Incident
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
            Detailed Description <span className="text-red-500">*</span>
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
            Severity Level <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEVERITY_LEVELS.map(level => {
              const Icon = level.icon;
              return (
                <label key={level.value} className="cursor-pointer group relative">
                  <input
                    type="radio"
                    name="severity"
                    value={level.value}
                    checked={formData.severity === level.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`
                      p-3 rounded-btn font-semibold text-sm text-center transition-all duration-300
                      border-2 flex flex-col items-center justify-center gap-2
                      ${formData.severity === level.value ? 'border-current scale-105' : 'border-transparent bg-gray-50 hover:bg-gray-100'}
                      ${formData.severity === level.value ? level.color : 'text-text-muted'}
                    `}
                  >
                    <Icon size={18} />
                    {level.label}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* File Upload Section */}
        <div>
            <label className="block font-semibold text-text-dark mb-2">Evidence (Optional)</label>
            <div className="relative">
                <input type="file" id="evidence" accept="image/*,.pdf,.doc,.docx" multiple onChange={handleFileChange} className="sr-only" />
                <label htmlFor="evidence" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-btn cursor-pointer transition-colors hover:border-accent bg-gray-50">
                    <FaCloudUploadAlt className="text-4xl text-text-muted mb-2" />
                    <span className="text-text-dark font-medium">Choose files</span>
                </label>
            </div>
             {previews.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                        {preview.url ? <img src={preview.url} alt="prev" className="w-full h-full object-cover"/> : <FaTimes />}
                        <button type="button" onClick={() => removeFile(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"><FaTimes size={10}/></button>
                    </div>
                  ))}
                </div>
             )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-large font-semibold bg-accent text-white shadow-md hover:bg-primary"
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