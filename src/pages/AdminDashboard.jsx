import React, { useState } from 'react';
import { useEwaste } from '../context/EwasteContext';
import { ShieldCheck, Users, Package, CheckCircle2, Clock, Truck, XCircle, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { requests, agents, users, updateRequestStatus, schedulePickup, loading } = useEwaste();
  const [filter, setFilter] = useState('All');
  const [processingId, setProcessingId] = useState(null);

  const filtered = filter === 'All' ? requests : requests.filter((r) => r.status === filter);

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await updateRequestStatus(id, 'Approved', 'Verified and approved by administrator');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Please enter the rejection reason:', 'Item not compliant with safe e-waste handling standards');
    if (reason === null) return;
    setProcessingId(id);
    try {
      await updateRequestStatus(id, 'Rejected', reason);
    } finally {
      setProcessingId(null);
    }
  };

  const handleAssignAgent = async (requestId, agentId) => {
    const agent = agents.find((a) => String(a.id) === String(agentId));
    if (!agent) return;
    setProcessingId(requestId);
    try {
      await schedulePickup(requestId, agent.id, agent.name);
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateStatus = async (requestId, nextStatus) => {
    setProcessingId(requestId);
    try {
      await updateRequestStatus(requestId, nextStatus);
    } finally {
      setProcessingId(null);
    }
  };

  const statuses = [
    'All',
    'Pending',
    'Approved',
    'Pickup Scheduled',
    'Collected',
    'Sent for Recycling',
    'Recycling Completed'
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={22} /> Admin Operations Portal
        </h1>
        {loading && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Syncing with SQL Server...</span>}
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Manage live pickup requests, assign collection agents, and progress items through the recycling lifecycle
      </p>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Package size={20} style={{ color: '#059669', margin: '0 auto 0.25rem' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Total Requests</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Clock size={20} style={{ color: '#f59e0b', margin: '0 auto 0.25rem' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.filter(r => r.status === 'Pending').length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Pending</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Truck size={20} style={{ color: '#3b82f6', margin: '0 auto 0.25rem' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.filter(r => r.status === 'Pickup Scheduled' || r.status === 'Collected').length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>In Logistics</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <CheckCircle2 size={20} style={{ color: '#10b981', margin: '0 auto 0.25rem' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{requests.filter(r => r.status === 'Recycling Completed').length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Completed</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <Users size={20} style={{ color: '#8b5cf6', margin: '0 auto 0.25rem' }} />
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{users.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>System Users</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={filter === s ? 'btn btn-primary' : 'btn btn-outline'}
            style={{ padding: '0.35rem 0.8rem', fontSize: '0.82rem' }}
          >
            {s} {s !== 'All' && `(${requests.filter(r => r.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="card" style={{ padding: '1rem', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={thStyle}>Request ID</th>
              <th style={thStyle}>User / Contact</th>
              <th style={thStyle}>Item & Category</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Agent</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={tdStyle}><strong>{req.id}</strong></td>
                <td style={tdStyle}>
                  <div>{req.userName || req.userEmail || 'Citizen'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{req.contactPhone || req.userPhone || req.city}</div>
                </td>
                <td style={tdStyle}>
                  <div>{req.itemName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{req.category} (Qty: {req.quantity || 1})</div>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    backgroundColor: req.status === 'Pending' ? '#fef3c7' : req.status === 'Rejected' ? '#fee2e2' : '#d1fae5',
                    color: req.status === 'Pending' ? '#92400e' : req.status === 'Rejected' ? '#b91c1c' : '#047857'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  {req.assignedAgentName || (req.assignedAgentId ? `Agent #${req.assignedAgentId}` : <span style={{ color: 'var(--color-text-muted)' }}>Unassigned</span>)}
                </td>
                <td style={tdStyle}>{req.weightKg} kg</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {processingId === req.id ? (
                      <Loader2 size={16} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                    ) : (
                      <>
                        {req.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(req.id)}
                              style={{ ...actionBtn, backgroundColor: '#d1fae5', color: '#047857' }}
                            >
                              <CheckCircle2 size={13} /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              style={{ ...actionBtn, backgroundColor: '#fee2e2', color: '#b91c1c' }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </>
                        )}

                        {req.status === 'Approved' && (
                          <select
                            onChange={(e) => e.target.value && handleAssignAgent(req.id, e.target.value)}
                            style={{ fontSize: '0.78rem', padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                          >
                            <option value="">Assign agent...</option>
                            {agents.map((a) => (
                              <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                          </select>
                        )}

                        {req.status === 'Pickup Scheduled' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Collected')}
                            style={{ ...actionBtn, backgroundColor: '#dbeafe', color: '#1e40af' }}
                          >
                            Mark Collected
                          </button>
                        )}

                        {req.status === 'Collected' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Sent for Recycling')}
                            style={{ ...actionBtn, backgroundColor: '#fce7f3', color: '#9d174d' }}
                          >
                            Send to Recycler
                          </button>
                        )}

                        {req.status === 'Sent for Recycling' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'Recycling Completed')}
                            style={{ ...actionBtn, backgroundColor: '#d1fae5', color: '#047857' }}
                          >
                            Mark Completed
                          </button>
                        )}
                      </>
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
const actionBtn = { display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.55rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.76rem', fontWeight: 600 };

export default AdminDashboard;
