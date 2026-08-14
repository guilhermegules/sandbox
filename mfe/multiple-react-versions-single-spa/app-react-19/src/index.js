import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  ReactDOMClient: {
    createRoot: ReactDOM.createRoot,
  },
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div>Error loading React 19 app</div>;
  },
  renderType: 'createRoot',
});

export const { bootstrap, mount, unmount } = lifecycles;
