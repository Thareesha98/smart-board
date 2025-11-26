import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import SignupForm from '../../../components/student/auth/SignupForm';
import { FaArrowLeft } from 'react-icons/fa';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = signup(formData);
      if (result.success) {
        setIsLoading(false);
        navigate('/');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-text-dark hover:text-accent transition-colors mb-6 font-semibold"
        >
          <FaArrowLeft />
          Back to Login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-large shadow-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="SmartBoAD Logo"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <h1 className="text-4xl font-bold text-primary">SmartBoAD</h1>
            </div>
            <h2 className="text-2xl font-bold text-text-dark mb-2">Create Your Account</h2>
            <p className="text-text-muted">
              Join SmartBoAD to find your perfect boarding place
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-text-muted">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-accent hover:text-primary font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;