import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOwnerAuth } from "../../../context/owner/OwnerAuthContext.jsx";
import SignupForm from "../../../components/Owner/auth/SignupForm.jsx";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import backgroundImage from "../../../assets/s5.jpg";

const OwnerSignupPage = () => {
  const navigate = useNavigate();
  const {
    signup,
    verifyRegistration,
    isAuthenticated,
    isLoading: authLoading,
  } = useOwnerAuth();
  const [isLoading, setIsLoading] = useState(false);

  // New States for 2-Step Flow
  const [step, setStep] = useState(1); // 1 = Form, 2 = OTP
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/owner/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // STEP 1: Handle Initial Registration (Send OTP)
  const handleSignup = async (formData) => {
    setIsLoading(true);
    setOtpError("");

    // Save email for step 2
    setEmailForOtp(formData.email);

    // Call Backend Step 1
    const result = await signup(formData);

    setIsLoading(false);

    if (result.success) {
      setStep(2); // Move to OTP Screen
    } else {
      // You might need to pass this error down to SignupForm if you want inline errors
      alert(result.message);
    }
  };

  // STEP 2: Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOtpError("");

    // Call Backend Step 2
    const result = await verifyRegistration(emailForOtp, otpCode);

    setIsLoading(false);

    if (result.success) {
      navigate("/owner/dashboard", { replace: true });
    } else {
      setOtpError(result.message);
    }
  };

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Link
            to="/owner/login"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-6 font-semibold drop-shadow-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-large hover:bg-white/20"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md rounded-large shadow-2xl p-6 md:p-12 border border-white/20 max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={logo}
                alt="SmartBoAD Logo"
                className="w-[80px] h-[80px]"
              />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SmartBoAD
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
              {step === 1 ? "Partner Registration" : "Verify Email"}
            </h2>
            <p className="text-text-muted text-sm md:text-base">
              {step === 1
                ? "Join SmartBoAD to list and manage your properties"
                : `Enter the code sent to ${emailForOtp}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              /* --- STEP 1 FORM --- */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              </motion.div>
            ) : (
              /* --- STEP 2 OTP FORM --- */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-md mx-auto"
              >
                {otpError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200 text-center">
                    {otpError}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center text-3xl tracking-[0.5em] font-bold py-4 border-2 border-gray-200 rounded-xl focus:border-accent focus:outline-none transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 6}
                    className="w-full py-3 bg-accent hover:bg-primary text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Verifying..." : "Complete Registration"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-sm text-gray-500 hover:text-gray-800 underline"
                  >
                    Change Email
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Link */}
          {step === 1 && (
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
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerSignupPage;
