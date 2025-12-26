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

  // --- DATA MAPPING (Java DTO -> React Props) ---
  const ownerData = useMemo(
    () => ({
      firstName: currentOwner?.fullName
        ? currentOwner.fullName.split(" ")[0]
        : "Owner",
      avatar:
        currentOwner?.profileImageUrl ||
        `https://ui-avatars.com/api/?name=${currentOwner?.fullName || "Owner"}`,
      id: currentOwner?.id,
    }),
    [currentOwner]
  );

  // --- API CALLS ---
  useEffect(() => {
    const fetchRequests = async () => {
      if (!ownerData.id) return;

      try {
        setLoading(true);
        // Assuming your backend endpoint is: GET /api/maintenance/owner/{id}
        const response = await api.get(`/maintenance/owner/${ownerData.id}`);
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
  }, [ownerData.id]);

  const handleStatusUpdate = async (id, newStatus) => {
    // Optimistic Update
    const originalRequests = [...requests];
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );

    try {
      // Assuming endpoint: PATCH /api/maintenance/{id}/status?status=COMPLETED
      await api.patch(`/maintenance/${id}/status`, null, {
        params: { status: newStatus },
      });
    } catch (err) {
      console.error("Update failed:", err);
      setRequests(originalRequests); // Revert on error
      alert("Failed to update status.");
    }
  };

  // --- FILTERING & SORTING ---
  const filteredRequests = useMemo(() => {
    let result = requests.filter((req) => {
      // Tab Filter
      const isPendingTab = activeTab === "pending";
      const isReqPending =
        req.status === "pending" || req.status === "in-progress";
      const isReqCompleted = req.status === "completed";

      if (isPendingTab && !isReqPending) return false;
      if (!isPendingTab && !isReqCompleted) return false;

      // Search Filter
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        req.title?.toLowerCase().includes(q) ||
        req.roomNumber?.toString().includes(q) ||
        req.boardingName?.toLowerCase().includes(q)
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

  // Reset page when filter changes
  useEffect(() => setCurrentPage(1), [activeTab, searchQuery]);

  // --- COUNTS ---
  const counts = {
    pending: requests.filter(
      (r) => r.status === "pending" || r.status === "in-progress"
    ).length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return {
    paginatedRequests,
    activeTab,
    setActiveTab,
    handleStatusUpdate,
    counts,
    ownerData,
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
