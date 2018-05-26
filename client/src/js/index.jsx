import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import '../styles/index.scss';
import configureStore from './store/configureStore';
import App from './app';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
