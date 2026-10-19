import React, { useState } from 'react';
import { useEwaste } from '../context/EwasteContext';
import { ShieldCheck, Users, Package, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { requests, setRequests, agents, users, addToast } = useEwaste();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? requests : requests.filter((r) => r.status === filter);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((r) => r.id === id ? {
        ...r,
        status: 'Approved',
        updatedAt: new Date().toISOString(),
        statusHistory: [...r.statusHistory, { status: 'Approved', timestamp: new Date().toISOString(), note: 'Approved by admin.' }]
      } : r)
    );
    addToast({ type: 'success', title: 'Request approved', message: id, timeout: 3000 });
  };

  const handleAssignAgent = (requestId, agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    setRequests((prev) =>
      prev.map((r) => r.id === requestId ? {
        ...r,
        status: 'Pickup Scheduled',
        assignedAgentId: agentId,
        updatedAt: new Date().toISOString(),
        statusHistory: [...r.statusHistory, { status: 'Pickup Scheduled', timestamp: new Date().toISOString(), note: `Assigned to Agent ${agent?.name || agentId}.` }]
      } : r)
    );
    addToast({ type: 'info', title: 'Agent assigned', message: `${agent?.name} → ${requestId}`, timeout: 3000 });
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((r) => r.id === id ? {
        ...r,
        status: 'Rejected',
        updatedAt: new Date().toISOString(),
        statusHistory: [...r.statusHistory, { status: 'Rejected', timestamp: new Date().toISOString(), note: 'Rejected by admin.' }]
      } : r)
    );
    addToast({ type: 'error', title: 'Request rejected', message: id, timeout: 3000 });
  };

  const statuses = ['All', 'Pending', 'Approved', 'Pickup Scheduled', 'Collected', 'Sent for Recycling', 'Recycling Completed'];

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck size={22} /> Admin Portal
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Manage pickup requests, assign agents, and oversee operations</p>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Package size={20} style={{ color: '#059669' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Total</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Clock size={20} style={{ color: '#f59e0b' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.filter(r => r.status === 'Pending').length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Pending</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Truck size={20} style={{ color: '#3b82f6' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.filter(r => r.status === 'Pickup Scheduled' || r.status === 'Collected').length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Active</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Users size={20} style={{ color: '#8b5cf6' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{users.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Users</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={filter === s ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding: '0.35rem 0.8rem', fontSize: '0.82rem' }}>
            {s} {s !== 'All' && `(${requests.filter(r => r.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="card" style={{ padding: '1rem', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Citizen</th>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={tdStyle}><strong>{req.id}</strong></td>
                <td style={tdStyle}>{req.userName}</td>
                <td style={tdStyle}>{req.itemName?.substring(0, 35)}</td>
                <td style={tdStyle}>
                  <span style={{ padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 600, backgroundColor: '#d1fae5', color: '#047857' }}>{req.status}</span>
                </td>
                <td style={tdStyle}>{req.weightKg} kg</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {req.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(req.id)} style={{ ...actionBtn, backgroundColor: '#d1fae5', color: '#047857' }}>
                          <CheckCircle2 size={13} /> Approve
                        </button>
                        <button onClick={() => handleReject(req.id)} style={{ ...actionBtn, backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                          <XCircle size={13} /> Reject
                        </button>
                      </>
                    )}
                    {req.status === 'Approved' && (
                      <select onChange={(e) => e.target.value && handleAssignAgent(req.id, e.target.value)} style={{ fontSize: '0.78rem', padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                        <option value="">Assign agent...</option>
                        {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No requests match this filter.</p>
        )}
      </div>
    </div>
  );
};

const thStyle = { textAlign: 'left', padding: '0.6rem 0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.76rem', textTransform: 'uppercase' };
const tdStyle = { padding: '0.6rem 0.7rem', color: 'var(--color-text-body)' };
const actionBtn = { display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.76rem', fontWeight: 600 };

export default AdminDashboard;
