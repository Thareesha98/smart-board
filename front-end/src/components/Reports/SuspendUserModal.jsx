// src/components/Reports/SuspendUserModal.jsx
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
import Button from '../UI/Button.jsx';

const durations = [
    { key: '24h', label: '24 Hours' },
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: 'permanent', label: 'Permanent' },
];

const SuspendUserModal = ({ isOpen, reportedUser, report, onClose, onSubmit }) => {
  const [duration, setDuration] = useState('7d');
  const [reason, setReason] = useState(report?.title || '');

  const handleSubmit = () => {
    if (reason.trim() && reportedUser?.email) {
      onSubmit(reportedUser.email, duration, reason.trim());
      setDuration('7d');
      setReason('');
      onClose();
    } else {
      alert('Please select a duration and provide a reason.');
    }
  };
  
  const handleClose = () => {
      setDuration('7d');
      setReason(report?.title || '');
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Suspend User: ${reportedUser?.name || 'N/A'}`}>
      {reportedUser ? (
        <div className="space-y-5">
            <div className="p-3 bg-error/10 text-error rounded-card text-sm">
                <i className="fas fa-exclamation-triangle mr-2" />
                This action will immediately suspend the user's account and remove all their listings.
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='p-3 bg-background-light/50 rounded-card'>
                    <p className="font-semibold text-text-muted text-sm">User Role</p>
                    <p className="text-text-dark capitalize font-bold">{reportedUser.role}</p>
                </div>
                <div className='p-3 bg-background-light/50 rounded-card'>
                    <p className="font-semibold text-text-muted text-sm">Report ID</p>
                    <p className="text-text-dark font-bold text-sm">#REP-{report?.id || 'N/A'}</p>
                </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-2">Suspension Duration:</label>
              <div className="flex flex-wrap gap-2">
                {durations.map((d) => (
                  <Button 
                    key={d.key} 
                    variant={d.key === duration ? 'primary' : 'outline'} 
                    className="text-sm py-1.5"
                    onClick={() => setDuration(d.key)}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Reason Textarea */}
            <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Reason for Suspension:</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter detailed reason for suspension..."
                  rows="4"
                  className="w-full p-3 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
                ></textarea>
            </div>
        </div>
      ) : (
          <p className="text-error">Error: No reported user selected.</p>
      )}
      
      <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-background-light">
        <Button onClick={handleClose} variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} variant="suspend" className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white" disabled={!reason.trim() || !reportedUser}>
          <i className="fas fa-user-slash mr-2" /> Confirm Suspension
        </Button>
      </div>
    </Modal>
  );
};

export default SuspendUserModal;