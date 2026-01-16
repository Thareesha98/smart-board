import React from "react";
import { motion } from "framer-motion";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import {
  SelectGroup,
  EvidenceUpload,
} from "../../components/Owner/report/ReportFormComponents";
import useAddReportLogic from "../../hooks/owner/useAddReportLogic"; // Make sure this path matches where you saved the hook
import { reportTypes } from "../../data/mockData";

// Severity Options for Dropdown
const severityOptions = [
  { id: "LOW", name: "Low" },
  { id: "MEDIUM", name: "Medium" },
  { id: "HIGH", name: "High" },
  { id: "CRITICAL", name: "Critical" },
];

export default function AddReportPage() {
  // Extract logic from the custom hook
  const {
    properties,
    students,
    loadingData,
    formData,
    newFiles,
    isSubmitting,
    handlePropertyChange,
    handleChange,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
  } = useAddReportLogic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-4 space-y-6"
    >
      <HeaderBar
        title="Report Student Issue"
        subtitle="Submit a formal report regarding student conduct."
        navBtnText="Back to Reports"
        navBtnPath="/owner/reports"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className="p-8 bg-white rounded-report shadow-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-primary border-light">
            Incident Details
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* --- 1. Property & Student --- */}
            <SelectGroup
              label="Select Boarding Property"
              name="propertyId"
              value={formData.propertyId}
              onChange={handlePropertyChange}
              options={properties}
              placeholder={loadingData ? "Loading properties..." : "Select a property"}
              disabled={loadingData}
            />

            <SelectGroup
              label="Select Student"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              options={students}
              placeholder={
                !formData.propertyId
                  ? "Select property first"
                  : students.length === 0
                  ? "No students found"
                  : "Select a student"
              }
              disabled={!formData.propertyId || students.length === 0}
            />

            {/* --- 2. Report Title --- */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary">
                Report Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Late Payment for October, Noise Complaint"
                className="w-full p-3.5 px-4 rounded-xl text-sm border border-light focus:outline-none focus:border-accent"
              />
            </div>

            {/* --- 3. Type & Severity --- */}
            <SelectGroup
              label="Type of Incident"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              options={reportTypes}
              placeholder="Choose category"
            />

            <SelectGroup
              label="Severity Level"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              options={severityOptions}
              placeholder="Select severity"
            />

            {/* --- 4. Incident Date --- */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary">
                Date of Incident *
              </label>
              <input
                type="date"
                name="incidentDate"
                required
                value={formData.incidentDate}
                onChange={handleChange}
                className="w-full p-3.5 px-4 rounded-xl text-sm border border-light focus:outline-none focus:border-accent text-gray-500"
              />
            </div>

            {/* --- 5. Allow Contact Checkbox --- */}
            <div className="flex items-center mt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="allowContact"
                  checked={formData.allowContact}
                  onChange={handleChange}
                  className="w-5 h-5 accent-accent"
                />
                <span className="text-sm font-bold text-text">
                  Allow admin/student to contact me about this report
                </span>
              </label>
            </div>

            {/* --- 6. Description --- */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary">
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

        {/* --- Evidence Upload Section --- */}
        <motion.div
          className="p-8 bg-white rounded-report shadow-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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

        {/* --- Submit Button --- */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 font-bold text-white shadow-lg rounded-3xl bg-error disabled:opacity-50"
          >
            {isSubmitting ? (
              <i className="fas fa-circle-notch fa-spin"></i>
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