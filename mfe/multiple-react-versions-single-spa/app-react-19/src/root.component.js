import React from 'react';

export default function Root() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#00d8ff', marginTop: 0 }}>React 19</h2>
      <p>This app is running <strong>React 19.0.0</strong></p>
      <p>React version: <code>{React.version}</code></p>
    </div>
  );
}
