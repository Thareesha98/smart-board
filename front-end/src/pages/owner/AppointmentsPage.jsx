import React, { useState } from "react";
import { mockAppointments, ownerData } from "../../data/mockData";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatusTab from "../../components/Owner/common/StatusTab";
import AppointmentRow from "../../components/Owner/appointments/AppointmentRow";

const UTILS = {
  formatDate: (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  formatTime: (t) => new Date(`2000-01-01T${t}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
  getStatusStyle: (status) => {
    const styles = {
      pending: { background: "rgba(255, 122, 0, 0.1)", color: "var(--accent)", icon: "fas fa-hourglass-half" },
      confirmed: { background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", icon: "fas fa-check-circle" },
      visited: { background: "rgba(59, 130, 246, 0.1)", color: "var(--info)", icon: "fas fa-eye" },
      cancelled: { background: "rgba(239, 68, 68, 0.1)", color: "var(--error)", icon: "fas fa-times-circle" },
    };
    return styles[status] || {};
  }
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending");

  const handleAction = (id, newStatus) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    // Optional: Feedback message
    console.log(`Appointment ${id} status updated to ${newStatus}`);
  };

  const counts = appointments.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, { pending: 0, confirmed: 0, visited: 0, cancelled: 0 });

  return (
    <div className="pt-4 space-y-6">
      <HeaderBar 
        title="Appointments" 
        subtitle="Manage student visit requests and track arrivals." 
        notificationCount={2} 
        userAvatar={ownerData.avatar} 
        userName={ownerData.firstName} 
      />

      <section className="p-6 rounded-[25px] shadow-lg bg-(--card-bg)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(counts).map(status => (
            <StatusTab 
              key={status} 
              status={status} 
              count={counts[status]} 
              currentFilter={filter} 
              setFilter={setFilter} 
              style={UTILS.getStatusStyle(status)} 
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold capitalize text-[var(--primary)] text-center">{filter} Requests</h3>
        
        {appointments.filter(app => app.status === filter).length > 0 ? (
          appointments.filter(app => app.status === filter).map(app => (
            <AppointmentRow 
              key={app.id} 
              appointment={app} 
              style={UTILS.getStatusStyle(app.status)} 
              onAction={handleAction} 
              formatDate={UTILS.formatDate} 
              formatTime={UTILS.formatTime} 
            />
          ))
        ) : (
          <div className="text-center py-10 text-[var(--muted)]">
            <p>No {filter} appointments found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AppointmentsPage;