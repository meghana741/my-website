import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react';

const Login = () => {
  const { citizenLogin, adminLogin } = useEwaste();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab: 'citizen' or 'admin'
  const initialTab = searchParams.get('tab') === 'admin' ? 'admin' : 'citizen';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle URL errors or tab changes
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setErrorMessage('Access denied. Administrator privileges required to access that page.');
    } else if (errorParam === 'auth_required') {
      setErrorMessage('Please sign in to access your citizen dashboard.');
    }
  }, [searchParams]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (activeTab === 'admin') {
        const res = await adminLogin(email, password);
        if (res?.user) {
          navigate('/admin/dashboard');
        }
      } else {
        const res = await citizenLogin(email, password);
        if (res?.user) {
          navigate('/citizen/dashboard');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin@ecocycle.com');
    setPassword('EcoAdmin@2026');
    setErrorMessage('');
  };

  const fillCitizenDemo = () => {
    setEmail('meghana@example.com');
    setPassword('password123');
    setErrorMessage('');
  };

  return (
    <div style={{ maxWidth: '460px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: activeTab === 'admin'
              ? 'linear-gradient(135deg, #065f46, #047857)'
              : 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            {activeTab === 'admin' ? <ShieldCheck size={30} /> : <User size={28} />}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
            {activeTab === 'admin' ? 'Admin Portal Sign In' : 'Citizen Sign In'}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
            {activeTab === 'admin'
              ? 'Authorized operations, request approvals & dispatch portal'
              : 'Access your e-waste requests, schedule pickups & track recycling'}
          </p>
        </div>

        {/* Tab Switcher: Citizen vs Admin */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          padding: '4px',
          backgroundColor: '#f1f5f9',
          borderRadius: '10px',
          marginBottom: '1.75rem',
          border: '1px solid #e2e8f0'
        }}>
          <button
            type="button"
            onClick={() => switchTab('citizen')}
            style={{
              padding: '0.6rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'citizen' ? 700 : 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              backgroundColor: activeTab === 'citizen' ? 'white' : 'transparent',
              color: activeTab === 'citizen' ? '#047857' : '#64748b',
              boxShadow: activeTab === 'citizen' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={16} /> Citizen Login
          </button>
          <button
            type="button"
            onClick={() => switchTab('admin')}
            style={{
              padding: '0.6rem 0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'admin' ? 700 : 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              backgroundColor: activeTab === 'admin' ? 'white' : 'transparent',
              color: activeTab === 'admin' ? '#065f46' : '#64748b',
              boxShadow: activeTab === 'admin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={16} /> Admin Login
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#b91c1c',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-title)' }}>
              {activeTab === 'admin' ? 'Admin Email Address' : 'Citizen Email Address'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeTab === 'admin' ? 'admin@ecocycle.com' : 'your.email@example.com'}
                required
                disabled={isSubmitting}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-title)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={activeTab === 'admin' ? 'Enter admin password' : 'Enter citizen password'}
                required
                disabled={isSubmitting}
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'admin' ? '#065f46' : undefined
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Authenticating...
              </>
            ) : (
              <>
                <LogIn size={18} /> {activeTab === 'admin' ? 'Sign In as Administrator' : 'Sign In as Citizen'}
              </>
            )}
          </button>
        </form>

        {/* Footer Links & Shortcuts */}
        {activeTab === 'citizen' ? (
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            New to EcoCycle? <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Register as a Citizen</Link>
          </p>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Looking for personal pickups?{' '}
            <button
              type="button"
              onClick={() => switchTab('citizen')}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Switch to Citizen Sign In
            </button>
          </p>
        )}

        {/* Credentials helper card */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          {activeTab === 'admin' ? (
            <div>
              <div style={{ fontWeight: 700, color: '#065f46', marginBottom: '0.35rem' }}>🔐 Fixed Admin Credentials:</div>
              <div>Email: <strong>admin@ecocycle.com</strong></div>
              <div>Password: <strong>EcoAdmin@2026</strong></div>
              <button
                type="button"
                onClick={fillAdminDemo}
                style={{ marginTop: '0.5rem', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
              >
                Autofill Admin Credentials
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontWeight: 700, color: '#047857', marginBottom: '0.35rem' }}>🌱 Citizen Login Info:</div>
              <div>Use your registered citizen credentials or test with:</div>
              <div>Email: <strong>meghana@example.com</strong> (password123)</div>
              <button
                type="button"
                onClick={fillCitizenDemo}
                style={{ marginTop: '0.5rem', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
              >
                Autofill Citizen Credentials
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
