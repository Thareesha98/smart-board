import { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import { 
  getOwnerRegistrations, 
  decideRegistration 
} from "../../api/owner/service";

// 2. Auth Context Import
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";

// 3. Mock Data (Fallback)
import { ownerData as mockOwnerData } from "../../data/mockData";

const useRegistrationsLogic = () => {
  const { currentOwner } = useOwnerAuth();

  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState("PENDING"); // Default tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // --- 1. Fetch & Map Data ---
  const fetchRegistrations = useCallback(async () => {
    if (!currentOwner || !currentOwner.id) return;
    setLoading(true);
    try {
      const data = await getOwnerRegistrations(currentOwner.id);

      // Map Backend DTO to Frontend Structure
      const mappedData = data.map((dto) => ({
        id: dto.id,
        studentName: dto.studentName || "Unknown Student",
        boardingName: dto.boardingName || "Unknown Property",
        status: dto.status, // "PENDING", "ACCEPTED", "REJECTED"
        keyMoneyPaid: dto.keyMoneyPaid,
        paymentTransactionRef: dto.paymentTransactionRef,
        studentNote: dto.studentNote,
        ownerNote: dto.ownerNote,
        date: dto.createdAt || new Date().toISOString(), // Fallback if DTO lacks date
        numberOfStudents: dto.numberOfStudents,
        moveInDate: dto.moveInDate,
      }));

      setRegistrations(mappedData);
      setError(null);
    } catch (err) {
      setError("Failed to load registrations.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentOwner]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // --- 2. Action Handlers ---
  const handleDecision = async (regId, status, ownerNote = "") => {
    if (!currentOwner) return false;

    // Optimistic Update: Update UI immediately
    const previousState = [...registrations];
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === regId ? { ...reg, status: status } : reg))
    );

    const toastId = toast.loading("Processing decision...");

    try {
      const decisionDTO = {
        status: status, // "ACCEPTED" or "REJECTED"
        ownerNote: ownerNote,
      };

      await decideRegistration(currentOwner.id, regId, decisionDTO);
      toast.success(`Request ${status.toLowerCase()} successfully!`, {
        id: toastId,
      });
      return true; // Return true to close modal
    } catch (err) {
      console.error(err);
      // Revert on error
      setRegistrations(previousState);
      toast.error("Failed to update status.", { id: toastId });
      return false;
    }
  };

  // --- 3. Filtering & Sorting Logic ---
  const filteredRegistrations = useMemo(() => {
    // 1. Filter by Status Tab
    let result = registrations.filter((reg) => {
      if (filter === "ALL") return true; // Optional: if you have an "ALL" tab
      return reg.status === filter;
    });

    // 2. Filter by Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (reg) =>
          reg.studentName.toLowerCase().includes(lowerQuery) ||
          reg.boardingName.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sort by Date
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === "newest") {
        return dateB - dateA;
      } else if (sortBy === "oldest") {
        return dateA - dateB;
      }
      return 0;
    });

    return result;
  }, [registrations, filter, searchQuery, sortBy]);

  // --- Helpers ---
  const counts = useMemo(() => {
    return registrations.reduce(
      (acc, reg) => {
        const statusKey = reg.status; // "PENDING", "ACCEPTED", etc.
        acc[statusKey] = (acc[statusKey] || 0) + 1;
        return acc;
      },
      { PENDING: 0, ACCEPTED: 0, REJECTED: 0 }
    );
  }, [registrations]);

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: {
        color: "text-warning",
        bg: "bg-warning/10",
        border: "border-warning/20",
      },
      ACCEPTED: {
        color: "text-success",
        bg: "bg-success/10",
        border: "border-success/20",
      },
      REJECTED: {
        color: "text-error",
        bg: "bg-error/10",
        border: "border-error/20",
      },
    };
    // Default fallback
    return (
      styles[status] || {
        color: "text-muted",
        bg: "bg-gray-100",
        border: "border-gray-200",
      }
    );
  };

  const activeOwnerData = {
    ...mockOwnerData,
    ...currentOwner,
  };

  return {
    registrations: filteredRegistrations,
    counts,
    ownerData: activeOwnerData,
    filter,
    setFilter,
    handleDecision,
    getStatusStyle,
    loading,
    error,
    // Search & Sort Exports
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
};

export default useRegistrationsLogic;
