import React, { useState } from 'react';
import SuspendUserModal from './SuspendUserModal';

const ReportDetailsModal = ({ report, onClose, onDismiss, onSuspend, onResolve, onMarkInvestigating }) => {
  const [showSuspendFlow, setShowSuspendFlow] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [dismissReasonInput, setDismissReasonInput] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [solutionInput, setSolutionInput] = useState('');

  if (!report) return null;

  const isPending = report.status === 'pending';
  const isInvestigating = report.status === 'investigating';
  const isResolved = report.status === 'resolved';
  const isDismissed = report.status === 'dismissed';
  const isCompleted = isResolved || isDismissed;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-text-dark/40 backdrop-blur-sm">
        <div className="bg-white w-full max-w-4xl rounded-t-[25px] sm:rounded-[25px] shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh]">
          
          <div className="p-5 lg:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-[9px] font-bold rounded-md uppercase mr-2">Case #{report.id}</span>
              <h3 className="text-lg font-bold text-primary inline-block">{report.title}</h3>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-dark text-3xl">&times;</button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-text-dark bg-background-light/30 p-4 lg:p-5 rounded-xl border border-gray-100 text-sm">{report.description}</p>
                </div>

                {isResolved && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase mb-2">Resolution Provided</h4>
                    <p className="text-sm text-emerald-900 font-medium">{report.solution}</p>
                  </div>
                )}

                {isDismissed && (
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                    <h4 className="text-xs font-bold text-orange-700 uppercase mb-2">Dismissal Reason</h4>
                    <p className="text-sm text-orange-900 italic">"{report.dismissalReason}"</p>
                  </div>
                )}

                {/* EVIDENCE SECTION */}
                {report.evidence && (
                  <div>
                    <h4 className="text-xs font-bold text-text-muted uppercase mb-3 tracking-wider">Evidence</h4>
                    {report.evidence.type === 'image' ? (
                      <img src={report.evidence.url} className="rounded-xl w-full object-contain max-h-64 shadow-sm border border-gray-100" alt="Evidence" />
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-sm font-bold text-text-dark truncate mr-2">{report.evidence.name}</span>
                        <button className="text-accent text-xs font-bold">Download</button>
                      </div>
                    )}
                  </div>
                )}

                {isDismissing && (
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <textarea className="w-full p-3 rounded-xl border-orange-200 text-sm mb-3 outline-none" placeholder="Reason for dismissal..." value={dismissReasonInput} onChange={(e) => setDismissReasonInput(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={() => onDismiss(report.id, dismissReasonInput)} className="flex-1 py-2 bg-orange-600 text-white rounded-full text-xs font-bold">Confirm Dismiss</button>
                      <button onClick={() => setIsDismissing(false)} className="flex-1 py-2 text-orange-700 text-xs font-bold">Cancel</button>
                    </div>
                  </div>
                )}

                {isResolving && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <textarea className="w-full p-3 rounded-xl border-emerald-200 text-sm mb-3 outline-none" placeholder="How was this resolved?" value={solutionInput} onChange={(e) => setSolutionInput(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={() => onResolve(report.id, solutionInput)} className="flex-1 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold">Confirm Resolved</button>
                      <button onClick={() => setIsResolving(false)} className="flex-1 py-2 text-emerald-700 text-xs font-bold">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                {/* REPORTED BY SECTION */}
                <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <h4 className="text-[10px] font-bold text-text-muted uppercase mb-3 tracking-widest">Reported By</h4>
                  <div className="flex items-center gap-3">
                    <img src={report.reporter?.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-text-dark text-sm">{report.reporter?.name}</div>
                      <div className="text-[9px] uppercase text-accent font-bold">{report.reporter?.role}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                  <h4 className="text-[10px] font-bold text-text-muted uppercase mb-3 tracking-widest">Target User</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={report.reported?.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div className="truncate">
                      <div className="font-bold text-text-dark text-sm truncate">{report.reported?.name}</div>
                      <div className="text-[9px] uppercase text-red-500 font-bold">Reported Account</div>
                    </div>
                  </div>
                  {!isCompleted && (
                    <button onClick={() => setShowSuspendFlow(true)} className="w-full py-2 bg-red-50 text-red-500 border border-red-100 rounded-full text-[11px] font-bold hover:bg-red-500 hover:text-white transition-all">Take Action</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 w-full sm:w-auto order-2 sm:order-1">
              <button onClick={onClose} className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-bold text-text-muted bg-white border border-gray-200 text-xs">Close</button>
              {!isCompleted && !isDismissing && (
                <button onClick={() => setIsDismissing(true)} className="flex-1 sm:flex-none px-6 py-2.5 rounded-full font-bold text-text-muted bg-white border border-gray-200 text-xs hover:bg-gray-100">Dismiss</button>
              )}
            </div>
            <div className="w-full sm:w-auto ml-auto order-1 sm:order-2">
              {isPending && (
                <button onClick={() => onMarkInvestigating(report.id)} className="w-full sm:px-8 py-2.5 rounded-full font-bold bg-primary text-white text-xs shadow-md">Start Investigation</button>
              )}
              {isInvestigating && !isResolving && (
                <button onClick={() => setIsResolving(true)} className="w-full sm:px-8 py-2.5 rounded-full font-bold bg-emerald-500 text-white text-xs shadow-md">Mark Resolved</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showSuspendFlow && <SuspendUserModal user={report.reported} onClose={() => setShowSuspendFlow(false)} onConfirm={onSuspend} />}
    </>
  );
};

export default ReportDetailsModal;