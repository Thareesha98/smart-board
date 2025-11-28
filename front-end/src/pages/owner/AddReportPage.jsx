import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import FormGroup from "../../components/Owner/forms/FormGroup";

// --- Mock Data & Constants (These should be imported from mockData.js) ---
const ownerData = {
  firstName: "Mr.",
  lastName: "Silva",
  avatar: "https://randomuser.me/api/portraits/men/57.jpg",
};
const notificationCount = 2;

const mockProperties = [
  { id: "sunshine-hostel", name: "Sunshine Hostel" },
  { id: "city-view", name: "City View Apartments" },
];

const mockStudents = {
  "sunshine-hostel": [
    { id: "s1", name: "Priya Sharma" },
    { id: "s2", name: "Rohan Mehta" },
  ],
  "city-view": [
    { id: "s3", name: "Kamal D." },
    { id: "s4", name: "Nimali R." },
  ],
};

const reportTypes = [
  "Non-Payment / Late Rent",
  "Property Damage / Vandalism",
  "Misconduct / Noise Complaint",
  "Lease Violation",
  "Other",
];

// --- Main Component ---
export default function AddReportPage() {
  const [formData, setFormData] = useState({
    propertyId: "",
    studentId: "",
    reportType: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFiles, setNewFiles] = useState([]);
  const navigate = useNavigate();

  // Filter students based on selected property
  const studentsForProperty = formData.propertyId
    ? mockStudents[formData.propertyId] || []
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset student selection if property changes
    if (name === "propertyId") {
      setFormData((prev) => ({ ...prev, studentId: "" }));
    }
  };

  const handleFileChange = (e) => {
    setNewFiles([...newFiles, ...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert(
        `Report submitted successfully for Student ID ${formData.studentId} (${formData.reportType}).`
      );
      setIsSubmitting(false);
      setFormData({
        propertyId: "",
        studentId: "",
        reportType: "",
        description: "",
      });
      setNewFiles([]);
      navigate("/ownerLayout/dashboard"); // Redirect after submission
    }, 2000);
  };

  return (
    <div className="pt-4 space-y-6">
      {/* 🌟 HeaderBar */}
      <HeaderBar
        title="Report Student Issue"
        subtitle="Submit a formal report regarding student conduct or payment issues."
        notificationCount={notificationCount}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Report Form Card */}
        <div
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <h2
            className="text-[1.3rem] font-bold mb-6 pb-3 border-b"
            style={{ color: "var(--primary)", borderColor: "var(--light)" }}
          >
            Incident Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Property Select */}
            <div className="form-group">
              <label
                htmlFor="propertyId"
                className="block font-semibold mb-2"
                style={{ color: "var(--primary)" }}
              >
                Select Boarding Property *
              </label>
              <select
                id="propertyId"
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                required
                className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
                style={{ borderColor: "var(--light)", color: "var(--text)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
              >
                <option value="" disabled>
                  Select a property
                </option>
                {mockProperties.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Student Select */}
            <div className="form-group">
              <label
                htmlFor="studentId"
                className="block font-semibold mb-2"
                style={{ color: "var(--primary)" }}
              >
                Select Student *
              </label>
              <select
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                disabled={!formData.propertyId}
                className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                style={{ borderColor: "var(--light)", color: "var(--text)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
              >
                <option value="" disabled>
                  {formData.propertyId
                    ? "Select a student"
                    : "Select property first"}
                </option>
                {studentsForProperty.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Report Type Select */}
            <div className="form-group md:col-span-2">
              <label
                htmlFor="reportType"
                className="block font-semibold mb-2"
                style={{ color: "var(--primary)" }}
              >
                Type of Incident *
              </label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                required
                className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
                style={{ borderColor: "var(--light)", color: "var(--text)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
              >
                <option value="" disabled>
                  Choose the category of the report
                </option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Description */}
            <div className="form-group md:col-span-2 mt-2">
              <label
                className="block font-semibold mb-2"
                style={{ color: "var(--primary)" }}
              >
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows="5"
                placeholder="Describe the incident, including date, time, and specific actions taken by the student."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
                style={{ borderColor: "var(--light)", color: "var(--text)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Evidence & Media Card */}
        <div
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <h2
            className="text-[1.3rem] font-bold mb-6 pb-3 border-b"
            style={{ color: "var(--primary)", borderColor: "var(--light)" }}
          >
            Evidence (Optional)
          </h2>

          <div className="mt-6">
            <label
              className="block font-semibold mb-2"
              style={{ color: "var(--primary)" }}
            >
              Attach Photos or Documents
            </label>
            <div
              className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300"
              style={{
                borderColor: "var(--light)",
                backgroundColor: "var(--cardBg)",
              }}
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <i
                className="fas fa-file-upload text-3xl mb-2"
                style={{ color: "var(--accent)" }}
              ></i>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Drag and drop evidence files here, or{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  browse
                </span>
                . (Photos of damage, payment screenshots, etc.)
              </p>
              <input
                type="file"
                id="fileUpload"
                name="evidence"
                accept="image/*, application/pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {newFiles.length > 0 && (
              <div className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                {newFiles.length} file(s) ready to upload.
              </div>
            )}
          </div>
        </div>

        {/* Submission Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary p-[0.6rem] px-6 rounded-[25px] font-semibold shadow-md transition duration-300 flex items-center gap-2"
            style={{
              backgroundColor: "var(--error)", // Using error color for serious action button
              color: "var(--card-bg)",
              boxShadow: "0 8px 16px rgba(239, 68, 68, 0.4)",
            }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-exclamation-triangle"></i>
                Submit Formal Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
