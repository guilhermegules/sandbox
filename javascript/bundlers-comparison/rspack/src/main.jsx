import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="Rspack"
      badgeClass="badge-rspack"
      runtime="Rust Rspack Core"
      language="Rust + C++"
      category="High-Performance Webpack-Compatible Bundler"
    />
  </React.StrictMode>
);
