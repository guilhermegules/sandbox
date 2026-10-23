import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="Webpack"
      badgeClass="badge-webpack"
      runtime="Webpack 5 + Babel/Loaders"
      language="JavaScript / Node.js"
      category="Classic Configurable Standard"
    />
  </React.StrictMode>
);
