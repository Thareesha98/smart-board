import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import Hook
import { 
  FaCalendarAlt, 
  FaTimes, 
  FaCheck, 
  FaEye, 
  FaHome, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone,
  FaExclamationCircle,
  FaBan
} from 'react-icons/fa';

// Helper to format date and time
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const formatTime = (timeString) => new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const getStatusClasses = (status) => {
  switch (status) {
    case 'upcoming': 
      return { badge: 'bg-orange-50 text-orange-600 border border-orange-200' };
    case 'visited': 
      return { badge: 'bg-blue-50 text-blue-600 border border-blue-200' };
    case 'selected': 
      return { badge: 'bg-green-50 text-green-600 border border-green-200' };
    case 'cancelled': 
      return { badge: 'bg-red-50 text-red-500 border border-red-200' };
    case 'rejected': 
      return { badge: 'bg-red-100 text-red-900 border border-red-800' }; // ✅ Dark Red
    default: 
      return { badge: 'bg-gray-100 text-gray-500 border border-gray-200' };
  }
};

const AppointmentCard = ({ appointment, onAction }) => {
  // 2. Add ownerId to destructuring (Ensure your backend sends this!)
  const { id, boardingName, image, owner, ownerId, address, contact, date, time, status, registered } = appointment;
  const { badge } = getStatusClasses(status); 
  const shortAddress = address.split(',')[0];
  const isRegistered = status === 'selected' && registered;
  
  const navigate = useNavigate(); // 3. Initialize Hook

  // 4. Navigation Handler
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent bubbling
    if (ownerId) {
        navigate(`/profile/view/${ownerId}`);
    } else {
        console.warn("Owner ID is missing in appointment data");
    }
  };

  const renderButtons = () => {
    const BASE_BTN_CLASSES = "text-sm py-2 px-4 rounded-large font-semibold transition-all duration-300 border-2 flex items-center justify-center gap-2 whitespace-nowrap flex-1";

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
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
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
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
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
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
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
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
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
      case 'rejected':
        return (
          <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
             <FaBan /> Rejected by Owner
          </span>
        )  
      default:
        return null;
    }
  };

  return (
    <div className="
      bg-card-bg rounded-large shadow-custom p-6 border border-gray-100
      transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-0.5
      flex flex-col md:flex-row items-center gap-6
    ">
      
      {/* 1. IMAGE: Left Side */}
      <div className="relative">
        <img
          src={image}
          alt={boardingName}
          className="w-20 h-20 md:w-16 md:h-16 min-[1400px]:w-16 min-[1400px]:h-16 rounded-full object-cover border-3 border-accent flex-shrink-0"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80' }}
        />
        {/* Status badge for Mobile/Tablet (< 1400px) */}
        <div className={`min-[1400px]:hidden absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border shadow-sm ${badge}`}>
          {status}
        </div>
      </div>

      {/* 2. INFO GRID: Middle */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-3 gap-4 w-full text-center md:text-left items-center">
        
        {/* Name & Owner */}
        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-bold text-text-dark mb-1">{boardingName}</h4>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-text-muted text-sm">
            
            {/* --- CLICKABLE OWNER SECTION --- */}
            <div 
                onClick={handleProfileClick}
                className="flex items-center gap-1.5 cursor-pointer hover:text-accent hover:underline decoration-2 underline-offset-2 transition-all"
                title="View Owner Profile"
            >
              <FaUser className="text-accent w-3" />
              <span className="font-semibold">{owner}</span>
            </div>
            {/* ------------------------------- */}

            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-accent w-3" />
              <span className="truncate max-w-[150px]">{shortAddress}</span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col justify-center">
          <span className="hidden md:block text-[10px] uppercase text-text-muted/60 font-bold tracking-wider mb-0.5">Contact</span>
          <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-text-dark">
              <FaPhone className="text-success" size={14} />
              <span>{contact}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col items-center justify-center md:items-start">
          <span className="hidden md:block text-[10px] uppercase text-text-muted/60 font-bold tracking-wider mb-0.5">Visit Date</span>
          <div className="flex items-center gap-2">
            <strong className="text-lg font-bold text-primary">{formatDate(date)}</strong>
            <span className="text-sm text-text-muted">{formatTime(time)}</span>
          </div>
        </div>
      </div>

      {/* 3. ACTIONS: Right Side */}
      <div className="
        flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-end flex-shrink-0 w-full md:w-auto
        md:flex-col min-[1400px]:flex-row
      ">
        {renderButtons()}
      </div>
    </div>
  );
};

export default AppointmentCard;