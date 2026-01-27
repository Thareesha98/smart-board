import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../api/common/userService';
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaBuilding, 
  FaArrowLeft 
} from 'react-icons/fa';

import ProfileSidebar from '../../components/public-profile/ProfileSidebar';
import StatCard from '../../components/public-profile/StatCard';
import PublicBoardingCard from '../../components/public-profile/PublicBoardingCard';
import IncidentHistory from '../../components/public-profile/IncidentHistory';

import bgImage from '../../assets/s5.jpg'; 

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
       <div className="text-5xl mb-4">😕</div>
       <h2 className="text-xl font-bold text-gray-600">{error}</h2>
       <button onClick={() => navigate(-1)} className="mt-4 text-accent font-semibold hover:underline">Go Back</button>
    </div>
  );

  const isOwner = profile.role === 'OWNER';
  const hasListings = isOwner && profile.activeListings && profile.activeListings.length > 0;

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-gray-800">
      
      {/* --- 1. FIXED FULL BACKGROUND IMAGE --- */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* --- 2. BACKGROUND OPACITY OVERLAY --- */}
      {/* Changed to bg-white/20 (20% opacity). 
          This makes the background image extremely clear. 
      */}
      <div className="fixed inset-0 w-full h-full bg-white/20 backdrop-blur-[0.5px] z-0" />
      
      {/* --- 3. SCROLLABLE CONTENT AREA --- */}
      <div className="relative z-10 w-full flex-1 overflow-y-auto">
        
        {/* Navbar / Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition-all font-bold text-sm"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-4 xl:col-span-3">
               <div className="sticky top-6">
                 {/* Sidebar Container */}
                 <div className="shadow-xl rounded-2xl overflow-hidden bg-white">
                    <ProfileSidebar profile={profile} />
                 </div>
               </div>
            </div>

            {/* RIGHT CONTENT - HIGHLIGHTED DETAILS */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <StatCard 
                   label="Report History" 
                   value={profile.totalReportsAgainst} 
                   color={profile.totalReportsAgainst > 0 ? "text-red-600" : "text-green-600"}
                   subtext={profile.totalReportsAgainst === 0 ? "Clean Record" : "Incidents Reported"}
                   icon={FaExclamationTriangle}
                   // Highlighted Style
                   className="bg-white shadow-xl rounded-2xl border-transparent"
                 />
                 <StatCard 
                   label={isOwner ? "Active Listings" : "Account Status"}
                   value={isOwner ? (profile.activeListings?.length || 0) : (profile.isSuspended ? "Suspended" : "Active")}
                   color="text-accent"
                   subtext={isOwner ? "Properties on Market" : "Current Standing"}
                   icon={isOwner ? FaBuilding : FaCheckCircle}
                   // Highlighted Style
                   className="bg-white shadow-xl rounded-2xl border-transparent"
                 />
              </div>

              {/* Active Listings */}
              {hasListings && (
                // Highlighted Style
                <div className="bg-white rounded-2xl shadow-xl border-transparent p-6">
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <FaBuilding className="text-accent" /> 
                          Properties by {profile.fullName?.split(' ')[0]}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.activeListings.map(boarding => (
                            <PublicBoardingCard key={boarding.id} boarding={boarding} />
                        ))}
                    </div>
                </div>
              )}

              {/* Incident History */}
              {/* Highlighted Style */}
              <div className="bg-white rounded-2xl shadow-xl border-transparent p-6">
                 <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Incident History</h3>
                 </div>
                 <IncidentHistory history={profile.incidentHistory} />
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;