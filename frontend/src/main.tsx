import 'assets/GlobalStyles.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { establecerVariables } from 'configuraciones/LocalStorage';
import MiddlewareApp from 'app/MiddlewareApp';
import 'driver.js/dist/driver.css';

establecerVariables();

const docRoot = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(docRoot).render(
  <React.StrictMode>
    <MiddlewareApp />
  </React.StrictMode>
);
