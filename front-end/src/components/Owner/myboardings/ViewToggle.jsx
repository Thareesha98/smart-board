const ViewToggle = ({ viewMode, setViewMode }) => {
  const btnBase = "px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2";
  
  return (
    <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 shadow-inner">
      <button
        onClick={() => setViewMode("grid")}
        className={`${btnBase} ${viewMode === "grid" ? "bg-(--accent) text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
      >
        <i className="fas fa-th-large"></i> Grid
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`${btnBase} ${viewMode === "list" ? "bg-(--accent) text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
      >
        <i className="fas fa-list"></i> List
      </button>
    </div>
  );
};

export default ViewToggle;