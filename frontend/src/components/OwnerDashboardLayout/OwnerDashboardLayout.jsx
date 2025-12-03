import "./OwnerDashboardLayout.css";

export default function OwnerDashboardLayout({
  overviewCards,
  adsSection,
  appointmentsSection,
}) {
  return (
    <div className="odl-container">

      {/* Overview Cards */}
      <div className="odl-overview">
        {overviewCards}
      </div>

      {/* Two section grid */}
      <div className="odl-grid">

        <div className="odl-grid-item">
          {adsSection}
        </div>

        <div className="odl-grid-item">
          {appointmentsSection}
        </div>

      </div>

    </div>
  );
}
