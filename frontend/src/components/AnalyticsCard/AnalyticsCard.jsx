import "./AnalyticsCard.css";

export default function AnalyticsCard({ label, value, icon }) {
  return (
    <div className="analyticscard">
      <div className="ac-left">
        <p className="ac-label">{label}</p>
        <h3 className="ac-value">{value}</h3>
      </div>

      {icon && <div className="ac-icon">{icon}</div>}
    </div>
  );
}
