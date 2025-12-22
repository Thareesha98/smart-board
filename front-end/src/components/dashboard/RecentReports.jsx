import React from 'react';

const RecentReports = ({ reports }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-alert/10 text-red-alert';
      case 'warning': return 'bg-yellow-500/10 text-yellow-600';
      case 'info': return 'bg-info/10 text-info';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-card-bg rounded-large shadow-custom overflow-hidden flex flex-col h-full">
      <div className="p-8 pb-4 flex justify-between items-center">
        <h3 className="text-primary text-xl font-bold">Recent Reports</h3>
        <a href="/admin/reports" className="text-accent font-semibold hover:underline text-sm">View All</a>
      </div>
      
      <div className="p-8 pt-0 flex flex-col gap-4">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-background-light rounded-[15px] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md border border-transparent hover:border-accent/10">
            
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg ${getTypeStyles(report.type)}`}>
              <i className={`fas ${report.icon}`}></i>
            </div>

            <div className="flex-1">
              <h4 className="text-text-dark font-bold text-lg leading-tight">{report.title}</h4>
              <p className="text-text-muted text-sm mt-1">{report.desc}</p>
              <span className="text-text-muted text-xs block mt-1 opacity-70 uppercase tracking-wider font-semibold">{report.meta}</span>
            </div>

            <button 
              className="border-2 border-accent text-accent bg-transparent px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
              onClick={() => console.log(`Investigate report ${report.id}`)}
            >
              Investigate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;