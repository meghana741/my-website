import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { STATUS_STEPS } from '../data/mockData';
import { Search, CheckCircle2, Circle, Clock, Truck, Factory, Award, Package } from 'lucide-react';

const PickupTracking = () => {
  const { requests } = useEwaste();
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');

  const selectedRequest = requests.find((r) => r.id === searchId);

  const statusIcons = {
    'Pending': <Clock size={18} />,
    'Approved': <CheckCircle2 size={18} />,
    'Pickup Scheduled': <Package size={18} />,
    'Collected': <Truck size={18} />,
    'Sent for Recycling': <Factory size={18} />,
    'Recycling Completed': <Award size={18} />,
  };

  const currentStepIndex = selectedRequest ? STATUS_STEPS.indexOf(selectedRequest.status) : -1;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Search size={22} /> Track Pickup Request
      </h1>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            className="input"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Request ID (e.g. EW-2026-1042)"
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      {/* Quick links */}
      {!selectedRequest && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-title)' }}>All Requests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {requests.map((r) => (
              <button key={r.id} onClick={() => setSearchId(r.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{r.id}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>{r.itemName?.substring(0, 30)}</span>
                <span style={{ fontSize: '0.78rem', padding: '0.15rem 0.5rem', borderRadius: '12px', backgroundColor: '#d1fae5', color: '#047857', fontWeight: 600 }}>{r.status}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Request Details */}
      {selectedRequest && (
        <>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-title)' }}>{selectedRequest.id}</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{selectedRequest.itemName}</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, backgroundColor: '#d1fae5', color: '#047857' }}>
                {selectedRequest.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><strong>Category:</strong> {selectedRequest.category}</div>
              <div><strong>Quantity:</strong> {selectedRequest.quantity}</div>
              <div><strong>Weight:</strong> {selectedRequest.weightKg} kg</div>
              <div><strong>Condition:</strong> {selectedRequest.condition}</div>
              <div><strong>Preferred Date:</strong> {selectedRequest.preferredDate}</div>
              <div><strong>Time Slot:</strong> {selectedRequest.timeSlot}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-title)' }}>Status Timeline</h3>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {STATUS_STEPS.map((step, idx) => {
                const historyEntry = selectedRequest.statusHistory?.find((h) => h.status === step);
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} style={{ position: 'relative', paddingBottom: idx < STATUS_STEPS.length - 1 ? '2rem' : '0', paddingLeft: '1.5rem' }}>
                    {/* Connector line */}
                    {idx < STATUS_STEPS.length - 1 && (
                      <div style={{ position: 'absolute', left: '-1rem', top: '28px', width: '2px', height: 'calc(100% - 8px)', backgroundColor: isCompleted ? '#10b981' : 'var(--color-border)' }} />
                    )}
                    {/* Circle / Icon */}
                    <div style={{ position: 'absolute', left: '-1.65rem', top: '2px', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isCompleted ? '#10b981' : 'white', border: isCompleted ? 'none' : '2px solid var(--color-border)', color: isCompleted ? 'white' : 'var(--color-text-muted)' }}>
                      {isCompleted ? statusIcons[step] || <CheckCircle2 size={16} /> : <Circle size={14} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: isCurrent ? 800 : 600, fontSize: '0.92rem', color: isCompleted ? 'var(--color-text-title)' : 'var(--color-text-muted)' }}>
                        {step}
                      </div>
                      {historyEntry && (
                        <>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                            {new Date(historyEntry.timestamp).toLocaleString()}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-body)', marginTop: '0.2rem' }}>
                            {historyEntry.note}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button onClick={() => setSearchId('')} className="btn btn-outline">← Back to all requests</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PickupTracking;
