import React from 'react';

export function ItemGrid({ count = 24 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Component #${i + 1}`,
    metric: `${((i + 1) * 1.618).toFixed(2)} ops/s`,
  }));

  return (
    <div>
      <h3 style={{ margin: '1.5rem 0 0.5rem 0' }}>Rendered Component Matrix ({count} units)</h3>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-index">NODE-{item.id.toString().padStart(3, '0')}</div>
            <div className="item-title">{item.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#58a6ff', marginTop: '0.25rem' }}>{item.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
