import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/student/AuthContext.jsx';
import ScrollToTop from './ScrollToTop';
import AppRoutes from './routes/AppRoutes'; // Import the new routes file

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;