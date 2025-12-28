import { useState, useMemo } from "react";
import { mockAppointments, ownerData } from "../../data/mockData"; // Adjust path if needed

const useAppointmentsLogic = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState("pending");

  // --- Actions ---
  const handleAction = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // --- Derived Data ---
  const counts = useMemo(() => {
    return appointments.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { pending: 0, confirmed: 0, visited: 0, cancelled: 0, rejected: 0 }
    );
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => app.status === filter);
  }, [appointments, filter]);

  // --- Helpers ---
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatTime = (t) =>
    new Date(`2000-01-01T${t}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const getStatusStyle = (status) => {
    const styles = {
      pending: {
        colorClass: "bg-accent",
        textClass: "text-accent",
        bgClass: "bg-accent/10",
      },
      confirmed: {
        colorClass: "bg-success",
        textClass: "text-success",
        bgClass: "bg-success/10",
      },
      visited: {
        colorClass: "bg-info",
        textClass: "text-info",
        bgClass: "bg-info/10",
      },
      cancelled: {
        colorClass: "bg-error",
        textClass: "text-error",
        bgClass: "bg-error/10",
      },
      rejected: {
        colorClass: "bg-secondary",
        textClass: "text-secondary",
        bgClass: "bg-secondary/10",
      },
      
    };
    return styles[status] || {};
  };

  return {
    // Data
    appointments,
    filteredAppointments,
    counts,
    ownerData,
    
    // State
    filter,
    setFilter,
    
    // Actions
    handleAction,
    
    // Utils
    formatDate,
    formatTime,
    getStatusStyle,
  };
};

export default useAppointmentsLogic;