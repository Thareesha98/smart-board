import React, { useState } from "react";
import { FaTimes, FaPaperclip, FaExclamationTriangle } from "react-icons/fa";
import { createTechnicianReport } from "../../../api/technician/technicianService";
import { useTechAuth } from "../../../context/technician/TechnicianAuthContext";
import toast from "react-hot-toast";

const ReportModal = ({ job, onClose }) => {
  const { currentTech } = useTechAuth();
  const [loading, setLoading] = useState(false);

  // Initial State (Auto-filled from the passed 'job')
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "NON_PAYMENT", // Default for Technician -> Owner
    severity: "MEDIUM",
    evidence: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting report...");

    try {
      const data = new FormData();
      
      // 1. Manual Inputs
      data.append("reportTitle", formData.title);
      data.append("reportDescription", formData.description);
      data.append("type", formData.type);
      data.append("severity", formData.severity);
      
      // 2. Auto-Filled Data (From Job & Auth)
      data.append("senderId", currentTech.id);
      data.append("reportedUserId", job.boarding.owner.id); // ✅ Auto-fill Owner ID
      data.append("reportedPersonName", job.boarding.owner.fullName); // ✅ Auto-fill Name
      data.append("boarding", job.boarding.title); // ✅ Auto-fill Boarding Name
      
      // 3. System Data
      data.append("incidentDate", new Date().toISOString().split("T")[0]);
      data.append("allowContact", true);

      // 4. Evidence File
      if (formData.evidence) {
        data.append("evidence", formData.evidence);
      }

      await createTechnicianReport(data);
      
      toast.success("Report submitted to Admin!", { id: toastId });
      onClose(); // Close modal on success
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
        <div className="bg-red-50 p-6 border-b border-red-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full text-red-600">
               <FaExclamationTriangle size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-red-700">Report Owner</h2>
                <p className="text-xs text-red-500 font-medium">Job ID: #{job.id} • {job.boarding.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={24}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* ✅ READ-ONLY SECTION (Auto-Filled) */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="md:col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Target Details (Auto-Filled)
             </div>
             
             <div>
                <label className="text-xs font-semibold text-gray-500">Reported Owner</label>
                <input 
                  type="text" 
                  value={job.boarding.owner.fullName} 
                  disabled 
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 font-bold cursor-not-allowed"
                />
             </div>
             <div>
                <label className="text-xs font-semibold text-gray-500">Owner Phone</label>
                <input 
                  type="text" 
                  value={job.boarding.owner.phone || "N/A"} 
                  disabled 
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                />
             </div>
             <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-500">Boarding Location</label>
                <input 
                  type="text" 
                  value={`${job.boarding.city} - ${job.boarding.address}`} 
                  disabled 
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                />
             </div>
          </div>

          {/* EDITABLE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Issue Type</label>
              <select 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="NON_PAYMENT">Non-Payment of Fees</option>
                <option value="UNSAFE_ENVIRONMENT">Unsafe Environment</option>
                <option value="HARASSMENT">Harassment / Rude Behavior</option>
                <option value="FRAUD">Fraud / Scam</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Severity</label>
              <select 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                value={formData.severity}
                onChange={e => setFormData({...formData, severity: e.target.value})}
              >
                <option value="LOW">Low - Minor Issue</option>
                <option value="MEDIUM">Medium - Needs Attention</option>
                <option value="HIGH">High - Urgent / Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Report Title</label>
            <input 
              type="text" 
              placeholder="E.g., Owner refused to pay agreed amount"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Detailed Description</label>
            <textarea 
              rows="4"
              placeholder="Describe exactly what happened. Include dates and amounts if applicable..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none resize-none transition-all"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          {/* EVIDENCE UPLOAD */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-50 transition-colors">
            <label className="cursor-pointer block">
                <span className=" text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                    <FaPaperclip className="text-red-500"/> Attach Proof (Optional)
                </span>
                <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 transition-all"
                    onChange={e => setFormData({...formData, evidence: e.target.files[0]})}
                />
                <p className="text-xs text-gray-400 mt-2">Upload screenshots, photos, or documents (Max 5MB)</p>
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
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