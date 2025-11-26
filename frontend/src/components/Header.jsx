import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="sbms-header">
      <div className="sbms-header-container">

        <div className="sbms-logo-area">
          <img
            src="/logo.png"
            alt="SBMS Logo"
            className="sbms-logo"
          />
          <h1 className="sbms-title">Smart Boarding Management System</h1>
        </div>

        <nav className="sbms-nav">
          <Link to="/" className="sbms-nav-item">Home</Link>
          <Link to="/search" className="sbms-nav-item">Search</Link>
          <Link to="/login" className="sbms-nav-item">Login</Link>
          <Link to="/signup" className="sbms-nav-item sbms-btn-primary">
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
  );
}
