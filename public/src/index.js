import React, { Profiler } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

const container = document.getElementById('App');
const root = createRoot(container);

root.render(
  <Profiler id="App">
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Profiler>
);
