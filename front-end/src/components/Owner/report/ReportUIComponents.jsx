// --- Sub-Component: Status Badge ---
const Badge = ({ text, style }) => (
  <span className="text-xs font-semibold px-3 py-1 rounded-xl" style={style}>
    {text}
  </span>
);

// --- Sub-Component: Category Tab ---
export const StatusTab = ({
  status,
  count,
  currentFilter,
  setFilter,
  style,
}) => {
  const isActive = currentFilter === status;
  return (
    <button
      className="relative w-full flex flex-col items-center gap-2 p-6 rounded-[25px] font-semibold transition duration-300"
      style={{
        backgroundColor: isActive ? style.color : "var(--light)",
        color: isActive ? "white" : "var(--muted)",
        boxShadow: isActive ? `0 8px 20px ${style.color}40` : "none",
      }}
      onClick={() => setFilter(status)}
    >
      <i className={`${style.icon} text-2xl`}></i>
      <span className="text-sm uppercase tracking-wide">{status}</span>
      <span
        className={`absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full border-2 ${
          isActive ? "bg-white text-gray-800" : "bg-gray-800 text-white"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

// --- Sub-Component: Report Row ---
export const ReportRow = ({
  report,
  onViewDetails,
  getStatusStyle,
  getSeverityStyle,
}) => {
  const status = getStatusStyle(report.status);
  const severity = getSeverityStyle(report.severity);

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-[25px] shadow-sm hover:shadow-md transition duration-300">
      <div className="w-20 text-center border-r pr-4 border-gray-100">
        <span className="text-[10px] uppercase font-bold text-gray-400">
          ID #{report.id}
        </span>
        <p className="text-xs text-gray-500 mt-1">{report.date}</p>
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-gray-800">{report.student}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <i className="fas fa-building text-blue-400"></i>
          <span>{report.property}</span>
        </div>
      </div>

      <div className="flex-1 hidden md:block">
        <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
          {report.type}
        </p>
        <div className="mt-1">
          <Badge
            text={report.status}
            style={{ backgroundColor: status.background, color: status.color }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          text={`Severity: ${report.severity}`}
          style={{
            border: `1px solid ${severity.color}`,
            color: severity.color,
          }}
        />
        <button
          onClick={() => onViewDetails(report)}
          className="bg-gray-800 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-black transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
