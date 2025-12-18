import { useState, useMemo } from 'react';
import { sampleMaintenanceRequests } from '../../data/student/maintenanceData.js';

const useMaintenanceLogic = () => {
  const [requests, setRequests] = useState(sampleMaintenanceRequests);

  const { activeRequests, requestHistory } = useMemo(() => {
    const active = requests.filter(
      req => req.status !== 'completed' && req.status !== 'cancelled'
    );
    const history = requests.filter(
      req => req.status === 'completed' || req.status === 'cancelled'
    );
    
    return { activeRequests: active, requestHistory: history };
  }, [requests]);

  const getRequestById = (id) => requests.find(req => req.id === id);

  const getIssueTitle = (type) => {
    const titles = {
      plumbing: 'Plumbing Issue',
      electrical: 'Electrical Problem',
      furniture: 'Furniture Repair',
      appliance: 'Appliance Malfunction',
      cleaning: 'Cleaning Request',
      pest: 'Pest Control',
      other: 'Maintenance Request'
    };
    return titles[type] || 'Maintenance Request';
  };

  const addRequest = (formData) => {
    const newRequest = {
      id: Date.now(),
      title: getIssueTitle(formData.issueType),
      type: formData.issueType,
      urgency: formData.urgency,
      description: formData.description,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      boarding: 'Sunshine Hostel', // In real app, get from user's current boarding
      images: formData.images || []
    };

    setRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const cancelRequest = (requestId) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'cancelled' } : req
      )
    );
  };

  return {
    requests,
    activeRequests,
    requestHistory,
    addRequest,
    cancelRequest,
    getRequestById,
  };
};

export default useMaintenanceLogic;