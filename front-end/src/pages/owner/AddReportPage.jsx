import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useOwnerAuth} from "../../context/owner/OwnerAuthContext";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import {
  SelectGroup,
  EvidenceUpload,
} from "../../components/Owner/report/ReportFormComponents";
import useReportLogic from "../../hooks/owner/useReportLogic";
import { getOwnerBoardings,getBoardingTenants } from "../../api/owner/service";
import { reportTypes } from "../../data/mockData";

// Severity Options for Dropdown
const severityOptions = [
  { id: "LOW", name: "Low" },
  { id: "MEDIUM", name: "Medium" },
  { id: "HIGH", name: "High" },
  { id: "CRITICAL", name: "Critical" },
];

export default function AddReportPage() {
  const navigate = useNavigate();
  const { currentOwner } = useOwnerAuth();
  const { submitNewReport, isSubmitting } = useReportLogic();

  // --- 1. DYNAMIC DATA STATE ---
  const [properties, setProperties] = useState([]); // List of Boardings
  const [students, setStudents] = useState([]);     // List of Students for selected boarding
  const [loadingData, setLoadingData] = useState(true);

  const [newFiles, setNewFiles] = useState([]);

  // ✅ FIX: Updated State to match DTO requirements
  const [formData, setFormData] = useState({
    propertyId: "", // Used for UI logic to find student list
    boardingName: "", // Sent to backend
    studentId: "",
    reportType: "",
    severity: "", // New Field
    title: "", // New Field
    description: "",
    incidentDate: "", // New Field
    allowContact: true, // New Field
  });

  // --- 2. FETCH PROPERTIES ON LOAD ---
  useEffect(() => {
    const loadProperties = async () => {
      if (currentOwner?.id) {
        try {
          const data = await getOwnerBoardings(currentOwner.id);
          console.log("Backend Boarding Data:", data);

          // ✅ FIX: Robust mapping that tries multiple common field names
          const formattedData = data.map(boarding => ({
            ...boarding,
            // Try 'title', then 'name', then 'boardingName', then fallback
            name: boarding.title || boarding.name || boarding.boardingName || "Unnamed Property"
          }));
          setProperties(formattedData);
        } catch (error) {
          console.error("Failed to load properties");
        } finally {
          setLoadingData(false);
        }
      }
    };
    loadProperties();
  }, [currentOwner]);


  const handlePropertyChange = async (e) => {
    const newPropertyId = e.target.value;
    
    // Find name for the backend DTO
    const selectedProp = properties.find(p => p.id === parseInt(newPropertyId) || p.id === newPropertyId);
    
    setFormData(prev => ({
      ...prev,
      propertyId: newPropertyId,
      boardingName: selectedProp ? selectedProp.name : "", // Use 'name' or 'boardingName' depending on your API
      studentId: "" // Clear student selection
    }));

    // Fetch Students for this property
    if (newPropertyId) {
      const tenantList = await getBoardingTenants(newPropertyId);
      setStudents(tenantList);
    } else {
      setStudents([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitNewReport(formData, newFiles);

    if (result.success) {
      alert("Report submitted successfully.");
      navigate("/owner/reports");
    } else {
      alert(result.message || "Failed to submit report.");
    }
  };

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
          className="bg-white p-8 rounded-report shadow-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b text-primary border-light">
            Incident Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* --- 1. Property & Student --- */}
            <SelectGroup
              label="Select Boarding Property"
              name="propertyId"
              value={formData.propertyId}
              onChange={handlePropertyChange} // ✅ Use specific handler
              options={properties}            // ✅ From API
              placeholder={loadingData ? "Loading properties..." : "Select a property"}
              disabled={loadingData}
            />

            <SelectGroup
              label="Select Student"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              options={students}              // ✅ From API (Tenants)
              placeholder={
                !formData.propertyId 
                  ? "Select property first" 
                  : students.length === 0 
                    ? "No students found" 
                    : "Select a student"
              }
              disabled={!formData.propertyId || students.length === 0}
            />

            {/* --- 2. NEW: Title (Required by Backend) --- */}
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

            {/* --- 4. NEW: Incident Date (Required by Backend) --- */}
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

            {/* --- 5. NEW: Allow Contact Checkbox --- */}
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

        {/* Evidence Card */}
        <motion.div
          className="bg-white p-8 rounded-report shadow-custom"
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

        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-3xl font-bold text-white bg-error shadow-lg disabled:opacity-50 flex items-center gap-2"
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
