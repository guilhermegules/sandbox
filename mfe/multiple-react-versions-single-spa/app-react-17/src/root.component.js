import React from 'react';

export default function Root() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#61dafb', marginTop: 0 }}>React 17</h2>
      <p>This app is running <strong>React 17.0.2</strong></p>
      <p>React version: <code>{React.version}</code></p>
    </div>
  );
}
