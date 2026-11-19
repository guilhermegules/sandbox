import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="Rsbuild"
      badgeClass="badge-rsbuild"
      runtime="Rspack Engine + Zero-config Layer"
      language="Rust (Rspack) + TypeScript"
      category="Next-Generation Build Tool (Vite alternative)"
    />
  </React.StrictMode>
);
