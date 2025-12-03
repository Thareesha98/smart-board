import "./StudentDashboardLayout.css";

export default function StudentDashboardLayout({
  overviewCards,
  upcomingSection,
  paymentSection,
}) {
  return (
    <div className="sdl-container">

      {/* Overview section */}
      <div className="sdl-overview">
        {overviewCards}
      </div>

      {/* Two-column layout */}
      <div className="sdl-grid">

        {/* Left: Upcoming appointment */}
        <div className="sdl-grid-item">
          {upcomingSection}
        </div>

        {/* Right: Payment summary */}
        <div className="sdl-grid-item">
          {paymentSection}
        </div>

      </div>
    </div>
  );
}
