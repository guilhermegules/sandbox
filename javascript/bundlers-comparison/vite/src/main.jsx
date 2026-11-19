import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="Vite"
      badgeClass="badge-vite"
      runtime="esbuild (Dev) / Rollup (Prod)"
      language="Go + TypeScript"
      category="Native ESM Dev Server + Bundler"
    />
  </React.StrictMode>
);
