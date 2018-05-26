import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from '../types';


export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const setCurrentUserFailure = error => ({
  type: SET_CURRENT_USER_ERROR,
  error
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('currentUser');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export const userSigninRequest = userData => dispatch =>
  axios.post('/api/v1/user/signin', userData).then((res) => {
    const { token } = res.data;
    const decToken = jwtDecode(token);
    localStorage.setItem('currentUser', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(decToken));
  }, (error) => {
    dispatch(setCurrentUserFailure(error.response.data));
  });
