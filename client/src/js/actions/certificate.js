import axios from 'axios';
import 
    { 
      ADD_CERTIFICATE_SUCCESS,
      ADD_CERTIFICATE_FAILURE
    } from './types';

export const addCertificateSuccess = certificateData => ({
    type: ADD_CERTIFICATE_SUCCESS,
    certificateData
});

export const addCertificateFailure = error => ({
    type: ADD_CERTIFICATE_FAILURE,
    error
});



const baseUrl = '/api/v1';

export const addCertificateRequest = (certificateData, companyId) => dispatch =>
  axios.post(`${baseUrl}/${companyId}/certificate`, certificateData)
  .then((response) => {
    dispatch(addCertificateSuccess(response.data.certificate));
  }).catch((error) => {
    dispatch(addCertificateFailure(error.response));
  });
