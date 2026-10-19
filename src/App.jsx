import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EwasteProvider } from './context/EwasteContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';

// Page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterEwaste from './pages/RegisterEwaste';
import UserDashboard from './pages/UserDashboard';
import RecyclingManagement from './pages/RecyclingManagement';
import ReportsDashboard from './pages/ReportsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PickupTracking from './pages/PickupTracking';
import NotificationsPage from './pages/NotificationsPage';

// Inner layout so we can use useLocation to detect Home page
const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1, ...(isHome ? {} : { maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1rem' }) }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedule-pickup" element={<RegisterEwaste />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/recycling" element={<RecyclingManagement />} />
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track" element={<PickupTracking />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <EwasteProvider>
      <Router>
        <AppLayout />
      </Router>
    </EwasteProvider>
  );
}

