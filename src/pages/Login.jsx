import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, User, Truck } from 'lucide-react';

const Login = () => {
  const { citizenLogin, agentLogin, adminLogin } = useEwaste();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab: 'citizen', 'agent', or 'admin'
  const paramTab = searchParams.get('tab');
  const initialTab = paramTab === 'admin' ? 'admin' : paramTab === 'agent' ? 'agent' : 'citizen';
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
      setErrorMessage('Please sign in to access your portal.');
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
      let res;
      if (activeTab === 'admin') {
        res = await adminLogin(email, password);
      } else if (activeTab === 'agent') {
        res = await agentLogin(email, password);
      } else {
        res = await citizenLogin(email, password);
      }

      if (res?.user) {
        const userRole = (res.user.role || '').toLowerCase();
        if (activeTab === 'agent' || userRole === 'agent' || userRole === 'collection_agent') {
          navigate('/agent/dashboard');
        } else if (activeTab === 'admin' || userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
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

  const fillAgentDemo = () => {
    setEmail('agent@ecocycle.com');
    setPassword('password123');
    setErrorMessage('');
  };

  const fillCitizenDemo = () => {
    setEmail('meghana@example.com');
    setPassword('password123');
    setErrorMessage('');
  };

  const getHeaderIcon = () => {
    if (activeTab === 'admin') return <ShieldCheck size={30} />;
    if (activeTab === 'agent') return <Truck size={28} />;
    return <User size={28} />;
  };

  const getHeaderTitle = () => {
    if (activeTab === 'admin') return 'Admin Portal Sign In';
    if (activeTab === 'agent') return 'Collection Agent Sign In';
    return 'Citizen Sign In';
  };

  const getHeaderSubtitle = () => {
    if (activeTab === 'admin') return 'Authorized operations, request approvals & dispatch portal';
    if (activeTab === 'agent') return 'Accept doorstep pickups, view customer orders & navigate routes';
    return 'Access your e-waste requests, schedule pickups & track recycling';
  };

  return (
    <div style={{ maxWidth: '480px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: activeTab === 'admin'
              ? 'linear-gradient(135deg, #065f46, #047857)'
              : activeTab === 'agent'
              ? 'linear-gradient(135deg, #0284c7, #0369a1)'
              : 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            {getHeaderIcon()}
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
            {getHeaderTitle()}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
            {getHeaderSubtitle()}
          </p>
        </div>

        {/* Tab Switcher: Citizen vs Agent vs Admin */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '4px',
          backgroundColor: '#f1f5f9',
          borderRadius: '10px',
          marginBottom: '1.75rem',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => switchTab('citizen')}
            style={{
              padding: '0.55rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'citizen' ? 700 : 600,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              backgroundColor: activeTab === 'citizen' ? 'white' : 'transparent',
              color: activeTab === 'citizen' ? '#047857' : '#64748b',
              boxShadow: activeTab === 'citizen' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={15} /> Citizen
          </button>
          <button
            type="button"
            onClick={() => switchTab('agent')}
            style={{
              padding: '0.55rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'agent' ? 700 : 600,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              backgroundColor: activeTab === 'agent' ? 'white' : 'transparent',
              color: activeTab === 'agent' ? '#0284c7' : '#64748b',
              boxShadow: activeTab === 'agent' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Truck size={15} /> Agent
          </button>
          <button
            type="button"
            onClick={() => switchTab('admin')}
            style={{
              padding: '0.55rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'admin' ? 700 : 600,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              backgroundColor: activeTab === 'admin' ? 'white' : 'transparent',
              color: activeTab === 'admin' ? '#065f46' : '#64748b',
              boxShadow: activeTab === 'admin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={15} /> Admin
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
              {activeTab === 'admin' ? 'Admin Email Address' : activeTab === 'agent' ? 'Agent Email Address' : 'Citizen Email Address'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activeTab === 'admin' ? 'admin@ecocycle.com' : activeTab === 'agent' ? 'agent@ecocycle.com' : 'your.email@example.com'}
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
              backgroundColor: activeTab === 'admin' ? '#065f46' : activeTab === 'agent' ? '#0284c7' : undefined
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Authenticating...
              </>
            ) : (
              <>
                <LogIn size={18} /> {activeTab === 'admin' ? 'Sign In as Administrator' : activeTab === 'agent' ? 'Sign In as Collection Agent' : 'Sign In as Citizen'}
              </>
            )}
          </button>
        </form>

        {/* Footer Links & Shortcuts */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          {activeTab === 'citizen' && (
            <>
              New citizen? <Link to="/register?role=citizen" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Register here</Link>
            </>
          )}
          {activeTab === 'agent' && (
            <>
              New logistics partner? <Link to="/register?role=agent" style={{ fontWeight: 700, color: '#0284c7' }}>Register as Collection Agent</Link>
            </>
          )}
          {activeTab === 'admin' && (
            <>
              Looking for pickup operations?{' '}
              <button
                type="button"
                onClick={() => switchTab('agent')}
                style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Switch to Agent Login
              </button>
            </>
          )}
        </p>

        {/* Credentials helper card */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          {activeTab === 'admin' && (
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
          )}

          {activeTab === 'agent' && (
            <div>
              <div style={{ fontWeight: 700, color: '#0284c7', marginBottom: '0.35rem' }}>🚚 Collection Agent Credentials:</div>
              <div>Assigned: <strong>Vikram Patel</strong> (Indiranagar Hub)</div>
              <div>Email: <strong>agent@ecocycle.com</strong> (password123)</div>
              <button
                type="button"
                onClick={fillAgentDemo}
                style={{ marginTop: '0.5rem', background: '#f0f9ff', border: '1px solid #bae6fd', color: '#0284c7', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
              >
                Autofill Agent Credentials
              </button>
            </div>
          )}

          {activeTab === 'citizen' && (
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
