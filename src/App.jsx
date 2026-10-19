import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { EwasteProvider, useEwaste } from './context/EwasteContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { Loader2 } from 'lucide-react';

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

/**
 * Protected Route for Admin only
 */
const AdminRoute = ({ children }) => {
  const { currentUser, authLoading } = useEwaste();

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: '0.75rem' }}>
        <Loader2 size={28} className="animate-spin" style={{ color: '#059669' }} />
        <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Verifying administrative credentials...</span>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login?tab=admin&error=unauthorized" replace />;
  }

  return children;
};

/**
 * Protected Route for Citizen only
 */
const CitizenRoute = ({ children }) => {
  const { currentUser, authLoading } = useEwaste();

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: '0.75rem' }}>
        <Loader2 size={28} className="animate-spin" style={{ color: '#059669' }} />
        <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Loading citizen portal...</span>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login?tab=citizen&error=auth_required" replace />;
  }

  return children;
};

// Inner layout
const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1, ...(isHome ? {} : { maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1rem' }) }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/citizen/register" element={<Register />} />
          <Route path="/track" element={<PickupTracking />} />
          <Route path="/recycling" element={<RecyclingManagement />} />
          <Route path="/reports" element={<ReportsDashboard />} />

          {/* Citizen Routes */}
          <Route path="/citizen/dashboard" element={<CitizenRoute><UserDashboard /></CitizenRoute>} />
          <Route path="/dashboard" element={<Navigate to="/citizen/dashboard" replace />} />
          <Route path="/schedule-pickup" element={<CitizenRoute><RegisterEwaste /></CitizenRoute>} />
          <Route path="/notifications" element={<CitizenRoute><NotificationsPage /></CitizenRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
