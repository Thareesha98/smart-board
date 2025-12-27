import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOwnerAuth } from '../../../context/owner/OwnerAuthContext.jsx';
import SignupForm from '../../../components/Owner/auth/SignupForm.jsx';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import backgroundImage from '../../../assets/s5.jpg';

const OwnerSignupPage = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, isLoading: authLoading } = useOwnerAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSignup = async (formData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = signup(formData);
      if (result.success) {
        setIsLoading(false);
        navigate('/owner/login/', { replace: true });
      }
    }, 2000);
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Overlay for opacity and color tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Link
            to="/owner/login"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-6 font-semibold drop-shadow-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-large hover:bg-white/20"
          >
            <FaArrowLeft />
            Back to Login
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-md rounded-large shadow-2xl p-6 md:p-12 border border-white/20 max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                src={logo}
                alt="SmartBoAD Logo"
                className="w-[80px] h-[80px]"
              />
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                SmartBoAD
              </motion.h1>
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-bold text-text-dark mb-2"
            >
              Partner Registration
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-text-muted text-sm md:text-base"
            >
              Join SmartBoAD to list and manage your properties
            </motion.p>
          </div>

          {/* Signup Form */}
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-text-muted text-sm md:text-base">
              Already have a partner account?{" "}
              <Link
                to="/owner/login"
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

export default OwnerSignupPage;