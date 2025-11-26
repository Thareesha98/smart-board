import "./AdminUserList.css";

export default function AdminUserList({ users = [], onActivate, onDeactivate, onRemove }) {
  return (
    <section className="sbms-adminusers-card">

      <h3 className="sbms-adminusers-title">User Management</h3>

      {users.length === 0 && (
        <p className="sbms-adminusers-empty">No users available.</p>
      )}

      {users.map((u, index) => (
        <div key={index} className="sbms-adminusers-item">

          {/* User details */}
          <div className="sbms-adminusers-info">
            <p className="sbms-adminusers-name">{u.name}</p>
            <p className="sbms-adminusers-email">{u.email}</p>
            <span className="sbms-adminusers-role">{u.role}</span>
          </div>

          {/* Status Badge */}
          <span className={`sbms-adminusers-status ${u.active ? "active" : "inactive"}`}>
            {u.active ? "Active" : "Inactive"}
          </span>

          {/* Action buttons */}
          <div className="sbms-adminusers-actions">
            {u.active ? (
              <button className="sbms-adminusers-btn warn" onClick={() => onDeactivate(u)}>
                Deactivate
              </button>
            ) : (
              <button className="sbms-adminusers-btn primary" onClick={() => onActivate(u)}>
                Activate
              </button>
            )}

            <button className="sbms-adminusers-btn danger" onClick={() => onRemove(u)}>
              Remove
            </button>
          </div>

        </div>
      ))}
    </section>
  );
}
