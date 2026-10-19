import React from 'react';
import { useEwaste } from '../context/EwasteContext';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

const NotificationsPage = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useEwaste();
  const unread = notifications.filter((n) => !n.read).length;

  const typeIcon = {
    success: <CheckCircle2 size={18} style={{ color: '#10b981' }} />,
    info: <Info size={18} style={{ color: '#3b82f6' }} />,
    warning: <AlertTriangle size={18} style={{ color: '#f59e0b' }} />,
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-title)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={22} /> Notifications
          {unread > 0 && <span style={{ fontSize: '0.85rem', padding: '0.15rem 0.55rem', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 600 }}>{unread} new</span>}
        </h1>
        {unread > 0 && (
          <button onClick={markAllNotificationsRead} className="btn btn-outline" style={{ padding: '0.35rem 0.8rem', fontSize: '0.82rem' }}>
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Bell size={40} style={{ color: 'var(--color-text-light)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>No notifications yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className="card"
              style={{
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                backgroundColor: n.read ? 'white' : '#f0fdf4',
                borderLeft: n.read ? '3px solid transparent' : '3px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ marginTop: '2px' }}>{typeIcon[n.type] || typeIcon.info}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-title)' }}>{n.title}</span>
                    {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', margin: 0 }}>{n.message}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(n.timestamp).toLocaleString()}</span>
                    {n.requestId && (
                      <Link to={`/track?id=${n.requestId}`} style={{ fontSize: '0.78rem', fontWeight: 600 }} onClick={(e) => e.stopPropagation()}>
                        View request →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
