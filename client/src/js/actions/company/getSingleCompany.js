import axios from 'axios';
import { GET_COMPANY_SUCCESS, GET_COMPANY_FAILURE } from '../types';

export const getCompanySuccess = payload => ({
  type: GET_COMPANY_SUCCESS,
  payload
});

export const getCompanyFailure = error => ({
  type: GET_COMPANY_FAILURE,
  error
});

export const getSingleCompany = companyId => dispatch =>
  axios.get(`/api/v1/company/${companyId}`).then((res) => {
    dispatch(getCompanySuccess(res.data));
  }).catch((error) => {
    dispatch(getCompanyFailure(error.response.data));
  });

