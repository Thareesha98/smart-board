// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">

//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
//         <p className="text-gray-500 mb-8">Please select your login type to continue</p>

//         <div className="space-y-4">
//           {/* Student Button */}
//           <button
//             onClick={() => navigate('/student/login')}
//             className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
//           >
//             <span>👨‍🎓</span> Login as Student
//           </button>

//           {/* Owner Button */}
//           <button
//             onClick={() => navigate('/owner/login')}
//             className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
//           >
//             <span>💼</span> Login as Owner
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBriefcase, FaTools } from "react-icons/fa"; // Added Icons

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    // Navigate to the unified login page, passing the role to pre-select the tab
    navigate("/login", { state: { defaultRole: role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        <h1 className="text-4xl font-black text-gray-800 mb-3 tracking-tight">
          SmartBoAD
        </h1>
        <p className="text-gray-500 mb-10">Select your portal to continue</p>

        <div className="space-y-4">
          {/* Student Button */}
          <button
            onClick={() => handleNavigation("student")}
            className="w-full py-4 px-6 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
          >
            <FaUserGraduate className="text-xl group-hover:scale-110 transition-transform" />
            <span>Continue as Student</span>
          </button>

          {/* Owner Button */}
          <button
            onClick={() => handleNavigation("owner")}
            className="w-full py-4 px-6 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
          >
            <FaBriefcase className="text-xl group-hover:scale-110 transition-transform" />
            <span>Continue as Owner</span>
          </button>

          {/* ✅ NEW: Technician Button */}
          <button
            onClick={() => handleNavigation("technician")}
            className="w-full py-4 px-6 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
          >
            <FaTools className="text-xl group-hover:scale-110 transition-transform" />
            <span>Continue as Technician</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
