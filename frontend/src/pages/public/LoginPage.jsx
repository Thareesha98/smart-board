// src/pages/public/LoginPage.jsx
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  const handleLogin = (form) => {
    // placeholder — integrate with AuthContext + backend later
    console.log("Login form submitted:", form);
  };

  return (
    <div className="loginpage-container">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
