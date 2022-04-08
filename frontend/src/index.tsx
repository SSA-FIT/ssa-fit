import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import create from './redux/create';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const store = create();
if (process.env.NODE_ENV === 'development') {
  //const { worker } = require('./mocks/browser');
  // Mock서버 연동,해제
  // worker.start();
}
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.warn = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
