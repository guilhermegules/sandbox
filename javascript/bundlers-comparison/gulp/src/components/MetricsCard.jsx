import React from 'react';

export function MetricsCard({ label, value, subtext }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {subtext && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{subtext}</div>}
    </div>
  );
}
