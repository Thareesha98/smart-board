import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useTechAuth } from '../../../context/technician/TechnicianAuthContext';

const TechnicianHeader = ({ title, subtitle }) => {
  const { currentTech } = useTechAuth();
  
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-large shadow-custom static md:sticky top-0 md:top-6 z-10">
      <div>
        <h1 className="text-primary text-2xl md:text-3xl font-bold mb-1">{title}</h1>
        <p className="text-text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer p-3 rounded-full bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all">
          <FaBell className="text-xl" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-alert text-white rounded-full w-5 h-5 text-xs flex items-center justify-center border-2 border-white">2</span>
        </div>
        <div className="flex items-center gap-3">
           <img src={currentTech?.profileImageUrl ? `http://localhost:8086/uploads/${currentTech.profileImageUrl}` : 'https://via.placeholder.com/150'} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-accent" />
        </div>
      </div>
    </header>
  );
};

export default TechnicianHeader;