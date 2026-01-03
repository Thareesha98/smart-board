import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab";
import AppointmentRow from "../../components/Owner/appointments/AppointmentRow";
import SkeletonAppointmentRow from "../../components/Owner/appointments/SkeletonAppointmentRow";
import useAppointmentsLogic from "../../hooks/owner/useAppointmentsLogic";

const AppointmentsPage = () => {
  // Use the Custom Hook
  const {
    filteredAppointments,
    counts,
    ownerData,
    filter,
    setFilter,
    handleAction,
    formatDate,
    formatTime,
    getStatusStyle,
  } = useAppointmentsLogic();

  // Error State can remain full screen or be a toast
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-error font-black text-xl mb-2">
            Connection Error
          </h3>
          <p className="text-muted mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-10">
      <HeaderBar
        title="Appointments"
        subtitle="Manage student visit requests and track arrivals."
        notificationCount={counts.pending}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Filter Tabs */}
      <section className="p-2 md:p-6 rounded-report shadow-custom bg-card-bg border border-light mx-2">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
          {Object.keys(counts).map((status) => (
            <StatusTab
              key={status}
              status={status}
              count={counts[status]}
              currentFilter={filter}
              setFilter={setFilter}
              config={getStatusStyle(status)}
            />
          ))}
        </div>
      </section>

      {/* Appointments List */}
      <section className="space-y-4 px-2">
        <motion.h3
          layout
          className="text-2xl font-black text-primary uppercase tracking-tight ml-2"
        >
          {filter} Requests
        </motion.h3>

        <motion.div layout className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app) => (
                <AppointmentRow
                  key={app.id}
                  appointment={app}
                  config={getStatusStyle(app.status)}
                  onAction={handleAction}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              ))
            ) : (
              // Empty State Animation
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center text-muted font-bold uppercase tracking-widest text-xs"
              >
                No {filter} appointments found.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default AppointmentsPage;
