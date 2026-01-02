import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaWifi,
  FaSnowflake,
  FaTshirt,
  FaShieldAlt,
  FaUtensils,
  FaTv,
  FaDumbbell,
  FaBicycle,
  FaMapMarkedAlt,
} from "react-icons/fa";

import StudentLayout from "../../components/student/common/StudentLayout";
import ImageGallery from "../../components/student/boarding-details/ImageGallery";
import QuickInfoCard from "../../components/student/boarding-details/QuickInfoCard";
import OwnerCard from "../../components/student/boarding-details/OwnerCard";
import AppointmentForm from "../../components/student/boarding-details/AppointmentForm";
import ReviewsList from "../../components/student/boarding-details/ReviewsList";

import {
  boardingDetails as defaultBoardingDetails,
  timeSlots,
  safetyTips,
} from "../../data/student/boardingDetailsData.js";
import { useImageGallery } from "../../hooks/student/useImageGallery.js";
import { useAppointmentForm } from "../../hooks/student/useAppointmentForm.js";

const amenityIcons = {
  wifi: FaWifi,
  snowflake: FaSnowflake,
  tshirt: FaTshirt,
  "shield-alt": FaShieldAlt,
  utensils: FaUtensils,
  tv: FaTv,
  dumbbell: FaDumbbell,
  bicycle: FaBicycle,
};

const mapAmenitiesWithIcons = (amenities) => {
  if (!amenities || !Array.isArray(amenities)) return [];
  const amenityIconMap = {
    wifi: "wifi",
    ac: "snowflake",
    laundry: "tshirt",
    security: "shield-alt",
    furnished: "utensils",
    parking: "bicycle",
  };
  return amenities.map((amenity) => {
    const amenityLower = amenity.toLowerCase();
    const iconKey = amenityIconMap[amenityLower] || "wifi";
    return { icon: iconKey, label: amenity };
  });
};

const BoardingDetailsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const passedBoarding = location.state?.boarding;
  
  // Safe initialization with fallback defaults
  const [currentBoarding, setCurrentBoarding] = useState(
    passedBoarding || defaultBoardingDetails || { 
        images: [], 
        owner: {}, 
        location: {}, 
        amenities: [], 
        description: [],
        nearbyPlaces: [],
        reviewsSummary: { breakdown: [] }
    }
  );

  useEffect(() => {
    if (passedBoarding) {
      setCurrentBoarding({
        ...passedBoarding,
        location: {
          address: passedBoarding.location || "Location not available",
          distance: `${passedBoarding.distance || 0} km from University of Ruhuna`,
        },
        amenities: passedBoarding.amenities && passedBoarding.amenities[0]?.icon
          ? passedBoarding.amenities
          : mapAmenitiesWithIcons(passedBoarding.amenities || []),
        // Ensure arrays exist
        description: passedBoarding.description || [],
        nearbyPlaces: passedBoarding.nearbyPlaces || [],
        images: passedBoarding.images || []
      });
    }
  }, [passedBoarding]);

  const galleryImages = currentBoarding?.images || [];
  const { currentIndex, nextImage, prevImage, selectImage } =
    useImageGallery(galleryImages);
    
  const { formData, updateField, submitAppointment, isSubmitting, isSuccess } =
    useAppointmentForm();

  const handleScheduleSubmit = async () => {
    const result = await submitAppointment();

    if (result.success) {
      const ownerPhone = currentBoarding?.owner?.contact || "+94 77 123 4567";
      const ownerEmail = currentBoarding?.owner?.email || "owner@example.com"; 

      const newAppointment = {
        id: Date.now(),
        boardingId: currentBoarding.id,
        boardingName: currentBoarding.name,
        image: galleryImages.length > 0 ? galleryImages[0] : "", 
        owner: currentBoarding?.owner?.name || "Unknown Owner",
        contact: ownerPhone,
        email: ownerEmail,
        address: currentBoarding?.location?.address,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        status: 'upcoming', 
        registered: false
      };

      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));
    }
    return result;
  };

  const handleBookVisit = () => {
    document
      .getElementById("appointment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = (type) => {
    if (type === 'message') {
        alert(`Message feature for ${currentBoarding?.owner?.email} coming soon!`);
    }
  };

  const headerRightContent = (
    <Link to="/student/search-boardings">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex items-center gap-2 py-3 px-5 rounded-large font-semibold transition-all duration-300  hover:text-primary whitespace-nowrap"
      >
        <FaArrowLeft />
        Back to Search
      </motion.button>
    </Link>
  );

  if (!currentBoarding) return <div>Loading...</div>;

  // Helper to safely get array
  const safeDescription = currentBoarding.description || [];
  const safeAmenities = currentBoarding.amenities || [];
  const safeNearby = currentBoarding.nearbyPlaces || [];
  const safeBreakdown = currentBoarding.reviewsSummary?.breakdown || [];

  return (
    <StudentLayout
      title={currentBoarding.name || "Boarding Details"}
      subtitle="Boarding Details"
      headerRightContent={headerRightContent}
    >
      <div className="flex flex-col min-[1400px]:grid min-[1400px]:grid-cols-3 gap-6 mb-8 items-start">
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="min-[1400px]:col-span-2 w-full space-y-6">
          <ImageGallery
            images={galleryImages}
            currentIndex={currentIndex}
            onPrev={prevImage}
            onNext={nextImage}
            onSelect={selectImage}
            badge={currentBoarding.badge}
          />

          <div className="flex flex-col gap-4 min-[1400px]:hidden">
            <QuickInfoCard
              boarding={currentBoarding}
              onBookVisit={handleBookVisit}
            />
            <OwnerCard
              owner={currentBoarding.owner || {}}
              onContact={handleContact}
            />
          </div>

          {/* DESCRIPTION SECTION - FIXED MAP ERROR */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-3">Description</h2>
            {safeDescription.length > 0 ? (
                safeDescription.map((para, idx) => (
                  <p key={idx} className="text-text-muted mb-3 leading-relaxed text-sm sm:text-base last:mb-0">
                    {para}
                  </p>
                ))
            ) : (
                <p className="text-text-muted">No description available.</p>
            )}
          </motion.section>

          {/* AMENITIES SECTION - FIXED MAP ERROR */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {safeAmenities.map((amenity, idx) => {
                const Icon = amenityIcons[amenity.icon] || FaWifi;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 bg-background-light rounded-xl hover:bg-gray-100 transition-colors text-center gap-2"
                  >
                    <Icon className="text-2xl text-accent" />
                    <span className="text-sm font-medium text-text-dark">
                      {amenity.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* LOCATION SECTION - FIXED MAP ERROR */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Location</h2>
            <div className="bg-background-light rounded-xl h-48 md:h-64 flex flex-col items-center justify-center mb-6 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors"></div>
              <FaMapMarkedAlt className="text-5xl text-accent mb-2 transform group-hover:scale-110 transition-transform" />
              <p className="text-text-dark font-bold z-10">View on Map</p>
              <p className="text-sm text-text-muted z-10 text-center px-4 mt-1">
                {currentBoarding?.location?.address || "Address not available"}
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {safeNearby.map((place, idx) => (
                <li
                  key={idx}
                  className="text-sm text-text-muted flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{" "}
                  {place}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* REVIEWS SECTION - FIXED MAP ERROR */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              Reviews ({currentBoarding.reviewCount || 0})
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center justify-center bg-background-light rounded-2xl p-6 sm:w-40 text-center flex-shrink-0">
                <div className="text-4xl font-bold text-text-dark">
                  {currentBoarding.reviewsSummary?.overall ||
                    currentBoarding.rating || 0}
                </div>
                <div className="text-yellow-400 text-sm my-1">
                  {"★".repeat(5)}
                </div>
                <div className="text-xs font-bold text-text-muted uppercase">
                  Overall
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {safeBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-text-muted w-10">
                      {item.stars} ★
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-text-dark w-8 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ReviewsList
              boardingId={currentBoarding.id || id || "default-boarding-id"}
            />
          </motion.section>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <div className="hidden min-[1400px]:block w-full space-y-6">
          <QuickInfoCard
            boarding={currentBoarding}
            onBookVisit={handleBookVisit}
          />
          <OwnerCard owner={currentBoarding.owner || {}} onContact={handleContact} />
          
          <div id="appointment-form">
            <AppointmentForm
              formData={formData}
              updateField={updateField}
              onSubmit={handleScheduleSubmit} 
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              timeSlots={timeSlots}
            />
          </div>

          <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100">
            <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2 text-sm uppercase">
              <FaShieldAlt /> Safety Tips
            </h4>
            <ul className="space-y-2">
              {safetyTips && safetyTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="text-xs text-text-dark/80 pl-4 relative"
                >
                  <span className="absolute left-0 top-0.5 text-red-500 font-bold">
                    •
                  </span>{" "}
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION (< 1400px) --- */}
        <div className="block min-[1400px]:hidden w-full space-y-6">
          <div id="appointment-form">
            <AppointmentForm
              formData={formData}
              updateField={updateField}
              onSubmit={handleScheduleSubmit}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              timeSlots={timeSlots}
            />
          </div>
          <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100">
            <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2 text-sm uppercase">
              <FaShieldAlt /> Safety Tips
            </h4>
            <ul className="space-y-2">
              {safetyTips && safetyTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="text-xs text-text-dark/80 pl-4 relative"
                >
                  <span className="absolute left-0 top-0.5 text-red-500 font-bold">
                    •
                  </span>{" "}
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link to="/student/search-boardings">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-accent text-white shadow-xl flex items-center justify-center sm:hidden z-50 hover:bg-primary transition-colors"
          aria-label="Back to Search"
        >
          <FaArrowLeft size={24} />
        </motion.button>
      </Link>
    </StudentLayout>
  );
};

export default BoardingDetailsPage;