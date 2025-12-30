import React, { useState } from "react";
import { mockAppointments, ownerData } from "../../data/mockData";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab";
import AppointmentRow from "../../components/Owner/appointments/AppointmentRow";

const UTILS = {
  formatDate: (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  formatTime: (t) =>
    new Date(`2000-01-01T${t}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  // ✅ UPDATED COLOR SCHEME
  getStatusStyle: (status) => {
    const styles = {
      // Orange (Pending/Upcoming)
      pending: { 
        colorClass: "bg-orange-500", 
        textClass: "text-orange-600", 
        bgClass: "bg-orange-100 border-orange-200", 
        icon: "fas fa-clock",
        label: "Upcoming" 
      },
      // Green (Confirmed/Selected)
      confirmed: { 
        colorClass: "bg-green-600", 
        textClass: "text-green-600", 
        bgClass: "bg-green-100 border-green-200", 
        icon: "fas fa-check-circle",
        label: "Confirmed" 
      },
      // Blue (Visited)
      visited: { 
        colorClass: "bg-blue-600", 
        textClass: "text-blue-600", 
        bgClass: "bg-blue-100 border-blue-200", 
        icon: "fas fa-eye",
        label: "Visited"
      },
      // Red (Cancelled by Student)
      cancelled: { 
        colorClass: "bg-red-500", 
        textClass: "text-red-500", 
        bgClass: "bg-red-50 border-red-200", 
        icon: "fas fa-times",
        label: "Cancelled" 
      },
      // Dark Red (Rejected by Owner)
      rejected: { 
        colorClass: "bg-red-900", 
        textClass: "text-red-900", 
        bgClass: "bg-red-200 border-red-800", 
        icon: "fas fa-ban",
        label: "Rejected" 
      },
    };
    return styles[status] || {};
  },
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending");

  const handleAction = (id, newStatus) => {
    // Logic: Updates state.
    // If student rescheduled, it would likely come in as a status reset to 'pending' from backend.
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const counts = appointments.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { pending: 0, confirmed: 0, visited: 0, cancelled: 0, rejected: 0 }
  );

  // Tabs list to ensure order
  const tabs = ['pending', 'confirmed', 'visited', 'cancelled', 'rejected'];

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-10">
      <HeaderBar
        title="Appointments"
        subtitle="Manage student visit requests and track arrivals."
        notificationCount={counts.pending}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      <section className="p-6 rounded-report shadow-custom bg-card-bg border border-light mx-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tabs.map((status) => (
            <StatusTab
              key={status}
              status={status}
              count={counts[status]}
              currentFilter={filter}
              setFilter={setFilter}
              config={UTILS.getStatusStyle(status)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 px-2">
        <h3 className="text-2xl font-black text-primary uppercase tracking-tight ml-2">
          {filter} Requests
        </h3>

        <div className="flex flex-col gap-4">
          {appointments
            .filter((app) => app.status === filter)
            .map((app) => (
              <AppointmentRow
                key={app.id}
                appointment={app}
                config={UTILS.getStatusStyle(app.status)}
                onAction={handleAction}
                formatDate={UTILS.formatDate}
                formatTime={UTILS.formatTime}
              />
            ))}
            
            {appointments.filter((app) => app.status === filter).length === 0 && (
                <div className="text-center py-8 text-gray-400 italic">No appointments found in this category.</div>
            )}
        </div>
      </section>
    </div>
  );
};

export default AppointmentsPage;