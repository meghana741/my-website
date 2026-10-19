import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEwaste } from '../../context/EwasteContext';
import {
  Recycle,
  Bell,
  CalendarPlus,
  Search,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  CheckCheck,
  ChevronDown,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    logout,
    switchUserRole
  } = useEwaste();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  // Click outside notification dropdown to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Recycle size={26} strokeWidth={2.4} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#064e3b',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.1
                }}
              >
                EcoCycle
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                E-Waste Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              gap: '0.5rem',
              alignItems: 'center'
            }}
            className="desktop-nav"
          >
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/schedule-pickup"
              className={`nav-link ${isActive('/schedule-pickup') ? 'active' : ''}`}
            >
              Schedule Pickup
            </Link>
            <Link
              to="/track"
              className={`nav-link ${isActive('/track') ? 'active' : ''}`}
            >
              Track Status
            </Link>
            <Link
              to="/citizen/dashboard"
              className={`nav-link ${isActive('/citizen/dashboard') || isActive('/dashboard') ? 'active' : ''}`}
            >
              Citizen Portal
            </Link>
            <Link
              to="/recycling"
              className={`nav-link ${isActive('/recycling') ? 'active' : ''}`}
            >
              Recycling Hub
            </Link>
            <Link
              to="/reports"
              className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
            >
              Reports
            </Link>
            <Link
              to="/admin/dashboard"
              className={`nav-link ${isActive('/admin/dashboard') || isActive('/admin') ? 'active' : ''}`}
              style={{
                color: isActive('/admin/dashboard') || isActive('/admin') ? '#047857' : '#0f766e',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
              Admin
            </Link>
          </nav>

          {/* Actions & Profile / Role Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Quick Demo Switcher */}
            <button
              onClick={() => switchUserRole(currentUser?.role === 'admin' ? 'citizen' : 'admin')}
              className="role-switch-btn"
              title="Click to toggle between Citizen and Admin mode"
            >
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Demo Role:</span>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: currentUser?.role === 'admin' ? '#047857' : '#0284c7'
                }}
              >
                {currentUser?.role === 'admin' ? 'Admin 🛡️' : 'Citizen 👤'}
              </span>
            </button>

            {/* Notifications Popover */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-text-body)',
                  transition: 'background var(--transition-fast)'
                }}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {notifDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '340px',
                    backgroundColor: 'white',
                    borderRadius: '14px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
                    zIndex: 1000,
                    overflow: 'hidden',
                    animation: 'slideUp 0.2s ease-out'
                  }}
                >
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderBottom: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#f8fafc'
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-title)' }}>
                      Notifications ({unreadCount} new)
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-primary)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <CheckCheck size={14} /> Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No notifications right now.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.requestId) {
                              navigate(`/track?id=${n.requestId}`);
                            }
                          }}
                          style={{
                            padding: '0.85rem 1rem',
                            borderBottom: '1px solid var(--color-border-subtle)',
                            cursor: 'pointer',
                            backgroundColor: n.read ? 'white' : '#f0fdf4',
                            transition: 'background var(--transition-fast)'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '0.25rem'
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: 'var(--color-text-title)'
                              }}
                            >
                              {n.title}
                            </span>
                            {!n.read && (
                              <span
                                style={{
                                  width: '7px',
                                  height: '7px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--color-primary)'
                                }}
                              />
                            )}
                          </div>
                          <p
                            style={{
                              fontSize: '0.78rem',
                              color: 'var(--color-text-body)',
                              margin: 0,
                              lineHeight: 1.4
                            }}
                          >
                            {n.message}
                          </p>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--color-text-light)',
                              display: 'block',
                              marginTop: '0.35rem'
                            }}
                          >
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div
                    style={{
                      padding: '0.65rem',
                      textAlign: 'center',
                      backgroundColor: '#f8fafc',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <Link
                      to="/notifications"
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)'
                      }}
                      onClick={() => setNotifDropdownOpen(false)}
                    >
                      View all notifications &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Auth Info / Buttons */}
            {currentUser ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Link
                  to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'white',
                    color: 'var(--color-text-title)',
                    textDecoration: 'none'
                  }}
                  className="user-badge-btn"
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: currentUser.role === 'admin' ? '#047857' : '#059669',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name.charAt(0)}
                  </div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      maxWidth: '100px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="btn-ghost"
                  title="Logout"
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline btn-sm">
                  <LogIn size={15} /> Log In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                display: 'none',
                background: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                color: 'var(--color-text-title)'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '1rem 0 1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              animation: 'fadeIn 0.2s ease-in'
            }}
            className="mobile-nav-drawer"
          >
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link
              to="/schedule-pickup"
              className={`mobile-nav-link ${isActive('/schedule-pickup') ? 'active' : ''}`}
            >
              Schedule Pickup
            </Link>
            <Link to="/track" className={`mobile-nav-link ${isActive('/track') ? 'active' : ''}`}>
              Track Request Status
            </Link>
            <Link to="/citizen/dashboard" className={`mobile-nav-link ${isActive('/citizen/dashboard') || isActive('/dashboard') ? 'active' : ''}`}>
              Citizen Dashboard
            </Link>
            <Link to="/recycling" className={`mobile-nav-link ${isActive('/recycling') ? 'active' : ''}`}>
              Recycling Hub
            </Link>
            <Link to="/reports" className={`mobile-nav-link ${isActive('/reports') ? 'active' : ''}`}>
              Reports & Statistics
            </Link>
            <Link to="/admin/dashboard" className={`mobile-nav-link ${isActive('/admin/dashboard') || isActive('/admin') ? 'active' : ''}`}>
              Admin Portal
            </Link>
            <Link to="/notifications" className={`mobile-nav-link ${isActive('/notifications') ? 'active' : ''}`}>
              Notifications ({unreadCount})
            </Link>

            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
              <Link to="/schedule-pickup" className="btn btn-primary" style={{ width: '100%' }}>
                <CalendarPlus size={16} /> Book Doorstep Pickup
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .mobile-nav-drawer {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
          .user-badge-btn span {
            display: none;
          }
        }
        .nav-link {
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-body);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .nav-link:hover {
          background-color: var(--color-primary-subtle);
          color: var(--color-primary-dark);
        }
        .nav-link.active {
          background-color: var(--color-primary-subtle);
          color: var(--color-primary-dark);
          font-weight: 700;
        }
        .mobile-nav-link {
          padding: 0.65rem 1rem;
          font-weight: 600;
          color: var(--color-text-title);
          border-radius: 8px;
          text-decoration: none;
        }
        .mobile-nav-link.active {
          background-color: var(--color-primary-subtle);
          color: var(--color-primary-dark);
        }
        .role-switch-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 0.3rem 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .role-switch-btn:hover {
          background: var(--color-primary-subtle);
          border-color: var(--color-primary-light);
        }
      `}</style>
    </header>
  );
};

export default Navbar;
