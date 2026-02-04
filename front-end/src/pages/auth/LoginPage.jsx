import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- CONTEXT IMPORTS ---
import { useAuth as useStudentAuth } from "../../context/student/StudentAuthContext";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";

// --- COMPONENT IMPORTS ---
import UnifiedLoginForm from "../../components/auth/UnifiedLoginForm";

// --- ASSETS ---
import backgroundImage from "../../assets/s5.jpg";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // AUTH HOOKS
  const { login: studentLogin } = useStudentAuth();
  const { login: ownerLogin } = useOwnerAuth();

  // HANDLER: The "Try Both" Logic
  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError("");
    const { email, password } = formData;

    try {
      // 1. ATTEMPT STUDENT LOGIN
      const studentResult = await studentLogin(email, password);

      if (studentResult && studentResult.success) {
        navigate("/student", { replace: true });
        return; // Stop here if successful
      }

      // 2. IF STUDENT FAILS, ATTEMPT OWNER LOGIN
      // (We assume the first failure might just be "User not found" in student DB)
      const ownerResult = await ownerLogin(email, password);

      if (ownerResult && ownerResult.success) {
        navigate("/owner/dashboard", { replace: true });
        return; // Stop here if successful
      }

      // 3. IF BOTH FAIL
      setError("Login failed. Please check your email and password.");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 backdrop-blur-sm" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 border shadow-2xl bg-white/95 backdrop-blur-md rounded-large border-white/20"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img
                src={logo}
                alt="SmartBoAD Logo"
                className="w-[60px] h-[60px]"
              />
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                SmartBoAD
              </h1>
            </div>
            <h2 className="text-xl font-bold text-text-dark">Welcome Back!</h2>
          </div>

          <UnifiedLoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold transition-colors text-accent hover:text-primary"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
