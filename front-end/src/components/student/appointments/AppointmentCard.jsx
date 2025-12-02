import React from 'react';
import { 
  FaCalendarAlt, 
  FaTimes, 
  FaCheck, 
  FaEye, 
  FaHome, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone 
} from 'react-icons/fa';

// Helper to format date and time
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const formatTime = (timeString) => new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const getStatusClasses = (status) => {
  switch (status) {
    case 'upcoming': 
      return { badge: 'bg-success/10 text-success border border-success/20' };
    case 'visited': 
      return { badge: 'bg-info/10 text-info border border-info/20' };
    case 'selected': 
      return { badge: 'bg-success/20 text-success border border-success' };
    case 'cancelled': 
      return { badge: 'bg-error/10 text-error border border-error/20' };
    default: 
      return { badge: 'bg-gray-200 text-text-muted border border-gray-300' };
  }
};

const AppointmentCard = ({ appointment, onAction }) => {
  const { id, boardingName, image, owner, address, contact, date, time, status, registered } = appointment;
  const { badge } = getStatusClasses(status); 
  const shortAddress = address.split(',')[0];
  const isRegistered = status === 'selected' && registered;

  const renderButtons = () => {
    // Common base classes for action buttons
    const BASE_BTN_CLASSES = "text-sm py-2 px-4 rounded-large font-semibold transition-all duration-300 border-2 flex items-center gap-2";

    switch (status) {
      case 'upcoming':
        return (
          <>
            <button 
              className={`${BASE_BTN_CLASSES} text-info border-info hover:bg-info hover:text-white`} 
              onClick={() => onAction(id, 'reschedule')}
            >
              <FaCalendarAlt /> Reschedule
            </button>
            <button 
              className={`${BASE_BTN_CLASSES} text-error border-error hover:bg-error hover:text-white`} 
              onClick={() => onAction(id, 'cancel')}
            >
              <FaTimes /> Cancel
            </button>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
              Upcoming
            </span>
          </>
        );
      case 'visited':
        return (
          <>
            <button 
              className={`${BASE_BTN_CLASSES} text-success border-success hover:bg-success hover:text-white`} 
              onClick={() => onAction(id, 'select')}
            >
              <FaCheck /> Select
            </button>
            <button 
              className={`${BASE_BTN_CLASSES} text-error border-error hover:bg-error hover:text-white`} 
              onClick={() => onAction(id, 'reject')}
            >
              <FaTimes /> Reject
            </button>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
              Visited
            </span>
          </>
        );
      case 'selected':
        return isRegistered ? (
          <>
            <button 
              className={`${BASE_BTN_CLASSES} text-accent border-accent hover:bg-accent hover:text-white`} 
              onClick={() => onAction(id, 'view')}
            >
              <FaEye /> View
            </button>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
              Registered
            </span>
          </>
        ) : (
          <>
            <button 
              className={`bg-success text-white hover:bg-success/90 ${BASE_BTN_CLASSES} border-success`} 
              onClick={() => onAction(id, 'register')}
            >
              <FaHome /> Add to My Boardings
            </button>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
              Selected
            </span>
          </>
        );
      case 'cancelled':
        return (
          <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
            Cancelled
          </span>
        );
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
            <div className="flex items-center gap-1.5">
              <FaUser className="text-accent w-4" />
              <span>{owner}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-accent w-4" />
              <span>{shortAddress}</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase text-text-muted/70 tracking-wider">Contact</span>
          <div className="flex items-center gap-2 font-semibold text-text-dark mt-1 justify-center md:justify-start">
            <FaPhone className="text-success" />
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
    </div>
  );
};

export default AppointmentCard;