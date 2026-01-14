import { useState, useEffect, useCallback } from 'react';
import StudentService from '../../api/student/StudentService';
import { useAuth } from '../../context/student/StudentAuthContext';
import { FaCalendarCheck, FaCreditCard, FaTools, FaStar, FaHome, FaCheckCircle } from 'react-icons/fa';

const useDashboardLogic = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    upcomingVisit: null,
    pendingPayment: null,
    currentBoarding: null,
    reviewCount: 0,
    reviewAvg: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // Helper for "Time Ago"
  const getTimeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "Just now";
  };

  const fetchDashboardData = useCallback(async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      // 1. Fetch All Data in Parallel
      const [appointments, registrations, payments, reviews] = await Promise.all([
        StudentService.getAllAppointments(currentUser.id).catch(() => []),
        StudentService.getAllRegistrations(currentUser.id).catch(() => []),
        StudentService.getPaymentHistory().catch(() => []),
        StudentService.getMyReviews(currentUser.id).catch(() => [])
      ]);

      // 🔍 DEBUG: Check what the backend is actually sending
      console.log("🔍 Appointments Raw:", appointments);

      // --- WIDGET 1: Upcoming Visit (Smart Logic) ---
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const processedAppointments = appointments.map(appt => {
        // 1. Try to find the date field
        const rawDate = appt.date || appt.appointmentDate || appt.visitDate || appt.createdDate;
        
        // 2. Try to find the status field
        const rawStatus = appt.status || appt.appointmentStatus || 'PENDING'; // Default to PENDING if missing

        return {
          ...appt,
          normalizedDate: new Date(rawDate),
          normalizedStatus: rawStatus.toUpperCase(),
          // Ensure we have a name to display
          displayName: appt.boardingTitle || appt.boardingName || appt.boardingAddress || "Boarding Visit"
        };
      });

      // A. Try to find a FUTURE appointment
      let nextVisit = processedAppointments
        .filter(a => {
           // Valid Date check
           if (isNaN(a.normalizedDate)) return false; 
           // Future check
           const isFuture = a.normalizedDate >= today;
           // Status check (Allow Approved, Pending, or New)
           const isValidStatus = ['APPROVED', 'PENDING', 'NEW', 'REQUESTED'].includes(a.normalizedStatus);
           return isFuture && isValidStatus;
        })
        .sort((a, b) => a.normalizedDate - b.normalizedDate)[0];

      // B. Fallback: If no future visit, get the MOST RECENT past visit (so the widget isn't empty)
      if (!nextVisit) {
        const lastVisit = processedAppointments
            .filter(a => !isNaN(a.normalizedDate))
            .sort((a, b) => b.normalizedDate - a.normalizedDate)[0]; // Sort descending (newest first)
            
        if (lastVisit) {
            nextVisit = { ...lastVisit, isPast: true }; // Mark as past
        }
      }
      
      // --- WIDGET 2: Current Boarding ---
      const activeReg = registrations.find(r => r.status === 'APPROVED');
      
      // --- WIDGET 3: Monthly Rent / Payments ---
      let paymentInfo = null;
      if (activeReg) {
          // If we have an active boarding, show rent details
          paymentInfo = {
             amount: activeReg.monthlyRent || 0,
             location: activeReg.boardingTitle || "Your Boarding",
             dueDate: "5th of Month" // Static for now, or fetch from billing API
          };
      }

      // --- WIDGET 4: Reviews ---
      const reviewAvg = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

      setStats({
        upcomingVisit: nextVisit,
        pendingPayment: paymentInfo,
        currentBoarding: activeReg,
        reviewCount: reviews.length,
        reviewAvg: reviewAvg
      });

      // --- RECENT ACTIVITY FEED ---
      const activityList = [];

      // Add Appointments to Feed
      appointments.forEach(a => activityList.push({
        id: `apt-${a.id}`,
        type: 'appointment',
        rawDate: a.createdDate || a.date,
        content: `Appointment ${a.status.toLowerCase()} for ${a.boardingName}`,
        icon: FaCalendarCheck
      }));

      // Add Payments to Feed
      payments.forEach(p => activityList.push({
        id: `pay-${p.id}`,
        type: 'payment',
        rawDate: p.paymentDate,
        content: `Paid LKR ${p.amount} for rent`,
        icon: FaCreditCard
      }));

      // Add Reviews to Feed
      reviews.forEach(r => activityList.push({
        id: `rev-${r.id}`,
        type: 'review',
        rawDate: r.createdAt || new Date(), 
        content: `Rated ${r.boardingName || 'Boarding'} ${r.rating} stars`,
        icon: FaStar
      }));

      // Add Registrations to Feed
      registrations.forEach(r => activityList.push({
        id: `reg-${r.id}`,
        type: 'registration',
        rawDate: r.startDate,
        content: `Registration ${r.status.toLowerCase()} for ${r.boardingTitle}`,
        icon: FaHome
      }));

      // Sort, Slice, and Format
      const sortedActivity = activityList
        .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))
        .slice(0, 5) // Show top 5
        .map(item => ({
            ...item,
            timeAgo: getTimeAgo(item.rawDate)
        }));

      setRecentActivity(sortedActivity);

    } catch (error) {
      console.error("Dashboard Load Error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  return { stats, recentActivity, loading, currentUser };
};

export default useDashboardLogic;