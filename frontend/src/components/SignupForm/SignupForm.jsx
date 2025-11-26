import { useState } from "react";
import "./SignupForm.css";

export default function SignupForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "ROLE_STUDENT",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    onSubmit(form);
  };

  return (
    <form className="signupform" onSubmit={handleSubmit}>

      <h2 className="signup-title">Create an Account</h2>

      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <label>Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label>Phone Number</label>
      <input
        type="text"
        placeholder="0771234567"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />

      <label>Register As</label>
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        required
      >
        <option value="ROLE_STUDENT">Student</option>
        <option value="ROLE_OWNER">Boarding Owner</option>
      </select>

      {/* Password */}
      <label>Password</label>
      <div className="signup-passgroup">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="button"
          className="signup-showpass"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      {/* Confirm Password */}
      <label>Confirm Password</label>
      <input
        type={showPass ? "text" : "password"}
        placeholder="Re-enter your password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        required
      />

      <button className="signup-btn">Create Account</button>
    </form>
  );
}
