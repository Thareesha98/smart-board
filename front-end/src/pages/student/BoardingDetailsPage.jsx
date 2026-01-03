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
import StudentService from "../../api/student/StudentService";
import { useAuth } from "../../context/student/StudentAuthContext.jsx";

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

  const { currentUser } = useAuth();
  
  // 1. Initial State (Loads Mock/Passed Data instantly for speed)
  const [currentBoarding, setCurrentBoarding] = useState(
    passedBoarding || defaultBoardingDetails
  );

  useEffect(() => {
    if (passedBoarding) {
      setCurrentBoarding({
        ...passedBoarding,
        location: {
          address: passedBoarding.location,
          distance: `${passedBoarding.distance} km from University of Ruhuna`,
        },
        amenities: passedBoarding.amenities[0]?.icon
          ? passedBoarding.amenities
          : mapAmenitiesWithIcons(passedBoarding.amenities),
      });
    }
  }, [passedBoarding]);

  // ✅ FIX: Removed the second useEffect that was re-injecting 'passedBoarding' mock data
  
  const galleryImages = currentBoarding?.imageUrls || currentBoarding?.images || [];
  const { currentIndex, nextImage, prevImage, selectImage } = useImageGallery(galleryImages);
  const { formData, updateField,  isSubmitting, isSuccess, setSubmitting, setSuccess } = useAppointmentForm();

  // ✅ UPDATED: Submit handler without redirect
  const handleScheduleSubmit = async () => {

    if (!currentUser) {
        alert("You must be logged in to schedule a visit.");
        return;
    }
    if (!formData.date || !formData.time) {
        alert("Please select a date and time.");
        return;
    }

    setSubmitting(true);

    try {
        // Prepare Data for API
        const appointmentData = {
            boardingId: currentBoarding.id,
            visitDate: formData.date,
            visitTime: formData.time,
            visitNotes: formData.notes
        };

        //  Call API
        await StudentService.createAppointment(currentUser.id, appointmentData);

        //  Success
        setSuccess(true);
        
        // Optional: Reset after delay
        setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
        console.error("Booking Error:", error);
        alert("Failed to book appointment. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  const handleBookVisit = () => {
    document
      .getElementById("appointment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = (type) => {
    // Optional: You can implement specific actions here or leave as placeholder alert
    if (type === 'message') {
        alert(`Message feature for ${currentBoarding.owner.email} coming soon!`);
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

  return (
    <StudentLayout
      title={currentBoarding.name}
      subtitle="Boarding Details"
      headerRightContent={headerRightContent}
    >
      <div className="flex flex-col min-[1400px]:grid min-[1400px]:grid-cols-3 gap-6 mb-8 items-start">
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="min-[1400px]:col-span-2 w-full space-y-6">
          <ImageGallery
            images={currentBoarding.images}
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
              owner={currentBoarding.owner}
              onContact={handleContact}
            />
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-3">Description</h2>
            {currentBoarding.description.map((para, idx) => (
              <p
                key={idx}
                className="text-text-muted mb-3 leading-relaxed text-sm sm:text-base last:mb-0"
              >
                {para}
              </p>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {currentBoarding.amenities.map((amenity, idx) => {
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
                {currentBoarding.location.address}
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentBoarding.nearbyPlaces.map((place, idx) => (
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

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold text-primary mb-6">
              Reviews ({currentBoarding.reviewCount})
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center justify-center bg-background-light rounded-2xl p-6 sm:w-40 text-center flex-shrink-0">
                <div className="text-4xl font-bold text-text-dark">
                  {currentBoarding.reviewsSummary?.overall ||
                    currentBoarding.rating}
                </div>
                <div className="text-yellow-400 text-sm my-1">
                  {"★".repeat(5)}
                </div>
                <div className="text-xs font-bold text-text-muted uppercase">
                  Overall
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {currentBoarding.reviewsSummary?.breakdown.map((item, idx) => (
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
          <OwnerCard owner={currentBoarding.owner} onContact={handleContact} />
          
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
              {safetyTips.map((tip, idx) => (
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
              {safetyTips.map((tip, idx) => (
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