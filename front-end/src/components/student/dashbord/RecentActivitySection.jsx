import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaCreditCard, FaTools, FaStar 
} from 'react-icons/fa';

const activityFeedData = [
  { icon: FaCalendarCheck, content: <><strong>Appointment confirmed</strong> for Sunshine Hostel</>, time: "2 hours ago" },
  { icon: FaCreditCard, content: <><strong>Payment received</strong> for December rent</>, time: "1 day ago" },
  { icon: FaTools, content: <><strong>Maintenance request</strong> submitted</>, time: "2 days ago" },
  { icon: FaStar, content: <><strong>Review posted</strong> for City View Apartments</>, time: "3 days ago" },
];

const ActivityItem = ({ icon: Icon, content, time }) => (
  <div className="flex items-start gap-4 p-4 md:p-5 border-b border-background-light last:border-b-0 
     hover:bg-background-light/40 transition-all">

    <div className="bg-background-light p-3 rounded-btn text-accent text-xl flex-shrink-0">
      <Icon />
    </div>

    <div className="flex flex-col min-w-0">
      <p className="text-text-dark text-sm md:text-base font-medium">
        {content}
      </p>
      <span className="text-text-muted text-xs md:text-sm mt-1">
        {time}
      </span>
    </div>

  </div>
);

const RecentActivitySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <h2 className="text-primary text-xl md:text-2xl font-bold mb-4">
        Recent Activity
      </h2>

      <div className="bg-card-bg rounded-large shadow-custom overflow-hidden">
        {activityFeedData.map((item, index) => (
          <ActivityItem key={index} {...item} />
        ))}
      </div>
    </motion.section>
  );
};

export default RecentActivitySection;