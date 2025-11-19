import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../components/student/common/StudentLayout';
import StatWidget from '../../components/student/dashbord/StatWidget';
import { FaSearch, FaCalendarAlt, FaCreditCard, FaTools, FaFlag, FaUserCog, FaCalendarCheck, FaStar, FaHome, FaFileInvoiceDollar } from 'react-icons/fa';

const handlePayNow = () => {
  console.log('Redirecting to Billing & Payments...');
};

const actionButtons = [
  { path: "/search-boardings", icon: FaSearch, label: "Search Boardings" },
  { path: "/appointmentpage", icon: FaCalendarAlt, label: "View Appointments" },
  { path: "/billing", icon: FaCreditCard, label: "Pay Bills" },
];

const manageButtons = [
  { path: "/maintenance", icon: FaTools, label: "Maintenance Requests" },
  { path: "/reports", icon: FaFlag, label: "Report Issues" },
  { path: "/profile", icon: FaUserCog, label: "Profile Settings" },
];

const activityFeedData = [
  { icon: FaCalendarCheck, content: <><strong>Appointment confirmed</strong> for Sunshine Hostel</>, time: "2 hours ago" },
  { icon: FaCreditCard, content: <><strong>Payment received</strong> for December rent</>, time: "1 day ago" },
  { icon: FaTools, content: <><strong>Maintenance request</strong> submitted for plumbing issue</>, time: "2 days ago" },
  { icon: FaStar, content: <><strong>Review posted</strong> for City View Apartments</>, time: "3 days ago" },
];

// ✅ FIXED: Icon component properly destructured
const QuickActionButton = ({ path, icon: Icon, label }) => (
  <Link
    to={path}
    className="bg-white border border-gray-100 text-text-dark p-3 rounded-large flex items-center gap-3 font-semibold transition-transform-shadow duration-200 shadow-sm hover:shadow-accent-hover hover:bg-accent hover:text-white hover:transform hover:-translate-y-0.5"
  >
    <Icon className="w-5 text-center text-lg" />
    {label}
  </Link>
);

// ✅ FIXED: Icon component properly destructured
const ActivityItem = ({ icon: Icon, content, time }) => (
  <div className="flex items-center gap-4 p-4 md:p-5 border-b border-background-light transition-colors duration-300 last:border-b-0 hover:bg-background-light/50">
    <div className="bg-background-light p-3 rounded-btn text-accent text-xl flex-shrink-0 w-11 h-11 flex items-center justify-center">
      <Icon />
    </div>
    <div className="flex flex-col">
      <p className="text-text-dark font-medium leading-tight">{content}</p>
      <span className="text-text-muted text-sm mt-0.5">{time}</span>
    </div>
  </div>
);

const StudentDashboard = () => {
  return (
    <StudentLayout
      title="Welcome back, Priya!"
      subtitle="Here's your boarding overview"
    >
      {/* Stats Overview */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatWidget 
            icon="fas fa-calendar-check" 
            title="Upcoming Visits" 
            mainDetail="Tomorrow 2:00 PM" 
            subDetail="Sunshine Hostel" 
          />
          <StatWidget 
            icon="fas fa-file-invoice-dollar" 
            title="Pending Payments" 
            mainDetail="$350 Due Jan 5" 
            subDetail="Sunshine Hostel"
            actionButton={{ label: "Pay Now", onClick: handlePayNow }}
          />
          <StatWidget 
            icon="fas fa-home" 
            title="Current Boarding" 
            mainDetail="Sunshine Hostel" 
            subDetail="Since Dec 2023" 
          />
          <StatWidget 
            icon="fas fa-star" 
            title="My Reviews" 
            mainDetail="12 Reviews" 
            subDetail="4.8⭐ Average" 
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-primary text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="bg-card-bg p-6 rounded-large shadow-custom flex flex-col md:flex-row gap-6 md:gap-8 justify-between transition-shadow duration-300 hover:shadow-xl">
          {/* Find & Book Column */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-secondary-accent text-xl font-semibold mb-4">Find & Book</h3>
            <div className="grid grid-cols-1 gap-3">
              {actionButtons.map((btn, index) => (
                <QuickActionButton key={index} path={btn.path} icon={btn.icon} label={btn.label} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px md:w-px md:h-auto bg-primary/25 md:self-stretch my-4 md:my-0"></div>

          {/* Manage Column */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-secondary-accent text-xl font-semibold mb-4">Manage</h3>
            <div className="grid grid-cols-1 gap-3">
              {manageButtons.map((btn, index) => (
                <QuickActionButton key={index} path={btn.path} icon={btn.icon} label={btn.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-8">
        <h2 className="text-primary text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card-bg rounded-large shadow-custom overflow-hidden">
          {activityFeedData.map((item, index) => (
            <ActivityItem key={index} icon={item.icon} content={item.content} time={item.time} />
          ))}
        </div>
      </section>
    </StudentLayout>
  );
};

export default StudentDashboard;