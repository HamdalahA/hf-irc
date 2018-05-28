import { cloneDeep } from 'lodash';
import {
  GET_COMPANIES,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  EDIT_COMPANY_SUCESS,
  EDIT_COMPANY_SUCESS_FAILURE
} from '../actions/types';

const initialState = {
  companies: [],
  company: {},
  isLoadingCompanies: false,
  successMessage: '',
  errorMessage: '',
  error: {},
};

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type, companies, company, payload, error
  } = action;
  switch (type) {
    case GET_COMPANIES:
      return {
        ...newState,
        isLoadingCompanies: true
      };
    case GET_COMPANIES_SUCCESS:
      newState.companies = companies.Companies;
      newState.pageCount = companies.pageCount;
      newState.isLoadingCompanies = false;
      return {
        ...newState,
        error: {}
      };
    case GET_COMPANIES_FAILURE:
      return {
        ...newState,
        errorMessage: '',
        isLoadingCompanies: false
      };
    case ADD_COMPANY_SUCCESS:

      const rx = {
        ...newState,
        addSuccess: true,
        successMessage: company.message,
        error: {},
        companies: [...newState.companies, company.company]
      };

      return rx;
    case ADD_COMPANY_FAILURE:
      const r = {
        ...newState,
        isLoadingCompanies: false,
        error: { ...newState.error, ...error }
      };
      return r;
    case GET_COMPANY_SUCCESS:
      const { companyDetail } = payload;
      const ren = {
        ...newState,
        error: {},
        addSuccess: false,
        isLoading: false,
        company: { ...newState.company, ...companyDetail }
      };
      return ren;
    case GET_COMPANY_FAILURE:
      return {
        ...newState,
        error
      };
    case EDIT_COMPANY_SUCESS:
      const { updatedCompany } = payload;
      const index = newState.companies
        .findIndex(compy => compy.id === updatedCompany.id);
      newState.companies.splice(index, 1, updatedCompany);
      return newState;
    default: return newState;
  }
};
