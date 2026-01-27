import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaCheckCircle, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ userData, onChangeAvatar }) => {

  const navigate = useNavigate();

  const handleNameClick = () => {
    if (userData?.id) {
        // ✅ Matches the route used in your InfoCards.jsx
        navigate(`/profile/view/${userData.id}`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card-bg rounded-large shadow-custom p-8"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Avatar and Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full lg:w-auto">
          <div className="relative flex-shrink-0">
            <img
              src={userData.avatar}
              alt={`${userData.firstName} ${userData.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-accent"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onChangeAvatar}
              className="absolute bottom-1 right-1 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 shadow-lg"
            >
              <FaCamera />
            </motion.button>
          </div>

          <div className="text-center sm:text-left">
            <div 
                onClick={handleNameClick}
                className="group flex items-center justify-center sm:justify-start gap-3 cursor-pointer mb-2"
                title="View Public Profile"
            >
                <h2 className="text-3xl font-bold text-text-dark group-hover:text-accent transition-colors duration-200">
                  {userData.firstName} {userData.lastName}
                </h2>
                <FaExternalLinkAlt className="text-sm text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:text-accent" />
            </div>
            <p className="text-lg text-text-muted mb-1">{userData.email}</p>
            <p className="text-accent font-semibold mb-3">Student Member</p>
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                <FaCheckCircle />
                Email Verified
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-semibold">
                <FaStar />
                Member since 2023
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          {[
            { label: 'Visits Booked', value: '12' },
            { label: 'Reviews Posted', value: '5' },
            { label: 'Active Reports', value: '3' },
            { label: 'Response Rate', value: '98%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-background-light rounded-large"
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </motion.section>
  );
};

export default ProfileHeader;