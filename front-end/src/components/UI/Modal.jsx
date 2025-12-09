// src/components/UI/Modal.jsx
import Card from './Card.jsx';

const Modal = ({ isOpen, onClose, children, title = "Details" }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="p-0 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-background-light">
            <h3 className="text-xl font-semibold text-text-dark">{title}</h3>
            <button className="text-2xl text-text-muted hover:text-error transition-colors" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;