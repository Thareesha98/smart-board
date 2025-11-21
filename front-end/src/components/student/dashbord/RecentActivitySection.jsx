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
    className="flex items-center gap-4 p-4 md:p-5 border-b border-background-light transition-colors duration-300 last:border-b-0 hover:bg-background-light/50"
  >
    <div className="bg-background-light p-3 rounded-btn text-accent text-xl flex-shrink-0 w-11 h-11 flex items-center justify-center">
      <Icon />
    </div>
    <div className="flex flex-col flex-1">
      <p className="text-text-dark font-medium leading-tight">{content}</p>
      <span className="text-text-muted text-sm mt-0.5">{time}</span>
    </div>
  </motion.div>
);

const RecentActivitySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="mb-8"
    >
      <h2 className="text-primary text-2xl font-bold mb-4">Recent Activity</h2>
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