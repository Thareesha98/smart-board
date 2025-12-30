import { useState, useEffect } from 'react';
import { useAuth } from '../../context/student/AuthContext';
import StudentService from '../../api/student/StudentService';

const useBoardingsLogic = () => {
  const { user } = useAuth();
  const [currentBoarding, setCurrentBoarding] = useState(null);
  const [hasBoarding, setHasBoarding] = useState(false);

  useEffect(() => {
    if (user?.id) {
        //Logic: Find an appointment with status 'SELECTED' or 'REGISTERED'
        // Since we don't have that endpoint yet, we will fetch appointments
        // and look for one locally.
        fetchMyBoarding();
    }
  }, [user]);

  const fetchMyBoarding = async () => {
      try {
          // This is a placeholder logic until you add a specific Endpoint
          // e.g. @GetMapping("/student/{id}/current-boarding")
          const apps = await StudentService.getMyAppointments(user.id);
          // Mock logic: take the first one for demo
          if (apps.length > 0) {
              const app = apps[0];
              setCurrentBoarding({
                  id: app.boardingId,
                  name: app.boardingTitle,
                  address: app.boardingAddress,
                  rent: 15000, // Placeholder
                  image: 'https://via.placeholder.com/300',
                  nextPayment: { amount: 15000, dueDate: '2024-05-01' }
              });
              setHasBoarding(true);
          }
      } catch (e) {
          console.error(e);
      }
  };

  const payRent = () => {
    // Call Payment Gateway API here later
    alert("Payment feature coming soon!");
  };

  return {
    currentBoarding,
    hasBoarding,
    payRent
  };
};

export default useBoardingsLogic;