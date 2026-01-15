import React from "react";
import { motion } from "framer-motion";
import StudentLayout from "../../components/student/common/StudentLayout";
import StatWidget from "../../components/student/dashbord/StatWidget";
import QuickActionsSection from "../../components/student/dashbord/QuickActionsSection";
import RecentActivitySection from "../../components/student/dashbord/RecentActivitySection";
import {
  FaCalendarCheck,
  FaStar,
  FaHome,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import useDashboardLogic from "../../hooks/student/useDashboardLogic"; // ✅ Import Logic Hook

const StudentDashboard = () => {
  const { stats, recentActivity, loading, currentUser } = useDashboardLogic();

  const handlePayNow = () => {
    window.location.href = "/student/billing";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <StudentLayout subtitle="Here's your boarding overview">
      {/* Stats Overview */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-4 md:gap-6 items-stretch">
          {/* 1. Upcoming Visit Widget Update */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
            className="h-full"
          >
            <StatWidget
              icon={<FaCalendarCheck />}
              // ✅ Change Title dynamically
              title={
                stats.upcomingVisit?.isPast ? "Last Visit" : "Upcoming Visit"
              }
              mainDetail={
                stats.upcomingVisit
                  ? new Date(
                      stats.upcomingVisit.normalizedDate
                    ).toLocaleDateString()
                  : "No visits found"
              }
              subDetail={
                stats.upcomingVisit
                  ? stats.upcomingVisit.displayName
                  : "Book your first visit"
              }
            />
          </motion.div>

          {/* 2. Monthly Rent (Pending Payments) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
            className="h-full"
          >
            <StatWidget
              icon={<FaFileInvoiceDollar />}
              title="Monthly Rent"
              mainDetail={
                stats.pendingPayment
                  ? `LKR ${stats.pendingPayment.amount}`
                  : "No Active Rent"
              }
              subDetail={
                stats.pendingPayment
                  ? `Due: ${stats.pendingPayment.dueDate}`
                  : "All clear"
              }
              actionButton={
                stats.pendingPayment
                  ? { label: "Pay Now", onClick: handlePayNow }
                  : null
              }
            />
          </motion.div>

          {/* 3. Current Boarding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
            className="h-full"
          >
            <StatWidget
              icon={<FaHome />}
              title="Current Boarding"
              mainDetail={
                stats.currentBoarding
                  ? stats.currentBoarding.boardingTitle
                  : "Not Registered"
              }
              subDetail={
                stats.currentBoarding
                  ? `Since ${new Date(
                      stats.currentBoarding.startDate
                    ).toLocaleDateString()}`
                  : "Find a place"
              }
            />
          </motion.div>

          {/* 4. My Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
            className="h-full"
          >
            <StatWidget
              icon={<FaStar />}
              title="My Reviews"
              mainDetail={`${stats.reviewCount} Reviews`}
              subDetail={
                stats.reviewCount > 0
                  ? `${stats.reviewAvg}⭐ Average`
                  : "Start reviewing!"
              }
            />
          </motion.div>
        </div>
      </section>

      <QuickActionsSection />

      {/* Pass the real activity data to the section */}
      <RecentActivitySection activities={recentActivity} />
    </StudentLayout>
  );
};

export default StudentDashboard;
