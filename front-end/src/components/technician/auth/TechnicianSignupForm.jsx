import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCity,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Reusing your helpers (Assuming they exist in utils)
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from "../../../utils/student/validation.js";

const TechnicianSignupForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    nicNumber: "",
    address: "",
    city: "",
    basePrice: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(formData.firstName)) newErrors.firstName = "Required";
    if (!validateRequired(formData.lastName)) newErrors.lastName = "Required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid Email";
    if (!validatePassword(formData.password))
      newErrors.password = "Min 6 chars";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mismatch";
    if (!validatePhone(formData.phone)) newErrors.phone = "Invalid Phone";
    if (!validateRequired(formData.city)) newErrors.city = "City Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        basePrice: formData.basePrice,
        nicNumber: formData.nicNumber,
        role: "TECHNICIAN",
      };
      onSubmit(payload);
    }
  };

  const InputField = ({ icon: Icon, label, name, type = "text", ...props }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3.5 text-gray-400" />
        <input
          name={name}
          type={type}
          {...props}
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={FaUser}
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          icon={FaUser}
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <InputField
        icon={FaEnvelope}
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <FaLock className="absolute left-3 top-9 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400"
          >
            <FaEye />
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <InputField
          icon={FaLock}
          label="Confirm"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={FaPhone}
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          icon={FaIdCard}
          label="NIC"
          name="nicNumber"
          value={formData.nicNumber}
          onChange={handleChange}
        />
      </div>

      {/* Technician Specific Fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={FaCity}
          label="City (Operating Area)"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Colombo"
        />
        <InputField
          icon={FaMoneyBillWave}
          label="Base Charge (LKR)"
          name="basePrice"
          type="number"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="1500"
        />
      </div>

      <InputField
        icon={FaMapMarkerAlt}
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-4 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-primary transition-all disabled:bg-gray-400 mt-4"
      >
        {isLoading ? "Registering..." : "Register as Technician"}
      </motion.button>
    </div>
  );
};

export default TechnicianSignupForm;
