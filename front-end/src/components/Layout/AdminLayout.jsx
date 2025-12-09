// src/components/Layout/AdminLayout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background-light font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-0'
        }`}
      >
        
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-4 md:p-6 flex-1">
          <div className="w-full mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;