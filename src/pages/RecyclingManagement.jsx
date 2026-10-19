import React, { useState, useEffect } from 'react';
import { useEwaste } from '../context/EwasteContext';
import { recyclingAPI } from '../api/api';
import { Factory, Leaf, ShieldCheck, MapPin, Gauge, Loader2, Sparkles } from 'lucide-react';

const RecyclingManagement = () => {
  const { requests, recyclingPartners } = useEwaste();
  const [batches, setBatches] = useState([]);
  const [centers, setCenters] = useState(recyclingPartners);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    async function loadRecyclingData() {
      setLoading(true);
      try {
        const [batchRes, centerRes] = await Promise.all([
          recyclingAPI.getBatches().catch(() => null),
          recyclingAPI.getCenters().catch(() => null)
        ]);

        if (batchRes?.batches) {
          setBatches(batchRes.batches);
        }
        if (centerRes?.centers?.length) {
          setCenters(centerRes.centers);
        }
      } catch (err) {
        console.warn('Recycling data load error:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadRecyclingData();
  }, []);

  const inProcessing = batches.filter((b) => b.status === 'In Processing' || b.status === 'In Inspection');
  const completed = batches.filter((b) => b.status === 'Completed' || b.status === 'Materials Recovered' || b.status === 'Refurbished' || b.status === 'Safely Disposed');

  const filteredBatches = activeTab === 'All' ? batches : batches.filter(b => b.itemType === activeTab);

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Factory size={22} /> Recycling & Segregation Hub
        </h1>
        {loading && <Loader2 size={18} className="animate-spin" style={{ color: 'var(--color-primary)' }} />}
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Segregated handling of reusable components, recyclable precious metals, and hazardous substances
      </p>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#f59e0b', marginBottom: '0.5rem' }}><Gauge size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{inProcessing.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Active In Processing</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#10b981', marginBottom: '0.5rem' }}><Leaf size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{completed.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Batches Completed</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ color: '#059669', marginBottom: '0.5rem' }}><ShieldCheck size={22} /></div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-title)' }}>{centers.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Certified Facilities</div>
        </div>
      </div>

      {/* Segregation Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['All', 'Reusable', 'Recyclable', 'Hazardous'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'btn btn-primary' : 'btn btn-outline'}
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Batches Table */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '2.5rem', overflow: 'auto' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>
          Recycling & Segregation Batches ({filteredBatches.length})
        </h2>
        {filteredBatches.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>No batches registered for this category.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={thStyle}>Batch Number</th>
                <th style={thStyle}>Item Classification</th>
                <th style={thStyle}>Weight</th>
                <th style={thStyle}>Facility</th>
                <th style={thStyle}>Recovery Rate</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={tdStyle}><strong>{b.batchNumber}</strong></td>
                  <td style={tdStyle}>
                    <div>{b.itemName}</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: b.itemType === 'Hazardous' ? '#b91c1c' : b.itemType === 'Reusable' ? '#047857' : '#1e40af' }}>
                      [{b.itemType}]
                    </span>
                  </td>
                  <td style={tdStyle}>{b.weight} kg</td>
                  <td style={tdStyle}>{b.recyclerFacility}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div style={{ width: '50px', height: '6px', borderRadius: '3px', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
                        <div style={{ width: `${b.recoveryRate || 0}%`, height: '100%', backgroundColor: '#10b981' }} />
                      </div>
                      <span>{b.recoveryRate}%</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#d1fae5', color: '#047857' }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Partners Grid */}
      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>Certified Recycling Facilities</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {centers.map((p, idx) => (
          <div key={p.id || idx} className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-body)', marginBottom: '0.5rem' }}>{p.specialization || p.specialty}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#059669', marginBottom: '0.35rem' }}>
              <ShieldCheck size={14} /> {p.licenseNumber || p.isoCertified || 'Certified Partner'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              <MapPin size={14} /> {p.address ? `${p.address}, ${p.city}` : p.city || p.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const thStyle = { textAlign: 'left', padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase' };
const tdStyle = { padding: '0.65rem 0.75rem', color: 'var(--color-text-body)' };

export default RecyclingManagement;
