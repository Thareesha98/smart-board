# Smart Board React - Implementation Code Examples

## Overview
Practical code examples and implementations for integrating smartboard-react into smart-board.

---

## 1. MERGING PACKAGE.JSON

### Current package.json (smart-board/front-end)
```json
{
  "name": "my-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^7.1.0",
    "@fortawesome/free-solid-svg-icons": "^7.1.0",
    "@fortawesome/react-fontawesome": "^3.1.0",
    "@react-google-maps/api": "^2.20.8",
    "@stomp/stompjs": "^7.3.0",
    "axios": "^1.13.2",
    "framer-motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "recharts": "^3.7.0",
    "sockjs-client": "^1.6.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "autoprefixer": "^10.4.23",
    "buffer": "^6.0.3",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "process": "^0.11.10",
    "tailwindcss": "^3.4.19",
    "vite": "^7.2.2"
  }
}
```

### Merged package.json (with smartboard-react)
```json
{
  "name": "smartboard-complete",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "start": "vite"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^7.1.0",
    "@fortawesome/free-solid-svg-icons": "^7.1.0",
    "@fortawesome/react-fontawesome": "^3.1.0",
    "@react-google-maps/api": "^2.20.8",
    "@stomp/stompjs": "^7.3.0",
    "axios": "^1.13.2",
    "framer-motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.6",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.4.0",
    "recharts": "^3.7.0",
    "sockjs-client": "^1.6.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "@tailwindcss/vite": "^4.1.17",
    "autoprefixer": "^10.4.23",
    "buffer": "^6.0.3",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "process": "^0.11.10",
    "tailwindcss": "^3.4.19",
    "vite": "^7.2.2"
  }
}
```

### Installation Command
```bash
cd front-end
npm install
```

---

## 2. MERGING APP.JSX (MAIN ROUTES)

### Current App.jsx Structure
```jsx
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import Home from "./Home.jsx";

// Context Providers
import { StudentAuthProvider } from "./context/student/StudentAuthContext.jsx";
import { OwnerAuthProvider } from "./context/owner/OwnerAuthContext.jsx";
import { AdminAuthProvider } from "./context/admin/AdminAuthContext.jsx";

// Route Files
import StudentAppRoutes from "./routes/StudentAppRoutes.jsx";
import OwnerAppRoutes from "./routes/OwnerAppRoutes";
import AdminAppRoutes from "./routes/AdminAppRoutes";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PublicProfileView from "./pages/common/PublicProfileView.jsx";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <OwnerAuthProvider>
          <AdminAuthProvider>
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                  borderRadius: "10px",
                  fontSize: "14px",
                },
              }}
            />
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Student Routes */}
              <Route path="/student/*" element={<StudentAppRoutes />} />

              {/* Owner Routes */}
              <Route path="/owner/*" element={<OwnerAppRoutes />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminAppRoutes />} />

              {/* Public Routes */}
              <Route path="/profile/:userId" element={<PublicProfileView />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </AdminAuthProvider>
        </OwnerAuthProvider>
      </StudentAuthProvider>
    </>
  );
}

export default App;
```

---

## 3. MERGING ROUTES - StudentAppRoutes.jsx

### Current Implementation
```jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/student/common/ProtectedRoute";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import AppointmentsPage from "../pages/student/AppointmentsPage";
import SearchBoardingsPage from "../pages/student/SearchBoardingsPage";
import BoardingDetailsPage from "../pages/student/BoardingDetailsPage";
import MyBoardingsPage from "../pages/student/MyBoardingsPage";
import BillingPage from "../pages/student/BillingPage";
import MaintenancePage from "../pages/student/MaintenancePage";
import ReportsPage from "../pages/student/ReportsPage";
import ProfilePage from "../pages/student/ProfilePage";

const StudentAppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/search" element={<SearchBoardingsPage />} />
        <Route path="/boardings/:id" element={<BoardingDetailsPage />} />
        <Route path="/my-boardings" element={<MyBoardingsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/student/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default StudentAppRoutes;
```

### Enhanced with smartboard-react Components
```jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/student/common/ProtectedRoute";

// Original Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import AppointmentsPage from "../pages/student/AppointmentsPage";
import SearchBoardingsPage from "../pages/student/SearchBoardingsPage";
import BoardingDetailsPage from "../pages/student/BoardingDetailsPage";
import MyBoardingsPage from "../pages/student/MyBoardingsPage";
import BillingPage from "../pages/student/BillingPage";
import MaintenancePage from "../pages/student/MaintenancePage";
import ReportsPage from "../pages/student/ReportsPage";
import ProfilePage from "../pages/student/ProfilePage";

// Smart Board React Pages (NEW)
import StudentChatPage from "../pages/student/StudentChatPage";
import NotificationsPage from "../pages/student/NotificationsPage";
import BookmarksPage from "../pages/student/BookmarksPage";

const StudentAppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        {/* Original Routes */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/search" element={<SearchBoardingsPage />} />
        <Route path="/boardings/:id" element={<BoardingDetailsPage />} />
        <Route path="/my-boardings" element={<MyBoardingsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Smart Board React Routes (NEW) */}
        <Route path="/chat" element={<StudentChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/student/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default StudentAppRoutes;
```

---

## 4. MERGING AUTHENTICATION CONTEXT

### Create Merged StudentAuthContext
```jsx
// src/context/student/StudentAuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (token) {
          // Verify token is still valid
          const response = await axios.get(`${API_BASE}/student/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem("studentToken");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [API_BASE]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/auth/student/login`, {
        email,
        password,
      });

      const { token, user: userData } = response.data;
      
      localStorage.setItem("studentToken", token);
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
      
      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/auth/student/signup`, userData);
      
      const { token, user: newUser } = response.data;
      
      localStorage.setItem("studentToken", token);
      setUser(newUser);
      setIsAuthenticated(true);
      setError(null);
      
      return { success: true, user: newUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("studentToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("studentToken");
      const response = await axios.put(
        `${API_BASE}/student/profile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within StudentAuthProvider");
  }
  return context;
};
```

---

## 5. MERGING API SERVICES

### Create Unified StudentService
```jsx
// src/api/student/StudentService.js

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

class StudentService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE,
    });

    // Add token to every request
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("studentToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle response errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("studentToken");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Dashboard Data
  async getDashboardData() {
    return this.api.get("/student/dashboard");
  }

  // Boardings
  async searchBoardings(filters) {
    return this.api.get("/student/boardings/search", { params: filters });
  }

  async getBoardingDetails(id) {
    return this.api.get(`/student/boardings/${id}`);
  }

  async getMyBoardings() {
    return this.api.get("/student/boardings/my-boardings");
  }

  async applyBoarding(boardingId, applicationData) {
    return this.api.post(`/student/boardings/${boardingId}/apply`, applicationData);
  }

  // Appointments
  async getAppointments() {
    return this.api.get("/student/appointments");
  }

  async bookAppointment(boardingId, appointmentData) {
    return this.api.post("/student/appointments/book", appointmentData);
  }

  async cancelAppointment(appointmentId) {
    return this.api.delete(`/student/appointments/${appointmentId}`);
  }

  // Maintenance Requests
  async getMaintenanceRequests() {
    return this.api.get("/student/maintenance");
  }

  async submitMaintenanceRequest(data) {
    return this.api.post("/student/maintenance/request", data);
  }

  // Reports
  async submitReport(reportData) {
    return this.api.post("/student/reports", reportData);
  }

  async getReports() {
    return this.api.get("/student/reports");
  }

  // Billing
  async getBillingInfo() {
    return this.api.get("/student/billing");
  }

  async getPayments() {
    return this.api.get("/student/billing/payments");
  }

  // Reviews
  async submitReview(boardingId, reviewData) {
    return this.api.post(`/student/boardings/${boardingId}/reviews`, reviewData);
  }

  async getReviews(boardingId) {
    return this.api.get(`/student/boardings/${boardingId}/reviews`);
  }

  // Chat
  async getChats() {
    return this.api.get("/student/chat");
  }

  async sendMessage(chatId, message) {
    return this.api.post(`/student/chat/${chatId}/messages`, { message });
  }

  // Notifications
  async getNotifications() {
    return this.api.get("/student/notifications");
  }

  async markNotificationAsRead(notificationId) {
    return this.api.put(`/student/notifications/${notificationId}/read`);
  }

  // Profile
  async getProfile() {
    return this.api.get("/student/profile");
  }

  async updateProfile(profileData) {
    return this.api.put("/student/profile", profileData);
  }

  async changePassword(oldPassword, newPassword) {
    return this.api.post("/student/profile/change-password", {
      oldPassword,
      newPassword,
    });
  }
}

export default new StudentService();
```

---

## 6. MERGING TAILWIND CONFIG

### Merged tailwind.config.js
```js
import tailwindcss from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          900: "#0c2d6b",
        },
        // Secondary colors
        secondary: {
          50: "#f5f3ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        // Accent colors
        accent: "#f59e0b",
        // Neutral colors
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Status colors
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      backgroundColor: {
        "background-light": "#f9fafb",
        "background-dark": "#1f2937",
        "card-light": "#ffffff",
        "card-dark": "#111827",
      },
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1rem" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.5rem" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      borderRadius: {
        "btn": "0.5rem",
        "card": "0.75rem",
        "lg": "1rem",
      },
      spacing: {
        "gutter": "1.5rem",
      },
    },
  },
  plugins: [],
};
```

---

## 7. ENVIRONMENT VARIABLES SETUP

### .env.development
```bash
VITE_API_BASE=http://localhost:8080/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
VITE_SOCKET_URL=http://localhost:8080
VITE_CHAT_API=http://localhost:8080/api/chat
```

### .env.production
```bash
VITE_API_BASE=https://smartboard.thareesha.software/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
VITE_SOCKET_URL=https://smartboard.thareesha.software
VITE_CHAT_API=https://smartboard.thareesha.software/api/chat
```

---

## 8. VITE CONFIG MERGE

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'react-icons', 'react-hot-toast'],
          'api': ['axios']
        }
      }
    }
  }
})
```

---

## 9. PROTECTED ROUTE COMPONENT

### ProtectedRoute.jsx
```jsx
// src/components/student/common/ProtectedRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/student/StudentAuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-light">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
```

---

## 10. COMMON LAYOUT COMPONENT

### StudentLayout.jsx
```jsx
// src/layouts/StudentLayout.jsx

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/common/Sidebar";
import Header from "../components/student/common/Header";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background-light">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
```

---

## 11. LOGIN PAGE IMPLEMENTATION

### LoginPage.jsx
```jsx
// src/pages/auth/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth as useStudentAuth } from "../../context/student/StudentAuthContext";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { useAdminAuth } from "../../context/admin/AdminAuthContext";
import StudentLoginForm from "../../components/student/auth/StudentLoginForm";
import OwnerLoginForm from "../../components/Owner/auth/OwnerLoginForm";
import AdminLoginForm from "../../components/admin/auth/AdminLoginForm";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("student"); // student, owner, admin

  const studentAuth = useStudentAuth();
  const ownerAuth = useOwnerAuth();
  const adminAuth = useAdminAuth();

  const handleStudentLogin = async (email, password) => {
    const result = await studentAuth.login(email, password);
    if (result.success) {
      const from = location.state?.from?.pathname || "/student/dashboard";
      navigate(from);
    }
  };

  const handleOwnerLogin = async (email, password) => {
    const result = await ownerAuth.login(email, password);
    if (result.success) {
      const from = location.state?.from?.pathname || "/owner/dashboard";
      navigate(from);
    }
  };

  const handleAdminLogin = async (email, password) => {
    const result = await adminAuth.login(email, password);
    if (result.success) {
      const from = location.state?.from?.pathname || "/admin/dashboard";
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* User Type Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { type: "student", label: "Student" },
            { type: "owner", label: "Owner" },
            { type: "admin", label: "Admin" },
          ].map((tab) => (
            <button
              key={tab.type}
              onClick={() => setUserType(tab.type)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                userType === tab.type
                  ? "bg-white text-primary-600 shadow-lg"
                  : "bg-primary-700 text-white hover:bg-primary-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Login Forms */}
        {userType === "student" && (
          <StudentLoginForm
            onSubmit={handleStudentLogin}
            isLoading={studentAuth.loading}
            error={studentAuth.error}
          />
        )}
        {userType === "owner" && (
          <OwnerLoginForm
            onSubmit={handleOwnerLogin}
            isLoading={ownerAuth.loading}
            error={ownerAuth.error}
          />
        )}
        {userType === "admin" && (
          <AdminLoginForm
            onSubmit={handleAdminLogin}
            isLoading={adminAuth.loading}
            error={adminAuth.error}
          />
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
```

---

## 12. INSTALLATION STEPS

### Step 1: Clear old installations
```bash
cd c:\Users\sandu\OneDrive\Desktop\smart-board\front-end
rm -r node_modules package-lock.json
rm -r .vite
```

### Step 2: Merge package.json files
Copy the merged package.json content to `front-end/package.json`

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Start development server
```bash
npm run dev
```

### Step 5: Test in browser
```
http://localhost:5174/login
```

---

## 13. TESTING CHECKLIST

After implementation, test these:

```bash
# Test compilation
npm run build

# Test dev server
npm run dev

# Check for errors in console
# Verify no red errors in browser console

# Test each user type login:
# - Student: /login (select Student tab)
# - Owner: /login (select Owner tab)
# - Admin: /login (select Admin tab)

# Test navigation to dashboards:
# - http://localhost:5174/student/dashboard
# - http://localhost:5174/owner/dashboard
# - http://localhost:5174/admin/dashboard
```

---

## 14. TROUBLESHOOTING

### Issue: Module not found errors
```bash
# Solution: Reinstall
rm -r node_modules
npm install --legacy-peer-deps
```

### Issue: Vite 504 errors
```bash
# Solution: Clear cache
rm -r .vite node_modules/.vite
npm run dev
```

### Issue: Context is undefined
```javascript
// Make sure provider wraps the entire app in App.jsx
<StudentAuthProvider>
  <OwnerAuthProvider>
    <AdminAuthProvider>
      {/* App content */}
    </AdminAuthProvider>
  </OwnerAuthProvider>
</StudentAuthProvider>
```

### Issue: API calls failing
```javascript
// Check .env files have correct VITE_API_BASE
console.log(import.meta.env.VITE_API_BASE); // Should show API URL
```

---

## Deployment Ready Checklist

- [ ] All dependencies installed
- [ ] No console errors
- [ ] All routes working
- [ ] API calls successful
- [ ] Authentication working
- [ ] Responsive on mobile
- [ ] Build succeeds: `npm run build`
- [ ] No build warnings
- [ ] Environment variables set correctly
- [ ] Testing passed

---

**Last Updated:** February 15, 2026
