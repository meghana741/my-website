import React, { useState, useEffect } from 'react';
import { useEwaste } from '../context/EwasteContext';
import { Link } from 'react-router-dom';
import { reportsAPI } from '../api/api';
import { LayoutDashboard, Clock, CheckCircle2, Truck, Package, CalendarPlus, Loader2, Leaf, TreePine } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser, requests, loading } = useEwaste();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    async function loadStats() {
      if (!currentUser) return;
      setStatsLoading(true);
      try {
        const res = await reportsAPI.getUserDashboard();
        if (res?.dashboard) {
          setDashboardStats(res.dashboard);
        }
      } catch (err) {
        console.warn('Dashboard stats fallback to request calculation:', err.message);
      } finally {
        setStatsLoading(false);
      }
    }
    loadStats();
  }, [currentUser, requests]);

  // Filter requests belonging to this user
  const userRequests = requests;

  const pending = dashboardStats?.pendingRequests ?? userRequests.filter((r) => r.status === 'Pending').length;
  const inProgress = (dashboardStats?.approvedRequests || 0) + (dashboardStats?.scheduledPickups || 0) + (dashboardStats?.collectedRequests || 0) || userRequests.filter((r) => r.status === 'Approved' || r.status === 'Pickup Scheduled' || r.status === 'Collected' || r.status === 'Sent for Recycling').length;
  const completed = dashboardStats?.completedCollections ?? userRequests.filter((r) => r.status === 'Recycling Completed').length;
  const totalWeight = dashboardStats?.totalWeightContributed ?? userRequests.reduce((s, r) => s + (parseFloat(r.weightKg) || 0), 0).toFixed(1);
  const co2Saved = dashboardStats?.co2SavedKg ?? (totalWeight * 1.85).toFixed(1);

  const stats = [
    { label: 'Total Requests', value: dashboardStats?.totalRequests ?? userRequests.length, icon: <Package size={22} />, color: '#059669' },
    { label: 'Pending Review', value: pending, icon: <Clock size={22} />, color: '#f59e0b' },
    { label: 'In Progress', value: inProgress, icon: <Truck size={22} />, color: '#3b82f6' },
    { label: 'Recycling Completed', value: completed, icon: <CheckCircle2 size={22} />, color: '#10b981' },
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={24} /> Citizen Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Welcome back, <strong style={{ color: 'var(--color-text-title)' }}>{currentUser?.name || 'Citizen'}</strong>
          </p>
        </div>
        <Link to="/schedule-pickup" className="btn btn-primary">
          <CalendarPlus size={16} /> Schedule Pickup
        </Link>
      </div>

      {/* Environmental Eco Impact Summary Banner */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #a7f3d0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>Your Eco-Contribution</div>
              <div style={{ fontSize: '0.85rem', color: '#047857' }}>Doorstep pickups verified by certified green recyclers</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>Weight Recycled</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46' }}>{totalWeight} <span style={{ fontSize: '0.85rem' }}>kg</span></div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>CO₂ Prevented</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46' }}>{co2Saved} <span style={{ fontSize: '0.85rem' }}>kg</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ color: s.color, marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
              {statsLoading ? '-' : s.value}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Requests Table */}
      <div className="card" style={{ padding: '1.5rem', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-title)' }}>My Pickup Requests</h2>
          {loading && <Loader2 size={18} className="animate-spin" style={{ color: 'var(--color-primary)' }} />}
        </div>

        {userRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <Package size={40} style={{ color: 'var(--color-text-light)', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>You have not submitted any pickup requests yet.</p>
            <Link to="/schedule-pickup" className="btn btn-primary"><CalendarPlus size={16} /> Schedule First Pickup</Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={thStyle}>Tracking ID</th>
                <th style={thStyle}>Item Description</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Weight</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={tdStyle}>
                    <Link to={`/track?id=${req.id}`} style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      {req.id}
                    </Link>
                  </td>
                  <td style={tdStyle}>{req.itemName}</td>
                  <td style={tdStyle}>{req.category}</td>
                  <td style={tdStyle}>{req.weightKg} kg</td>
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
    'Rejected': { bg: '#fee2e2', text: '#b91c1c' },
  };
  const c = colors[status] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, backgroundColor: c.bg, color: c.text }}>
      {status}
    </span>
  );
};

export default UserDashboard;
