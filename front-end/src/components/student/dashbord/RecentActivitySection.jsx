import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarCheck, FaCreditCard, FaTools, FaStar 
} from 'react-icons/fa';

const activityFeedData = [
  { 
    icon: FaCalendarCheck, 
    content: <><strong>Appointment confirmed</strong> for Sunshine Hostel</>, 
    time: "2 hours ago" 
  },
  { 
    icon: FaCreditCard, 
    content: <><strong>Payment received</strong> for December rent</>, 
    time: "1 day ago" 
  },
  { 
    icon: FaTools, 
    content: <><strong>Maintenance request</strong> submitted for plumbing issue</>, 
    time: "2 days ago" 
  },
  { 
    icon: FaStar, 
    content: <><strong>Review posted</strong> for City View Apartments</>, 
    time: "3 days ago" 
  },
];

const ActivityItem = ({ icon: Icon, content, time, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.1 + index * 0.05 }}
    whileHover={{ x: 5 }}
    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 border-b border-background-light transition-colors duration-300 last:border-b-0 hover:bg-background-light/50"
  >
    <div className="bg-background-light p-2.5 sm:p-3 rounded-btn text-accent text-lg sm:text-xl flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
      <Icon />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <p className="text-text-dark font-medium leading-tight text-sm sm:text-base">
        {content}
      </p>
      <span className="text-text-muted text-xs sm:text-sm mt-0.5">
        {time}
      </span>
    </div>
  </motion.div>
);

const RecentActivitySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="mb-6 sm:mb-8"
    >
      <h2 className="text-primary text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Recent Activity
      </h2>
      <div className="bg-card-bg rounded-large shadow-custom overflow-hidden">
        {activityFeedData.map((item, index) => (
          <ActivityItem 
            key={index} 
            icon={item.icon} 
            content={item.content} 
            time={item.time}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default RecentActivitySection;