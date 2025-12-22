import React from 'react';

const ReportTable = ({ reports, onView }) => {
  const getPriorityStyle = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return 'bg-red-alert/10 text-red-alert';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600';
      default: return 'bg-info/10 text-info';
    }
  };

  return (
    <div className="bg-card-bg rounded-large shadow-custom overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {/* Standard font size for headers */}
            <th className="p-5 font-bold text-text-muted text-sm uppercase tracking-wider">Reporter</th>
            <th className="p-5 font-bold text-text-muted text-sm uppercase tracking-wider">Issue</th>
            <th className="p-5 font-bold text-text-muted text-sm uppercase tracking-wider">Priority</th>
            <th className="p-5 font-bold text-text-muted text-sm uppercase tracking-wider">Date</th>
            <th className="p-5 font-bold text-text-muted text-sm text-right uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b border-gray-50 hover:bg-background-light/20 transition-colors">
              {/* Reporter Column - Restored text-sm */}
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <img src={report.reporter.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                  <div>
                    <div className="font-bold text-text-dark text-sm">{report.reporter.name}</div>
                    <div className="text-[11px] uppercase text-accent font-bold tracking-tight">{report.reporter.role}</div>
                  </div>
                </div>
              </td>

              {/* Issue Details - Restored text-sm */}
              <td className="p-5">
                <div className="text-sm font-bold text-text-dark truncate max-w-[250px]">{report.title}</div>
                <div className="text-xs text-text-muted">{report.type}</div>
              </td>

              <td className="p-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getPriorityStyle(report.priority)}`}>
                  {report.priority}
                </span>
              </td>

              <td className="p-5 text-sm text-text-muted font-medium">{report.date}</td>

              <td className="p-5 text-right">
                <button 
                  onClick={() => onView(report)}
                  className="bg-primary text-white hover:bg-primary/90 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;