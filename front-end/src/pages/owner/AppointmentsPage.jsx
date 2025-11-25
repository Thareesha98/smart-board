import React, { useState, useEffect } from "react";
import { mockAppointments, ownerData } from "../../data/mockData";
import HeaderBar from "../../components/Owner/common/HeaderBar";



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
  
const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          background: "rgba(255, 122, 0, 0.1)",
          color: "var(--accent)",
          icon: "fas fa-hourglass-half",
        };
      case "confirmed":
        return {
          background: "rgba(16, 185, 129, 0.1)",
          color: "var(--success)",
          icon: "fas fa-check-circle",
        };
      case "visited":
        return {
          background: "rgba(59, 130, 246, 0.1)",
          color: "var(--info)",
          icon: "fas fa-eye",
        };
      case "cancelled":
        return {
          background: "rgba(239, 68, 68, 0.1)",
          color: "var(--error)",
          icon: "fas fa-times-circle",
        };
      default:
        return {};
    }
  };

const notificationCount = 2;

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending"); 
  const [modal, setModal] = useState({
    visible: false,
    type: "",
    appointment: null,
  });

  // Logic to update appointment status (Confirm/Reject)
  const handleAction = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    setModal({ visible: false, type: "", appointment: null });
    alert(`Appointment ID ${id} set to ${newStatus.toUpperCase()}.`);
  };

  // --- Appointment Filtering and Counts ---
  const counts = appointments.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { pending: 0, confirmed: 0, visited: 0, cancelled: 0 }
  );

  const filteredAppointments = appointments.filter(
    (app) => app.status === filter
  );

  // --- Component Rendering Helpers (keeping them local) ---

  const AppointmentRow = ({ appointment }) => {
    const isPending = appointment.status === "pending";
    const statusStyle = getStatusBadgeStyle(appointment.status);

    return (
      <div
        className="appointment-row flex items-center gap-[1.5rem] p-[1.5rem] rounded-[25px] shadow-sm transition duration-300"
        style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
      >
        {/* 1. Student Details */}
        <div className="flex flex-col flex-1 gap-1">
          <h4 className="font-bold text-lg" style={{ color: "var(--text)" }}>
            {appointment.student}
          </h4>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--muted)" }}
          >
            <i className="fas fa-building" style={{ color: "var(--accent)" }}></i>
            <span>{appointment.boardingName}</span>
          </div>
        </div>

        {/* 2. Contact & Notes */}
        <div className="flex flex-col flex-1 gap-1 text-sm">
          <div
            className="contact-info flex items-center gap-1 font-semibold"
            style={{ color: "var(--text)" }}
          >
            <i className="fas fa-phone" style={{ color: "var(--info)" }}></i>
            <span>{appointment.contact}</span>
          </div>
          <span className="text-xs italic" style={{ color: "var(--muted)" }}>
            Note: {appointment.notes.slice(0, 30)}...
          </span>
        </div>

        {/* 3. Date and Time */}
        <div className="appointment-date text-center flex-shrink-0 w-32">
          <div
            className="date-label text-xs uppercase"
            style={{ color: "var(--muted)" }}
          >
            Visit Date
          </div>
          <div
            className="date-value text-lg font-bold"
            style={{ color: "var(--text)" }}
          >
            {formatDate(appointment.date)}
          </div>
          <div className="time-value text-sm" style={{ color: "var(--muted)" }}>
            {formatTime(appointment.time)}
          </div>
        </div>

        {/* 4. Actions and Status */}
        <div className="appointment-actions flex items-center gap-3 ml-auto">
          {isPending && (
            <>
              <button
                className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm transition duration-300"
                style={{
                  backgroundColor: "var(--success)",
                  color: "var(--card-bg)",
                }}
                onClick={() => handleAction(appointment.id, "confirmed")}
              >
                <i className="fas fa-check"></i> Confirm
              </button>
              <button
                className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm transition duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--error)",
                  border: `1px solid ${"var(--error)"}`,
                }}
                onClick={() => handleAction(appointment.id, "cancelled")}
              >
                <i className="fas fa-times"></i> Reject
              </button>
            </>
          )}

          {/* Status Badge */}
          <span
            className="status-badge px-4 py-2 text-xs font-semibold uppercase rounded-[20px]"
            style={{
              backgroundColor: statusStyle.background,
              color: statusStyle.color,
            }}
          >
            {appointment.status}
          </span>
        </div>
      </div>
    );
  };

  const StatusTab = ({ status, count, currentFilter, setFilter }) => {
    const isActive = currentFilter === status;
    const statusStyle = getStatusBadgeStyle(status);

    return (
      <button
        className={`category-tab flex flex-col items-center gap-1.5 p-6 rounded-[25px] font-semibold cursor-pointer transition duration-300 relative w-full`}
        style={{
          backgroundColor: isActive ? statusStyle.color : "var(--light)",
          color: isActive ? "var(--card-bg)" : "var(--muted)",
          boxShadow: isActive
            ? `0 4px 12px ${statusStyle.color}80`
            : "var(--shadow)",
        }}
        onClick={() => setFilter(status)}
      >
        <i className={`${statusStyle.icon} text-2xl`}></i>
        <span className="text-base capitalize">{status}</span>
        <span
          className="tab-count absolute top-[-8px] right-[-8px] w-6 h-6 text-xs flex items-center justify-center font-bold rounded-full"
          style={{
            backgroundColor: isActive ? "var(--card-bg)" : "var(--primary)",
            color: isActive ? statusStyle.color : "var(--card-bg)",
          }}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <div className="pt-4 space-y-6">
      {/* Owner Header */}
      <HeaderBar
        title="Appointments Management"
        subtitle="Review, confirm, or reject incoming visit requests from students."
        notificationCount={notificationCount}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Appointment Categories */}
      <section
        className="appointment-categories p-6 rounded-[25px] shadow-lg mb-6"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="category-tabs grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatusTab
            status="pending"
            count={counts.pending}
            currentFilter={filter}
            setFilter={setFilter}
          />
          <StatusTab
            status="confirmed"
            count={counts.confirmed}
            currentFilter={filter}
            setFilter={setFilter}
          />
          <StatusTab
            status="visited"
            count={counts.visited}
            currentFilter={filter}
            setFilter={setFilter}
          />
          <StatusTab
            status="cancelled"
            count={counts.cancelled}
            currentFilter={filter}
            setFilter={setFilter}
          />
        </div>
      </section>

      {/* Appointments List */}
      <section className="appointments-section">
        <div className="category-header text-center mb-6">
          <h3
            className="text-[1.5rem] font-bold mb-1 capitalize"
            style={{ color: "var(--primary)" }}
          >
            {filter} Requests
          </h3>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            {filter === "pending" &&
              "Action required: Confirm or reject these visit requests."}
            {filter === "confirmed" &&
              "Confirmed visits awaiting student arrival."}
            {filter === "visited" &&
              "Visits completed, pending student's decision."}
            {filter === "cancelled" &&
              "Requests that were cancelled or rejected."}
          </p>
        </div>

        <div className="appointments-grid flex flex-col gap-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <AppointmentRow key={app.id} appointment={app} />
            ))
          ) : (
            <div
              className="empty-state text-center p-12 rounded-[25px] shadow-lg"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <i
                className="fas fa-calendar-times text-6xl mb-4"
                style={{ color: "var(--muted)" }}
              ></i>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text)" }}
              >
                No {filter} Appointments
              </h3>
              <p className="text-base" style={{ color: "var(--muted)" }}>
                {filter === "pending"
                  ? "No new requests are awaiting your approval."
                  : `No appointments currently marked as ${filter}.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AppointmentsPage;