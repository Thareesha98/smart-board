import { useState, useMemo, useEffect } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import {
  getOwnerMaintenanceRequests,
  updateMaintenanceStatus,
} from "../../api/owner/service";

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
      // We don't need currentOwner.id for the API call anymore (handled by token),
      // but we still check if auth is ready.
      if (!currentOwner) return;

      try {
        setLoading(true);
        const rawData = await getOwnerMaintenanceRequests();

        // 🔄 MAPPER: Convert Java DTO keys to Frontend keys
        // Java: title, boardingTitle, imageUrls, maintenanceUrgency
        // UI:   issueType, boardingName, image, urgency
        const mappedData = (rawData || []).map((item) => ({
          id: item.id,
          issueType: item.title, // Map 'title' -> 'issueType'
          description: item.description,
          boardingName: item.boardingTitle, // Map 'boardingTitle' -> 'boardingName'
          studentName: item.studentName,
          status: item.status,
          urgency: item.maintenanceUrgency, // Map 'maintenanceUrgency' -> 'urgency'
          image: item.imageUrls || [], // Map 'imageUrls' -> 'image'
          roomNumber: item.roomNumber,
          createdDate: item.createdAt, 
          updatedDate: item.updatedAt,

        }));

        setRequests(mappedData);
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

  const handleStatusUpdate = async (id, newStatus) => {
    // 1. Capture the current date immediately
    const now = new Date();
    const isoDate = now.toISOString(); // e.g., "2023-10-27T10:00:00.000Z"

    // 2. Optimistic Update
    const originalRequests = [...requests];
    const statusToSend = newStatus.toUpperCase();

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id 
          ? { 
              ...req, 
              status: statusToSend, 
              updatedDate: isoDate // <--- ADDS THE DATE TO UI INSTANTLY
            } 
          : req
      )
    );

    try {
      // 3. Send to Backend
      // Ensure your updateMaintenanceStatus function accepts this 4th parameter
      await updateMaintenanceStatus(id, statusToSend, "", isoDate);
    } catch (err) {
      console.error("Update failed:", err);
      setRequests(originalRequests); // Revert on error
      alert("Failed to update status. Please try again.");
    }
  };

  // --- FILTERING & SORTING ---
  const filteredRequests = useMemo(() => {
    let result = requests.filter((req) => {
      const reqStatus = req.status ? req.status.toLowerCase() : "pending";

      const isPendingTab = activeTab === "pending";
      // Allow "pending", "in_progress", and "in-progress" for the first tab
      const isReqPending = ["pending", "in_progress", "in-progress"].includes(
        reqStatus
      );
      const isReqCompleted = ["completed", "resolved"].includes(reqStatus);

      if (isPendingTab && !isReqPending) return false;
      if (!isPendingTab && !isReqCompleted) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();

      return (
        (req.issueType && req.issueType.toLowerCase().includes(q)) ||
        (req.boardingName && req.boardingName.toLowerCase().includes(q))
      );
    });

    // Sort by ID descending (newest first) since Date is missing in DTO
    return result.sort((a, b) => b.id - a.id);
  }, [requests, activeTab, searchQuery]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
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
