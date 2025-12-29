import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/student/common/StudentLayout";
import useAppointmentsLogic from "../../hooks/student/useAppointmentsLogic.js";
import AppointmentTab from "../../components/student/appointments/AppointmentTab";
import AppointmentCard from "../../components/student/appointments/AppointmentCard";
import ScheduleModal from "../../components/student/appointments/ScheduleModal";
import DecisionModal from "../../components/student/appointments/DecisionModal";
import RegistrationModal from "../../components/student/appointments/RegistrationModal";
import { FaPlus } from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const {
    activeCategory,
    counts,
    categorizedAppointments,
    getAppointmentById,
    setActiveCategory,
    handleStatusChange,
    handleScheduleSubmit,
    handleRegistrationSubmit,
  } = useAppointmentsLogic();

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  const openDecisionConfirmation = (id, decision) => {
    const appointment = getAppointmentById(id);
    setCurrentAppointmentId(id);

    setModalContent({
      title: decision === "select" ? "Confirm Selection" : "Confirm Rejection",
      message: `Are you sure you want to ${decision} **${appointment.boardingName}**?`,
      actionLabel: `Yes, ${decision}`,
      action: () => {
        handleStatusChange(id, decision);
        setIsDecisionModalOpen(false);
      },
      isSuccess: decision === "select",
    });
    setIsDecisionModalOpen(true);
  };

  const handleScheduleClose = () => {
    setIsScheduleModalOpen(false);
    setCurrentAppointmentId(null); 
  };

  const handleRegistrationFlow = (id, action) => {
    setCurrentAppointmentId(id);
    const appointment = getAppointmentById(id);

    if (action === "register") {
      setIsRegistrationModalOpen(true);
    } else if (action === "view") {
      navigate('/student/my-boardings');
    } else if (action === "reschedule") {
      setCurrentAppointmentId(id); 
      setIsScheduleModalOpen(true); 
    } else if (action === "cancel") {
      if (
        !window.confirm(`Are you sure you want to cancel the visit to ${appointment.boardingName}?`)
      ) return;
      handleStatusChange(id, 'cancelled');
      setCurrentAppointmentId(null);
    } else {
      openDecisionConfirmation(id, action);
    }
  };

  const finalizeRegistration = (regData) => {
    const registeredAppointment = handleRegistrationSubmit(
      currentAppointmentId,
      regData
    );

    if (registeredAppointment) {
      setModalContent({
        title: "Registration Complete! 🎉",
        message: `You have successfully registered for **${registeredAppointment.boardingName}**!`,
        details: [
          { label: "Move-in Date", value: registeredAppointment.moveInDate },
          { label: "Contract Duration", value: registeredAppointment.contractDuration },
          { label: "Emergency Contact", value: registeredAppointment.emergencyContact },
        ],
        actionLabel: "Done",
        action: () => setIsDecisionModalOpen(false),
        secondaryActionLabel: "View My Boardings",
        secondaryAction: () => navigate('/student/my-boardings'),
        isSuccess: true,
        isRegistrationSuccess: true,
      });
      setIsRegistrationModalOpen(false);
      setIsDecisionModalOpen(true);
      setActiveCategory("selected");
    }
  };

  const renderAppointmentList = (category) => {
    const list = categorizedAppointments[category];

    if (list.length === 0) {
      return (
        <div className="text-center p-12 bg-card-bg rounded-large shadow-custom mt-8 animate-fadeIn border border-gray-100">
          <i className="fas fa-calendar-times text-5xl text-text-muted mb-4 opacity-50"></i>
          <h3 className="text-xl font-bold text-text-dark mb-2">
            No {category} Appointments Found
          </h3>
          {(category !== "cancelled" && category !== "rejected") && (
            <button
              className="flex items-center gap-2 py-3 px-6 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary hover:-translate-y-0.5 mx-auto mt-4"
              onClick={() => {
                setCurrentAppointmentId(null);
                setIsScheduleModalOpen(true);
              }}
            >
              <FaPlus /> Schedule Your First Visit
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {list.map((app) => (
          <AppointmentCard
            key={app.id}
            appointment={app}
            onAction={handleRegistrationFlow}
          />
        ))}
      </div>
    );
  };

  return (
    <StudentLayout
      title="My Appointments"
      subtitle="Manage your boarding visits and selections"
      headerRightContent={
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // FIXED: "hidden sm:flex" ensures this ONLY shows on Tablet/Desktop where space exists
          className="hidden sm:flex items-center gap-2 py-3 px-5 rounded-large font-semibold transition-all duration-300 bg-accent text-white shadow-md hover:bg-primary whitespace-nowrap"
          onClick={() => {
            setCurrentAppointmentId(null);
            setIsScheduleModalOpen(true);
          }}
        >
          <FaPlus />
          Schedule Visit
        </motion.button>
      }
    >
      {/* Categories (Tabs) */}
      <section className="bg-card-bg p-4 sm:p-6 rounded-large shadow-custom mb-8 border border-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(counts).map((category) => (
            <AppointmentTab
              key={category}
              category={category}
              icon={`fas fa-${
                category === "upcoming" ? "clock"
                : category === "visited" ? "eye"
                : category === "selected" ? "check-circle"
                : category === "rejected" ? "ban" 
                : "times-circle"
              }`}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              count={counts[category]}
              active={activeCategory === category}
              onClick={setActiveCategory}
            />
          ))}
        </div>
      </section>

      {/* Appointments List */}
      <section className="mb-8 min-h-[50vh]">
        <div className="appointments-container">
          {Object.keys(categorizedAppointments).map((category) => (
            <div
              key={`list-${category}`}
              className={`transition-opacity duration-500 ${
                activeCategory === category ? "block animate-fadeIn" : "hidden"
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-1 capitalize">
                  {category} {category !== "selected" ? "Visits" : "Boardings"}
                </h3>
                <p className="text-text-muted text-sm sm:text-base">
                  {category === "upcoming" && "Your scheduled visits awaiting action."}
                  {category === "visited" && "Time to decide on the places you've seen!"}
                  {category === "selected" && "Boardings you've chosen to move forward with."}
                  {category === "cancelled" && "Records of previous cancellations."}
                </p>
              </div>
              {renderAppointmentList(category)}
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE FLOATING ACTION BUTTON (Visible ONLY on Mobile) */}
      {/* This ensures the button is always accessible on small screens even if the header hides it */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setCurrentAppointmentId(null);
          setIsScheduleModalOpen(true);
        }}
        className="fixed bottom-24 right-8 h-14 w-14 rounded-full bg-accent text-white shadow-xl flex items-center justify-center sm:hidden z-50 hover:bg-primary transition-colors"
        aria-label="Schedule Visit"
      >
        <FaPlus size={24} />
      </motion.button>

      {/* Modals */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={handleScheduleClose} 
        onSubmit={handleScheduleSubmit}
        currentAppointmentId={currentAppointmentId} 
        getAppointmentById={getAppointmentById} 
      />

      <DecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        content={modalContent}
      />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={finalizeRegistration}
        appointment={getAppointmentById(currentAppointmentId)}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </StudentLayout>
  );
};

export default AppointmentsPage;