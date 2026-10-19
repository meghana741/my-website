import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';

const Register = () => {
  const { setCurrentUser, addToast } = useEwaste();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      addToast({ type: 'error', title: 'Passwords do not match', timeout: 3000 });
      return;
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: 'citizen',
      joinedDate: new Date().toISOString().split('T')[0],
      totalRequests: 0,
      totalWeightKg: 0,
      ecoPoints: 0,
      status: 'Active',
      address: '',
      city: ''
    };
    setCurrentUser(newUser);
    addToast({ type: 'success', title: 'Account created!', message: `Welcome, ${form.name}`, timeout: 3000 });
    navigate('/dashboard');
  };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: <User size={18} />, placeholder: 'Your full name' },
    { name: 'email', label: 'Email Address', type: 'email', icon: <Mail size={18} />, placeholder: 'you@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: <Phone size={18} />, placeholder: '+91 98765 43210' },
    { name: 'password', label: 'Password', type: 'password', icon: <Lock size={18} />, placeholder: 'Create a password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: <Lock size={18} />, placeholder: 'Repeat password' },
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {fields.map((f) => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-title)' }}>{f.label}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>{f.icon}</span>
                <input className="input" type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} required style={{ paddingLeft: '40px' }} />
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.7rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            <UserPlus size={18} /> Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
