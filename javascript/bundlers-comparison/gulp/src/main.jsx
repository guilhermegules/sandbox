import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      bundler="Gulp (Legacy)"
      badgeClass="badge-webpack"
      runtime="Node Streams (Vinyl / Pipe)"
      language="JavaScript (Task Runner)"
      category="Legacy Streaming Task Runner"
    />
  </React.StrictMode>
);
