import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="sbms-mainlayout">

      <Header />

      <main className="sbms-maincontent">
        <Outlet /> 
      </main>

      <Footer />

    </div>
  );
}
