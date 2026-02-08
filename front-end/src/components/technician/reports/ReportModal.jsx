import React, { useState } from "react";
import { createTechnicianReport } from "../../../api/technician/technicianService";
import { useTechAuth } from "../../../context/technician/TechnicianAuthContext";
import toast from "react-hot-toast";

// Import Sub-Components
import ReportHeader from "./ReportHeader";
import ReportTargetDetails from "./ReportTargetDetails";
import ReportFormFields from "./ReportFormFields";

const ReportModal = ({ job, onClose }) => {
  const { currentTech } = useTechAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "NON_PAYMENT",
    severity: "MEDIUM",
    evidence: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting report...");

    try {
      const data = new FormData();
      
      // Manual Inputs
      data.append("reportTitle", formData.title);
      data.append("reportDescription", formData.description);
      data.append("type", formData.type);
      data.append("severity", formData.severity);
      
      // ✅ READ FROM DTO (Flat Fields)
      data.append("senderId", currentTech.id);
      data.append("reportedUserId", job.ownerId); // Was job.boarding.owner.id
      data.append("reportedPersonName", job.ownerName); // Was job.boarding.owner.fullName
      data.append("boarding", job.boardingTitle); // Was job.boarding.title
      
      // System Data
      data.append("incidentDate", new Date().toISOString().split("T")[0]);
      data.append("allowContact", true);

      if (formData.evidence) {
        data.append("evidence", formData.evidence);
      }

      await createTechnicianReport(data);
      
      toast.success("Report submitted to Admin!", { id: toastId });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit report", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <ReportHeader job={job} onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Target Details */}
          <ReportTargetDetails job={job} />

          {/* Form Fields */}
          <ReportFormFields formData={formData} setFormData={setFormData} />

          {/* Submit Actions */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Sending..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;