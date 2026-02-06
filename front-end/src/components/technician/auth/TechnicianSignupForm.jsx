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
  FaTools,
} from "react-icons/fa";

// Reusing your helpers (Assuming they exist in utils)
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from "../../../utils/student/validation.js";

const SKILL_OPTIONS = [
  { value: "PLUMBING", label: "Plumbing" },
  { value: "ELECTRICAL", label: "Electrical" },
  { value: "FURNITURE", label: "Furniture Repair" },
  { value: "APPLIANCE", label: "Appliance Repair" },
  { value: "CLEANING", label: "Cleaning Services" },
  { value: "PEST", label: "Pest Control" },
  { value: "OTHER", label: "General / Other" },
];

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

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
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
    if (selectedSkills.length === 0)
      newErrors.skills = "Select at least 1 skill";

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
        skills: selectedSkills,
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

      {/* SKILLS SELECTION */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-3  items-center gap-2">
          <FaTools className="text-accent" /> Select Your Skills (Required)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SKILL_OPTIONS.map((skill) => (
            <label
              key={skill.value}
              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${selectedSkills.includes(skill.value) ? "bg-accent/10 border-accent text-accent" : "bg-white border-gray-200 text-gray-600"}`}
            >
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.value)}
                onChange={() => handleSkillChange(skill.value)}
                className="accent-accent w-4 h-4"
              />
              <span className="text-xs font-bold">{skill.label}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="text-red-500 text-xs mt-2 font-bold">{errors.skills}</p>
        )}
      </div>

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
