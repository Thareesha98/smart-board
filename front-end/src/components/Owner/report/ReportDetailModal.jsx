import React from "react";

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "New":
      return {
        background: "rgba(255, 122, 0, 0.1)",
        color: "#FF7A00",
        icon: "fas fa-flag",
      };
    case "In Progress":
      return {
        background: "rgba(59, 130, 246, 0.1)",
        color: "#3B82F6",
        icon: "fas fa-sync-alt",
      };
    case "Resolved":
      return {
        background: "rgba(16, 185, 129, 0.1)",
        color: "#10B981",
        icon: "fas fa-check-circle",
      };
    default:
      return { background: "#f3f4f6", color: "#9ca3af", icon: "fas fa-file" };
  }
};

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  const statusStyle = getStatusBadgeStyle(report.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#E8DBC7] w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* --- Header Section --- */}
        <div className="px-8 py-6 bg-[#dcc6a6] border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm"
              style={{
                backgroundColor: statusStyle.background,
                color: statusStyle.color,
              }}
            >
              <i className={statusStyle.icon}></i>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                View Incident Report
              </h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                Reference ID: #{report.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all hover:rotate-90"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="p-8 space-y-6 overflow-y-auto">
          {/* Card 1: Involved Parties */}
          <div className="bg-white p-6 rounded-[25px] shadow-sm border border-gray-100 grid grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400"></div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Boarding Property
              </label>
              <div className="flex items-center gap-2 text-gray-700">
                <i className="fas fa-building text-blue-400"></i>
                <span className="font-bold text-lg">{report.property}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Assigned Student
              </label>
              <div className="flex items-center gap-2 text-gray-700">
                <i className="fas fa-user-circle text-orange-400"></i>
                <span className="font-bold text-lg">{report.student}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Incident Details */}
          <div className="bg-white p-8 rounded-[25px] shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Incident Category
                </label>
                <p className="text-xl font-black text-gray-800">
                  {report.type}
                </p>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Submission Date
                </label>
                <p className="font-bold text-gray-600">{report.date}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block text-gray-400">
                Full Description
              </label>
              <p className="text-gray-600 leading-relaxed font-medium italic">
                "{report.description}"
              </p>
            </div>
          </div>

          {/* Card 3: Evidence Files */}
          <div className="bg-white p-8 rounded-[25px] shadow-sm border border-gray-100">
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-paperclip text-gray-400"></i> Attached
              Evidence
            </h4>

            {report.evidenceCount > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(report.evidenceCount)].map((_, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:bg-blue-50 cursor-default"
                  >
                    <i className="fas fa-file-image text-2xl text-gray-300"></i>
                    <span className="text-[10px] font-bold text-gray-400 mt-2">
                      Evidence_{i + 1}.jpg
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400 font-medium italic">
                  No evidence files attached.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Footer Section --- */}
        <div className="p-6 bg-[#E8DBC7] border-t flex justify-between items-center">
          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            <i className="fas fa-lock mr-1"></i> Official System Log - Read Only
          </div>
          <button
            onClick={onClose}
            className="px-10 py-3 bg-gray-800 text-white rounded-full font-bold shadow-lg hover:bg-black transition-all active:scale-95"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;
