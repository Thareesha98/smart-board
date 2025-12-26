import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import {
  SelectGroup,
  EvidenceUpload,
} from "../../components/Owner/report/ReportFormComponents";
import useReportLogic from "../../hooks/owner/useReportLogic";
import { boardingsData, reportTypes } from "../../data/mockData";

export default function AddReportPage() {
  const navigate = useNavigate();
  const { submitReport, isSubmitting } = useReportLogic();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call the hook's submit function
    const result = await submitReport(formData, newFiles);

    if (result.success) {
      alert("Formal report submitted successfully.");
      navigate("/owner/reports");
    } else {
      alert(result.message || "Error submitting report");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-4 space-y-6"
    >
      <HeaderBar
        title="Report Student Issue"
        subtitle="Submit a formal report regarding student conduct or payment issues."
        navBtnText="Back to Reports"
        navBtnPath="/owner/reports"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Incident Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-report shadow-custom"
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-primary border-light">
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
              <label className="block font-semibold mb-2 text-primary">
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the incident in detail..."
                className="w-full p-3 px-4 border rounded-xl focus:outline-none border-light"
              />
            </div>
          </div>
        </motion.div>

        {/* Evidence Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-report shadow-custom"
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-primary border-light">
            Evidence (Optional)
          </h2>
          <EvidenceUpload
            onFileChange={handleFileChange}
            files={newFiles}
            onRemoveFile={handleRemoveFile}
          />
        </motion.div>

        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 20px rgba(239, 68, 68, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-3xl font-bold text-white transition-all shadow-lg disabled:opacity-50 flex items-center gap-2 bg-error"
            style={{
              boxShadow: "0 8px 16px rgba(239, 68, 68, 0.4)",
            }}
          >
            {isSubmitting ? (
              <motion.i
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="fas fa-circle-notch"
              ></motion.i>
            ) : (
              <i className="fas fa-exclamation-triangle"></i>
            )}
            {isSubmitting ? "Submitting..." : "Submit Formal Report"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
