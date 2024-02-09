import { createRoot } from 'react-dom/client';
import React from 'react';
import './style.css';
import App from './app';

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <App title="First App" desc="dfdklfdfd" />
    <App title="Second App" age={45} gender="other" />
  </>,
);
