import { useState, useEffect } from 'react';
import { useAuth } from '../../context/student/StudentAuthContext';
import StudentService from '../../api/student/StudentService';

const useBoardingsLogic = () => {
  const { currentUser } = useAuth(); 
  
  const [currentBoarding, setCurrentBoarding] = useState(null);
  const [hasBoarding, setHasBoarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.id) {
        fetchMyBoarding(currentUser.id);
    }
  }, [currentUser]);

  const fetchMyBoarding = async (studentId) => {
      try {
          setLoading(true);
          
          // 1. Get All Registrations to check status
          const registrations = await StudentService.getRegistrations(studentId);
          
          // 2. Find the relevant registration (Approved takes priority, then Pending)
          const activeReg = registrations.find(r => r.status === 'APPROVED') 
                         || registrations.find(r => r.status === 'PENDING');

          if (activeReg) {
              // 3. Fetch Dashboard Data (Contains Boarding Info, Owner, Members)
              // Note: The backend 'getDashboard' endpoint works for both Pending and Approved
              // but returns limited info for Pending if you set it up that way.
              const dashboardData = await StudentService.getDashboard(activeReg.id);

              setCurrentBoarding({
                  // --- Status & ID ---
                  id: activeReg.boardingId,
                  registrationId: activeReg.id,
                  status: activeReg.status, // "PENDING" or "APPROVED"
                  joinedDate: activeReg.moveInDate,

                  // --- Basic Info (Visible in both states) ---
                  name: dashboardData.boardingTitle,
                  address: dashboardData.boardingAddress,
                  image: dashboardData.boardingImage || 'https://via.placeholder.com/300',
                  monthlyRent: dashboardData.monthlyPrice,

                  // --- Owner Info ---
                  owner: {
                      id: dashboardData.ownerId,
                      name: dashboardData.ownerName,
                      rating: "4.8", 
                      reviews: 12,
                      avatar: `https://ui-avatars.com/api/?name=${dashboardData.ownerName}&background=random`
                  },

                  // --- Members (Empty if pending usually) ---
                  members: dashboardData.members || [],

                  // --- Payment Info ---
                  nextPayment: { 
                      amount: dashboardData.currentMonthDue, 
                      dueDate: dashboardData.dueInDays > 0 
                        ? `Due in ${dashboardData.dueInDays} days` 
                        : "Paid"
                  }
              });
              setHasBoarding(true);
          } else {
              setHasBoarding(false);
              setCurrentBoarding(null);
          }
      } catch (e) {
          console.error("Failed to fetch boarding data:", e);
          setHasBoarding(false);
      } finally {
          setLoading(false);
      }
  };

  const payRent = () => {
    alert("Payment integration coming soon!");
  };

  return {
    currentBoarding,
    hasBoarding,
    payRent,
    loading
  };
};

export default useBoardingsLogic;