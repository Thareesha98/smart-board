// src/pages/public/SignupPage.jsx
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupPage.css";

export default function SignupPage() {
  const handleSignup = (form) => {
    // Placeholder — connect to backend registration later
    console.log("Signup submitted:", form);
  };

  return (
    <div className="signuppage-container">
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
}
