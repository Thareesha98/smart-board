import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const StudentLayout = ({ 
  children, 
  title, 
  subtitle, 
  headerRightContent 
}) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-light">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 lg:p-8 pt-4">
        {/* Header */}
        <Header 
          title={title} 
          subtitle={subtitle} 
          rightContent={headerRightContent}
        />
        
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;