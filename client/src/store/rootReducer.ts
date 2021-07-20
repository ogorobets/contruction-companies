import { combineReducers } from '@reduxjs/toolkit';
import companyReducer, { CompanyState } from './slices/companySlice';

export type RootState = {
  companies: CompanyState;
};

const rootReducer = combineReducers<RootState>({
  companies: companyReducer
});

export default rootReducer;
