import "./DashboardOverviewCard.css";

export default function DashboardOverviewCard({
  icon,
  title,
  value,
  onClick,
}) {
  return (
    <div
      className="sbms-overview-card"
      onClick={onClick}
      role="button"
    >
      <div className="sbms-overview-icon">{icon}</div>

      <div className="sbms-overview-content">
        <p className="sbms-overview-title">{title}</p>
        <p className="sbms-overview-value">{value}</p>
      </div>
    </div>
  );
}
