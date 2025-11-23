import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaWifi, FaSnowflake, FaTshirt, FaShieldAlt, FaUtensils, FaTv, FaDumbbell, FaBicycle, FaClock, FaUserFriends, FaSmokingBan, FaPaw, FaMapMarkedAlt } from 'react-icons/fa';

// Layout
import StudentLayout from '../../components/student/common/StudentLayout';

// Components
import ImageGallery from '../../components/student/boarding-details/ImageGallery';
import QuickInfoCard from '../../components/student/boarding-details/QuickInfoCard';
import OwnerCard from '../../components/student/boarding-details/OwnerCard';
import AppointmentForm from '../../components/student/boarding-details/AppointmentForm';

// Data & Hooks
import { boardingDetails, timeSlots, safetyTips } from '../../data/boardingDetailsData';
import { useImageGallery } from '../../hooks/useImageGallery';
import { useAppointmentForm } from '../../hooks/useAppointmentForm';

const amenityIcons = {
  wifi: FaWifi, snowflake: FaSnowflake, tshirt: FaTshirt, 'shield-alt': FaShieldAlt,
  utensils: FaUtensils, tv: FaTv, dumbbell: FaDumbbell, bicycle: FaBicycle
};

const ruleIcons = {
  clock: FaClock, 'user-friends': FaUserFriends, 'smoking-ban': FaSmokingBan, paw: FaPaw
};

const BoardingDetailsPage = () => {
  const { currentImage, currentIndex, nextImage, prevImage, selectImage } = useImageGallery(boardingDetails.images);
  const { formData, updateField, submitAppointment, isSubmitting, isSuccess } = useAppointmentForm();

  const handleBookVisit = () => {
    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (type) => {
    console.log(`Contacting owner via ${type}`);
    alert(type === 'message' ? 'Message feature coming soon!' : 'Call feature coming soon!');
  };

  const headerRightContent = (
    <Link to="/search-boardings" className="flex items-center gap-2 text-text-dark font-semibold hover:text-accent transition-colors">
      <FaArrowLeft />
      Back to Search
    </Link>
  );

  return (
    <StudentLayout title={boardingDetails.name} subtitle="Boarding Details" headerRightContent={headerRightContent}>
      {/* Gallery & Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ImageGallery
            images={boardingDetails.images}
            currentIndex={currentIndex}
            onPrev={prevImage}
            onNext={nextImage}
            onSelect={selectImage}
            badge={boardingDetails.badge}
          />
        </div>
        <div>
          <QuickInfoCard boarding={boardingDetails} onBookVisit={handleBookVisit} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-large p-6 shadow-custom">
            <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
            {boardingDetails.description.map((para, idx) => (
              <p key={idx} className="text-text-muted mb-3 leading-relaxed">{para}</p>
            ))}
          </motion.section>

          {/* Amenities */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-large p-6 shadow-custom">
            <h2 className="text-2xl font-bold text-primary mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {boardingDetails.amenities.map((amenity, idx) => {
                const Icon = amenityIcons[amenity.icon];
                return (
                  <motion.div key={idx} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-background-light p-3 rounded-xl">
                    <Icon className="text-accent text-xl flex-shrink-0" />
                    <span className="text-sm text-text-dark">{amenity.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* House Rules */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-large p-6 shadow-custom">
            <h2 className="text-2xl font-bold text-primary mb-4">House Rules</h2>
            <div className="space-y-3">
              {boardingDetails.houseRules.map((rule, idx) => {
                const Icon = ruleIcons[rule.icon];
                return (
                  <div key={idx} className="flex items-center gap-4 bg-background-light p-4 rounded-xl">
                    <Icon className="text-accent text-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-text-dark">{rule.title}</div>
                      <div className="text-sm text-text-muted">{rule.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Location */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-large p-6 shadow-custom">
            <h2 className="text-2xl font-bold text-primary mb-4">Location</h2>
            <div className="bg-background-light rounded-xl h-48 flex flex-col items-center justify-center mb-4">
              <FaMapMarkedAlt className="text-6xl text-accent mb-3" />
              <p className="text-text-muted font-semibold">Interactive Map</p>
              <p className="text-sm text-text-muted">{boardingDetails.location.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-dark mb-3">Nearby Places</h4>
              <ul className="space-y-2">
                {boardingDetails.nearbyPlaces.map((place, idx) => (
                  <li key={idx} className="text-text-muted text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent before:font-bold">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Reviews Summary */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-large p-6 shadow-custom">
            <h2 className="text-2xl font-bold text-primary mb-4">Reviews <span className="text-text-muted font-normal text-base">({boardingDetails.reviewCount})</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-background-light rounded-xl p-6">
                <div className="text-5xl font-bold text-accent mb-2">{boardingDetails.reviewsSummary.overall}</div>
                <div className="text-yellow-500 text-xl mb-2">{'★'.repeat(5)}</div>
                <div className="text-sm text-text-muted">Overall Rating</div>
              </div>
              <div className="md:col-span-2 space-y-2">
                {boardingDetails.reviewsSummary.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm text-text-muted w-12">{item.stars} stars</span>
                    <div className="flex-1 h-2 bg-background-light rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-text-muted w-8 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Owner Card */}
          <OwnerCard owner={boardingDetails.owner} onContact={handleContact} />

          {/* Appointment Form */}
          <div id="appointment-form">
            <AppointmentForm
              formData={formData}
              updateField={updateField}
              onSubmit={submitAppointment}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              timeSlots={timeSlots}
            />
          </div>

          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-large p-6 shadow-custom"
          >
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <FaShieldAlt />
              Safety Tips
            </h4>
            <ul className="space-y-2">
              {safetyTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-text-muted pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-accent before:font-bold">
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default BoardingDetailsPage;