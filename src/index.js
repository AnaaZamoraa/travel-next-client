import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProviderWrapper } from './contexts/auth.context';
import { ToastProviderWrapper } from './contexts/toast.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProviderWrapper>
      <ToastProviderWrapper>
        <App />
      </ToastProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);

