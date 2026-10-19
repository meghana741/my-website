import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { UserPlus, User, Mail, Phone, Lock, Loader2, AlertCircle } from 'lucide-react';

const Register = () => {
  const { register } = useEwaste();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (form.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: 'user'
      });
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: <User size={18} />, placeholder: 'Meghana Rao' },
    { name: 'email', label: 'Email Address', type: 'email', icon: <Mail size={18} />, placeholder: 'meghana@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: <Phone size={18} />, placeholder: '+91 98765 43210' },
    { name: 'password', label: 'Password', type: 'password', icon: <Lock size={18} />, placeholder: 'Create a secure password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: <Lock size={18} />, placeholder: 'Repeat your password' },
  ];

  return (
    <div style={{ maxWidth: '480px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
            <UserPlus size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)' }}>Create Account</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>Join EcoCycle and start recycling responsibly</p>
        </div>

        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#b91c1c',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {fields.map((f) => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-title)' }}>{f.label}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>{f.icon}</span>
                <input
                  className="input"
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  disabled={isSubmitting}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={18} /> Create Account
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
