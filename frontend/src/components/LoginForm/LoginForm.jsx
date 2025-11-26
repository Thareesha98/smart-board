import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="loginform" onSubmit={handleSubmit}>

      <h2 className="loginform-title">Welcome Back</h2>

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label>Password</label>
      <div className="loginform-passgroup">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Enter password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button
          type="button"
          className="loginform-showpass"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      <div className="loginform-row">
        <label className="loginform-remember">
          <input type="checkbox" /> Remember me
        </label>
        <button
          type="button"
          className="loginform-forgot"
          onClick={() => alert("Forgot password flow coming soon")}
        >
          Forgot Password?
        </button>
      </div>

      <button className="loginform-btn">Login</button>
    </form>
  );
}
