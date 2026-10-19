import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { requestsAPI } from '../api/api';
import { STATUS_STEPS } from '../data/mockData';
import { Search, CheckCircle2, Circle, Clock, Truck, Factory, Award, Package, Loader2, AlertCircle } from 'lucide-react';

const PickupTracking = () => {
  const { requests } = useEwaste();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [trackedRequest, setTrackedRequest] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-search if id is in query params
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setSearchId(idFromUrl);
      performTrack(idFromUrl);
    }
  }, [searchParams]);

  const performTrack = async (idToTrack) => {
    if (!idToTrack.trim()) return;
    setIsSearching(true);
    setErrorMessage('');
    try {
      const res = await requestsAPI.track(idToTrack.trim());
      if (res?.request) {
        setTrackedRequest(res.request);
      }
    } catch (err) {
      // Fallback to local state if offline
      const local = requests.find((r) => r.id === idToTrack.trim() || r.trackingNumber === idToTrack.trim());
      if (local) {
        setTrackedRequest(local);
      } else {
        setTrackedRequest(null);
        setErrorMessage(err.message || `No pickup request found for ${idToTrack}`);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId) {
      setSearchParams({ id: searchId.trim() });
      performTrack(searchId.trim());
    }
  };

  const statusIcons = {
    'Pending': <Clock size={18} />,
    'Approved': <CheckCircle2 size={18} />,
    'Pickup Scheduled': <Package size={18} />,
    'Collected': <Truck size={18} />,
    'Sent for Recycling': <Factory size={18} />,
    'Recycling Completed': <Award size={18} />,
  };

  const currentStepIndex = trackedRequest ? STATUS_STEPS.indexOf(trackedRequest.status) : -1;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Search size={22} /> Track Pickup Request
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            className="input"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Tracking ID (e.g. EW-2026-1001)"
            style={{ paddingLeft: '40px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSearching} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} Track
        </button>
      </form>

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
          fontSize: '0.88rem',
          marginBottom: '1.5rem'
        }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick links to existing requests if none selected */}
      {!trackedRequest && requests.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-title)' }}>Recent Requests in System</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {requests.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSearchId(r.id);
                  setSearchParams({ id: r.id });
                  performTrack(r.id);
                }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.85rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.88rem', textAlign: 'left' }}
              >
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{r.id}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>{r.itemName?.substring(0, 30)}</span>
                <span style={{ fontSize: '0.78rem', padding: '0.15rem 0.5rem', borderRadius: '12px', backgroundColor: '#d1fae5', color: '#047857', fontWeight: 600 }}>{r.status}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Request Details */}
      {trackedRequest && (
        <>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{trackedRequest.trackingNumber || trackedRequest.id}</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{trackedRequest.itemName}</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, backgroundColor: '#d1fae5', color: '#047857' }}>
                {trackedRequest.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-body)' }}>
              <div><strong>Category:</strong> {trackedRequest.categoryName || trackedRequest.category}</div>
              <div><strong>Weight:</strong> {trackedRequest.actualWeight || trackedRequest.estimatedWeight || trackedRequest.weightKg} kg</div>
              <div><strong>Pickup Location:</strong> {trackedRequest.pickupAddress || trackedRequest.address}, {trackedRequest.city}</div>
              <div><strong>Agent Assigned:</strong> {trackedRequest.assignedAgentName || 'To be scheduled'}</div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="card" style={{ padding: '2rem 1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-title)' }}>Collection & Recycling Lifecycle</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: isPassed ? '#10b981' : '#f3f4f6',
                      color: isPassed ? 'white' : '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {statusIcons[step] || <Circle size={16} />}
                    </div>
                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: isCurrent ? 800 : isPassed ? 600 : 400, color: isPassed ? 'var(--color-text-title)' : 'var(--color-text-muted)' }}>
                        {step} {isCurrent && <span style={{ fontSize: '0.72rem', backgroundColor: '#d1fae5', color: '#047857', padding: '0.1rem 0.45rem', borderRadius: '10px', marginLeft: '0.5rem' }}>Active Stage</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Audit History Log from SQL Server */}
          {trackedRequest.timeline && trackedRequest.timeline.length > 0 && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>Activity Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {trackedRequest.timeline.map((item, i) => (
                  <div key={i} style={{ borderLeft: '2px solid #10b981', paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-title)' }}>{item.status}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-body)' }}>{item.description}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                      {new Date(item.timestamp).toLocaleString()} • {item.updatedBy || 'Operations Team'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PickupTracking;
