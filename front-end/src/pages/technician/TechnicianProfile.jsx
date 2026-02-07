import React, { useState, useEffect, useRef } from "react";
import TechnicianLayout from "../../components/technician/common/TechnicianLayout"; // Check casing!
import { useTechAuth } from "../../context/technician/TechnicianAuthContext";
import { getTechnicianProfile, getTechnicianReviews, updateTechnicianProfile } from "../../api/technician/technicianService";
import { FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaMoneyBillWave, FaCamera } from "react-icons/fa";
import EditProfileModal from "../../components/technician/profile/EditProfileModal"; // Check casing!
import toast from "react-hot-toast";

const TechnicianProfile = () => {
  //  Destructure isLoading
  const { currentTech, isLoading: authLoading } = useTechAuth(); 
  
  const [technician, setTechnician] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fileInputRef = useRef(null);

  const getDisplayValue = (keyA, keyB, fallback) => {
    if (technician[keyA] !== undefined && technician[keyA] !== null) return technician[keyA];
    if (technician[keyB] !== undefined && technician[keyB] !== null) return technician[keyB];
    return fallback;
  };

  const loadAllData = async () => {
    try {
      setIsDataLoading(true);
      
      // 1. Fetch Profile and Reviews in parallel
      const [profileData, reviewsData] = await Promise.all([
        getTechnicianProfile(),
        getTechnicianReviews() // Fetch real reviews
      ]);

      console.log("Profile Data:", profileData);
      console.log("Reviews Data:", reviewsData);

      if (profileData) {
        setTechnician(profileData);
      }
      if (reviewsData) {
        setReviews(reviewsData);
      }

    } catch (error) {
      console.error("Data Fetch Error:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

 useEffect(() => {
    if (!authLoading) {
      // Load context data first for instant render
      if (currentTech) setTechnician(currentTech);
      // Then fetch fresh data
      loadAllData();
    }
  }, [authLoading, currentTech]);

  // 2. Handle Photo Upload (Convert to Base64 & Send)
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Processing image...");

    // Convert file to Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        // Send via the NORMAL update profile function
        await updateTechnicianProfile({
           ...technician, 
           profileImageBase64: base64String // This matches the new DTO field
        });

        toast.success("Profile photo updated!", { id: toastId });
        loadAllData(); // Refresh to see the change
      } catch (error) {
        console.error(error);
        toast.error("Failed to update photo", { id: toastId });
      }
    };
  };


  // Variables with Fallback Logic
  const displayName = technician.fullName || "Technician";
  const displayRating = getDisplayValue("averageRating", "technicianAverageRating", "0.0");
  const displayJobs = getDisplayValue("totalJobsCompleted", "technicianTotalJobs", 0);
  const displayBasePrice = technician.basePrice || "0.00";

  const profileImageSrc = technician?.profileImageUrl
    ? `http://localhost:8086/uploads/${technician.profileImageUrl}`
    : `https://ui-avatars.com/api/?name=${displayName.replace(" ", "+")}&background=random`;

  if (authLoading || isDataLoading) return <div className="p-10 text-center">Loading Profile...</div>;

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

            {/*  IMAGE + CAMERA BUTTON */}
            <div className="relative inline-block mx-auto mt-2 mb-4">
               <img
                src={profileImageSrc}
                alt="Profile"
                onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=random`}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white relative z-10"
              />
              
              {/* Camera Icon */}
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 z-20 bg-accent text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-all transform hover:scale-110 cursor-pointer"
                title="Change Photo"
              >
                <FaCamera size={14} />
              </button>
              
              {/* Hidden Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              {displayName}
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
                  {displayRating} <FaStar size={12} />
                </span>
                <span className="text-xs text-gray-500 uppercase font-bold">Rating</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                <span className="block font-black text-xl text-blue-600">
                  {displayJobs}
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

        {/* Right Column: Reviews */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold mb-4 flex items-center gap-2"><FaStar className="text-yellow-400"/> Reviews from Owners</h3>
             
             {reviews.length > 0 ? (
               <div className="space-y-4">
                 {reviews.map((r) => (
                   <div key={r.id} className="border-b pb-2 mb-2 last:border-0 last:pb-0">
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-700">{r.ownerName}</span>
                        <span className="text-xs text-gray-400">{r.date}</span>
                     </div>
                     <div className="flex items-center gap-1 text-yellow-400 text-xs mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < r.rating ? "text-yellow-400" : "text-gray-200"} />
                        ))}
                     </div>
                     <p className="text-sm italic text-gray-600">"{r.comment}"</p>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-gray-400 italic text-center py-4">No reviews yet.</p>
             )}
           </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          user={technician}
          onClose={() => setShowEdit(false)}
          onUpdate={loadAllData} //  Fetch FRESH data after edit
        />
      )}
    </TechnicianLayout>
  );
};

export default TechnicianProfile;

