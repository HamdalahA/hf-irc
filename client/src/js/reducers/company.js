import { cloneDeep } from 'lodash';
import {
    GET_COMPANIES,
    GET_COMPANIES_SUCCESS,
    GET_COMPANIES_FAILURE,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE
} from '../actions/types';

const initialState = {
    companies: [],
    company: {},
    isLoadingCompanies: false,
    successMessage: '',
    errorMessage: '',
}

export default (state = initialState, action) => {
    const newState = cloneDeep(state);
    const { type, companies, company } = action;
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
                ...newState
            };
        case GET_COMPANIES_FAILURE:
            return {
                ...newState,
                errorMessage: '',
                isLoadingCompanies: false
            };
        case ADD_COMPANY_SUCCESS:
            const x=  {
                ...newState,
                companies: [...newState.companies, company.company]
            };
            console.log('New state', x)
            return x;
        case ADD_COMPANY_FAILURE:
            return {
                ...newState,
                isLoadingCompanies: false
            };
        default: return newState;
    }
};
