import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const ISSUE_TYPES = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'pest', label: 'Pest Control' },
  { value: 'other', label: 'Other' },
];

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-success/20 text-success' },
  { value: 'medium', label: 'Medium', color: 'bg-info/20 text-info' },
  { value: 'high', label: 'High', color: 'bg-error/20 text-error' },
  { value: 'emergency', label: 'Emergency', color: 'bg-error text-white' },
];

const RequestForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    issueType: '',
    urgency: '',
    description: '',
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview URLs
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke old URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (!formData.issueType || !formData.urgency || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({ ...formData, images: files });
    
    // Cleanup preview URLs
    previews.forEach(url => URL.revokeObjectURL(url));
    
    // Reset
    setFormData({ issueType: '', urgency: '', description: '' });
    setFiles([]);
    setPreviews([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card-bg p-6 md:p-8 rounded-large shadow-custom"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Submit New Request</h2>
      
      <div className="space-y-6">
        {/* Issue Type */}
        <div className="form-group">
          <label htmlFor="issueType" className="block font-semibold mb-2 text-text-dark">
            Issue Type <span className="text-error">*</span>
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-btn text-text-dark transition-colors duration-200 focus:border-accent focus:outline-none"
          >
            <option value="">Select issue type</option>
            {ISSUE_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Urgency Level */}
        <div className="form-group">
          <label className="block font-semibold mb-2 text-text-dark">
            Urgency Level <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {URGENCY_LEVELS.map(level => (
              <label key={level.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  value={level.value}
                  checked={formData.urgency === level.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`
                    p-3 rounded-btn font-semibold text-sm text-center transition-all duration-300
                    border-2 ${formData.urgency === level.value ? 'border-current scale-105' : 'border-transparent'}
                    ${level.color}
                  `}
                >
                  {level.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="block font-semibold mb-2 text-text-dark">
            Issue Description <span className="text-error">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe the issue in detail..."
            rows="5"
            className="w-full p-3 border border-gray-200 rounded-btn text-text-dark transition-colors duration-200 focus:border-accent focus:outline-none resize-vertical"
          />
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label className="block font-semibold mb-2 text-text-dark">
            Upload Photos (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="photos"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-btn cursor-pointer transition-colors duration-300 hover:border-accent"
            >
              <FaCloudUploadAlt className="text-4xl text-text-muted mb-2" />
              <span className="text-text-muted">Choose files or drag and drop</span>
              <span className="text-sm text-text-muted mt-1">PNG, JPG up to 5MB each</span>
            </label>
          </div>

          {/* File Previews */}
          {previews.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-4">
              {previews.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-20 h-20 rounded-lg overflow-hidden group"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <FaTimes size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-large font-semibold transition-all duration-300 border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white"
          >
            Cancel
          </button>
          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary hover:-translate-y-0.5"
          >
            <FaPaperPlane />
            Submit Request
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestForm;