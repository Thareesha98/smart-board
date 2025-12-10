
import "./HomePage.css"; 
export function HomePage() {
  return (
   <div className="page">

     
     {/* <nav className="navbar">
        <h1 className="logo">SmartBoAD</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>Features</li>
          <li>Users</li>
          <li>Contact</li>
        </ul>
        <button className="btn">Login</button>
      </nav> */}

  
      <section className="hero">
        <h2>Find verified university boardings easily</h2>
        <p>with SmartBoAD</p>

        <div className="search-box">
          <input type="text" placeholder="Enter location or university" />
          <button>Search</button>
        </div>
      </section>

     
      <section className="section">
        <h3>Why Choose SmartBoAD?</h3>

        <div className="cards">
          <div className="card">Smart Search</div>
          <div className="card">Secure Payments</div>
          <div className="card">Owner Dashboard</div>
        </div>
      </section>

      <section className="section">
        <h3>User Roles</h3>

        <div className="cards">
          <div className="card">Student</div>
          <div className="card">Boarding Owner</div>
          <div className="card">Admin</div>
        </div>
      </section>

    
      <section className="section">
        <h3>How SmartBoAD Works</h3>

        <div className="cards">
          <div className="card">Register & Verify</div>
          <div className="card">Browse & Select</div>
          <div className="card">Book & Secure</div>
        </div>
      </section>

{/*     
      <footer className="footer">
        © 2025 SmartBoAD Team
      </footer> */}
    </div>
  );
}