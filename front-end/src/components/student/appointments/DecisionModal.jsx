import React from 'react';

const DecisionModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;
  
  const { title, message, actionLabel, action, secondaryActionLabel, secondaryAction, isSuccess, isRegistrationSuccess, details } = content;

  // Primary action button styling based on success/registration success
  const primaryBtnClass = isRegistrationSuccess 
    ? "btn-primary bg-success hover:bg-success/90 text-white" 
    : isSuccess
    ? "bg-success hover:bg-success/90 text-white" 
    : "bg-error hover:bg-error/90 text-white";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card-bg p-8 rounded-large w-11/12 max-w-md relative text-center animate-modalSlideIn">
        {!isRegistrationSuccess && ( // Hide close button on registration success for controlled flow
            <span className="absolute top-4 right-4 text-2xl cursor-pointer text-text-muted hover:text-text-dark" onClick={onClose}>&times;</span>
        )}
        
        <div className="decision-content">
          <i className={`fas fa-${isSuccess ? 'check-circle' : 'times-circle'} text-5xl mb-4 ${isSuccess ? 'text-success' : 'text-error'}`}></i>
          <h3 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-primary' : 'text-text-dark'}`}>{title}</h3>
          <p className="text-text-muted mb-6">
             {message}
          </p>

          {isRegistrationSuccess && details && (
            <div className="bg-success/10 rounded-btn p-4 mb-6 text-left border border-success/30">
                <h4 className="text-success text-lg font-semibold mb-3">Registration Details</h4>
                {details.map((item, index) => (
                    <div key={index} className="flex justify-between py-1 border-b border-success/20 last:border-b-0">
                        <span className="text-text-muted text-sm">{item.label}:</span>
                        <span className="text-text-dark font-semibold text-sm">{item.value}</span>
                    </div>
                ))}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <button className={`btn-primary ${primaryBtnClass}`} onClick={action}>
              <i className={`fas fa-${isSuccess ? 'check' : 'times'} mr-2`}></i> {actionLabel}
            </button>
            {secondaryAction && (
              <button className="btn-outline border-primary text-primary hover:bg-primary hover:text-white" onClick={secondaryAction}>
                <i className="fas fa-arrow-left mr-2"></i> {secondaryActionLabel}
              </button>
            )}
            {!isRegistrationSuccess && !secondaryAction && (
                <button className="btn-outline border-accent text-accent hover:bg-accent hover:text-white" onClick={onClose}>
                    Go Back
                </button>
            )}
          </div>
        </div>
        
        <style jsx>{`
            .btn-primary {
                @apply px-6 py-3 rounded-large font-semibold transition-transform duration-300 shadow-lg hover:-translate-y-0.5 w-full flex items-center justify-center;
            }
            .btn-outline {
                @apply px-6 py-3 rounded-large font-semibold transition-transform duration-300  border-2 w-full flex items-center justify-center;
            }
        `}</style>
      </div>
    </div>
  );
};

export default DecisionModal;