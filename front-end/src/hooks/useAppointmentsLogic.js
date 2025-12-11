import { useState, useMemo } from 'react';
import { 
  sampleAppointments, 
  getRandomBoardingImage, 
  getRandomContact, 
  getRandomOwner, 
  getRandomAddress,
} from '../data/appointmentsData'; // Adjust path as needed

// Helper to simulate unique ID generation
const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

// Function to calculate initial state
const getInitialAppointments = (initialData) => {
  const today = new Date().toISOString().split('T')[0];
  return initialData.map(app => {
    // Only update status if currently 'upcoming' and visit date is past
    if (app.status === 'upcoming' && app.date < today) {
      return { ...app, status: 'visited' };
    }
    return app;
  });
};

const useAppointmentsLogic = () => {
  // 1. Initial State is set synchronously
  const [appointments, setAppointments] = useState(() => getInitialAppointments(sampleAppointments));
  const [activeCategory, setActiveCategory] = useState('upcoming');

  // --- 2. Categorization and Counting (Memoized for performance) ---
  const { categorizedAppointments, counts } = useMemo(() => {
    const categorized = appointments.reduce((acc, app) => {
      acc[app.status] = acc[app.status] || [];
      acc[app.status].push(app);
      return acc;
    }, { upcoming: [], visited: [], selected: [], cancelled: [] });
    
    const counts = Object.fromEntries(
      Object.entries(categorized).map(([key, list]) => [key, list.length])
    );

    return { categorizedAppointments: categorized, counts };
  }, [appointments]); // Recalculates only when appointments change

  const getAppointmentById = (id) => appointments.find(a => a.id === id);

  // --- 3. CRUD/Decision Logic Functions ---

  // Handles the final status change (Select/Reject/Cancel)
  const handleStatusChange = (id, decision) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        if (decision === 'select') {
          return { ...a, status: 'selected', registered: false };
        } else if (decision === 'reject' || decision === 'cancel') {
          return { ...a, status: 'cancelled' };
        }
      }
      return a;
    }));
    // Update the active category view automatically
    setActiveCategory(decision === 'select' ? 'selected' : 'cancelled');
  };

  // Handles scheduling a NEW appointment OR updating an existing one (reschedule)
  const handleScheduleSubmit = (formData, appointmentId = null) => {
    if (appointmentId) {
      // RESCHEDULE: Update existing appointment
      setAppointments(prev => prev.map(a => {
        if (a.id === appointmentId) {
          return {
            ...a,
            // Update the schedule details
            date: formData.visitDate,
            time: formData.visitTime,
            notes: formData.visitNotes || a.notes,
            status: 'upcoming', // Ensure it returns to the 'upcoming' category
          };
        }
        return a;
      }));
    } else {
      // NEW SCHEDULE: Create a brand new appointment
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
      setAppointments(prev => [...prev, newAppointment]);
    }
    setActiveCategory('upcoming');
  };

  // Handles final registration submission
  const handleRegistrationSubmit = (id, regData) => {
    let registeredAppointment = null;
    
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        registeredAppointment = {
          ...a,
          ...regData,
          registered: true,
          registrationDate: new Date().toISOString().split('T')[0]
        };
        return registeredAppointment;
      }
      return a;
    }));
    return registeredAppointment; 
  };

  // --- 4. Exported Hook State and Functions ---
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