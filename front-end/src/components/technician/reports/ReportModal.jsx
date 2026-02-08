import React, { useState } from "react";
import { createTechnicianReport } from "../../../api/technician/technicianService";
import { useTechAuth } from "../../../context/technician/TechnicianAuthContext";
import toast from "react-hot-toast";

import ReportHeader from "./ReportHeader";
import ReportTargetDetails from "./ReportTargetDetails";
import ReportFormFields from "./ReportFormFields"; 

const ReportModal = ({ job, onClose }) => {
  const { currentTech } = useTechAuth();
  const [loading, setLoading] = useState(false);

  // 1. State for Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "NON_PAYMENT",
    severity: "MEDIUM",
    evidence: null 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting report...");

    try {
      // ✅ 2. CREATE THE PACKAGE (FormData)
      const dataPackage = new FormData();

      // Append Text
      dataPackage.append("title", formData.title);
      dataPackage.append("description", formData.description);
      dataPackage.append("type", formData.type);
      dataPackage.append("severity", formData.severity);

      // Append IDs
      dataPackage.append("senderId", currentTech.id);
      dataPackage.append("reportedUserId", job.ownerId || job.boarding?.owner?.id); 
      dataPackage.append("reportedPersonName", job.ownerName || job.boarding?.owner?.fullName);
      dataPackage.append("boardingName", job.boardingTitle || job.boarding?.title);
      dataPackage.append("incidentDate", new Date().toISOString().split("T")[0]);
      dataPackage.append("allowContact", true);

      // ✅ 3. APPEND FILE (CRITICAL STEP)
      // We read from formData.evidence because ReportFormFields saves it there
      if (formData.evidence) {
        dataPackage.append("evidence", formData.evidence);
      }

      // ✅ 4. SEND THE PACKAGE (NOT formData!)
      // Your error happened because you were sending 'formData' here.
      await createTechnicianReport(dataPackage);
      
      toast.success("Report submitted successfully!", { id: toastId });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit report", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <ReportHeader job={job} onClose={onClose} />
        <form onSubmit={handleSubmit} className="p-6">
          <ReportTargetDetails job={job} />
          <div className="my-6">
             {/* Pass formData and setFormData correctly */}
             <ReportFormFields formData={formData} setFormData={setFormData} />
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;