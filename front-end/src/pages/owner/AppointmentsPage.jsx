import React, { useState, useEffect } from "react";

// Exact colors and styling constants from my-appointments.css
const COLORS = {
  primary: "#D84C38",
  accent: "#FF7A00",
  text: "#332720",
  muted: "#665345",
  cardBg: "#FFFFFF",
  light: "#E8DBC7",
  shadow: "0 6px 20px rgba(0,0,0,0.08)",
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
};

// Mock Appointment Data for the Owner
const mockAppointments = [
  // PENDING APPOINTMENTS (The owner must act on these)
  {
    id: 1,
    student: "Priya S.",
    date: "2025-11-20",
    time: "14:00",
    status: "pending",
    boardingName: "Sunshine Hostel",
    boardingId: "sunshine-hostel",
    contact: "+94 77 123 4567",
    notes: "Prefers morning slots.",
    createdAt: "2025-11-15",
  },
  {
    id: 2,
    student: "Kamal D.",
    date: "2025-11-22",
    time: "10:00",
    status: "pending",
    boardingName: "City View Apartments",
    boardingId: "city-view",
    contact: "+94 76 234 5678",
    notes: "Will bring a parent.",
    createdAt: "2025-11-14",
  },

  // CONFIRMED APPOINTMENTS (Confirmed by the owner, awaiting visit)
  {
    id: 3,
    student: "Nimali R.",
    date: "2025-11-18",
    time: "15:30",
    status: "confirmed",
    boardingName: "Green Valley Hostel",
    boardingId: "green-valley",
    contact: "+94 71 888 9999",
    notes: "Eco-friendly environment.",
    createdAt: "2025-11-10",
  },
  {
    id: 4,
    student: "Gayan B.",
    date: "2025-11-25",
    time: "11:00",
    status: "confirmed",
    boardingName: "Student Paradise",
    boardingId: "student-paradise",
    contact: "+94 76 555 4444",
    notes: "Study room available.",
    createdAt: "2025-11-09",
  },

  // VISITED (Appointment date is in the past, awaiting student decision)
  {
    id: 5,
    student: "Anusha K.",
    date: "2025-11-15",
    time: "16:00",
    status: "visited",
    boardingName: "Lake View Rooms",
    boardingId: "lake-view",
    contact: "+94 77 666 7777",
    notes: "Peaceful lakeside location.",
    createdAt: "2025-11-05",
  },

  // CANCELLED/REJECTED
  {
    id: 6,
    student: "Sunil M.",
    date: "2025-11-05",
    time: "09:30",
    status: "cancelled",
    boardingName: "Modern Studios",
    boardingId: "modern-studios",
    contact: "+94 70 333 2222",
    notes: "Owner rejected due to unavailability.",
    createdAt: "2025-11-01",
  },
];

const AppointmentsPage = () => {
  // State to hold appointments, initially using mock data
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending"); // Default to pending actions
  const [modal, setModal] = useState({
    visible: false,
    type: "",
    appointment: null,
  });

  // --- Helper Functions ---
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

  // --- Component Rendering Helpers ---
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          background: "rgba(255, 122, 0, 0.1)",
          color: COLORS.accent,
          icon: "fas fa-hourglass-half",
        };
      case "confirmed":
        return {
          background: "rgba(16, 185, 129, 0.1)",
          color: COLORS.success,
          icon: "fas fa-check-circle",
        };
      case "visited":
        return {
          background: "rgba(59, 130, 246, 0.1)",
          color: COLORS.info,
          icon: "fas fa-eye",
        };
      case "cancelled":
        return {
          background: "rgba(239, 68, 68, 0.1)",
          color: COLORS.error,
          icon: "fas fa-times-circle",
        };
      default:
        return {};
    }
  };

  const AppointmentRow = ({ appointment }) => {
    const isPending = appointment.status === "pending";
    const statusStyle = getStatusBadgeStyle(appointment.status);

    return (
      <div
        className="appointment-row flex items-center gap-[1.5rem] p-[1.5rem] rounded-[25px] shadow-sm transition duration-300"
        style={{ backgroundColor: COLORS.cardBg, boxShadow: COLORS.shadow }}
      >
        {/* 1. Student Details */}
        <div className="flex flex-col flex-1 gap-1">
          <h4 className="font-bold text-lg" style={{ color: COLORS.text }}>
            {appointment.student}
          </h4>
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.muted }}
          >
            <i className="fas fa-building" style={{ color: COLORS.accent }}></i>
            <span>{appointment.boardingName}</span>
          </div>
        </div>

        {/* 2. Contact & Notes */}
        <div className="flex flex-col flex-1 gap-1 text-sm">
          <div
            className="contact-info flex items-center gap-1 font-semibold"
            style={{ color: COLORS.text }}
          >
            <i className="fas fa-phone" style={{ color: COLORS.info }}></i>
            <span>{appointment.contact}</span>
          </div>
          <span className="text-xs italic" style={{ color: COLORS.muted }}>
            Note: {appointment.notes.slice(0, 30)}...
          </span>
        </div>

        {/* 3. Date and Time */}
        <div className="appointment-date text-center flex-shrink-0 w-32">
          <div
            className="date-label text-xs uppercase"
            style={{ color: COLORS.muted }}
          >
            Visit Date
          </div>
          <div
            className="date-value text-lg font-bold"
            style={{ color: COLORS.text }}
          >
            {formatDate(appointment.date)}
          </div>
          <div className="time-value text-sm" style={{ color: COLORS.muted }}>
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
                  backgroundColor: COLORS.success,
                  color: COLORS.cardBg,
                }}
                onClick={() => handleAction(appointment.id, "confirmed")}
              >
                <i className="fas fa-check"></i> Confirm
              </button>
              <button
                className="btn btn-sm p-[0.5rem] px-4 rounded-[25px] font-semibold text-sm transition duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: COLORS.error,
                  border: `1px solid ${COLORS.error}`,
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
          backgroundColor: isActive ? statusStyle.color : COLORS.light,
          color: isActive ? COLORS.cardBg : COLORS.muted,
          boxShadow: isActive
            ? `0 4px 12px ${statusStyle.color}80`
            : COLORS.shadow,
        }}
        onClick={() => setFilter(status)}
      >
        <i className={`${statusStyle.icon} text-2xl`}></i>
        <span className="text-base capitalize">{status}</span>
        <span
          className="tab-count absolute top-[-8px] right-[-8px] w-6 h-6 text-xs flex items-center justify-center font-bold rounded-full"
          style={{
            backgroundColor: isActive ? COLORS.cardBg : COLORS.primary,
            color: isActive ? statusStyle.color : COLORS.cardBg,
          }}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <div className="pt-4">
      {/* Owner Header (Simulated content-header for context, but should be removed if using OwnerLayout) */}
      <header
        className="flex justify-between items-center mb-6 p-6 rounded-[25px] shadow-lg sticky top-[1rem] z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(5px)",
          boxShadow: COLORS.shadow,
          marginTop: "0",
          top: "1.5rem",
        }}
      >
        <div className="flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: COLORS.primary }}
          >
            Appointments Management
          </h1>
          <p className="text-base" style={{ color: COLORS.muted }}>
            Review, confirm, or reject incoming visit requests from students.
          </p>
        </div>
        {/* User actions can go here if OwnerLayout doesn't provide them */}
      </header>

      {/* Appointment Categories */}
      <section
        className="appointment-categories p-6 rounded-[25px] shadow-lg mb-6"
        style={{ backgroundColor: COLORS.cardBg }}
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
            style={{ color: COLORS.primary }}
          >
            {filter} Requests
          </h3>
          <p className="text-base" style={{ color: COLORS.muted }}>
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
              style={{ backgroundColor: COLORS.cardBg }}
            >
              <i
                className="fas fa-calendar-times text-6xl mb-4"
                style={{ color: COLORS.muted }}
              ></i>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: COLORS.text }}
              >
                No {filter} Appointments
              </h3>
              <p className="text-base" style={{ color: COLORS.muted }}>
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
