import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">SmartBoAD</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>
          <Link to="/login" className="hover:text-orange-600">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}
