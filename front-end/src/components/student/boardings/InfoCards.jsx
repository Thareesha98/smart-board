import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUserTie, FaShieldAlt, FaCheckCircle,
  FaEnvelope, FaPhone, FaStar, FaUserFriends, FaChevronRight
} from 'react-icons/fa';

const InfoCards = ({ boarding, onContactOwner }) => {
  const navigate = useNavigate();

  const handleViewProfile = (userId) => {
    if (userId) {
        navigate(`/profile/view/${userId}`);
    } else {
        console.warn("Cannot navigate: User ID is missing.");
    }
  };

  // --- MOCK MEMBERS DATA (Remove this if your backend provides boarding.members) ---
  const membersList = boarding.members || [
    { id: 101, name: "Kasun Perera", joinedDate: "Jan 2024", avatar: "https://ui-avatars.com/api/?name=Kasun+Perera&background=random" },
    { id: 102, name: "Amal Silva", joinedDate: "Feb 2024", avatar: "https://ui-avatars.com/api/?name=Amal+Silva&background=random" },
    { id: 103, name: "Nimali Fernando", joinedDate: "Mar 2024", avatar: "https://ui-avatars.com/api/?name=Nimali+Fernando&background=random" },
  ];
  // --------------------------------------------------------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-1 gap-6"
    >
      {/* 1. Boarding Details Card */}
      <InfoCard
        icon={FaHome}
        title="Details"
        content={
          <div className="space-y-3">
            <DetailItem label="Room Type" value={boarding.details?.roomType || 'N/A'} />
            <DetailItem label="Bathroom" value={boarding.details?.bathroom || 'N/A'} />
            <DetailItem label="Kitchen" value={boarding.details?.kitchen || 'N/A'} />
            <DetailItem label="Lease" value={boarding.details?.leasePeriod || 'N/A'} />
          </div>
        }
      />

      {/* 2. Owner Information Card */}
      <InfoCard
        icon={FaUserTie}
        title="Landlord"
        content={
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-4 mb-4">
              
              {/* --- CLICKABLE AVATAR --- */}
              <img
                onClick={() => handleViewProfile(boarding.owner?.id)}
                src={boarding.owner?.avatar || "https://via.placeholder.com/50"}
                alt={boarding.owner?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-accent p-0.5 flex-shrink-0 cursor-pointer hover:border-primary transition-colors duration-300"
              />
              
              <div className="flex-1 min-w-0">
                {/* --- CLICKABLE NAME --- */}
                <div 
                    onClick={() => handleViewProfile(boarding.owner?.id)}
                    className="font-bold text-text-dark truncate cursor-pointer hover:text-accent hover:underline decoration-2 underline-offset-2 transition-all"
                    title={boarding.owner?.name}
                >
                  {boarding.owner?.name}
                </div>
                
                <div className="text-sm text-text-muted truncate">Verified Owner</div>
                <div className="flex items-center gap-1 text-xs text-yellow-500 font-medium mt-0.5">
                   <FaStar /> {boarding.owner?.rating || 'N/A'}
                   <span className="text-text-muted">({boarding.owner?.reviews || 0})</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactOwner}
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-xs bg-accent text-white hover:bg-primary transition-all whitespace-nowrap"
              >
                <FaEnvelope size={12} />
                Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactOwner}
                className="flex-1 min-w-[80px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-xs border border-gray-300 text-text-dark hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <FaPhone size={12} />
                Call
              </motion.button>
            </div>
          </div>
        }
      />

      {/* 3. Safety & Support Card */}
      <InfoCard
        icon={FaShieldAlt}
        title="Support"
        content={
          <div className="space-y-3">
            <SupportItem label="24/7 Support" />
            <SupportItem label="Verified Property" />
            <SupportItem label="Secure Payments" />
            <SupportItem label="Maintenance" />
          </div>
        }
      />

      {/* ✅ 4. NEW: Current Members (Tenants) Card */}
      <InfoCard
        icon={FaUserFriends}
        title="Current Tenants"
        content={
          <div className="flex flex-col h-full">
            {membersList.length > 0 ? (
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                    {membersList.map((member) => (
                        <div 
                            key={member.id} 
                            onClick={() => handleViewProfile(member.id)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light cursor-pointer transition-colors group"
                        >
                            <img 
                                src={member.avatar} 
                                alt={member.name} 
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-text-dark truncate group-hover:text-accent transition-colors">
                                    {member.name}
                                </p>
                                <p className="text-xs text-text-muted">
                                    Joined: {member.joinedDate}
                                </p>
                            </div>
                            <FaChevronRight className="text-gray-300 text-xs group-hover:text-accent transition-colors" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4 text-text-muted text-sm">
                    No other tenants yet.
                </div>
            )}
            
            {/* Optional: View All button if list is long */}
            {membersList.length > 3 && (
                <div className="mt-3 pt-2 border-t border-gray-100 text-center">
                    <button className="text-xs font-bold text-accent hover:text-primary transition-colors">
                        View All Members
                    </button>
                </div>
            )}
          </div>
        }
      />

    </motion.div>
  );
};

// Sub-components remain the same
const InfoCard = ({ icon: Icon, title, content }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white rounded-2xl p-5 shadow-custom transition-shadow duration-300 hover:shadow-lg border border-gray-100 h-full flex flex-col"
  >
    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-50">
      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-accent flex-shrink-0">
         <Icon className="text-sm" />
      </div>
      <h4 className="text-lg font-bold text-text-dark truncate">{title}</h4>
    </div>
    <div className="flex-1">
        {content}
    </div>
  </motion.div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-sm gap-2">
    <span className="text-text-muted whitespace-nowrap">{label}</span>
    <span className="text-text-dark font-semibold text-right truncate">{value}</span>
  </div>
);

const SupportItem = ({ label }) => (
  <div className="flex items-center gap-2 text-text-muted text-sm">
    <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
    <span className="truncate">{label}</span>
  </div>
);

export default InfoCards;