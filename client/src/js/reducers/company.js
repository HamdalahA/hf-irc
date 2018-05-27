// eslint-disable
import { cloneDeep } from 'lodash';
import { GET_COMPANY_SUCCESS, GET_COMPANY_FAILURE } from '../actions/types';

const initialState = {
  company: {},
  error: {}
};

export const companyDetails = (state = initialState, action) => {
  const newState = cloneDeep(state);
  const { type, payload, error } = action;

  switch (type) {
    case GET_COMPANY_SUCCESS:
      const { companyDetail } = payload;
      return {
        ...newState, company: { ...newState.company, ...companyDetail }
      };
    case GET_COMPANY_FAILURE:
      return {
        error
      };
    default:
      return newState;
  }
};


export const c = 'ok';

