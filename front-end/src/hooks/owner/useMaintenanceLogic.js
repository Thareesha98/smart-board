import { useState, useMemo, useEffect } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext.jsx";
import api from "../../api/api";

const useMaintenanceLogic = () => {
  // --- STATE ---
  const { currentOwner } = useOwnerAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- API CALLS ---
  useEffect(() => {
    const fetchRequests = async () => {
      // Safety check: ensure currentOwner exists before calling API
      if (!currentOwner?.id) return;

      try {
        setLoading(true);
        // ✅ Matches Controller: GET /api/maintenance/owner/{id}
        const response = await api.get(`/maintenance/owner/${currentOwner.id}`);
        setRequests(response.data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load maintenance requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentOwner]);

  // --- ⚠️ CRITICAL FIX: STATUS UPDATE ---
  const handleStatusUpdate = async (id, newStatus) => {
    // 1. Optimistic Update (Update UI immediately)
    const originalRequests = [...requests];
    
    // Backend likely sends uppercase (PENDING), Frontend uses lowercase (pending).
    // We send uppercase to backend, but keep local state consistent for UI.
    const statusToSend = newStatus.toUpperCase(); 

    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: statusToSend } : req))
    );

    try {
      // ✅ FIX: Controller expects @RequestBody Map<String, String>
      // URL: PATCH /api/maintenance/{id}/status
      await api.patch(`/maintenance/${id}/status`, { 
        status: statusToSend 
      });
      
    } catch (err) {
      console.error("Update failed:", err);
      setRequests(originalRequests); // Revert UI on error
      alert("Failed to update status. Please try again.");
    }
  };

  // --- FILTERING & SORTING ---
  const filteredRequests = useMemo(() => {
    let result = requests.filter((req) => {
      // Normalize status to lowercase for comparison
      const reqStatus = req.status ? req.status.toLowerCase() : "pending";
      
      const isPendingTab = activeTab === "pending";
      // Check for both "pending" and "in-progress"
      const isReqPending = reqStatus === "pending" || reqStatus === "in_progress" || reqStatus === "in-progress";
      const isReqCompleted = reqStatus === "completed" || reqStatus === "resolved";

      if (isPendingTab && !isReqPending) return false;
      if (!isPendingTab && !isReqCompleted) return false;

      // Search Filter
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      // ✅ FIX: Use 'issueType' instead of 'title' (from DTO)
      return (
        (req.issueType && req.issueType.toLowerCase().includes(q)) ||
        (req.roomNumber && req.roomNumber.toString().includes(q)) ||
        (req.boardingName && req.boardingName.toLowerCase().includes(q))
      );
    });

    // Sort: Newest First
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [requests, activeTab, searchQuery]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  useEffect(() => setCurrentPage(1), [activeTab, searchQuery]);

  return {
    paginatedRequests,
    activeTab,
    setActiveTab,
    handleStatusUpdate,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error,
  };
};

export default useMaintenanceLogic;