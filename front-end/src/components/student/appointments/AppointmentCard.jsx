import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaTimes,
  FaCheck,
  FaEye,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaBan,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft
} from "react-icons/fa";

// Helper to format date and time
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const formatTime = (timeString) =>
  new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const getStatusClasses = (status, backendStatus) => {
  // Special styling for Confirmed (Accepted) appointments
  if (status === "upcoming" && backendStatus === "ACCEPTED") {
    return { badge: "bg-green-100 text-green-700 border border-green-300" };
  }

  switch (status) {
    case "upcoming":
      return { badge: "bg-orange-50 text-orange-600 border border-orange-200" };
    case "visited":
      return { badge: "bg-blue-50 text-blue-600 border border-blue-200" };
    case "selected":
      return { badge: "bg-green-50 text-green-600 border border-green-200" };
    case "cancelled":
      return { badge: "bg-red-50 text-red-500 border border-red-200" };
    case "rejected":
      return { badge: "bg-red-100 text-red-900 border border-red-800" };
    default:
      return { badge: "bg-gray-100 text-gray-500 border border-gray-200" };
  }
};

const AppointmentCard = ({ appointment, onAction }) => {
  const {
    id,
    boardingId,
    boardingName,
    image,
    owner,
    ownerId,
    address,
    contact,
    date,
    time,
    status,
    backendStatus,
    registered,
    studentNote, // ✅ Extract Student Note
    ownerNote    // ✅ Extract Owner Note
  } = appointment;

  const { badge } = getStatusClasses(status, backendStatus);
  const shortAddress = address.split(",")[0];
  const isRegistered = status === "selected" && registered;
  const isConfirmed = backendStatus === "ACCEPTED";

  // ✅ LOGIC TO SPLIT NOTES
  // The backend saves it like: "Original note\n\n[Cancelled]: reason"
  let displayStudentNote = studentNote || "";
  let cancellationReason = "";

  if (displayStudentNote.includes("[Cancelled]:")) {
      const parts = displayStudentNote.split("[Cancelled]:");
      displayStudentNote = parts[0].trim(); // The original request note
      cancellationReason = parts[1].trim(); // The reason for cancellation
  }


  // ✅ State for Expanding the Card
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // ✅ Toggle Function
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBoardingClick = (e) => {
    e.stopPropagation(); // Prevent toggling when clicking specific links
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
    }
  };

  const handleBtnClick = (e, action) => {
    e.stopPropagation();
    onAction(id, action);
  };

  const renderButtons = () => {
    const BASE_BTN =
      "text-sm py-2 px-4 rounded-large font-semibold transition-all duration-300 border-2 flex items-center justify-center gap-2 whitespace-nowrap flex-1";

    switch (status) {
      case "upcoming":
        return isConfirmed ? (
          <>
            <button
              className={`${BASE_BTN} bg-green-600 text-white border-green-600 hover:bg-green-700`}
              onClick={(e) => handleBtnClick(e, "markVisited")}
            >
              <FaCheck /> Mark as Visited
            </button>
            <span
              className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}
            >
              Confirmed
            </span>
          </>
        ) : (
          <>
            <button
              className={`${BASE_BTN} text-red-500 border-red-500 hover:bg-red-500 hover:text-white`}
              onClick={(e) => handleBtnClick(e, "cancel")}
            >
              <FaTimes /> Cancel
            </button>
            <span
              className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}
            >
              Pending
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
            <button className={`${BASE_BTN} text-green-700 border-green-700 hover:bg-green-700 hover:text-white`} onClick={(e) => handleBtnClick(e, 'view')}><FaEye /> View Details</button>
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>Registered</span>
          </>
        ) : (
          <>
            <button className={`bg-green-600 text-white hover:bg-green-700 ${BASE_BTN} border-green-600`} onClick={(e) => handleBtnClick(e, 'register')}><FaHome /> Add to My Boardings</button>
            <span className={`hidden min-[1400px]:inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>Selected</span>
          </>
        );
      case 'cancelled':
        return (
            <span className={`w-full text-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}>
                {backendStatus === 'NOT_SELECTED' ? 'Rejected by You' : 'Cancelled'}
            </span>
        );
      case "rejected":
        return (
          <span
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${badge}`}
          >
            <FaBan /> Rejected by Owner
          </span>
        );
      default:
        return null;
    }
  };

  return (
    // ✅ Main Card Container - Now clickable for toggle
    <div
      onClick={toggleExpand}
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        transition-all duration-300 hover:shadow-lg
        flex flex-col relative cursor-pointer overflow-hidden
        ${isExpanded ? 'ring-2 ring-orange-100' : ''}
      `}
    >
      {/* Top Section (Row) */}
      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
        
        {/* 1. IMAGE */}
        <div className="relative group" onClick={handleBoardingClick}>
          <img
            src={image}
            alt={boardingName}
            className="w-20 h-20 md:w-16 md:h-16 min-[1400px]:w-16 min-[1400px]:h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
          <div
            className={`min-[1400px]:hidden absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border shadow-sm ${badge}`}
          >
            {isConfirmed && status === 'upcoming' ? 'Confirmed' : status}
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
            <span className="hidden md:block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">
              Contact
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-gray-700">
              <FaPhone className="text-green-600" size={14} />
              <span>{contact}</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col items-center justify-center md:items-start">
            <span className="hidden md:block text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">
              Visit Date
            </span>
            <div className="flex items-center gap-2">
              <strong className="text-lg font-bold text-gray-800">
                {formatDate(date)}
              </strong>
              <span className="text-sm text-gray-500">{formatTime(time)}</span>
            </div>
          </div>
        </div>

        {/* 3. ACTIONS */}
        <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-end flex-shrink-0 w-full md:w-auto md:flex-col min-[1400px]:flex-row">
          {renderButtons()}
        </div>

        {/* Expand Icon */}
        <div className="absolute top-4 right-4 md:static md:ml-2 text-gray-300">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* ✅ UNWRAPPED SECTION: NOTES */}
      {isExpanded && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col gap-4 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row gap-6">
                {/* 1. Student Request Note */}
                <div className="flex-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">My Request Note</span>
                    <div className="flex gap-3">
                        <FaQuoteLeft className="text-gray-300 flex-shrink-0 mt-1" size={12}/>
                        <p className="text-gray-600 text-sm italic">
                            {displayStudentNote || "No request note provided."}
                        </p>
                    </div>
                </div>

                {/* 2. Owner Response (If exists) */}
                {ownerNote && (
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2 block">Owner's Response</span>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                            <p className="text-gray-700 text-sm font-medium">
                                {ownerNote}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. ✅ CANCELLATION REASON (Show only if exists) */}
            {cancellationReason && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2 flex items-start gap-3">
                    <FaExclamationCircle className="text-red-500 mt-0.5" />
                    <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">Cancellation Reason</span>
                        <p className="text-red-800 text-sm font-medium">
                            {cancellationReason}
                        </p>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;