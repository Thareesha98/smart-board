import React, { useState } from 'react';
import SuspendUserModal from './SuspendUserModal';

const ReportDetailsModal = ({ report, onClose, onDismiss, onSuspend, onResolve }) => {
  const [showSuspendFlow, setShowSuspendFlow] = useState(false);
  
  // Interactive input states
  const [isDismissing, setIsDismissing] = useState(false);
  const [dismissReasonInput, setDismissReasonInput] = useState('');
  
  const [isResolving, setIsResolving] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');

  if (!report) return null;

  const isPending = report.status === 'pending' || !report.status;
  const isInvestigating = report.status === 'investigating';
  const isResolved = report.status === 'resolved';
  const isDismissed = report.status === 'dismissed';
  const isCompleted = isResolved || isDismissed;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-sm">
        <div className="bg-white w-full max-w-4xl rounded-[25px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded-md uppercase mr-2">Case #{report.id}</span>
              <h3 className="text-xl font-bold text-primary inline-block">{report.title}</h3>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-dark text-2xl transition-colors">&times;</button>
          </div>

          {/* Body */}
          <div className="flex-grow overflow-y-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Description */}
                <div>
                  <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-text-dark leading-relaxed bg-background-light/30 p-5 rounded-xl border border-gray-100 text-sm">
                    {report.description}
                  </p>
                </div>

                {/* 2. Completed Status Displays */}
                {isResolved && (
                  <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase mb-2 flex items-center gap-2">
                      <i className="fas fa-check-circle"></i> Final Solution
                    </h4>
                    <p className="text-sm text-emerald-900 font-medium">
                      {report.solution || "This issue was marked as resolved."}
                    </p>
                  </div>
                )}

                {isDismissed && (
                  <div className="p-5 bg-gray-100 border border-gray-200 rounded-2xl animate-in fade-in">
                    <h4 className="text-xs font-bold text-gray-600 uppercase mb-2 flex items-center gap-2">
                      <i className="fas fa-ban"></i> Reason for Dismissal
                    </h4>
                    <p className="text-sm text-gray-700 font-medium">
                      {report.dismissalReason || "This report was dismissed after investigation."}
                    </p>
                  </div>
                )}

                {/* 3. Interactive Input Flows */}
                {isDismissing && (
                  <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 animate-in slide-in-from-top-2">
                    <label className="block text-sm font-bold text-orange-800 mb-2">Reason for Dismissal</label>
                    <textarea 
                      className="w-full p-3 rounded-xl border-orange-200 text-sm focus:ring-orange-500 mb-3"
                      rows="3"
                      placeholder="Please explain why this report is being dismissed..."
                      value={dismissReasonInput}
                      onChange={(e) => setDismissReasonInput(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onDismiss(report.id, dismissReasonInput)} className="px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-bold shadow-sm">Confirm Dismiss</button>
                      <button onClick={() => setIsDismissing(false)} className="px-4 py-2 text-orange-700 text-xs font-bold">Cancel</button>
                    </div>
                  </div>
                )}

                {isResolving && (
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in slide-in-from-top-2">
                    <label className="block text-sm font-bold text-emerald-800 mb-2">Final Resolution Solution</label>
                    <textarea 
                      className="w-full p-3 rounded-xl border-emerald-200 text-sm focus:ring-emerald-500 mb-3"
                      rows="3"
                      placeholder="Describe the steps taken to resolve this issue..."
                      value={solutionInput}
                      onChange={(e) => setSolutionInput(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onResolve(report.id, solutionInput)} className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-sm">Confirm & Resolve</button>
                      <button onClick={() => setIsResolving(false)} className="px-4 py-2 text-emerald-700 text-xs font-bold">Cancel</button>
                    </div>
                  </div>
                )}

                {/* 4. Evidence */}
                {report.evidence && (
                  <div className="p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <h4 className="text-xs font-bold text-text-muted uppercase mb-4 tracking-widest italic">Evidence Provided</h4>
                    {report.evidence.type === 'image' ? (
                      <div className="space-y-3 text-center">
                        <img src={report.evidence.url} className="rounded-xl max-h-64 mx-auto shadow-sm border border-gray-200" alt="Evidence" />
                        {report.evidence.caption && <p className="text-xs text-text-muted italic">{report.evidence.caption}</p>}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                          <span className="text-sm font-bold text-text-dark">{report.evidence.name}</span>
                        </div>
                        <button className="text-accent text-xs font-bold">Download</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* REPORTER INFO */}
                <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <h4 className="text-xs font-bold text-text-muted uppercase mb-4 tracking-widest">Reported By</h4>
                  <div className="flex items-center gap-4">
                    <img src={report.reporter.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" alt="" />
                    <div>
                      <div className="font-bold text-text-dark text-sm">{report.reporter.name}</div>
                      <div className="text-[10px] uppercase text-accent font-bold">{report.reporter.role}</div>
                    </div>
                  </div>
                </div>

                {/* TARGET USER INFO */}
                <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <h4 className="text-xs font-bold text-text-muted uppercase mb-4 tracking-widest">Target User</h4>
                  <div className="flex items-center gap-4 mb-5">
                    <img src={report.reported?.avatar || "https://ui-avatars.com/api/?name=User"} className="w-12 h-12 rounded-full border-2 border-red-100 shadow-sm object-cover" alt="" />
                    <div>
                      <div className="font-bold text-text-dark text-sm">{report.reported?.name || "Unknown User"}</div>
                      <div className="text-[10px] uppercase text-red-500 font-bold">{report.reported?.role || "User"}</div>
                    </div>
                  </div>
                  {!isCompleted && (
                    <button 
                      onClick={() => setShowSuspendFlow(true)} 
                      className="w-full py-2.5 bg-white text-red-500 border border-red-200 rounded-full text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            {!isCompleted ? (
              <button 
                onClick={() => { setIsDismissing(true); setIsResolving(false); }}
                className="px-6 py-2.5 rounded-full font-bold text-text-muted hover:bg-gray-200 transition-all text-xs border border-gray-200"
              >
                Dismiss Report
              </button>
            ) : <div />}

            <div className="flex gap-3">
               <button onClick={onClose} className="px-6 py-2.5 rounded-full font-bold text-text-muted hover:bg-gray-200 transition-all text-xs">
                 Close
               </button>
               {isPending && (
                 <button onClick={() => onResolve(report.id)} className="px-8 py-2.5 rounded-full font-bold bg-primary text-white text-xs transition-all shadow-md">
                   Start Investigation
                 </button>
               )}
               {isInvestigating && (
                 <button 
                  onClick={() => { setIsResolving(true); setIsDismissing(false); }} 
                  className="px-8 py-2.5 rounded-full font-bold bg-emerald-500 text-white text-xs transition-all shadow-md"
                 >
                   Mark as Resolved
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {showSuspendFlow && (
        <SuspendUserModal user={report.reported} onClose={() => setShowSuspendFlow(false)} onConfirm={onSuspend} />
      )}
    </>
  );
};

export default ReportDetailsModal;