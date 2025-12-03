// src/pages/owner/OwnerDashboardPage.jsx
import OwnerDashboardLayout from "../../components/OwnerDashboardLayout/OwnerDashboardLayout";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import OwnerAdCard from "../../components/OwnerAdCard/OwnerAdCard";
import "./OwnerDashboardPage.css";

export default function OwnerDashboardPage() {
  // Overview cards
  const overviewCards = (
    <>
      <OverviewCard label="My Ads" value="4" />
      <OverviewCard label="Pending Appointments" value="2" />
      <OverviewCard label="Approved Ads" value="3" />
      <OverviewCard label="Boosted Ads" value="1" />
    </>
  );

  // Ads section
  const adsSection = (
    <div className="ownerdash-section">
      <h3 className="ownerdash-section-title">My Recent Ads</h3>

      <OwnerAdCard
        title="Cozy Room in Colombo"
        location="Colombo 07"
        price={15000}
        status="approved"
      />

      <OwnerAdCard
        title="Shared Room for Girls"
        location="Kandy"
        price={10000}
        status="pending"
      />
    </div>
  );

  // Appointments section
  const appointmentsSection = (
    <div className="ownerdash-section">
      <h3 className="ownerdash-section-title">Appointments</h3>

      <div className="ownerdash-appoint-item">
        <p className="ownerdash-app-title">John Doe • Colombo 05</p>
        <p className="ownerdash-app-time">Tomorrow • 2:00 PM</p>
      </div>

      <div className="ownerdash-appoint-item">
        <p className="ownerdash-app-title">Sarah Silva • Kandy</p>
        <p className="ownerdash-app-time">22 Feb • 10:00 AM</p>
      </div>
    </div>
  );

  return (
    <OwnerDashboardLayout
      overviewCards={overviewCards}
      adsSection={adsSection}
      appointmentsSection={appointmentsSection}
    />
  );
}
