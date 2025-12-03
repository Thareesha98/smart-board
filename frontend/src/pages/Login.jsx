import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="login card">
      <h3>Login</h3>
      <form onSubmit={submit} className="login-form">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn">Login</button>
      </form>
    </div>
  );
}
