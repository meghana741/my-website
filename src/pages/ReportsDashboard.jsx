import React from 'react';
import { MONTHLY_STATS } from '../data/mockData';
import { useEwaste } from '../context/EwasteContext';
import { BarChart3, Leaf, Recycle, TrendingUp, Weight } from 'lucide-react';

const ReportsDashboard = () => {
  const { requests } = useEwaste();

  const totalCollected = MONTHLY_STATS.reduce((s, m) => s + m.collectedKg, 0);
  const totalRecycled = MONTHLY_STATS.reduce((s, m) => s + m.recycledKg, 0);
  const totalCO2 = MONTHLY_STATS.reduce((s, m) => s + m.co2SavedKg, 0);
  const maxCollected = Math.max(...MONTHLY_STATS.map((m) => m.collectedKg));

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart3 size={22} /> Reports & Environmental Impact
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Track our collective impact on the environment</p>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <Weight size={22} style={{ color: '#059669', marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{(totalCollected / 1000).toFixed(1)}T</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Collected</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
          <Recycle size={22} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{(totalRecycled / 1000).toFixed(1)}T</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Recycled</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #34d399' }}>
          <Leaf size={22} style={{ color: '#34d399', marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{(totalCO2 / 1000).toFixed(1)}T</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>CO₂ Saved</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
          <TrendingUp size={22} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{requests.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Requests</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-title)' }}>Monthly Collection (kg)</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '200px', paddingBottom: '2rem' }}>
          {MONTHLY_STATS.map((m, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.3rem' }}>{m.collectedKg}</div>
              <div style={{ width: '100%', maxWidth: '60px', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg, #10b981, #059669)', height: `${(m.collectedKg / maxCollected) * 100}%`, transition: 'height 0.5s ease', minHeight: '8px' }} />
              <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', textAlign: 'center', fontWeight: 600 }}>{m.month.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly details table */}
      <div className="card" style={{ padding: '1.5rem', overflow: 'auto' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>Detailed Monthly Data</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={thStyle}>Month</th>
              <th style={thStyle}>Collected (kg)</th>
              <th style={thStyle}>Recycled (kg)</th>
              <th style={thStyle}>Reused (kg)</th>
              <th style={thStyle}>CO₂ Saved (kg)</th>
            </tr>
          </thead>
          <tbody>
            {MONTHLY_STATS.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={tdStyle}>{m.month}</td>
                <td style={tdStyle}>{m.collectedKg.toLocaleString()}</td>
                <td style={tdStyle}>{m.recycledKg.toLocaleString()}</td>
                <td style={tdStyle}>{m.reusedKg.toLocaleString()}</td>
                <td style={{ ...tdStyle, color: '#059669', fontWeight: 600 }}>{m.co2SavedKg.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { textAlign: 'left', padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.03em' };
const tdStyle = { padding: '0.65rem 0.75rem', color: 'var(--color-text-body)' };

export default ReportsDashboard;
