import React from 'react';
import { createRoot } from 'react-dom/client';
import ElementsApp from './ElementsApp';
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ElementsApp />
  </React.StrictMode>
);