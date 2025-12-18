// --- Sub-Component: Status Badge ---
const Badge = ({ text, style }) => (
  <span className="text-xs font-semibold px-3 py-1 rounded-xl" style={style}>
    {text}
  </span>
);

// --- Sub-Component: Report Row ---
export const ReportRow = ({ report, onViewDetails, getStatusStyle }) => {
  const status = getStatusStyle(report.status);

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-[25px] shadow-sm hover:shadow-md transition duration-300">
      {/* Date and ID Column */}
      <div className="w-20 text-center border-r pr-4 border-gray-100">
        <span className="text-[10px] uppercase font-bold text-gray-400">ID #{report.id}</span>
        <p className="text-xs text-gray-500 mt-1">{report.date}</p>
      </div>

      {/* Student & Property Column */}
      <div className="flex-1">
        <h4 className="font-bold text-gray-800">{report.student}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <i className="fas fa-building text-blue-400"></i>
          <span>{report.property}</span>
        </div>
      </div>

      {/* Incident Type & Status Column */}
      <div className="flex-1 hidden md:block">
        <p className="text-sm font-medium text-gray-700 truncate max-w-[250px]">{report.type}</p>
        <div className="mt-1">
           <span 
             className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider" 
             style={{ backgroundColor: status.background, color: status.color }}
           >
             {report.status}
           </span>
        </div>
      </div>

      {/* Action Column */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewDetails(report)}
          className="bg-(--primary) text-white px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 transition shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
