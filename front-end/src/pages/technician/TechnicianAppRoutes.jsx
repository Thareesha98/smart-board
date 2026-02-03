import { Routes, Route } from "react-router-dom";
import TechnicianDashboard from "../pages/technician/TechnicianDashboard";
import TechnicianProfile from "../pages/technician/TechnicianProfile";
import TechnicianReports from "../pages/technician/TechnicianReports";

const TechnicianAppRoutes = () => {
  return (
    <Routes>
       <Route path="dashboard" element={<TechnicianDashboard />} />
       <Route path="profile" element={<TechnicianProfile />} />
       <Route path="reports" element={<TechnicianReports />} />
    </Routes>
  );
};
export default TechnicianAppRoutes;