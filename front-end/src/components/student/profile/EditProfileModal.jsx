import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaSpinner } from 'react-icons/fa';

const EditProfileModal = ({ isOpen, onClose, userData, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...userData });
    }
  }, [isOpen, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card-bg rounded-large shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-card-bg z-10">
              <h3 className="text-2xl font-bold text-primary">Edit Profile Information</h3>
              <button onClick={onClose} className="text-text-muted hover:text-text-dark transition-colors">
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Personal Information Section */}
              <div>
                <h4 className="text-lg font-bold text-primary mb-4">Personal Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-text-dark mb-2">University *</label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university || ''}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Student ID *</label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId || ''}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact || ''}
                      onChange={handleChange}
                      placeholder="Name - Relationship - Phone"
                      className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div>
                <h4 className="text-lg font-bold text-primary mb-4">Account Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-text-dark mb-2">Username *</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username || ''}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-btn focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-large font-semibold border-2 border-text-muted text-text-muted hover:bg-text-muted hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-large font-semibold transition-all duration-300 ${
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent text-white hover:bg-primary shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;