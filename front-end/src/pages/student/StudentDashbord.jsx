import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import StatWidget from '../../components/student/StatWidget';
import QuickActionsSection from '../../components/student/dashboard/QuickActionsSection';
import RecentActivitySection from '../../components/student/dashboard/RecentActivitySection';
import { 
  FaCalendarCheck, FaStar, FaHome, FaFileInvoiceDollar 
} from 'react-icons/fa';

const StudentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePayNow = () => {
    window.location.href = '/billing';
  };

  return (
    <StudentLayout
      title="Welcome back, Priya!"
      subtitle="Here's your boarding overview"
    >
      {/* Stats Overview */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0.8 : 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <StatWidget 
              icon={<FaCalendarCheck />}
              title="Upcoming Visits" 
              mainDetail="Tomorrow 2:00 PM" 
              subDetail="Sunshine Hostel" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0.8 : 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatWidget 
              icon={<FaFileInvoiceDollar />}
              title="Pending Payments" 
              mainDetail="$350 Due Jan 5" 
              subDetail="Sunshine Hostel"
              actionButton={{ label: "Pay Now", onClick: handlePayNow }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0.8 : 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatWidget 
              icon={<FaHome />}
              title="Current Boarding" 
              mainDetail="Sunshine Hostel" 
              subDetail="Since Dec 2023" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0.8 : 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatWidget 
              icon={<FaStar />}
              title="My Reviews" 
              mainDetail="12 Reviews" 
              subDetail="4.8⭐ Average" 
            />
          </motion.div>
        </div>
      </section>

      <QuickActionsSection />
      <RecentActivitySection />
    </StudentLayout>
  );
};

export default StudentDashboard;