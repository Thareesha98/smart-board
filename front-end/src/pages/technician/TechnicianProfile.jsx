import React from "react";
import TechnicianLayout from "../../components/technician/common/TechnicianLayout";
import { useTechAuth } from "../../context/technician/TechnicianAuthContext";
import { FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const TechnicianProfile = () => {
  const { currentTech } = useTechAuth();
  // Mock Data for display
  const reviews = [
    {
      id: 1,
      ownerName: "Dhananjaya J.",
      rating: 5,
      comment: "Fixed the tap quickly. Great job!",
      date: "2026-01-29",
    },
  ];

  return (
    <TechnicianLayout
      title="My Profile"
      subtitle="Manage your account and view performance"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10"></div>
            <img
              src={
                currentTech?.profileImageUrl
                  ? `http://localhost:8086/uploads/${currentTech.profileImageUrl}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md mx-auto relative z-10 object-cover"
            />
            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {currentTech?.fullName}
            </h2>
            <p className="text-primary font-medium">
              {currentTech?.skills?.join(" • ") || "General Technician"}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="bg-orange-50 px-4 py-2 rounded-xl text-center">
                <span className="block font-black text-xl text-orange-600 flex items-center justify-center gap-1">
                  {currentTech?.technicianAverageRating || "0.0"}{" "}
                  <FaStar size={14} />
                </span>
                <span className="text-xs text-gray-500 uppercase font-bold">
                  Rating
                </span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl text-center">
                <span className="block font-black text-xl text-blue-600">
                  {currentTech?.technicianTotalJobs || "0"}
                </span>
                <span className="text-xs text-gray-500 uppercase font-bold">
                  Jobs
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaStar className="text-yellow-400" /> Reviews from Owners
            </h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-700">
                      {review.ownerName}
                    </h4>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianProfile;
