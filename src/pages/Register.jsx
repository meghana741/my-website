import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { UserPlus, User, Mail, Phone, Lock, Loader2, AlertCircle, CheckCircle2, Truck, Building2, ShieldCheck, Key } from 'lucide-react';

const Register = () => {
  const { citizenRegister, agentRegister, adminRegister, serviceCenters } = useEwaste();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paramRole = searchParams.get('role');
  const initialRole = paramRole === 'admin' ? 'admin' : paramRole === 'agent' ? 'agent' : 'citizen';
  const [role, setRole] = useState(initialRole);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminKey: 'EcoAdmin@2026',
    vehicleNumber: 'KA-05-EV-4412 (Electric Van)',
    serviceCenterId: serviceCenters[0]?.id || 'sp-ka-1',
    city: 'Bengaluru',
    state: 'Karnataka'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!form.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (role === 'admin') {
        const res = await adminRegister({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
          adminKey: form.adminKey,
          role: 'admin'
        });

        setSuccessMessage('Administrator account registered! Opening Admin Console...');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1200);
      } else if (role === 'agent') {
        const center = serviceCenters.find((s) => s.id === form.serviceCenterId) || serviceCenters[0];
        const res = await agentRegister({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          vehicleNumber: form.vehicleNumber,
          serviceCenterId: center.id,
          serviceCenterName: center.name,
          city: center.city,
          state: center.state,
          role: 'agent'
        });

        setSuccessMessage('Collection Agent registered! Launching your logistics portal...');
        setTimeout(() => {
          navigate('/agent/dashboard');
        }, 1200);
      } else {
        const res = await citizenRegister({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
          role: 'citizen'
        });

        setSuccessMessage('Citizen account registered! Launching your Citizen Dashboard...');
        setTimeout(() => {
          navigate('/citizen/dashboard');
        }, 1200);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getHeaderIcon = () => {
    if (role === 'admin') return <ShieldCheck size={28} />;
    if (role === 'agent') return <Truck size={28} />;
    return <UserPlus size={28} />;
  };

  const getHeaderTitle = () => {
    if (role === 'admin') return 'Administrator Registration';
    if (role === 'agent') return 'Collection Agent Registration';
    return 'Citizen Registration';
  };

  const getHeaderSubtitle = () => {
    if (role === 'admin') return 'Register authorized operational personnel & dispatch controllers';
    if (role === 'agent') return 'Join EcoCycle green logistics fleet, accept pickup runs & transport e-waste';
    return 'Create an EcoCycle citizen account to book pickups and track your recycling';
  };

  const getAccentGradient = () => {
    if (role === 'admin') return 'linear-gradient(135deg, #065f46, #047857)';
    if (role === 'agent') return 'linear-gradient(135deg, #0284c7, #0369a1)';
    return 'linear-gradient(135deg, #10b981, #047857)';
  };

  return (
    <div style={{ maxWidth: '540px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: getAccentGradient(),
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

        {/* 3 Role Selector Tabs: Citizen vs Agent vs Admin */}
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
            onClick={() => { setRole('citizen'); setErrorMessage(''); }}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: role === 'citizen' ? 700 : 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              backgroundColor: role === 'citizen' ? 'white' : 'transparent',
              color: role === 'citizen' ? '#047857' : '#64748b',
              boxShadow: role === 'citizen' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={15} /> Citizen
          </button>
          <button
            type="button"
            onClick={() => { setRole('agent'); setErrorMessage(''); }}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: role === 'agent' ? 700 : 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              backgroundColor: role === 'agent' ? 'white' : 'transparent',
              color: role === 'agent' ? '#0284c7' : '#64748b',
              boxShadow: role === 'agent' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Truck size={15} /> Agent
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setErrorMessage(''); }}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: role === 'admin' ? 700 : 600,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              backgroundColor: role === 'admin' ? 'white' : 'transparent',
              color: role === 'admin' ? '#065f46' : '#64748b',
              boxShadow: role === 'admin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={15} /> Admin
          </button>
        </div>

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

        {successMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            color: '#065f46',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                <User size={18} />
              </span>
              <input
                className="input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={role === 'agent' ? 'e.g. Vikram Patel (Agent)' : role === 'admin' ? 'e.g. Dr. Priya Sharma' : 'e.g. Meghana Rao'}
                required
                disabled={isSubmitting}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
              {role === 'admin' ? 'Admin Email Address' : role === 'agent' ? 'Agent Email Address' : 'Citizen Email Address'}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                <Mail size={18} />
              </span>
              <input
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={role === 'admin' ? 'admin.ops@ecocycle.com' : role === 'agent' ? 'agent.fleet@ecocycle.com' : 'citizen@example.com'}
                required
                disabled={isSubmitting}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
              Direct Contact Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                <Phone size={18} />
              </span>
              <input
                className="input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98201 55432"
                required
                disabled={isSubmitting}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          {/* Admin-specific Security Passkey */}
          {role === 'admin' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: '#065f46' }}>
                Admin Master Passkey
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#065f46' }}>
                  <Key size={18} />
                </span>
                <input
                  className="input"
                  type="password"
                  name="adminKey"
                  value={form.adminKey}
                  onChange={handleChange}
                  placeholder="Enter system master key (Default: EcoAdmin@2026)"
                  required
                  disabled={isSubmitting}
                  style={{ paddingLeft: '40px', borderColor: '#a7f3d0' }}
                />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                Authorizes creation of administrator credentials.
              </span>
            </div>
          )}

          {/* Agent-specific fields */}
          {role === 'agent' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
                  Assigned State Service Center / Hub
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                    <Building2 size={18} />
                  </span>
                  <select
                    className="input"
                    name="serviceCenterId"
                    value={form.serviceCenterId}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    style={{ paddingLeft: '40px' }}
                  >
                    {serviceCenters.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name} ({sc.city}, {sc.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
                  Vehicle Type & Plate Number
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                    <Truck size={18} />
                  </span>
                  <input
                    className="input"
                    type="text"
                    name="vehicleNumber"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                    placeholder="KA-05-EV-4412 (Electric Van)"
                    required
                    disabled={isSubmitting}
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  <Lock size={18} />
                </span>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars"
                  required
                  disabled={isSubmitting}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  <Lock size={18} />
                </span>
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter"
                  required
                  disabled={isSubmitting}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
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
              backgroundColor: role === 'agent' ? '#0284c7' : role === 'admin' ? '#065f46' : undefined
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Registering Account...
              </>
            ) : (
              <>
                {role === 'admin' ? <ShieldCheck size={18} /> : role === 'agent' ? <Truck size={18} /> : <UserPlus size={18} />}
                {role === 'admin'
                  ? 'Register as Administrator'
                  : role === 'agent'
                  ? 'Register as Collection Agent'
                  : 'Register as Citizen'}
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Already registered?{' '}
          <Link
            to={`/login?tab=${role}`}
            style={{
              fontWeight: 700,
              color: role === 'agent' ? '#0284c7' : role === 'admin' ? '#065f46' : 'var(--color-primary)'
            }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
