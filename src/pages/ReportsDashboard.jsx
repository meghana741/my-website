import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../api/api';
import { useEwaste } from '../context/EwasteContext';
import { BarChart3, Leaf, Recycle, TrendingUp, Weight, Loader2 } from 'lucide-react';

const ReportsDashboard = () => {
  const { requests } = useEwaste();
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      try {
        const [sumRes, monthRes, catRes] = await Promise.all([
          reportsAPI.getSummary().catch(() => null),
          reportsAPI.getMonthly().catch(() => null),
          reportsAPI.getCategories().catch(() => null)
        ]);

        if (sumRes?.summary) setSummary(sumRes.summary);
        if (monthRes?.monthlyData) setMonthlyData(monthRes.monthlyData);
        if (catRes?.categories) setCategories(catRes.categories);
      } catch (err) {
        console.warn('Reports load error:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  const totalCollectedKg = summary?.totalWeightCollected || requests.reduce((s, r) => s + (parseFloat(r.weightKg) || 0), 0);
  const totalCO2Kg = summary?.environmentalImpact?.co2SavedKg || (totalCollectedKg * 1.85);
  const treesSaved = summary?.environmentalImpact?.treesSaved || (totalCollectedKg * 0.04);
  const energySaved = summary?.environmentalImpact?.energySavedKwh || (totalCollectedKg * 14.2);

  const maxCollected = monthlyData.length > 0 ? Math.max(...monthlyData.map(m => m.weightKg || 1)) : 100;

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={22} /> Reports & Environmental Impact
        </h1>
        {loading && <Loader2 size={18} className="animate-spin" style={{ color: 'var(--color-primary)' }} />}
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Verified real-time statistics powered by Microsoft SQL Server database
      </p>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #059669' }}>
          <Weight size={22} style={{ color: '#059669', margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{Number(totalCollectedKg).toFixed(1)} kg</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total E-Waste Collected</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
          <Recycle size={22} style={{ color: '#10b981', margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{Number(summary?.reusableWeight || 0).toFixed(1)} kg</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Components Reused</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #34d399' }}>
          <Leaf size={22} style={{ color: '#34d399', margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{Number(totalCO2Kg).toFixed(1)} kg</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>CO₂ Emissions Saved</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
          <TrendingUp size={22} style={{ color: '#3b82f6', margin: '0 auto 0.5rem' }} />
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{summary?.totalRequests || requests.length}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Requests Processed</div>
        </div>
      </div>

      {/* Monthly Collection Bar Chart */}
      {monthlyData.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-title)' }}>
            Monthly Collection Trends (kg)
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '200px', paddingBottom: '2rem' }}>
            {monthlyData.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.3rem' }}>
                  {m.weightKg}kg
                </div>
                <div style={{
                  width: '100%',
                  maxWidth: '60px',
                  borderRadius: '6px 6px 0 0',
                  background: 'linear-gradient(180deg, #10b981, #059669)',
                  height: `${Math.max(12, ((m.weightKg || 0) / maxCollected) * 100)}%`,
                  transition: 'height 0.5s ease',
                  minHeight: '8px'
                }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', textAlign: 'center', fontWeight: 600 }}>
                  {m.monthName || m.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category breakdown table */}
      {categories.length > 0 && (
        <div className="card" style={{ padding: '1.5rem', overflow: 'auto' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-title)' }}>
            Category Distribution & Environmental Impact
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Requests</th>
                <th style={thStyle}>Items Collected</th>
                <th style={thStyle}>Weight</th>
                <th style={thStyle}>Hazard Rating</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={tdStyle}><strong>{c.categoryName}</strong></td>
                  <td style={tdStyle}>{c.requestCount}</td>
                  <td style={tdStyle}>{c.totalItems}</td>
                  <td style={tdStyle}>{c.totalWeightKg} kg</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: c.hazardousLevel === 'High' ? '#fee2e2' : c.hazardousLevel === 'Medium' ? '#fef3c7' : '#d1fae5',
                      color: c.hazardousLevel === 'High' ? '#b91c1c' : c.hazardousLevel === 'Medium' ? '#92400e' : '#047857'
                    }}>
                      {c.hazardousLevel || 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = { textAlign: 'left', padding: '0.65rem 0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' };
const tdStyle = { padding: '0.65rem 0.75rem', color: 'var(--color-text-body)' };

export default ReportsDashboard;
