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
  getStatusStyle: (status) => {
    const styles = {
      pending: {
        colorClass: "bg-accent",
        textClass: "text-accent",
        bgClass: "bg-accent/10",
        icon: "fas fa-hourglass-half",
      },
      confirmed: {
        colorClass: "bg-success",
        textClass: "text-success",
        bgClass: "bg-success/10",
        icon: "fas fa-check-circle",
      },
      visited: {
        colorClass: "bg-info",
        textClass: "text-info",
        bgClass: "bg-info/10",
        icon: "fas fa-eye",
      },
      cancelled: {
        colorClass: "bg-error",
        textClass: "text-error",
        bgClass: "bg-error/10",
        icon: "fas fa-times-circle",
      },
    };
    return styles[status] || {};
  },
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending");

  const handleAction = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const counts = appointments.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { pending: 0, confirmed: 0, visited: 0, cancelled: 0 }
  );

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(counts).map((status) => (
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
        </div>
      </section>
    </div>
  );
};

export default AppointmentsPage;
