import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { motion } from 'framer-motion';
import { 
  FaUser, FaUniversity, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaHistory, FaExclamationTriangle, FaCheckCircle, FaBuilding, FaArrowLeft,
  FaVenusMars
} from 'react-icons/fa';

const PublicProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // API Call to your new backend endpoint
        const response = await axios.get(`http://localhost:8086/api/users/public/${id}`);
        setProfile(response.data);
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
       <h2 className="text-xl font-bold">{error || "User not found"}</h2>
       <button onClick={() => navigate(-1)} className="mt-4 text-accent hover:underline">Go Back</button>
    </div>
  );

  const isOwner = profile.role === 'OWNER';

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
        
        {/* --- LEFT COLUMN: Profile Card --- */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card-bg rounded-report shadow-custom p-8 text-center border border-light relative overflow-hidden"
          >
            {/* Suspended Banner */}
            {profile.isSuspended && (
               <div className="absolute top-0 left-0 w-full bg-error text-white text-[10px] font-black uppercase tracking-widest py-1">
                  Account Suspended
               </div>
            )}

            <div className="relative inline-block mt-4">
              <img 
                src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.fullName}`} 
                alt={profile.fullName} 
                className={`w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 ${profile.isSuspended ? 'border-error' : 'border-accent'} shadow-lg`}
              />
              {isOwner && profile.verifiedOwner && (
                <div className="absolute bottom-2 right-0 bg-success text-white p-2 rounded-full border-4 border-card-bg shadow-sm" title="Verified Owner">
                  <FaCheckCircle size={14} />
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-black text-primary mb-1 uppercase tracking-tight">{profile.fullName}</h1>
            
            {/* Role Badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6
              ${isOwner ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {profile.role}
            </div>

            <div className="space-y-4 text-left pt-6 border-t border-light">
               <InfoRow icon={FaEnvelope} label="Email" value={profile.email} />
               <InfoRow icon={FaPhone} label="Phone" value={profile.phone} />
               <InfoRow icon={FaHistory} label="Member Since" value={profile.joinedDate} />
               <InfoRow icon={FaVenusMars} label="Gender" value={profile.gender} />
               
               {isOwner ? (
                 <>
                   <InfoRow icon={FaBuilding} label="Business Name" value={profile.businessName} />
                   <InfoRow icon={FaMapMarkerAlt} label="Address" value={profile.address} />
                 </>
               ) : (
                 <InfoRow icon={FaUniversity} label="University" value={profile.university || "Not Provided"} />
               )}
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: Stats & History --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Grid */}
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
               label="Account Status" 
               value={profile.isSuspended ? "Suspended" : "Active"} 
               color={profile.isSuspended ? "text-error" : "text-success"}
               subtext="Current standing"
               icon={FaCheckCircle}
             />
          </motion.div>

          {/* Incident Timeline */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-card-bg rounded-report shadow-custom p-6 md:p-8 border border-light min-h-[400px]"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-light pb-4">
               <div className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary">
                  <FaHistory size={18} />
               </div>
               <div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">Public Record</h3>
                  <p className="text-xs text-muted font-medium">Complaints and actions filed against this user</p>
               </div>
            </div>

            {profile.incidentHistory && profile.incidentHistory.length > 0 ? (
              <div className="space-y-0 relative pl-4 border-l-2 border-light ml-3">
                {profile.incidentHistory.map((report, index) => (
                  <div key={report.id || index} className="mb-8 relative pl-6 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full border-4 border-card-bg bg-accent group-hover:scale-125 transition-transform"></div>

                    {/* Card */}
                    <div className="bg-light/30 p-5 rounded-xl border border-light hover:border-accent/30 hover:bg-light/50 transition-all duration-300">
                       <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 rounded text-[10px] font-black uppercase bg-white border border-light text-text shadow-sm">
                              {report.status}
                          </span>
                          <span className="text-xs font-mono text-muted font-bold">{report.date}</span>
                       </div>
                       
                       <p className="text-sm text-text mb-3 leading-relaxed">{report.description}</p>
                       
                       {report.actionTaken && (
                           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error/10 text-error border border-error/20">
                             <FaExclamationTriangle size={10} />
                             <span className="text-[10px] font-black uppercase tracking-wider">Action: {report.actionTaken}</span>
                           </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4 text-success">
                     <FaCheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-text">No Incidents Found</h4>
                  <p className="text-sm text-muted">This user has a clean history on the platform.</p>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-3 border-b border-light last:border-0">
    <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center text-accent shrink-0">
      <Icon size={14} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-muted uppercase font-black tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-bold text-text truncate" title={value}>{value || "N/A"}</p>
    </div>
  </div>
);

const StatCard = ({ label, value, color, subtext, icon: Icon }) => (
  <div className="bg-card-bg p-6 rounded-report shadow-custom border border-light flex items-center justify-between">
    <div>
      <h4 className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">{label}</h4>
      <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
      <p className="text-[10px] text-muted font-medium bg-light px-2 py-0.5 rounded-full inline-block">{subtext}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-20 ${color.includes('error') ? 'bg-error' : 'bg-success'}`}>
      <Icon size={24} className={color} />
    </div>
  </div>
);

export default PublicProfileView;