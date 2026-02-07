import React from "react";
import { FaCalendarCheck, FaMapMarkerAlt, FaUser, FaStar, FaFlag } from "react-icons/fa";

const HistoryItem = ({ job, onReport }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col lg:flex-row justify-between items-start gap-6">
      
      {/* 1. Job Details */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase tracking-wider">
              {job.status.replace("_", " ")}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <FaCalendarCheck /> {new Date(job.createdAt).toLocaleDateString()}
            </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{job.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
        
        <div className="pt-2 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-accent"/> 
              <span className="font-medium">{job.boarding.title}, {job.boarding.city}</span>
          </div>
          <div className="flex items-center gap-2">
              <FaUser className="text-blue-500"/> 
              <span>Owner: <span className="font-bold">{job.boarding.owner.fullName}</span></span>
          </div>
        </div>
      </div>

      {/* 2. Review Section */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Owner's Review</h4>
          {job.ownerRating > 0 ? (
              <>
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < job.ownerRating ? "text-yellow-400" : "text-gray-300"} size={14}/>
                  ))}
                  <span className="text-gray-700 font-bold ml-2 text-sm">{job.ownerRating}.0</span>
              </div>
              <p className="text-sm italic text-gray-600">"{job.ownerComment || "No comment provided."}"</p>
              </>
          ) : (
              <p className="text-sm text-gray-400 italic">Not reviewed yet.</p>
          )}
      </div>

      {/* 3. Report Button */}
      <div className="flex flex-col gap-2 w-full lg:w-auto min-w-[140px]">
          <div className="text-right mb-2">
              <span className="block text-xs text-gray-400 uppercase">Fee</span>
              <span className="block text-lg font-black text-green-600">LKR {job.technicianFee}</span>
          </div>
          
          <button 
              onClick={() => onReport(job)} 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors text-sm border border-red-100"
              title="Report this Owner to Admin"
          >
              <FaFlag /> Report Owner
          </button>
      </div>
    </div>
  );
};

export default HistoryItem;