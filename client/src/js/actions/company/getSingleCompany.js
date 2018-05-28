import axios from 'axios';
import {
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  EDIT_COMPANY_SUCESS,
  EDIT_COMPANY_SUCESS_FAILURE
} from '../types';

export const getCompanySuccess = payload => ({
  type: GET_COMPANY_SUCCESS,
  payload
});

export const getCompanyFailure = error => ({
  type: GET_COMPANY_FAILURE,
  error
});

export const editCompanySuccess = payload => ({
  type: EDIT_COMPANY_SUCESS,
  payload
});

export const editCompanyFailure = error => ({
  type: EDIT_COMPANY_SUCESS_FAILURE,
  error
});

export const getSingleCompany = companyId => dispatch =>
  axios.get(`/api/v1/company/${companyId}`).then((res) => {
    dispatch(getCompanySuccess(res.data));
  }).catch((error) => {
    dispatch(getCompanyFailure(error.response.data));
  });

export const editCompany = (data, companyId) => dispatch =>
  axios.put(`/api/v1/company/${companyId}`, data).then((res) => {
    dispatch(editCompanySuccess(res.data));
  }).catch((error) => {
    dispatch(editCompanyFailure(error.response.data));
  });

