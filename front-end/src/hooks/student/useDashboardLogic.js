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

      // --- WIDGET 1: Upcoming Visit ---
      // Filter for 'APPROVED' or 'PENDING' appointments in the future
      const nextVisit = appointments
        .filter(a => (a.status === 'APPROVED' || a.status === 'PENDING') && new Date(a.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

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