import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { UserPlus, User, Mail, Phone, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const { citizenRegister } = useEwaste();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

    // Validation
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
      const res = await citizenRegister({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword
      });

      setSuccessMessage('Registration successful! Redirecting to your Citizen Dashboard...');
      setTimeout(() => {
        navigate('/citizen/dashboard');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: <User size={18} />, placeholder: 'Meghana Rao' },
    { name: 'email', label: 'Email Address', type: 'email', icon: <Mail size={18} />, placeholder: 'citizen@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: <Phone size={18} />, placeholder: '+91 98765 43210' },
    { name: 'password', label: 'Password (min 6 characters)', type: 'password', icon: <Lock size={18} />, placeholder: 'Create password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: <Lock size={18} />, placeholder: 'Re-enter password' },
  ];

  return (
    <div style={{ maxWidth: '480px', margin: '3rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981, #047857)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <UserPlus size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
            Citizen Registration
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
            Create an EcoCycle citizen account to book pickups and track your environmental contribution
          </p>
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
          {fields.map((f) => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-title)' }}>
                {f.label}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  {f.icon}
                </span>
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
                <Loader2 size={18} className="animate-spin" /> Creating Citizen Account...
              </>
            ) : (
              <>
                <UserPlus size={18} /> Register as Citizen
              </>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Already registered? <Link to="/login?tab=citizen" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Sign in here</Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          Are you an administrator? <Link to="/login?tab=admin" style={{ fontWeight: 600, color: '#065f46' }}>Admin Portal Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
