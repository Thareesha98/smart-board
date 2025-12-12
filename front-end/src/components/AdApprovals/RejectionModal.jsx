// src/components/AdApprovals/RejectionModal.jsx
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
import Button from '../UI/Button.jsx';

const commonReasons = [
    'Incomplete information', 'Poor quality images', 'Suspicious content', 'Violates guidelines', 'Duplicate listing'
];

const RejectionModal = ({ isOpen, ad, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(ad.id, reason.trim());
      setReason('');
    } else {
      alert('Please provide a rejection reason.');
    }
  };
  
  const handleClose = () => {
      setReason('');
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Reject Ad: ${ad?.title || ''}`}>
      <div className="space-y-4">
        <p className="text-text-muted">
          Provide a detailed reason for rejection. This will be sent to the boarding owner.
        </p>
        
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter detailed rejection reason here..."
          rows="4"
          className="w-full p-3 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
        ></textarea>

        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2">Common Reasons:</label>
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
          <i className="fas fa-times-circle mr-2" /> Reject Advertisement
        </Button>
      </div>
    </Modal>
  );
};

export default RejectionModal;