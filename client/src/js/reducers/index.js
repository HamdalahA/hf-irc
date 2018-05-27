import { combineReducers } from 'redux';
import auth from './auth';
import company from './company';

const rootReducer = combineReducers({
  auth,
  company
});

export default rootReducer;
