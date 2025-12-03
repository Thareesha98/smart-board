// src/pages/student/StudentDashboardPage.jsx
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import StudentDashboardLayout from "../../components/StudentDashboardLayout/StudentDashboardLayout";
import "./StudentDashboardPage.css";

export default function StudentDashboardPage() {
  const overviewCards = (
    <>
      <OverviewCard label="My Boardings" value="2" />
      <OverviewCard label="Appointments" value="1" />
      <OverviewCard label="Pending Payments" value="0" />
      <OverviewCard label="Notifications" value="3" />
    </>
  );

  const upcomingCard = (
    <div className="sdbox">
      <h3 className="sdbox-title">Upcoming Appointment</h3>
      <p className="sdbox-text">Tomorrow • 2:00 PM</p>
      <p className="sdbox-location">Colombo 05</p>
    </div>
  );

  const paymentsCard = (
    <div className="sdbox">
      <h3 className="sdbox-title">Next Payment</h3>
      <p className="sdbox-text">LKR 15,000</p>
      <p className="sdbox-location">Due on 25th</p>
    </div>
  );

  return (
    <StudentDashboardLayout
      overviewCards={overviewCards}
      upcomingSection={upcomingCard}
      paymentSection={paymentsCard}
    />
  );
}
