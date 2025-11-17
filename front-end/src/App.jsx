import { Routes, Route } from "react-router-dom";
import CreateAdPage from "./pages/owner/CreateAdPage";
import EditAdPage from "./pages/owner/EditAdPage";
import MyAdsPage from "./pages/owner/MyAdsPage";
import OwnerLayout from "./layouts/OwnerLayout";
import AppointmentsPage from "./pages/owner/AppointmentsPage";
import ProfilePage from "./pages/owner/ProfilePage";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        <div className="grow">
          <Routes>
            <Route path="ownerLayout" element={<OwnerLayout />} >        
            <Route path="createAd" element={<CreateAdPage />} />
            <Route path="editAd/:adId" element={<EditAdPage />} />
            <Route path="myAds" element={<MyAdsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            </Route >
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;