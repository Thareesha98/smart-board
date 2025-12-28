import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../api/common/userService'
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, FaCheckCircle, FaBuilding, FaArrowLeft 
} from 'react-icons/fa';

// Import Custom Components
import ProfileSidebar from '../../components/public-profile/ProfileSidebar';
import StatCard from '../../components/public-profile/StatCard';
import PublicBoardingCard from '../../components/public-profile/PublicBoardingCard';
import IncidentHistory from '../../components/public-profile/IncidentHistory';

const PublicProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getPublicProfile(id);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("User not found or connection failed.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light text-text-muted">
       <div className="text-6xl mb-4">😕</div>
       <h2 className="text-xl font-bold">{error}</h2>
       <button onClick={() => navigate(-1)} className="mt-4 text-accent hover:underline">Go Back</button>
    </div>
  );

  const isOwner = profile.role === 'OWNER';
  const hasListings = isOwner && profile.activeListings && profile.activeListings.length > 0;

  return (
    <div className="min-h-screen bg-light p-4 md:p-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-muted hover:text-accent transition-colors font-bold text-sm uppercase tracking-wider"
      >
        <FaArrowLeft /> Back to Previous
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN --- */}
        <ProfileSidebar profile={profile} />

        {/* --- RIGHT COLUMN --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Stats Grid */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
             <StatCard 
               label="Report History" 
               value={profile.totalReportsAgainst} 
               color={profile.totalReportsAgainst > 0 ? "text-error" : "text-success"}
               subtext={profile.totalReportsAgainst === 0 ? "Clean Record" : "Incidents reported"}
               icon={FaExclamationTriangle}
             />
             <StatCard 
               label={isOwner ? "Active Listings" : "Account Status"}
               value={isOwner ? (profile.activeListings?.length || 0) : (profile.isSuspended ? "Suspended" : "Active")}
               color="text-accent"
               subtext={isOwner ? "Properties on market" : "Current standing"}
               icon={isOwner ? FaBuilding : FaCheckCircle}
             />
          </motion.div>

          {/* 2. ACTIVE LISTINGS (Only for Owners) */}
          {hasListings && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-lg font-black text-primary uppercase tracking-tight mb-4 flex items-center gap-2">
                    <FaBuilding /> Properties by {profile.fullName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.activeListings.map(boarding => (
                        <PublicBoardingCard key={boarding.id} boarding={boarding} />
                    ))}
                </div>
            </motion.div>
          )}

          {/* 3. Incident Timeline */}
          <IncidentHistory history={profile.incidentHistory} />
          
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;