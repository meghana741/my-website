import React from 'react';
import { useEwaste } from '../context/EwasteContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Clock, CheckCircle2, Truck, Package, CalendarPlus } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser, requests } = useEwaste();
  const userRequests = requests.filter((r) => r.userId === currentUser?.id);

  const pending = userRequests.filter((r) => r.status === 'Pending').length;
  const approved = userRequests.filter((r) => r.status === 'Approved' || r.status === 'Pickup Scheduled').length;
  const completed = userRequests.filter((r) => r.status === 'Recycling Completed').length;
  const totalWeight = userRequests.reduce((s, r) => s + (r.weightKg || 0), 0).toFixed(1);

  const stats = [
    { label: 'Total Requests', value: userRequests.length, icon: <Package size={22} />, color: '#059669' },
    { label: 'Pending', value: pending, icon: <Clock size={22} />, color: '#f59e0b' },
    { label: 'In Progress', value: approved, icon: <Truck size={22} />, color: '#3b82f6' },
    { label: 'Completed', value: completed, icon: <CheckCircle2 size={22} />, color: '#10b981' },
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={24} /> Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Welcome back, {currentUser?.name || 'User'}. Total recycled: {totalWeight} kg</p>
        </div>
        <Link to="/schedule-pickup" className="btn btn-primary"><CalendarPlus size={16} /> New Pickup</Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ color: s.color, marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Requests Table */}
      <div className="card" style={{ padding: '1.5rem', overflow: 'auto' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>Recent Requests</h2>
        {userRequests.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>No requests yet. <Link to="/schedule-pickup" style={{ fontWeight: 600 }}>Schedule your first pickup!</Link></p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.slice(0, 10).map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={tdStyle}><Link to={`/track?id=${req.id}`} style={{ fontWeight: 600 }}>{req.id}</Link></td>
                  <td style={tdStyle}>{req.itemName}</td>
                  <td style={tdStyle}>{req.category}</td>
                  <td style={tdStyle}><StatusPill status={req.status} /></td>
                  <td style={tdStyle}>{new Date(req.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const thStyle = { textAlign: 'left', padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' };
const tdStyle = { padding: '0.65rem 0.75rem', color: 'var(--color-text-body)' };

const StatusPill = ({ status }) => {
  const colors = {
    'Pending': { bg: '#fef3c7', text: '#92400e' },
    'Approved': { bg: '#dbeafe', text: '#1e40af' },
    'Pickup Scheduled': { bg: '#e0e7ff', text: '#3730a3' },
    'Collected': { bg: '#d1fae5', text: '#065f46' },
    'Sent for Recycling': { bg: '#fce7f3', text: '#9d174d' },
    'Recycling Completed': { bg: '#d1fae5', text: '#047857' },
  };
  const c = colors[status] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, backgroundColor: c.bg, color: c.text }}>
      {status}
    </span>
  );
};

export default UserDashboard;
