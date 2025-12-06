import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-semibold text-text-dark mb-2">
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@university.edu"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-large transition-colors duration-200 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-semibold text-text-dark mb-2">
          Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-large transition-colors duration-200 focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-text-dark">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-accent hover:text-primary font-semibold transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error/10 border border-error text-error px-4 py-3 rounded-large text-sm"
        >
          {error}
        </motion.div>
      )}

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
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </motion.button>
    </div>
  );
};

export default LoginForm;