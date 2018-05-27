import axios from 'axios';
import
{
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE
} from '../types';

export const getCompanies = () => ({
  type: GET_COMPANIES
});

export const getCompaniesSuccess = companies => ({
  type: GET_COMPANIES_SUCCESS,
  companies
});

export const getCompaniesFailure = error => ({
  type: GET_COMPANIES_FAILURE,
  error
});

export const addCompanySuccess = company => ({
  type: ADD_COMPANY_SUCCESS,
  company
});

export const addCompanyFailure = error => ({
  type: ADD_COMPANY_FAILURE,
  error
});


const baseUrl = '/api/v1';

export const getCompaniesRequest = (page, limit, sort) =>
  function action(dispatch) {
    page = page || 1;
    dispatch(getCompanies());
    const request = axios({
      params: {
        limit,
        sort
      },
      method: 'GET',
      url: `${baseUrl}/companies?page=${page}`
    });
    request.then((response) => {
      const {
        Companies, pageSize, pageCount, totalCount
      } = response.data;
      const paginated = {
        Companies, totalCount, pageCount, pageSize, page
      };
      dispatch(getCompaniesSuccess(paginated));
    }).catch((error) => {
      dispatch(getCompaniesFailure(error.response));
    });
    return request;
  };

export const addCompanyRequest = companyData => dispatch =>
  axios.post(`${baseUrl}/company/register`, companyData)
    .then((response) => {
      dispatch(addCompanySuccess(response.data));
    }).catch((error) => {
      dispatch(addCompanyFailure(error.response));
    });
