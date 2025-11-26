import "./Footer.css";

export default function Footer() {
  return (
    <footer className="sbms-footer">
      <div className="sbms-footer-container">
        <p className="sbms-footer-title">Smart Boarding Management System</p>
        <p className="sbms-footer-copy">
          © {new Date().getFullYear()} SBMS — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
