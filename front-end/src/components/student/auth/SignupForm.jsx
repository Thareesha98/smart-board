import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaLock, FaPhone, FaUniversity, 
  FaIdCard, FaCalendar, FaVenusMars, FaMapMarkerAlt, 
  FaUserShield, FaEye, FaEyeSlash 
} from 'react-icons/fa';
import { 
  validateEmail, validatePassword, validatePhone, 
  validateStudentId, validateRequired 
} from '../../../utils/student/validation.js';

const SignupForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    university: '',
    studentId: '',
    dob: '',
    gender: '',
    address: '',
    emergencyContact: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.firstName)) newErrors.firstName = 'First name is required';
    if (!validateRequired(formData.lastName)) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!validateRequired(formData.university)) newErrors.university = 'University is required';
    if (!validateStudentId(formData.studentId)) newErrors.studentId = 'Valid student ID is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={FaUser}
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <InputField
          icon={FaUser}
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      {/* Email */}
      <InputField
        icon={FaEnvelope}
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showPassword={showPassword}
          toggleShow={() => setShowPassword(!showPassword)}
          required
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          showPassword={showConfirmPassword}
          toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />
      </div>

      {/* Phone */}
      <InputField
        icon={FaPhone}
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+94 77 123 4567"
        required
      />

      {/* University & Student ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={FaUniversity}
          label="University"
          name="university"
          value={formData.university}
          onChange={handleChange}
          error={errors.university}
          placeholder="University of Ruhuna"
          required
        />
        <InputField
          icon={FaIdCard}
          label="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          error={errors.studentId}
          placeholder="SC/2022/12345"
          required
        />
      </div>

      {/* DOB & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={FaCalendar}
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
          max={new Date().toISOString().split('T')[0]}
          required
        />
        <SelectField
          icon={FaVenusMars}
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          error={errors.gender}
          options={[
            { value: '', label: 'Select Gender' },
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
            { value: 'other', label: 'Other' },
            { value: 'prefer-not-to-say', label: 'Prefer not to say' },
          ]}
          required
        />
      </div>

      {/* Address */}
      <TextAreaField
        icon={FaMapMarkerAlt}
        label="Current Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Your current residential address"
      />

      {/* Emergency Contact */}
      <InputField
        icon={FaUserShield}
        label="Emergency Contact"
        name="emergencyContact"
        value={formData.emergencyContact}
        onChange={handleChange}
        placeholder="Name - Relationship - Phone Number"
      />

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-4 rounded-large font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-accent text-white hover:bg-primary shadow-lg'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </motion.button>
    </div>
  );
};

// Input Field Component
const InputField = ({ icon: Icon, label, error, required, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-text-dark mb-2">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        {...props}
        className={`w-full pl-12 pr-4 py-3 border-2 rounded-large transition-colors duration-200 focus:outline-none ${
          error ? 'border-error focus:border-error' : 'border-gray-200 focus:border-accent'
        }`}
      />
    </div>
    {error && <p className="text-error text-xs mt-1">{error}</p>}
  </div>
);

// Password Field Component
const PasswordField = ({ label, error, required, showPassword, toggleShow, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-text-dark mb-2">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <div className="relative">
      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`w-full pl-12 pr-12 py-3 border-2 rounded-large transition-colors duration-200 focus:outline-none ${
          error ? 'border-error focus:border-error' : 'border-gray-200 focus:border-accent'
        }`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {error && <p className="text-error text-xs mt-1">{error}</p>}
  </div>
);

// Select Field Component
const SelectField = ({ icon: Icon, label, error, required, options, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-text-dark mb-2">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <select
        {...props}
        className={`w-full pl-12 pr-4 py-3 border-2 rounded-large transition-colors duration-200 focus:outline-none appearance-none ${
          error ? 'border-error focus:border-error' : 'border-gray-200 focus:border-accent'
        }`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="text-error text-xs mt-1">{error}</p>}
  </div>
);

// TextArea Field Component
const TextAreaField = ({ icon: Icon, label, error, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-text-dark mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-4 text-text-muted" />
      <textarea
        {...props}
        rows="3"
        className={`w-full pl-12 pr-4 py-3 border-2 rounded-large transition-colors duration-200 focus:outline-none resize-vertical ${
          error ? 'border-error focus:border-error' : 'border-gray-200 focus:border-accent'
        }`}
      />
    </div>
    {error && <p className="text-error text-xs mt-1">{error}</p>}
  </div>
);

export default SignupForm;