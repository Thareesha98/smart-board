import "./OverviewCard.css";

export default function OverviewCard({ label, value }) {
  return (
    <div className="overview-card">
      <p className="overview-label">{label}</p>
      <h3 className="overview-value">{value}</h3>
    </div>
  );
}
