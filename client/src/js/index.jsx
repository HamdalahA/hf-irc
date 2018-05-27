import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';
import '../styles/index.scss';
import configureStore from './store/configureStore';
import App from './app';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser, logout } from './actions/user/signin';

const store = configureStore();

if (localStorage.currentUser) {
  setAuthorizationToken(localStorage.currentUser);
  const decToken = jwtDecode(localStorage.currentUser);
  const dateNow = new Date().getTime() / 1000;

  if (decToken.exp < dateNow) {
    store.dispatch(logout());
  } else {
    store.dispatch(setCurrentUser(decToken));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
