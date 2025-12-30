import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/student/AuthContext'; // Ensure correct path
import StudentService from '../../api/student/StudentService';

const useAppointmentsLogic = () => {
  const { user } = useAuth(); // Logged in user
  const [appointments, setAppointments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('upcoming');

  // Load Data
  useEffect(() => {
    if (user?.id) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    try {
      const data = await StudentService.getMyAppointments(user.id);
      
      const mapped = data.map(app => ({
        id: app.id,
        boardingId: app.boardingId,
        boardingName: app.boardingTitle,
        address: app.boardingAddress,
        date: app.requestedStartTime.split('T')[0],
        time: app.requestedStartTime.split('T')[1].substring(0, 5), // HH:mm
        status: mapBackendStatus(app.status),
        owner: "Owner", // Name not in DTO yet, placeholder
        contact: "Contact Owner",
        image: 'https://via.placeholder.com/150',
        registered: false
      }));
      
      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  // Handle New Booking or Reschedule
  const handleScheduleSubmit = async (formData, appointmentId) => {
    try {
        if (!user?.id) return { success: false, message: "Please login" };
        
        // If appointmentId exists, it's a reschedule (Not implemented in backend yet, so we create new for now)
        // Ideally: await StudentService.updateAppointment(...)
        
        await StudentService.createAppointment(user.id, formData);
        
        await loadAppointments(); // Refresh list
        return { success: true };
    } catch (error) {
        console.error("Booking error", error);
        return { success: false, message: "Booking failed" };
    }
  };

  const handleStatusChange = async (id, newStatus) => {
      if (newStatus === 'cancel' || newStatus === 'cancelled') {
          try {
              await StudentService.cancelAppointment(user.id, id);
              await loadAppointments();
          } catch (error) {
              console.error("Cancel failed", error);
          }
      }
      // Other statuses (Select/Reject) handled locally for now or add API endpoint
  };

  // Categorization Logic (Same as before)
  const { categorizedAppointments, counts } = useMemo(() => {
    const categorized = { upcoming: [], visited: [], selected: [], cancelled: [], rejected: [] };
    
    appointments.forEach(app => {
        if (categorized[app.status]) categorized[app.status].push(app);
    });

    const counts = Object.fromEntries(Object.keys(categorized).map(k => [k, categorized[k].length]));
    return { categorizedAppointments: categorized, counts };
  }, [appointments]);

  return {
    appointments,
    activeCategory,
    counts,
    categorizedAppointments,
    setActiveCategory,
    handleStatusChange,
    handleScheduleSubmit,
    getAppointmentById: (id) => appointments.find(a => a.id === id)
  };
};

// Status Mapper
const mapBackendStatus = (status) => {
    switch(status) {
        case 'PENDING': return 'upcoming';
        case 'ACCEPTED': return 'upcoming'; // Or 'visited' if date passed
        case 'DECLINED': return 'rejected';
        case 'CANCELLED': return 'cancelled';
        default: return 'upcoming';
    }
};

export default useAppointmentsLogic;