import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaTools,
} from "react-icons/fa";

const URGENCY_CONFIG = {
  low: { color: "bg-emerald-100 text-emerald-700", icon: null },
  medium: { color: "bg-blue-100 text-blue-700", icon: null },
  high: {
    color: "bg-orange-100 text-orange-700",
    icon: <FaExclamationTriangle />,
  },
  critical: {
    color: "bg-red-100 text-red-700",
    icon: <FaExclamationTriangle />,
  },
};

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-yellow-600 bg-yellow-50" },
  in_progress: { label: "In Progress", color: "text-blue-600 bg-blue-50" }, // Matches Java Enum often
  "in-progress": { label: "In Progress", color: "text-blue-600 bg-blue-50" }, // Matches JS manual string
  completed: { label: "Resolved", color: "text-green-600 bg-green-50" },
  resolved: { label: "Resolved", color: "text-green-600 bg-green-50" },
};

const MaintenanceCard = ({ request, onUpdateStatus }) => {
  // ✅ FIX: Safe lowercase conversion
  const urgencyKey = request.urgency ? request.urgency.toLowerCase() : "low";
  const statusKey = request.status ? request.status.toLowerCase() : "pending";

  const urgencyStyle = URGENCY_CONFIG[urgencyKey] || URGENCY_CONFIG.low;
  const statusStyle = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
    >
      {/* Header with Urgency Strip */}
      <div
        className={`h-2 w-full ${urgencyStyle.color
          .split(" ")[0]
          .replace("bg-", "bg-")}`}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Top Row: Date & ID */}
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendar className="text-gray-300" /> {formatDate(request.date)}
          </span>
          <span className="font-mono">#{request.id}</span>
        </div>

        {/* Title & Location */}
        <div className="mb-4">
          {/* ✅ FIX: Use 'issueType' from DTO as the Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {request.issueType || "Maintenance Request"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="text-gray-300" size={12} />
            <span>
              {request.boardingName || "Unknown Property"} • Room{" "}
              {request.roomNumber || "?"}
            </span>
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${urgencyStyle.color}`}
          >
            {urgencyStyle.icon}
            <span className="capitalize">{urgencyKey} Priority</span>
          </span>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.color}`}
          >
            {statusStyle.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {request.description}
        </p>

        {/* Action Footer */}
        <div className="pt-4 border-t border-gray-50 flex gap-2 mt-auto">
          {statusKey !== "completed" && statusKey !== "resolved" ? (
            <>
              {statusKey === "pending" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateStatus(request.id, "IN_PROGRESS");
                  }}
                  className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaClock size={12} /> Start Work
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateStatus(request.id, "COMPLETED");
                }}
                className="flex-1 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-semibold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
              >
                <FaCheckCircle size={12} /> Mark Done
              </button>
            </>
          ) : (
            <div className="w-full text-center text-sm text-gray-400 py-2 font-medium bg-gray-50 rounded-lg">
              Completed on {formatDate(new Date())}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MaintenanceCard;
