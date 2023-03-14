import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </Provider>
);

