import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTechnicianProfile } from "../../api/technician/technicianService";

const TechnicianAuthContext = createContext();

export const TechnicianAuthProvider = ({ children }) => {
  const [currentTech, setCurrentTech] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (token && role === "TECHNICIAN") {
      try {
        const profile = await getTechnicianProfile();
        setCurrentTech(profile);
      } catch (error) {
        console.error("Tech auth failed", error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    await checkAuth();
    navigate("/technician/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setCurrentTech(null);
    navigate("/login");
  };

  return (
    <TechnicianAuthContext.Provider value={{ currentTech, loading, login, logout }}>
      {children}
    </TechnicianAuthContext.Provider>
  );
};

export const useTechAuth = () => useContext(TechnicianAuthContext);