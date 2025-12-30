import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-500 mb-8">Please select your login type to continue</p>

        <div className="space-y-4">
          {/* Student Button */}
          <button
            onClick={() => navigate('/student/login')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <span>👨‍🎓</span> Login as Student
          </button>

          {/* Owner Button */}
          <button
            onClick={() => navigate('/owner/login')}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <span>💼</span> Login as Owner
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;