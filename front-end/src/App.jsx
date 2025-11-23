import { Routes, Route } from "react-router-dom";
import CreateAdPage from "./pages/owner/CreateAdPage";
import EditAdPage from "./pages/owner/EditAdPage";
import MyAdsPage from "./pages/owner/MyAdsPage";
import OwnerLayout from "./layouts/OwnerLayout";
import AppointmentsPage from "./pages/owner/AppointmentsPage";
import ProfilePage from "./pages/owner/ProfilePage";
import Dashboard from "./pages/owner/Dashboard";
import MyBoardingsPage from "./pages/owner/MyBoardingsPage";
import UtilityPage from "./pages/owner/UtilityPage";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        <div className="grow">
          <Routes>
            <Route path="ownerLayout" element={<OwnerLayout />} >  
              <Route path="dashboard" element={<Dashboard />} />    
              <Route path="myboardings" element={<MyBoardingsPage />} />
              <Route path="createAd" element={<CreateAdPage />} />
              <Route path="editAd/:adId" element={<EditAdPage />} />
              <Route path="myAds" element={<MyAdsPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="utility" element={<UtilityPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route >
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;