import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';

const container = document.getElementById('App');
const root = createRoot(container);

 /* 
    #TODO: App Component
      - [ ] Error Boundary
*/
root.render(<App />);
