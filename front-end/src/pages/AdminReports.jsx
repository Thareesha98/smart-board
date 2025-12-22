import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import ReportTable from '../components/reports/ReportTable';
import ReportFilters from '../components/reports/ReportFilters';
import ReportDetailsModal from '../components/reports/ReportDetailsModal';
import Toast from '../components/common/Toast';
import { useReports } from '../hooks/useReports';

const AdminReports = ({ onNavigate }) => {
  const { 
    filteredReports, stats, currentTab, setCurrentTab, category, setCategory,
    selectedReport, setSelectedReport, toast, 
    handleDismiss, handleSuspend, handleResolve // Added handleResolve
  } = useReports();

  return (
    <AdminLayout 
      onNavigate={onNavigate} 
      activePage="reports"
      title="Reports Management"
      subtitle="Handle user complaints and safety concerns"
    >
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Pending', val: stats.pending, color: 'border-[#FF7A00]', icon: 'fa-clock', bg: 'bg-[#FF7A00]/10', text: 'text-[#FF7A00]' },
          { label: 'Urgent', val: stats.urgent, color: 'border-[#EF4444]', icon: 'fa-bolt', bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]' },
          { label: 'Resolved', val: stats.resolved, color: 'border-[#10B981]', icon: 'fa-check-circle', bg: 'bg-[#10B981]/10', text: 'text-[#10B981]' },
          { label: 'Total', val: stats.total, color: 'border-[#D84C38]', icon: 'fa-flag', bg: 'bg-[#D84C38]/10', text: 'text-[#D84C38]' }
        ].map((s, i) => (
          <div key={i} className={`bg-white p-6 rounded-[25px] shadow-sm border-l-4 ${s.color} flex items-center gap-5 hover:shadow-md transition-all`}>
             <div className={`w-12 h-12 rounded-full ${s.bg} ${s.text} flex items-center justify-center text-xl`}>
               <i className={`fas ${s.icon}`}></i>
             </div>
             <div>
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{s.label} Reports</span>
               <div className="text-2xl font-black text-[#332720]">{s.val}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <ReportFilters 
          currentTab={currentTab} setTab={setCurrentTab}
          category={category} setCategory={setCategory}
        />
      </div>

      <div className="bg-white rounded-[25px] shadow-sm overflow-hidden border border-gray-100">
        <ReportTable reports={filteredReports} onView={setSelectedReport} />
      </div>

      {selectedReport && (
        <ReportDetailsModal 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)}
          onDismiss={handleDismiss}
          onSuspend={handleSuspend}
          onResolve={handleResolve} // Pass resolve logic
        />
      )}
    </AdminLayout>
  );
};

export default AdminReports;