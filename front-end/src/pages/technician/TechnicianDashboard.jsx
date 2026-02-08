import React, { useState, useEffect } from "react";
import {
  getTechnicianJobs,
  respondToJob,
  completeJob,
} from "../../api/technician/technicianService";
import TechnicianLayout from "../../components/technician/common/TechnicianLayout";
import Map from "../../components/common/Map"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, FaPhone, FaCheck, FaEye, FaTimes, FaCalendarAlt, FaTools, FaBan, FaMoneyBillWave 
} from "react-icons/fa";
import toast from "react-hot-toast";

const TechnicianDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [completeId, setCompleteId] = useState(null);
  const [billAmount, setBillAmount] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getTechnicianJobs();
      setJobs(data);
      if (selectedJob) {
        const updated = data.find(j => j.id === selectedJob.id);
        if (updated) setSelectedJob(updated);
      }
    } catch (error) { toast.error("Failed to load jobs"); }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleAccept = async (id) => {
    try {
      await respondToJob(id, true);
      toast.success("Job Accepted!");
      setSelectedJob(null);
      fetchJobs();
    } catch (e) { toast.error("Error accepting job"); }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return toast.error("Please provide a reason");
    try {
      await respondToJob(rejectId, false, rejectReason);
      toast.success("Job Declined");
      setRejectId(null);
      setRejectReason("");
      setSelectedJob(null);
      fetchJobs();
    } catch (e) { toast.error("Error declining job"); }
  };

  const handleComplete = async () => {
    try {
      await completeJob(completeId, billAmount);
      toast.success("Job Completed & Billed!");
      setCompleteId(null);
      fetchJobs();
    } catch (e) { toast.error("Error completing job"); }
  };

  const newRequests = jobs.filter((j) => j.status === "ASSIGNED");
  const activeJobs = jobs.filter((j) => j.status === "IN_PROGRESS");

  return (
    <TechnicianLayout title="Dashboard" subtitle="Overview of your work">
      
      {/* --- NEW REQUESTS SECTION --- */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-orange-500 rounded-full" /> New Requests ({newRequests.length})
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {newRequests.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 relative">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase">
                      {job.maintenanceUrgency} Severity
                    </span>
                  </div>
                  <button onClick={() => setSelectedJob(job)} className="p-3 bg-orange-50 text-orange-600 rounded-2xl hover:bg-orange-100 transition-colors">
                    <FaEye size={20} />
                  </button>
               </div>
               <div className="flex gap-3">
                  <button onClick={() => handleAccept(job.id)} className="flex-1 bg-orange-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-orange-200">
                    Accept
                  </button>
                  <button onClick={() => setRejectId(job.id)} className="flex-1 bg-white border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold">
                    Decline
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ACTIVE JOBS SECTION --- */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-green-500 rounded-full" /> Active Jobs ({activeJobs.length})
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {activeJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-green-100">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <p className="text-xs text-green-600 font-bold">{job.boardingTitle}</p>
                  </div>
                  <button onClick={() => setSelectedJob(job)} className="p-3 bg-green-50 text-green-600 rounded-2xl">
                    <FaEye size={20} />
                  </button>
               </div>
               <button onClick={() => setCompleteId(job.id)} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                 <FaCheck /> Mark Work Done
               </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-hide"
            >
              <div className="p-6 border-b sticky top-0 bg-white/90 backdrop-blur-md flex justify-between items-center z-10">
                <h3 className="text-xl font-black text-gray-800">Job Specification</h3>
                <button onClick={() => setSelectedJob(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><FaTimes /></button>
              </div>

              <div className="p-8 space-y-6">
                
                {/* 1. DESCRIPTION (Top) */}
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-700">Description</h4>
                    <span className="text-[10px] font-black text-gray-400 italic">
                      {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">"{selectedJob.description}"</p>
                </div>

                {/* 2. OWNER & BOARDING INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                    <p className="text-[10px] text-blue-400 font-black uppercase">Property Name</p>
                    <h5 className="font-bold text-blue-900">{selectedJob.boardingTitle}</h5>
                    <p className="text-xs text-blue-700 mt-1">{selectedJob.boardingAddress}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-green-500 font-black uppercase">Owner Info</p>
                      <h5 className="font-bold text-green-900">{selectedJob.ownerName}</h5>
                      <p className="text-xs text-green-700">{selectedJob.ownerPhone}</p>
                    </div>
                    <a href={`tel:${selectedJob.ownerPhone}`} className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-md">
                      <FaPhone size={14} />
                    </a>
                  </div>
                </div>

                {/* 3. PHOTOS (NOW MOVED TO LAST, BEFORE MAP) */}
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Evidence Photos</h4>
                  {selectedJob.imageUrls && selectedJob.imageUrls.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {selectedJob.imageUrls.map((url, i) => (
                        <img key={i} src={url} alt="Evidence" className="w-64 h-48 object-cover rounded-3xl border-4 border-gray-50 shadow-sm flex-shrink-0" />
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 bg-gray-50 rounded-3xl text-center text-gray-400 border-2 border-dashed border-gray-100">
                       No photos provided
                    </div>
                  )}
                </div>

                {/* 4. MAP (Final Section) */}
                <div className="rounded-[2.5rem] overflow-hidden h-64 border-4 border-gray-50 shadow-inner">
                   <Map 
                     center={{ lat: selectedJob.latitude || 6.9271, lng: selectedJob.longitude || 79.8612 }} 
                     makerTitle={selectedJob.boardingTitle} 
                   />
                </div>
              </div>
              
              {/* ACTION FOOTER */}
              <div className="p-8 border-t bg-gray-50 flex gap-4">
                 {selectedJob.status === "ASSIGNED" && (
                   <>
                    <button onClick={() => handleAccept(selectedJob.id)} className="flex-[2] bg-orange-600 text-white py-4 rounded-2xl font-black text-lg">
                      ACCEPT JOB
                    </button>
                    <button onClick={() => setRejectId(selectedJob.id)} className="flex-1 bg-white border border-gray-200 text-gray-500 py-4 rounded-2xl font-bold">
                      Decline
                    </button>
                   </>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REJECT MODAL --- */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm">
            <h3 className="font-black text-xl mb-4 text-red-600 flex items-center gap-2"><FaBan /> Decline Request</h3>
            <textarea
              className="w-full border rounded-2xl p-4 mb-6 outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
              placeholder="Reason for declining..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="flex gap-3">
              <button onClick={() => setRejectId(null)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
              <button onClick={handleReject} className="flex-1 bg-red-600 text-white rounded-xl font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* --- COMPLETE BILL MODAL --- */}
      {completeId && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm">
            <h3 className="font-black text-xl mb-4 text-green-600 flex items-center gap-2"><FaMoneyBillWave /> Final Bill</h3>
            <input
              type="number"
              className="w-full border rounded-2xl p-4 mb-6 text-lg font-bold"
              placeholder="LKR 0.00"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setCompleteId(null)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
              <button onClick={handleComplete} className="flex-1 bg-green-600 text-white rounded-xl font-bold">Send Bill</button>
            </div>
          </div>
        </div>
      )}

    </TechnicianLayout>
  );
};

export default TechnicianDashboard;