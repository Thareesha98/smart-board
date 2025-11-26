// src/pages/admin/ManageUsersPage.jsx
import "./ManageUsersPage.css";

export default function ManageUsersPage() {
  const users = [
    {
      id: "u1",
      name: "John Doe",
      role: "STUDENT",
      email: "john@student.com",
      status: "active",
    },
    {
      id: "u2",
      name: "Lakshan Perera",
      role: "OWNER",
      email: "lakshan@boardings.com",
      status: "banned",
    },
    {
      id: "u3",
      name: "Anjali Silva",
      role: "STUDENT",
      email: "anjali@student.com",
      status: "active",
    },
  ];

  return (
    <div className="manageusers-page">

      <h2 className="manageusers-title">Manage Users</h2>

      <div className="manageusers-table">

        {/* Table Header */}
        <div className="mu-row mu-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* User Rows */}
        {users.map((u) => (
          <div key={u.id} className="mu-row mu-body">

            <span>{u.name}</span>
            <span>{u.email}</span>
            <span className={`mu-role ${u.role.toLowerCase()}`}>
              {u.role}
            </span>

            <span className={`mu-status ${u.status}`}>
              {u.status}
            </span>

            <span className="mu-actions">
              {u.status === "active" ? (
                <button
                  className="mu-btn ban"
                  onClick={() => alert(`Banned ${u.name}`)}
                >
                  Ban
                </button>
              ) : (
                <button
                  className="mu-btn unban"
                  onClick={() => alert(`Unbanned ${u.name}`)}
                >
                  Unban
                </button>
              )}

              <button
                className="mu-btn view"
                onClick={() => alert(`Viewing ${u.name}`)}
              >
                View
              </button>
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
