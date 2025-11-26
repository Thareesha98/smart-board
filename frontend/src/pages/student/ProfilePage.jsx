// src/pages/student/ProfilePage.jsx
import { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@studentmail.com",
    phone: "0771234567",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newpass: "",
    confirm: "",
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated (backend integration coming soon)");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (passwords.newpass !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully");
  };

  return (
    <div className="student-profile-page">

      <h2 className="profile-title">My Profile</h2>

      <div className="profile-grid">

        {/* LEFT: Personal Info */}
        <form className="profile-card" onSubmit={handleProfileUpdate}>
          <h3 className="profile-card-title">Personal Information</h3>

          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <label>Phone</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />

          <button className="profile-btn">Save Changes</button>
        </form>

        {/* RIGHT: Change Password */}
        <form className="profile-card" onSubmit={handlePasswordUpdate}>
          <h3 className="profile-card-title">Change Password</h3>

          <label>Current Password</label>
          <input
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />

          <label>New Password</label>
          <input
            type="password"
            value={passwords.newpass}
            onChange={(e) =>
              setPasswords({ ...passwords, newpass: e.target.value })
            }
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />

          <button className="profile-btn">Update Password</button>
        </form>

      </div>
    </div>
  );
}
