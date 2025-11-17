import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import CreateAdPage from "./pages/owner/CreateAdPage";
import EditAdPage from "./pages/owner/EditAdPage";
import MyAdsPage from "./pages/owner/MyAdsPage";
import OwnerLayout from "./layouts/OwnerLayout";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        <div className="grow">
          <Routes>
            <Route path="ownerLayout" element={<OwnerLayout />} >
            <Route index element={<HomePage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="createAd" element={<CreateAdPage />} />
            <Route path="editAd/:adId" element={<EditAdPage />} />
            <Route path="myAds" element={<MyAdsPage />} />
            </Route >
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;