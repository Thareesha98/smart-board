import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/student/StudentAuthContext'; // Ensure correct path
import StudentService from '../../api/student/StudentService';

const useAppointmentsLogic = () => {
  const { currentUser } = useAuth(); // Logged in user
  const [appointments, setAppointments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('upcoming');

  const [loading, setLoading] = useState(false);

  // Load Data
  useEffect(() => {
    if (currentUser?.id) {
      loadAppointments();
    }
  }, [currentUser]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await StudentService.getMyAppointments(currentUser.id);
      
      const mapped = data.map(app => ({
        id: app.id,
        boardingId: app.boardingId,
        boardingName: app.boardingTitle,

        address: app.boardingAddress || "Address details unavailable",
        distance: app.distance || app.distanceFromInstitute || "N/A",

        date: app.requestedStartTime ? app.requestedStartTime.split('T')[0] : '',
        time: app.requestedStartTime ? app.requestedStartTime.split('T')[1].substring(0, 5) : '',
        
        status: mapBackendStatus(app.status),
        backendStatus: app.status,

        owner: app.ownerName || "Boarding Owner",
        ownerId: app.ownerId,
        contact: app.ownerContact || "N/A",
        image: app.boardingImage || "https://via.placeholder.com/150",

        registered: false
      }));
      
      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle New Booking or Reschedule
  const handleScheduleSubmit = async (formData, appointmentId) => {
    try {
        if (!currentUser?.id) return { success: false, message: "Please login" };
        
        // If rescheduling, you might want to cancel the old one first or use an update endpoint
        // For now, let's assume creating a new one is the flow 
        
        await StudentService.createAppointment(currentUser.id, formData);
        
        await loadAppointments(); // Refresh list
        return { success: true };
    } catch (error) {
        console.error("Booking error", error);
        return { success: false, message: "Booking failed" };
    }
  };

  const handleStatusChange = async (id, action) => {
      try {
        if (action === 'cancel') {
            await StudentService.cancelAppointment(currentUser.id, id);
        } 
        else if (action === 'markVisited') {
            // Call the new backend endpoint
            await StudentService.markAsVisited(currentUser.id, id);
            setActiveCategory('visited');
        }
        // Refresh to move the card to the correct tab
        await loadAppointments(); 
      } catch (error) {
          console.error(`Action ${action} failed`, error);
      }
  };

  // Mock function for Registration (since backend logic for this isn't built yet)
  const handleRegistrationSubmit = (appointmentId, regData) => {
        // Optimistically update local state for demo purposes
        const app = appointments.find(a => a.id === appointmentId);
        if(app) {
            const updated = { ...app, status: 'selected', registered: true, ...regData };
            // In real app: await StudentService.registerBoarding(...)
            return updated;
        }
        return null;
  };

  // Categorization Logic
  const { categorizedAppointments, counts } = useMemo(() => {
    const categorized = { upcoming: [], visited: [], selected: [], cancelled: [], rejected: [] };
    
    appointments.forEach(app => {
        // Ensure status key exists in our categories, fallback to 'upcoming' if unknown
        const key = categorized[app.status] ? app.status : 'upcoming';
        categorized[key].push(app);
    });

    const counts = Object.fromEntries(Object.keys(categorized).map(k => [k, categorized[k].length]));
    return { categorizedAppointments: categorized, counts };
  }, [appointments]);

  // Map Backend Enum Strings to Frontend Categories
  const mapBackendStatus = (status) => {
      if (!status) return 'upcoming';
      switch(status) {
          case 'PENDING': return 'upcoming';
          case 'ACCEPTED': return 'upcoming'; // Could move to 'visited' based on date logic later
          case 'VISITED': return 'visited';
          case 'DECLINED': return 'rejected';
          case 'CANCELLED': return 'cancelled';
          // case 'COMPLETED': return 'visited'; // Example future status
          default: return 'upcoming';
      }
  };

  return {
    appointments,
    activeCategory,
    loading,
    counts,
    categorizedAppointments,
    setActiveCategory,
    handleStatusChange,
    handleScheduleSubmit,
    handleRegistrationSubmit,
    getAppointmentById: (id) => appointments.find(a => a.id === id)
  };
};

export default useAppointmentsLogic;