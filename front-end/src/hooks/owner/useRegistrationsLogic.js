import { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import { 
  getOwnerRegistrations, 
  decideRegistration 
} from "../../api/owner/service";

import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { ownerData as mockOwnerData } from "../../data/mockData";

const useRegistrationsLogic = () => {
  const { currentOwner } = useOwnerAuth();

  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState("PENDING"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // --- 1. Fetch & Map Data ---
  const fetchRegistrations = useCallback(async () => {
    if (!currentOwner || !currentOwner.id) return;
    setLoading(true);
    try {
      const data = await getOwnerRegistrations(currentOwner.id);

      const mappedData = data.map((dto) => {
        // ✅ FIX 1: Map Backend "DECLINED" -> Frontend "REJECTED"
        // "APPROVED" matches both sides, so no change needed there.
        let uiStatus = dto.status;
        if (dto.status === "DECLINED") uiStatus = "REJECTED"; 

        return {
          id: dto.id,
          studentName: dto.studentName || "Unknown Student",
          boardingName: dto.boardingTitle || "Unknown Property", 
          status: uiStatus, 
          keyMoneyPaid: dto.keyMoneyPaid,
          paymentTransactionRef: dto.paymentTransactionRef || dto.paymentSlipUrl,
          paymentMethod: dto.paymentMethod,
          studentNote: dto.studentNote,
          ownerNote: dto.ownerNote,
          date: dto.createdAt || new Date().toISOString(),
          numberOfStudents: dto.numberOfStudents,
          moveInDate: dto.moveInDate,
        };
      });

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
  const handleDecision = async (regId, uiStatus, ownerNote = "", signatureBase64 = null, allowPending = false) => {
    if (!currentOwner) return false;

    // ✅ FIX 2: Map Frontend Status -> Correct Backend Enum
    // Backend Error said allowed values are: [CANCELLED, DECLINED, PENDING, APPROVED]
    let backendStatus = uiStatus;
    
    if (uiStatus === "APPROVED") {
        backendStatus = "APPROVED"; // Send "APPROVED", NOT "ACCEPTED"
    } else if (uiStatus === "REJECTED") {
        backendStatus = "DECLINED"; // Send "DECLINED"
    }

    const toastId = toast.loading("Processing decision...");

    try {
      const decisionDTO = {
        status: backendStatus, 
        ownerNote: ownerNote,
        ownerSignatureBase64: signatureBase64,
        approveWithPendingPayment: allowPending
      };

      await decideRegistration(currentOwner.id, regId, decisionDTO);
      
      toast.success(`Request ${uiStatus.toLowerCase()} successfully!`, {
        id: toastId,
      });

      fetchRegistrations();
      return true; 

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update status.", { id: toastId });
      return false;
    }
  };

  // --- 3. Filtering & Sorting ---
  const filteredRegistrations = useMemo(() => {
    let result = registrations.filter((reg) => {
        if (filter === "ALL") return true; 
        return reg.status === filter;
    });

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (reg) =>
          reg.studentName.toLowerCase().includes(lowerQuery) ||
          reg.boardingName.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [registrations, filter, searchQuery, sortBy]);

  const counts = useMemo(() => {
    const initialCounts = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
    return registrations.reduce((acc, reg) => {
      const statusKey = reg.status; 
      if (acc[statusKey] !== undefined) acc[statusKey]++;
      return acc;
    }, initialCounts);
  }, [registrations]);

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: {
        textClass: "text-warning",
        bgClass: "bg-warning/10",
        colorClass: "bg-warning",
        border: "border-warning/20",
      },
      APPROVED: {
        textClass: "text-success",
        bgClass: "bg-success/10",
        colorClass: "bg-success",
        border: "border-success/20",
      },
      REJECTED: {
        textClass: "text-error",
        bgClass: "bg-error/10",
        colorClass: "bg-error",
        border: "border-error/20",
      },
    };
    return styles[status] || styles.PENDING;
  };

  return {
    registrations: filteredRegistrations,
    counts,
    ownerData: { ...mockOwnerData, ...currentOwner },
    filter,
    setFilter,
    handleDecision,
    getStatusStyle,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
};

export default useRegistrationsLogic;