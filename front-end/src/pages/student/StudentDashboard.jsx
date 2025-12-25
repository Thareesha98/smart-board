import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import StatWidget from '../../components/student/dashbord/StatWidget';
import QuickActionsSection from '../../components/student/dashbord/QuickActionsSection';
import RecentActivitySection from '../../components/student/dashbord/RecentActivitySection';
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
    <StudentLayout subtitle="Here's your boarding overview">

      {/* Stats Overview */}
      <section className="mb-8">
        {/* GRID LOGIC:
            - Mobile (<768px): 1 Column
            - Tablet (<1400px): 2 Columns
            - Desktop (>=1400px): 4 Columns
            - items-stretch ensures all cards in a row match the height of the tallest card (if text wraps)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-4 md:gap-6 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0.8 : 1, y: 0 }}
            className="h-full"
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
            className="h-full"
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
            className="h-full"
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
            className="h-full"
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