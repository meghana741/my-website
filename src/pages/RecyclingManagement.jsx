import React from 'react';
import { useEwaste } from '../context/EwasteContext';
import { RECYCLING_PARTNERS } from '../data/mockData';
import { Factory, Leaf, ShieldCheck, MapPin, Gauge } from 'lucide-react';

const RecyclingManagement = () => {
  const { requests } = useEwaste();

  const inRecycling = requests.filter((r) => r.status === 'Sent for Recycling' || r.recyclingStatus === 'Neutralization Process' || r.recyclingStatus === 'Under Diagnostics');
  const completed = requests.filter((r) => r.status === 'Recycling Completed');

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Factory size={22} /> Recycling Hub
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Certified recycling facilities processing your e-waste responsibly</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#f59e0b', marginBottom: '0.5rem' }}><Gauge size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{inRecycling.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>In Processing</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#10b981', marginBottom: '0.5rem' }}><Leaf size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{completed.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Completed</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#059669', marginBottom: '0.5rem' }}><ShieldCheck size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{RECYCLING_PARTNERS.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Certified Facilities</div>
        </div>
      </div>

      {/* Partners Grid */}
      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>Recycling Partners</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {RECYCLING_PARTNERS.map((p) => (
          <div key={p.id} className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-body)', marginBottom: '0.5rem' }}>{p.specialty}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#059669', marginBottom: '0.35rem' }}>
              <ShieldCheck size={14} /> {p.isoCertified}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              <MapPin size={14} /> {p.location}
            </div>
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'var(--color-gray-100)', borderRadius: '6px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Capacity: {p.capacityTonsPerMonth} tons/mo</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Load: {p.currentLoad}</span>
              </div>
              <div style={{ marginTop: '0.35rem', height: '6px', borderRadius: '3px', backgroundColor: 'var(--color-gray-200)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '3px', backgroundColor: '#10b981', width: p.currentLoad }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecyclingManagement;
