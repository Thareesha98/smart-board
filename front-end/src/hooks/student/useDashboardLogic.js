import { useState, useEffect, useCallback } from "react";
import StudentService from "../../api/student/StudentService";
import { useAuth } from "../../context/student/StudentAuthContext";
import {
  FaCalendarCheck,
  FaBan,
  FaHourglassHalf,
} from "react-icons/fa";

const useDashboardLogic = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    upcomingVisit: null,
    pendingPayment: null,
    currentBoarding: null,
    reviewCount: 0,
    reviewAvg: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // Corrected TimeAgo Logic
  const getTimeAgo = (date) => {
    if (!date) return "";
    const now = new Date();
    const past = new Date(date);
    
    if (isNaN(past.getTime())) return "Recently";

    const diffInSeconds = Math.floor((now - past) / 1000);
    
    // Fix: If server time is slightly ahead of client time
    if (diffInSeconds < 30) return "Just now";
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return past.toLocaleDateString(); 
  };

  const fetchDashboardData = useCallback(async () => {
    if (!currentUser?.id) return;

    setLoading(true);
    try {
      const [appointments, registrations, bills, reviews] =
        await Promise.all([
          StudentService.getAllAppointments(currentUser.id).catch(() => []),
          StudentService.getRegistrations(currentUser.id).catch(() => []),
          StudentService.getStudentBills().catch(() => []),
          StudentService.getMyReviews(currentUser.id).catch(() => []),
        ]);

      // --- PROCESS APPOINTMENTS ---
      const processedAppointments = appointments.map((appt) => {
        // scheduledDate: For the "Upcoming Visit" widget (Future)
        // activityDate: For the "Recent Activity" feed (Past/When it happened)
        const scheduledDate = appt.requestedStartTime || appt.appointmentDate || appt.visitDate;
        const activityDate = appt.updatedAt || appt.createdDate || scheduledDate;
        
        const status = (appt.status || appt.appointmentStatus || "PENDING").toUpperCase();
        const isApproved = status === "APPROVED" || status === "ACCEPTED";
        const isRejected = status === "REJECTED" || status === "DECLINED";

        let content = `You requested a visit for ${appt.boardingTitle}`;
        let icon = FaHourglassHalf;

        if (isApproved) {
          content = `Visit Accepted for ${appt.boardingTitle}`;
          icon = FaCalendarCheck;
        } else if (isRejected) {
          content = `Visit Declined for ${appt.boardingTitle}`;
          icon = FaBan;
        }

        return {
          ...appt,
          scheduledDate: new Date(scheduledDate),
          activityDate: new Date(activityDate), 
          status,
          isApproved,
          isRejected,
          notificationContent: content,
          icon: icon,
          widgetDetail: `${appt.ownerName || 'Owner'} @ ${appt.boardingTitle}`,
        };
      });

      // Stats: Filter for future confirmed visits
      const nextVisit = processedAppointments
        .filter(a => a.isApproved && a.scheduledDate >= new Date().setHours(0,0,0,0))
        .sort((a, b) => a.scheduledDate - b.scheduledDate)[0];

      // --- RENT & BILLS ---
      const activeReg = registrations.find((r) => r.status === "APPROVED" || r.status === "ACCEPTED");
      const unpaidBill = bills.find(b => b.status === "UNPAID" || b.status === "PENDING");
      
      let paymentInfo = null;
      if (unpaidBill) {
        paymentInfo = { amount: unpaidBill.totalAmount, dueDate: unpaidBill.month };
      } else if (activeReg) {
        paymentInfo = { amount: activeReg.monthlyRent || 0, dueDate: "Current Month" };
      }

      const reviewAvg = reviews.length > 0
          ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
          : 0;

      setStats({
        upcomingVisit: nextVisit ? { ...nextVisit, normalizedDate: nextVisit.scheduledDate } : null,
        pendingPayment: paymentInfo,
        currentBoarding: activeReg,
        reviewCount: reviews.length,
        reviewAvg: reviewAvg,
      });

      // --- ACTIVITY FEED (Using activityDate for correct 'Time Ago') ---
      const feed = processedAppointments
        .filter(a => a.activityDate >= new Date().setDate(new Date().getDate() - 14))
        .map(a => ({
          id: `apt-${a.id}`,
          content: a.notificationContent,
          icon: a.icon,
          timeAgo: getTimeAgo(a.activityDate), // This now reflects the update time
          rawDate: a.activityDate,
          status: a.status // This enables the colors in the UI
        }))
        .sort((a, b) => b.rawDate - a.rawDate);

      setRecentActivity(feed);
      
    } catch (error) {
      console.error("Dashboard Load Error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { stats, recentActivity, loading, currentUser };
};

export default useDashboardLogic;