import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children, onNavigate, activePage, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-background-light font-sans text-text-dark">
      <Sidebar onNavigate={onNavigate} activePage={activePage} />
      
      <main className="flex-grow p-4 lg:p-8 lg:ml-[330px] pt-4">
        {/* Pass the title and subtitle props to the Header component */}
        <Header title={title} subtitle={subtitle} />
        <div className="mt-4">
           {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;