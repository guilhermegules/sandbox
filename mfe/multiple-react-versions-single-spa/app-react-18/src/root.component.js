import React from 'react';

export default function Root() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ color: '#764abc', marginTop: 0 }}>React 18</h2>
      <p>This app is running <strong>React 18.2.0</strong></p>
      <p>React version: <code>{React.version}</code></p>
    </div>
  );
}
