import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import LoginForm from '../../../components/student/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const result = login(formData.email, formData.password);
      if (result.success) {
        setIsLoading(false);
        navigate('/');
      } else {
        setIsLoading(false);
        setError(result.message);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <h2 className="text-2xl font-bold text-text-dark mb-2">Welcome Back!</h2>
            <p className="text-text-muted">Sign in to access your dashboard</p>
          </div>

          {/* Login Form */}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-text-muted">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-accent hover:text-primary font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-text-muted text-sm mt-8">
          © 2024 SmartBoAD. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;