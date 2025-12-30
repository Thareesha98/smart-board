import { useState, useMemo, useEffect } from 'react';
import { 
  sampleAppointments, 
  getRandomBoardingImage, 
  getRandomContact, 
  getRandomOwner, 
  getRandomAddress,
} from '../../data/student/appointmentsData.js'; 

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const useAppointmentsLogic = () => {
  // 1. Initial State
  const [appointments, setAppointments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('upcoming');

  // --- 2. Load Data from LocalStorage on Mount ---
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Merge stored data with sample data
    const combinedAppointments = [...sampleAppointments];
    storedData.forEach(newApp => {
        if (!combinedAppointments.find(a => a.id === newApp.id)) {
            combinedAppointments.push(newApp);
        }
    });

    // Auto-move expired upcoming visits
    const today = new Date().toISOString().split('T')[0];
    const processedAppointments = combinedAppointments.map(app => {
        if (app.status === 'upcoming' && app.date < today) {
            return { ...app, status: 'visited' };
        }
        return app;
    });

    setAppointments(processedAppointments);
  }, []);

  // --- 3. Helper to Update State AND LocalStorage ---
  const updateAppointments = (updatedList) => {
    setAppointments(updatedList);
    const newOnly = updatedList.filter(a => !sampleAppointments.find(s => s.id === a.id));
    localStorage.setItem('appointments', JSON.stringify(newOnly));
  };

  // --- 4. Categorization (Memoized) ---
  const { categorizedAppointments, counts } = useMemo(() => {
    const categorized = appointments.reduce((acc, app) => {
      // Create array if it doesn't exist (safety check)
      acc[app.status] = acc[app.status] || [];
      acc[app.status].push(app);
      return acc;
    }, { 
        upcoming: [], 
        visited: [], 
        selected: [], 
        cancelled: [], 
        rejected: [] // ✅ ADDED: Missing 'rejected' category
    });
    
    const counts = Object.fromEntries(
      Object.entries(categorized).map(([key, list]) => [key, list.length])
    );

    return { categorizedAppointments: categorized, counts };
  }, [appointments]);

  const getAppointmentById = (id) => appointments.find(a => a.id === id);

  // --- 5. CRUD Logic ---

  // ✅ FIXED: Now handles 'cancelled', 'rejected', and 'select' correctly
  const handleStatusChange = (id, newStatus) => {
    const updatedList = appointments.map(a => {
      if (a.id === id) {
        // Direct update: whatever string is passed (e.g., 'cancelled') becomes the status
        return { ...a, status: newStatus, registered: false }; 
      }
      return a;
    });
    
    updateAppointments(updatedList);

    // Auto-switch tab only for selection
    if (newStatus === 'select' || newStatus === 'selected') {
        setActiveCategory('selected');
    }
    // Note: We stay on the current tab for 'cancelled' so the user sees it disappear
  };

  const handleScheduleSubmit = (formData, appointmentId = null) => {
    let updatedList;

    if (appointmentId) {
      // RESCHEDULE: Update details and reset status to 'upcoming'
      updatedList = appointments.map(a => {
        if (a.id === appointmentId) {
          return {
            ...a,
            date: formData.visitDate,
            time: formData.visitTime,
            notes: formData.visitNotes || a.notes,
            status: 'upcoming', // ✅ Reset status so Owner sees it again
          };
        }
        return a;
      });
    } else {
      // NEW SCHEDULE
      const newAppointment = {
        id: generateId(),
        boardingName: formData.boardingName, 
        boardingId: formData.boardingId,
        image: getRandomBoardingImage(),
        date: formData.visitDate,
        time: formData.visitTime,
        status: 'upcoming',
        contact: getRandomContact(),
        owner: getRandomOwner(),
        address: getRandomAddress(),
        notes: formData.visitNotes || 'No additional notes',
        createdAt: new Date().toISOString().split('T')[0],
        registered: false
      };
      updatedList = [...appointments, newAppointment];
    }

    updateAppointments(updatedList);
    setActiveCategory('upcoming');
  };

  const handleRegistrationSubmit = (id, regData) => {
    let registeredAppointment = null;
    const updatedList = appointments.map(a => {
      if (a.id === id) {
        registeredAppointment = {
          ...a,
          ...regData,
          status: 'selected', // Ensure status is selected
          registered: true,
          registrationDate: new Date().toISOString().split('T')[0]
        };
        return registeredAppointment;
      }
      return a;
    });
    updateAppointments(updatedList);
    return registeredAppointment; 
  };

  return {
    appointments,
    activeCategory,
    counts,
    categorizedAppointments,
    getAppointmentById,
    setActiveCategory,
    handleStatusChange,
    handleScheduleSubmit,
    handleRegistrationSubmit,
  };
};

export default useAppointmentsLogic;