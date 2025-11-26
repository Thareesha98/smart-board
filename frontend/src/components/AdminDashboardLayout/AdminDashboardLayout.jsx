import "./AdminDashboardLayout.css";

export default function AdminDashboardLayout({ modules }) {
  return (
    <div className="sbms-admindash">

      <h2 className="sbms-admindash-title">Admin Dashboard</h2>

      <div className="sbms-admindash-grid">
        {modules.map((m, i) => (
          <div
            key={i}
            className="sbms-admindash-card"
            onClick={m.onClick}
          >
            <div className="sbms-admindash-icon">{m.icon}</div>
            <h3 className="sbms-admindash-card-title">{m.title}</h3>
            <p className="sbms-admindash-desc">{m.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
