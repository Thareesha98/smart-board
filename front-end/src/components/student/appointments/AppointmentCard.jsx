import React from 'react';

// Helper to format date and time (using the JS logic provided)
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const formatTime = (timeString) => new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const getStatusClasses = (status) => {
  switch (status) {
    // We only need the badge classes here, as button classes are dynamic and applied below
    case 'upcoming': return { badge: 'bg-success/10 text-success' };
    case 'visited': return { badge: 'bg-info/10 text-info' };
    case 'selected': return { badge: 'bg-success/20 text-success border border-success' };
    case 'cancelled': return { badge: 'bg-error/10 text-error' };
    default: return { badge: 'bg-gray-200 text-text-muted' };
  }
};

const AppointmentCard = ({ appointment, onAction }) => {
  const { id, boardingName, image, owner, address, contact, date, time, status, registered } = appointment;
  // Destructure only what is used
  const { badge } = getStatusClasses(status); 
  const shortAddress = address.split(',')[0];
  const isRegistered = status === 'selected' && registered;

  const renderButtons = () => {
    // Common base classes for actions buttons
    const BASE_BTN_CLASSES = "text-sm py-2 px-4 rounded-large font-semibold transition-all duration-300 border-2";

    switch (status) {
      case 'upcoming':
        return (
          <>
            <button className={`${BASE_BTN_CLASSES} text-info border-info hover:bg-info hover:text-white`} onClick={() => onAction('reschedule', id)}>
              <i className="fas fa-calendar-alt"></i> Reschedule
            </button>
            <button className={`${BASE_BTN_CLASSES} text-error border-error hover:bg-error hover:text-white`} onClick={() => onAction('cancel', id)}>
              <i className="fas fa-times"></i> Cancel
            </button>
            <span className={`status-badge ${badge}`}>Upcoming</span>
          </>
        );
      case 'visited':
        return (
          <>
            <button className={`${BASE_BTN_CLASSES} text-success border-success hover:bg-success hover:text-white`} onClick={() => onAction('select', id)}>
              <i className="fas fa-check"></i> Select
            </button>
            <button className={`${BASE_BTN_CLASSES} text-error border-error hover:bg-error hover:text-white`} onClick={() => onAction('reject', id)}>
              <i className="fas fa-times"></i> Reject
            </button>
            <span className={`status-badge ${badge}`}>Visited</span>
          </>
        );
      case 'selected':
        return isRegistered ? (
          <>
            <button className={`${BASE_BTN_CLASSES} text-accent border-accent hover:bg-accent hover:text-white`} onClick={() => onAction('view', id)}>
              <i className="fas fa-eye"></i> View
            </button>
            <span className={`status-badge ${badge}`}>Registered</span>
          </>
        ) : (
          <>
            <button className={`bg-success text-white hover:bg-success/90 ${BASE_BTN_CLASSES} border-success`} onClick={() => onAction('register', id)}>
              <i className="fas fa-home"></i> Add to My Boardings
            </button>
            <span className={`status-badge ${badge}`}>Selected</span>
          </>
        );
      case 'cancelled':
        return <span className={`status-badge ${badge}`}>Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="
      bg-card-bg rounded-large shadow-custom p-6 
      transition-transform-shadow duration-300 flex flex-col md:flex-row items-center gap-6 
      hover:transform hover:-translate-y-0.5 hover:shadow-xl
    ">
      {/* Boarding Image */}
      <img
        src={image}
        alt={boardingName}
        className="w-16 h-16 rounded-full object-cover border-3 border-accent flex-shrink-0"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80' }}
      />

      {/* Appointment Details Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full text-center md:text-left">
        {/* Name & Meta */}
        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-bold text-text-dark mb-1">{boardingName}</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-text-muted text-sm justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <i className="fas fa-user text-accent w-4"></i>
              <span>{owner}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-map-marker-alt text-accent w-4"></i>
              <span>{shortAddress}</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase text-text-muted/70 tracking-wider">Contact</span>
          <div className="flex items-center gap-2 font-semibold text-text-dark mt-1 justify-center md:justify-start">
            <i className="fas fa-phone text-success"></i>
            <span>{contact}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs uppercase text-text-muted/70 tracking-wider">Visit Date</span>
          <strong className="text-lg font-bold text-primary mt-1">{formatDate(date)}</strong>
          <span className="text-sm text-text-muted">{formatTime(time)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center md:justify-end flex-wrap flex-shrink-0">
        {renderButtons()}
      </div>

      <style jsx>{`
        .status-badge {
          @apply text-xs py-2 px-3 rounded-full font-semibold uppercase tracking-wider min-w-[100px] text-center;
        }
      `}</style>
    </div>
  );
};

export default AppointmentCard;