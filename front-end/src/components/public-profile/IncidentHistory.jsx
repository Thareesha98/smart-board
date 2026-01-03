import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const IncidentHistory = ({ history }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.3 }}
       className="bg-card-bg rounded-report shadow-custom p-6 md:p-8 border border-light min-h-[300px]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-light pb-4">
         <div className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary">
            <FaHistory size={18} />
         </div>
         <div>
            <h3 className="text-lg font-black text-primary uppercase tracking-tight">Public Record</h3>
            <p className="text-xs text-muted font-medium">Complaints and actions filed against this user</p>
         </div>
      </div>

      {history && history.length > 0 ? (
        <div className="space-y-0 relative pl-4 border-l-2 border-light ml-3">
          {history.map((report, index) => (
            <div key={report.id || index} className="mb-8 relative pl-6 group">
              <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full border-4 border-card-bg bg-accent group-hover:scale-125 transition-transform"></div>
              <div className="bg-light/30 p-5 rounded-xl border border-light hover:border-accent/30 hover:bg-light/50 transition-all duration-300">
                 <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 rounded text-[10px] font-black uppercase bg-white border border-light text-text shadow-sm">
                        {report.status}
                    </span>
                    <span className="text-xs font-mono text-muted font-bold">{report.date}</span>
                 </div>
                 <p className="text-sm text-text mb-3 leading-relaxed">{report.description}</p>
                 {report.actionTaken && (
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/10 text-error border border-error/20">
                       <FaExclamationTriangle size={10} />
                       <span className="text-[10px] font-black uppercase tracking-wider">Action: {report.actionTaken}</span>
                     </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3 text-success">
               <FaCheckCircle size={24} />
            </div>
            <h4 className="text-sm font-bold text-text">No Incidents Found</h4>
            <p className="text-xs text-muted">Clean history.</p>
         </div>
      )}
    </motion.div>
  );
};

export default IncidentHistory;