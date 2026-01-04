import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaTimes, 
  FaCheck, 
  FaEye, 
  FaHome, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone,
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
      return { badge: 'bg-red-100 text-red-900 border border-red-800' };
    default: 
      return { badge: 'bg-gray-100 text-gray-500 border border-gray-200' };
  }
};

const AppointmentCard = ({ appointment, onAction }) => {
  const { id, boardingId, boardingName, image, owner, ownerId, address, contact, date, time, status, registered } = appointment;
  const { badge } = getStatusClasses(status); 
  const shortAddress = address.split(',')[0];
  const isRegistered = status === 'selected' && registered;
  
  const navigate = useNavigate();

  const handleBoardingClick = (e) => {
    e.stopPropagation(); // Prevent bubbling
    if (boardingId) {
      navigate(`/student/boarding-details/${boardingId}`);
    } else {
      console.warn("Boarding ID is missing");
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (ownerId) {
        navigate(`/profile/view/${ownerId}`);
    } else {
        console.warn("Owner ID is missing in appointment data");
    }
  };

  // ✅ Helper to stop propagation safely
  const handleBtnClick = (e, action) => {
    e.stopPropagation();
    onAction(id, action);
  };

  const renderButtons = () => {
    const BASE_BTN = "text-sm py-2 px-4 rounded-large font-semibold transition-all duration-300 border-2 flex items-center justify-center gap-2 whitespace-nowrap flex-1";

    switch (status) {
      case 'upcoming':
        return (
          <>
            {/* <button 
              className={`${BASE_BTN} text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white`} 
              onClick={(e) => handleBtnClick(e, 'reschedule')}
            >
              <FaCalendarAlt /> Reschedule
            </button> */}
            <button 
              className={`${BASE_BTN} text-red-500 border-red-500 hover:bg-red-500 hover:text-white`} 
              onClick={(e) => handleBtnClick(e, 'cancel')} // ✅ Fixed Click Handler
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
              className={`${BASE_BTN} text-green-600 border-green-600 hover:bg-green-600 hover:text-white`} 
              onClick={(e) => handleBtnClick(e, 'select')}
            >
              <FaCheck /> Select
            </button>
            <button 
              className={`${BASE_BTN} text-red-500 border-red-500 hover:bg-red-500 hover:text-white`} 
              onClick={(e) => handleBtnClick(e, 'reject')}
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
              className={`${BASE_BTN} text-green-700 border-green-700 hover:bg-green-700 hover:text-white`} 
              onClick={(e) => handleBtnClick(e, 'view')}
            >
              <FaEye /> View Details
            </button>
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
              Registered
            </span>
          </>
        ) : (
          <>
            <button 
              className={`bg-green-600 text-white hover:bg-green-700 ${BASE_BTN} border-green-600`} 
              onClick={(e) => handleBtnClick(e, 'register')}
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
          <span className={`w-full text-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
            Cancelled
          </span>
        );
      case 'rejected':
        return (
          <span className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
            <FaBan /> Rejected by Owner
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="
      bg-white rounded-2xl shadow-sm p-6 border border-gray-100
      transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      flex flex-col md:flex-row items-center gap-6
    ">
      
      {/* 1. IMAGE */}
      <div 
        className="relative group cursor-pointer"
        onClick={handleBoardingClick}
      >
        <img
          src={image}
          alt={boardingName}
          className="w-20 h-20 md:w-16 md:h-16 min-[1400px]:w-16 min-[1400px]:h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm flex-shrink-0"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
        />
        <div className={`min-[1400px]:hidden absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border shadow-sm ${badge}`}>
          {status}
        </div>
      </div>

      {/* 2. INFO GRID */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-3 gap-4 w-full text-center md:text-left items-center">
        
        {/* Name & Owner */}
        <div className="flex flex-col justify-center">
          <h4 
            onClick={handleBoardingClick}
            className="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-orange-500 hover:underline transition-all"
          >
            {boardingName}
          </h4>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-gray-500 text-sm">
            <div 
                onClick={handleProfileClick}
                className="flex items-center gap-1.5 cursor-pointer hover:text-orange-600 transition-colors"
                title="View Owner Profile"
            >
              <FaUser className="text-orange-500 w-3" />
              <span className="font-semibold">{owner}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-orange-500 w-3" />
              <span className="truncate max-w-[150px]">{shortAddress}</span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col justify-center">
          <span className="hidden md:block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Contact</span>
          <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-gray-700">
              <FaPhone className="text-green-600" size={14} />
              <span>{contact}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col items-center justify-center md:items-start">
          <span className="hidden md:block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">Visit Date</span>
          <div className="flex items-center gap-2">
            <strong className="text-lg font-bold text-gray-800">{formatDate(date)}</strong>
            <span className="text-sm text-gray-500">{formatTime(time)}</span>
          </div>
        </div>
      </div>

      {/* 3. ACTIONS */}
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