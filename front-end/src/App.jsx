import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashbord from "./pages/student/StudentDashbord";
import AppointmentsPage from "./pages/student/AppointmentsPage";
import MaintenancePage from "./pages/student/MaintenancePage ";
import MyBoardingsPage from "./pages/student/MyBoardingsPage";
import BillingPage from "./pages/student/BillingPage";
import ProfilePage from "./pages/student/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<StudentDashbord />} />
        <Route path="appointmentpage" element={<AppointmentsPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="my-boardings" element={<MyBoardingsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
