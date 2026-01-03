import { useState, useEffect, useMemo, useCallback } from "react";
// 1. Service Imports
import {
  getOwnerAppointments,
  updateAppointmentStatus,
} from "../../api/owner/service.js";
// 2. Auth Context Import
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
// 3. Mock Data (Fallback for avatar/images if backend doesn't send them yet)
import { ownerData as mockOwnerData } from "../../data/mockData";

const useAppointmentsLogic = () => {
  // ✅ Get the real logged-in owner
  const { currentOwner } = useOwnerAuth();

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch & Map Data ---
  const fetchAppointments = useCallback(async () => {
    // If auth isn't ready yet, don't fetch
    if (!currentOwner || !currentOwner.id) return;

    setLoading(true);
    try {
      // ✅ Use dynamic ID from Context
      const data = await getOwnerAppointments(currentOwner.id);

      const mappedData = data.map((dto) => ({
        id: dto.id,
        student: dto.studentName,
        boardingName: dto.boardingTitle,
        boardingAddress: dto.boardingAddress,
        numberOfStudents: dto.numberOfStudents,
        studentEmail: dto.studentEmail,
        ownerNote: dto.ownerNote,
        ownerStartTime: dto.ownerStartTime,
        ownerEndTime: dto.ownerEndTime,
        date: dto.requestedStartTime,
        time: dto.requestedStartTime,
        contact: dto.studentEmail,
        notes: dto.studentNote,
        status: mapBackendStatusToFrontend(dto.status),
        originalStart: dto.requestedStartTime,
        originalEnd: dto.requestedEndTime,
      }));

      setAppointments(mappedData);
      setError(null);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }, [currentOwner]); // Re-run if user changes

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // --- 2. Handle Actions (Confirm / Reject) ---
  const handleAction = async (id, actionType) => {
    if (!currentOwner) return;

    const currentApp = appointments.find((app) => app.id === id);
    if (!currentApp) return;

    // Prepare DTO
    let decisionDTO = {
      status: null,
      ownerStartTime: null,
      ownerEndTime: null,
      ownerNote: "",
    };

    if (actionType === "confirmed") {
      decisionDTO.status = "ACCEPTED";
      decisionDTO.ownerStartTime = currentApp.originalStart;
      decisionDTO.ownerEndTime = currentApp.originalEnd;
      decisionDTO.ownerNote = "Request accepted.";
    } else if (actionType === "rejected") {
      decisionDTO.status = "DECLINED";
      decisionDTO.ownerNote = "Slot unavailable.";
    } else if (actionType === "visited") {
      alert(
        "Backend update required: 'VISITED' status is not yet supported in Java."
      );
      return;
    }

    // Optimistic Update
    const previousState = [...appointments];
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: actionType } : app))
    );

    try {
      // ✅ Use dynamic ID from Context
      await updateAppointmentStatus(currentOwner.id, id, decisionDTO);
    } catch (err) {
      setAppointments(previousState);
      alert("Failed to update status. Please try again.");
    }
  };

  // --- Helpers ---
  const mapBackendStatusToFrontend = (backendStatus) => {
    switch (backendStatus) {
      case "PENDING":
        return "pending";
      case "ACCEPTED":
        return "confirmed";
      case "DECLINED":
        return "rejected";
      case "CANCELLED":
        return "cancelled";
      case "VISITED":
        return "visited";
      default:
        return "pending";
    }
  };

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

  const formatDate = (d) => {
    if (!d) return "N/A";
    const dateObj = new Date(d);
    return isNaN(dateObj)
      ? d
      : dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTime = (t) => {
    if (!t) return "N/A";
    const dateObj = new Date(t.includes("T") ? t : `2000-01-01T${t}`);
    return isNaN(dateObj)
      ? t
      : dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
  };

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
        colorClass: "bg-warning",
        textClass: "text-warning",
        bgClass: "bg-warning/10",
      },
    };
    return styles[status] || styles.pending;
  };

  // ✅ Combine Real Auth Data with Mock Fallbacks
  // This ensures your HeaderBar shows the real name, but keeps the avatar if backend sends null
  const activeOwnerData = {
    ...mockOwnerData, // Fallback
    ...currentOwner, // Overwrite with real data (e.g. firstName, email)
    // If your auth context uses 'username' but UI expects 'firstName', map it manually:
    // firstName: currentOwner?.firstName || currentOwner?.username || "Owner",
  };

  return {
    appointments,
    filteredAppointments,
    counts,
    ownerData: activeOwnerData, // Return the merged data
    filter,
    setFilter,
    handleAction,
    formatDate,
    formatTime,
    getStatusStyle,
    loading,
    error,
  };
};

export default useAppointmentsLogic;
