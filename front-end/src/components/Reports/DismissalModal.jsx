// src/components/Reports/DismissalModal.jsx
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
import Button from '../UI/Button.jsx';

const commonReasons = [
    'Insufficient evidence', 'Action already taken (Fixed)', 'Duplicate report', 'Resolved externally', 'Minor violation, warning issued'
];

const DismissalModal = ({ isOpen, report, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(report.id, reason.trim());
      setReason('');
      onClose();
    } else {
      alert('Please provide a reason for dismissal.');
    }
  };
  
  const handleClose = () => {
      setReason('');
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Dismiss Report: ${report?.title || ''}`}>
      <div className="space-y-4">
        <p className="text-text-muted">
          Please provide a reason for dismissing this report. The report will be moved to 'Resolved'.
        </p>
        
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter detailed dismissal reason here..."
          rows="4"
          className="w-full p-3 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
        ></textarea>

        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">Quick Select:</label>
          <div className="flex flex-wrap gap-2">
            {commonReasons.map((r, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="text-xs py-1"
                onClick={() => setReason(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 mt-4 border-t border-background-light">
        <Button onClick={handleClose} variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} variant="error" disabled={!reason.trim()}>
          <i className="fas fa-times-circle mr-2" /> Dismiss Report
        </Button>
      </div>
    </Modal>
  );
};

export default DismissalModal;