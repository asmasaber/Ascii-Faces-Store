import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

const container = document.getElementById('App');
const root = createRoot(container);

 /* 
    #TODO: App Component
      - [x] Error Boundary
*/
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
