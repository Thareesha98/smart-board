import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import CreateAdPage from "./pages/owner/CreateAdPage";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow">
          <Routes>
            <Route index element={<HomePage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="createAd" element={<CreateAdPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;