import React from 'react';
import { Clock, CheckCircle2, Truck, Factory, Award, XCircle, Package, Calendar } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const config = {
    'Pending': { bg: '#fef3c7', text: '#92400e', icon: <Clock size={13} /> },
    'Approved': { bg: '#dbeafe', text: '#1e40af', icon: <CheckCircle2 size={13} /> },
    'Pickup Scheduled': { bg: '#e0e7ff', text: '#3730a3', icon: <Calendar size={13} /> },
    'Collected': { bg: '#d1fae5', text: '#065f46', icon: <Truck size={13} /> },
    'Sent for Recycling': { bg: '#fce7f3', text: '#9d174d', icon: <Factory size={13} /> },
    'Recycling Completed': { bg: '#d1fae5', text: '#047857', icon: <Award size={13} /> },
    'Rejected': { bg: '#fee2e2', text: '#b91c1c', icon: <XCircle size={13} /> },
  };

  const c = config[status] || { bg: '#f3f4f6', text: '#374151', icon: <Package size={13} /> };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
      padding: '0.2rem 0.6rem', borderRadius: '20px',
      fontSize: '0.78rem', fontWeight: 600,
      backgroundColor: c.bg, color: c.text
    }}>
      {c.icon} {status}
    </span>
  );
};

export default StatusBadge;
