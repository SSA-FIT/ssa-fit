import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  // Mock서버 연동,해제
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
