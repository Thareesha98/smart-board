import React, { useState, useEffect } from "react";
import TechnicianLayout from "../../components/technician/common/TechnicianLayout"; // Check casing!
import { useTechAuth } from "../../context/technician/TechnicianAuthContext";
import { getTechnicianProfile } from "../../api/technician/technicianService";
import { FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaMoneyBillWave } from "react-icons/fa";
import EditProfileModal from "../../components/technician/profile/EditProfileModal"; // Check casing!

const TechnicianProfile = () => {
  //  Destructure isLoading
  const { currentTech, isLoading: authLoading } = useTechAuth(); 
  
  const [technician, setTechnician] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  // 1. SYNC: When Auth finishes loading, copy context data to local state
 useEffect(() => {
    if (!authLoading) {
      // Ensure we display Context data first
      if (currentTech) setTechnician(currentTech);

      // Background Fetch
      const fetchData = async () => {
        try {
          const data = await getTechnicianProfile();
          if (data) setTechnician(data); // Only update if successful
        } catch (error) {
          console.log("Could not fetch fresh data, showing cached data.");
        }
      };
      fetchData();
    }
  }, [authLoading, currentTech]);


  // --- MOCK REVIEWS (Static for now) ---
  const reviews = [
    { id: 1, ownerName: "Dhananjaya J.", rating: 5, comment: "Fixed quickly!", date: "2026-01-29" },
    { id: 2, ownerName: "Sarah M.", rating: 4, comment: "Good work.", date: "2026-01-15" },
  ];

  if (authLoading) return <div className="p-10 text-center">Loading Auth...</div>;

  return (
    <TechnicianLayout title="My Profile" subtitle="Manage your account">
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* PROFILE CARD */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10"></div>

            <button
              onClick={() => setShowEdit(true)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm text-gray-500 hover:text-accent z-10 transition-colors"
            >
              <FaEdit />
            </button>

            <img
              src={
                technician?.profileImageUrl
                  ? `http://localhost:8086/uploads/${technician.profileImageUrl}`
                  : `https://ui-avatars.com/api/?name=${technician?.fullName || "Tech"}&background=random`
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md mx-auto relative z-10 object-cover bg-white"
            />

            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {technician?.fullName || "Loading..."}
            </h2>
            
            {/* Skills */}
            <div className="mt-2 flex flex-wrap justify-center gap-2">
                {technician?.skills && technician.skills.length > 0 ? (
                    technician.skills.map((skill, i) => (
                        <span key={i} className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 uppercase">
                            {typeof skill === 'string' ? skill.replace("_", " ") : skill}
                        </span>
                    ))
                ) : (
                    <span className="text-sm text-gray-400 italic">No skills added</span>
                )}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              <div className="bg-orange-50 px-4 py-2 rounded-xl text-center">
                <span className=" font-black text-xl text-orange-600 flex items-center justify-center gap-1">
                  {technician?.technicianAverageRating || "0.0"} <FaStar size={14} />
                </span>
                <span className="text-xs text-gray-500 uppercase font-bold">Rating</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                <span className="block font-black text-xl text-blue-600">
                  {technician?.technicianTotalJobs || "0"}
                </span>
                <span className="text-xs text-gray-500 uppercase font-bold">Jobs</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" /> <span className="truncate">{technician?.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-gray-400" /> {technician?.phone}
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-400" /> {technician?.city}
              </li>
              <li className="flex items-center gap-3">
                <FaMoneyBillWave className="text-green-600" /> 
                <span className="font-bold">LKR {technician?.basePrice}</span> / visit
              </li>
            </ul>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-400" /> Reviews
            </h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-700">{review.ownerName}</h4>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          user={technician}
          onClose={() => setShowEdit(false)}
          onUpdate={fetchProfile} //  Fetch FRESH data after edit
        />
      )}
    </TechnicianLayout>
  );
};

export default TechnicianProfile;