import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { ACCEPTED_CATEGORIES } from '../data/mockData';
import { CalendarPlus, Package, MapPin, Clock, FileText } from 'lucide-react';

const RegisterEwaste = () => {
  const { currentUser, setRequests, requests, addToast } = useEwaste();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    itemName: '',
    category: '',
    quantity: 1,
    condition: 'Working (Reusable)',
    weightKg: '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    pincode: '',
    preferredDate: '',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) || 1 : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: `EW-2026-${1100 + requests.length}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Guest User',
      userEmail: currentUser?.email || '',
      userPhone: currentUser?.phone || '',
      ...form,
      weightKg: parseFloat(form.weightKg) || 1,
      status: 'Pending',
      assignedAgentId: null,
      recyclingType: form.condition.includes('Reusable') ? 'Reusable' : 'Recyclable',
      recyclerId: null,
      recyclingStatus: 'Pending Verification',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        { status: 'Pending', timestamp: new Date().toISOString(), note: 'Request submitted online by citizen.' }
      ]
    };
    setRequests((prev) => [newRequest, ...prev]);
    addToast({ type: 'success', title: 'Pickup scheduled!', message: `Request ${newRequest.id} created`, timeout: 4000 });
    navigate('/track');
  };

  const conditions = ['Working (Reusable)', 'Minor Defect (Repairable)', 'Non-working / Scrap (Recycle only)', 'Mixed (Non-working)'];
  const timeSlots = ['Morning (09:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 04:00 PM)', 'Evening (04:00 PM - 07:00 PM)'];

  const inputStyle = { paddingLeft: '40px' };
  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-title)' };
  const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' };

  return (
    <div style={{ maxWidth: '640px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
            <CalendarPlus size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)' }}>Schedule E-Waste Pickup</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>Our agent will collect your e-waste right from your doorstep</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Item Name */}
          <div>
            <label style={labelStyle}>Item Name / Description</label>
            <div style={{ position: 'relative' }}>
              <Package size={18} style={iconStyle} />
              <input className="input" name="itemName" value={form.itemName} onChange={handleChange} placeholder="e.g. Old Dell Laptop & Charger" required style={inputStyle} />
            </div>
          </div>

          {/* Category & Quantity row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select className="input" name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select category</option>
                {ACCEPTED_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Quantity</label>
              <input className="input" type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} />
            </div>
          </div>

          {/* Condition & Weight */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Condition</label>
              <select className="input" name="condition" value={form.condition} onChange={handleChange}>
                {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Approx. Weight (kg)</label>
              <input className="input" type="number" name="weightKg" step="0.1" min="0.1" value={form.weightKg} onChange={handleChange} placeholder="e.g. 2.5" required />
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={labelStyle}>Pickup Address</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={iconStyle} />
              <input className="input" name="address" value={form.address} onChange={handleChange} placeholder="Full address" required style={inputStyle} />
            </div>
          </div>

          {/* City & Pincode */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="Bengaluru" required />
            </div>
            <div>
              <label style={labelStyle}>Pincode</label>
              <input className="input" name="pincode" value={form.pincode} onChange={handleChange} placeholder="560038" required />
            </div>
          </div>

          {/* Date & Time Slot */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Preferred Date</label>
              <div style={{ position: 'relative' }}>
                <input className="input" type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Time Slot</label>
              <div style={{ position: 'relative' }}>
                <select className="input" name="timeSlot" value={form.timeSlot} onChange={handleChange}>
                  {timeSlots.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label style={labelStyle}>Special Instructions (Optional)</label>
            <div style={{ position: 'relative' }}>
              <FileText size={18} style={{ ...iconStyle, top: '18px' }} />
              <textarea className="input" name="instructions" value={form.instructions} onChange={handleChange} rows={3} placeholder="e.g. Ring buzzer 402, items near main door" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            <CalendarPlus size={18} /> Submit Pickup Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEwaste;
