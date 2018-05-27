import { combineReducers } from 'redux';
import auth from './auth';
import { companyDetails } from './company';

const rootReducer = combineReducers({
  auth,
  companyDetails
});

export default rootReducer;
