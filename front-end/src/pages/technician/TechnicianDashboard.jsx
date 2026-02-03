import React, { useState, useEffect } from "react";
import {
  getTechnicianJobs,
  respondToJob,
  completeJob,
} from "../../api/technician/technicianService";
import { useTechAuth } from "../../context/technician/TechnicianAuthContext";
import TechnicianLayout from "../../components/technician/common/TechnicianLayout";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import toast from "react-hot-toast";

const TechnicianDashboard = () => {
  const { currentTech } = useTechAuth();
  const [jobs, setJobs] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [completeId, setCompleteId] = useState(null);
  const [billAmount, setBillAmount] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getTechnicianJobs();
      setJobs(data);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAccept = async (id) => {
    try {
      await respondToJob(id, true);
      toast.success("Job Accepted!");
      fetchJobs();
    } catch (e) {
      toast.error("Error accepting job");
    }
  };

  const handleReject = async () => {
    try {
      await respondToJob(rejectId, false, rejectReason);
      toast.success("Job Rejected");
      setRejectId(null);
      fetchJobs();
    } catch (e) {
      toast.error("Error rejecting job");
    }
  };

  const handleComplete = async () => {
    try {
      await completeJob(completeId, billAmount);
      toast.success("Job Completed & Billed!");
      setCompleteId(null);
      fetchJobs();
    } catch (e) {
      toast.error("Error completing job");
    }
  };

  const newRequests = jobs.filter((j) => j.status === "ASSIGNED");
  const activeJobs = jobs.filter((j) => j.status === "IN_PROGRESS");

  return (
    <TechnicianLayout title="Dashboard" subtitle="Overview of your work">
      {/* New Requests */}
      {newRequests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-accent rounded-full" /> New Requests
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {newRequests.map((job) => (
              <motion.div
                layout
                key={job.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded uppercase font-bold">
                    {job.maintenanceUrgency}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaMapMarkerAlt className="text-gray-400" />{" "}
                    {job.boarding?.address || "Location Hidden"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClock className="text-gray-400" /> Reported:{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(job.id)}
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary/90"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setRejectId(job.id)}
                    className="flex-1 bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-50"
                  >
                    Decline
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Active Jobs */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-green-500 rounded-full" /> Active Jobs
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {activeJobs.map((job) => (
            <motion.div
              layout
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    Boarding Owner: {job.boarding?.owner?.fullName}
                  </p>
                </div>
                <a
                  href={`tel:${job.boarding?.owner?.phone}`}
                  className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200"
                >
                  <FaPhone />
                </a>
              </div>
              <div className="border-t border-b border-gray-50 py-4 my-4 space-y-2 text-sm">
                <p className="flex gap-2">
                  <FaMapMarkerAlt className="text-accent" />{" "}
                  {job.boarding?.address}
                </p>
                <p className="text-gray-600 ml-6">
                  Owner Note: {job.ownerNote || "None"}
                </p>
              </div>
              <button
                onClick={() => setCompleteId(job.id)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaCheck /> Mark Work Done
              </button>
            </motion.div>
          ))}
          {activeJobs.length === 0 && (
            <p className="text-gray-400 italic">No active jobs right now.</p>
          )}
        </div>
      </section>

      {/* Modals */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2">Reason for rejection</h3>
            <textarea
              className="w-full border rounded-lg p-3 mb-4"
              rows="3"
              placeholder="Reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="flex gap-2">
              <button
                onClick={() => setRejectId(null)}
                className="flex-1 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-red-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {completeId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-600" /> Final Bill Amount
            </h3>
            <div className="relative mb-4">
              <span className="absolute left-3 top-3 text-gray-400 font-bold">
                LKR
              </span>
              <input
                type="number"
                className="w-full border rounded-xl pl-12 pr-4 py-3 font-bold text-lg"
                placeholder="4500"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCompleteId(null)}
                className="flex-1 py-2 text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-green-600 text-white rounded-lg font-bold"
              >
                Send Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
