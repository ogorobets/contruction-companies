import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCompaniesData,
  getSpecialtiesData,
  getCompanyPageAmount
} from 'actions';

import { Loading } from 'constants/constants';

type Company = {
  id: string;
  name: string;
  logo: string;
  specialty: string;
  city: string;
};

type GetCompaniesDataPayload = {
  data: { companies: [Company] };
};

type GetSpecialtiesPayload = {
  data: { specialties: { specialties: [string] } };
};

type GetCompanyPageAmountPayload = {
  data: { companyPageAmount: { pageAmount: number } };
};

export type CompanyState = {
  companyPageAmount: {
    amount: number | null;
    loading: Loading;
  };
  companies: {
    companies: [Company] | null;
    loading: Loading;
  };
  specialties: {
    specialties: [string] | null;
    loading: Loading;
  };
};

const initialState: CompanyState = {
  companyPageAmount: {
    amount: null,
    loading: Loading.INITIAL
  },
  companies: {
    companies: null,
    loading: Loading.INITIAL
  },
  specialties: {
    specialties: null,
    loading: Loading.INITIAL
  }
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompaniesData.pending, (state: CompanyState) => {
      state.companies.loading = Loading.PENDING;
    });

    builder.addCase(
      getCompaniesData.fulfilled,
      (state: CompanyState, action: PayloadAction<GetCompaniesDataPayload>) => {
        const { data } = action.payload;
        state.companies.loading = Loading.SUCCESS;
        state.companies.companies = data.companies;
      }
    );

    builder.addCase(
      getCompaniesData.rejected,
      (state: CompanyState, action: any) => {
        state.companies.loading = Loading.ERROR;
        alert(`Error occurred: ${JSON.stringify(action.error)}`);
      }
    );

    builder.addCase(getSpecialtiesData.pending, (state: CompanyState) => {
      state.specialties.loading = Loading.PENDING;
    });

    builder.addCase(
      getSpecialtiesData.fulfilled,
      (state: CompanyState, action: PayloadAction<GetSpecialtiesPayload>) => {
        const { data } = action.payload;
        state.specialties.loading = Loading.SUCCESS;
        state.specialties.specialties = data.specialties.specialties;
      }
    );

    builder.addCase(
      getSpecialtiesData.rejected,
      (state: CompanyState, action: any) => {
        state.specialties.loading = Loading.ERROR;
        alert(`Error occurred: ${JSON.stringify(action.error)}`);
      }
    );

    builder.addCase(getCompanyPageAmount.pending, (state: CompanyState) => {
      state.companyPageAmount.loading = Loading.PENDING;
    });

    builder.addCase(
      getCompanyPageAmount.fulfilled,
      (
        state: CompanyState,
        action: PayloadAction<GetCompanyPageAmountPayload>
      ) => {
        const { data } = action.payload;
        state.companyPageAmount.loading = Loading.SUCCESS;
        state.companyPageAmount.amount = data.companyPageAmount.pageAmount;
      }
    );

    builder.addCase(
      getCompanyPageAmount.rejected,
      (state: CompanyState, action: any) => {
        state.companyPageAmount.loading = Loading.ERROR;
        alert(`Error occurred: ${JSON.stringify(action.error)}`);
      }
    );
  }
});

export default companySlice.reducer;
