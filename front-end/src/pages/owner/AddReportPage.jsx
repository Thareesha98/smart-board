import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import {
  SelectGroup,
  EvidenceUpload,
} from "../../components/Owner/report/ReportFormComponents";
import { ownerData, boardingsData, reportTypes } from "../../data/mockData";

export default function AddReportPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFiles, setNewFiles] = useState([]);
  const [formData, setFormData] = useState({
    propertyId: "",
    studentId: "",
    reportType: "",
    description: "",
  });

  const selectedPropertyObj = boardingsData.find(
    (p) => p.id === formData.propertyId
  );
  const studentsForProperty = selectedPropertyObj
    ? selectedPropertyObj.tenantsList
    : [];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "propertyId" && { studentId: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Formal report submitted successfully.`);
      setIsSubmitting(false);
      navigate("/ownerLayout/reports"); // Navigates to the reports history page
    }, 1500);
  };

  return (
    <div className="pt-4 space-y-6">
      {/* 🌟 HeaderBar with Back Button */}
      <HeaderBar
        title="Report Student Issue"
        subtitle="Submit a formal report regarding student conduct or payment issues."
        notificationCount={2}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          onClick={() => navigate("/ownerLayout/reports")}
          className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--card-bg)",
          }}
        >
          <i className="fas fa-arrow-left mr-2"></i>
           Back to Reports
        </button>
      </HeaderBar>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Incident Details Card */}
        <div
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-(--primary) border-(--light)">
            Incident Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectGroup
              label="Select Boarding Property"
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              options={boardingsData}
              placeholder="Select a property"
            />

            <SelectGroup
              label="Select Student"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              options={studentsForProperty}
              placeholder={
                formData.propertyId
                  ? "Select a student"
                  : "Select property first"
              }
              disabled={
                !formData.propertyId || studentsForProperty.length === 0
              }
            />

            <div className="md:col-span-2">
              <SelectGroup
                label="Type of Incident"
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                options={reportTypes}
                placeholder="Choose category"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2 text-(--primary)">
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the incident in detail..."
                className="w-full p-3 px-4 border rounded-xl focus:outline-none border-(--light)"
              />
            </div>
          </div>
        </div>

        {/* Evidence Card */}
        <div
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-(--primary) border-(--light)">
            Evidence (Optional)
          </h2>
          <EvidenceUpload
            onFileChange={handleFileChange}
            files={newFiles}
            onRemoveFile={handleRemoveFile}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-[25px] font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2 bg-[var(--error)]"
            style={{
              backgroundColor: "var(--error)",
              boxShadow: "0 8px 16px rgba(239, 68, 68, 0.4)",
            }}
          >
            {isSubmitting ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fas fa-exclamation-triangle"></i>
            )}
            {isSubmitting ? "Submitting..." : "Submit Formal Report"}
          </button>
        </div>
      </form>
    </div>
  );
}
