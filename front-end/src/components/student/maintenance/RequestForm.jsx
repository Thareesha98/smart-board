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
  { value: 'low', label: 'Low', color: 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' },
  { value: 'medium', label: 'Medium', color: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { value: 'high', label: 'High', color: 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100' },
  { value: 'emergency', label: 'Emergency', color: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100' },
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
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
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
    previews.forEach(url => URL.revokeObjectURL(url));
    setFormData({ issueType: '', urgency: '', description: '' });
    setFiles([]);
    setPreviews([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-custom border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">Submit New Request</h2>
      
      <div className="space-y-6">
        {/* Issue Type */}
        <div className="form-group">
          <label htmlFor="issueType" className="block font-bold mb-2 text-text-dark text-sm uppercase tracking-wide">
            Issue Type <span className="text-error">*</span>
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-text-dark transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
          >
            <option value="">Select issue type</option>
            {ISSUE_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Urgency Level */}
        <div className="form-group">
          <label className="block font-bold mb-2 text-text-dark text-sm uppercase tracking-wide">
            Urgency Level <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {URGENCY_LEVELS.map(level => (
              <label key={level.value} className="cursor-pointer group relative">
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
                    p-3 rounded-xl font-bold text-sm text-center transition-all duration-200 border-2
                    ${formData.urgency === level.value ? `${level.color} ring-2 ring-offset-1 ring-accent/30 shadow-sm scale-[1.02]` : 'border-gray-100 bg-gray-50 text-text-muted hover:bg-gray-100'}
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
          <label htmlFor="description" className="block font-bold mb-2 text-text-dark text-sm uppercase tracking-wide">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe the issue in detail..."
            rows="4"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-text-dark transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label className="block font-bold mb-2 text-text-dark text-sm uppercase tracking-wide">
            Upload Photos
          </label>
          <div className="relative">
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="photos"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer transition-colors hover:border-accent hover:bg-accent/5 group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                 <FaCloudUploadAlt className="text-xl text-text-muted group-hover:text-accent" />
              </div>
              <span className="font-semibold text-text-dark">Click to upload</span>
              <span className="text-xs text-text-muted mt-1">PNG, JPG up to 5MB</span>
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
                  className="relative w-20 h-20 rounded-lg overflow-hidden group border border-gray-200"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes size={10} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-bold transition-all border-2 border-gray-200 text-text-muted hover:border-gray-300 hover:text-text-dark"
          >
            Cancel
          </button>
          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all bg-accent text-white shadow-lg shadow-accent/30 hover:bg-primary hover:shadow-accent/50"
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