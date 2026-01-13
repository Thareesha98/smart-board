import { useState, useEffect, useCallback, useMemo } from 'react';
import StudentService from '../../api/student/StudentService';
import { useAuth } from '../../context/student/StudentAuthContext';

const useMaintenanceLogic = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Requests
  const fetchRequests = useCallback(async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const data = await StudentService.getMaintenanceRequests();
      
      // Normalize Backend Data for Frontend UI
      const normalized = data.map(req => ({
        id: req.id,
        title: req.title || "Maintenance Request",
        type: mapIssueType(req.title), // Optional helper or use returned type
        urgency: req.maintenanceUrgency ? req.maintenanceUrgency.toLowerCase() : 'low',
        description: req.description,
        status: mapStatus(req.status),
        date: new Date().toISOString(), // Backend doesn't send date in DTO yet? Use current or update DTO
        boarding: req.boardingTitle,
        images: req.imageUrls || []
      }));
      
      setRequests(normalized);
    } catch (error) {
      console.error("Failed to load maintenance requests", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  // 2. Filter Active vs History
  const { activeRequests, requestHistory } = useMemo(() => {
    const active = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled' && r.status !== 'rejected');
    const history = requests.filter(r => r.status === 'completed' || r.status === 'cancelled' || r.status === 'rejected');
    return { activeRequests: active, requestHistory: history };
  }, [requests]);

  // 3. Create Request
  const addRequest = async (formData, boardingId) => {
    try {
      // Backend DTO Expects: { boardingId, title, description, issueType, maintenanceUrgency, imageUrls }
      const payload = {
        boardingId: boardingId,
        title: getIssueTitle(formData.issueType), // "Plumbing Issue"
        description: formData.description,
        issueType: formData.issueType.toUpperCase(),
        maintenanceUrgency: formData.urgency.toUpperCase(),
        imageUrls: [] // Handle image upload logic separately if needed (S3) or pass URLs
      };

      await StudentService.createMaintenanceRequest(payload);
      await fetchRequests(); // Refresh list
      return true;
    } catch (error) {
      console.error("Failed to create request", error);
      alert(error.response?.data?.message || "Failed to submit request");
    }
  };

  const cancelRequest = (id) => {
    console.log("Cancel logic pending backend endpoint");
    // You need a cancel endpoint in backend if you want this
  };

  const getRequestById = (id) => requests.find(req => req.id === id);

  return { activeRequests, requestHistory, addRequest, cancelRequest, getRequestById, loading };
};

// --- Helpers ---
const mapStatus = (status) => {
    if(!status) return 'pending';
    const s = status.toLowerCase();
    if(s === 'in_progress') return 'in-progress';
    return s;
};

const getIssueTitle = (type) => {
    const titles = { plumbing: 'Plumbing Issue', electrical: 'Electrical Problem', furniture: 'Furniture Repair', appliance: 'Appliance Malfunction', cleaning: 'Cleaning Request', pest: 'Pest Control', other: 'Maintenance Request' };
    return titles[type] || 'Maintenance Request';
};

const mapIssueType = (title) => {
    if(title.includes("Plumbing")) return "plumbing";
    if(title.includes("Electrical")) return "electrical";
    return "other";
};

export default useMaintenanceLogic;