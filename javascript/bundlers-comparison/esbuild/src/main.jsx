import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="esbuild"
      badgeClass="badge-esbuild"
      runtime="esbuild Core"
      language="Go (Native Executable)"
      category="Ultra-fast Low-Level Bundler"
    />
  </React.StrictMode>
);
