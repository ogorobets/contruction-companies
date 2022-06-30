import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apollo/client';
import {
  getCompaniesQuery,
  getSpecialtiesQuery,
  getCompanyPageAmountQuery
} from 'graphql/Queries';

export type GetCompaniesDataParams = {
  search: string | null;
  specialties: string[];
  page?: number;
  perPage?: number;
};

export type GetCompanyPageAmountParams = {
  search: string | null;
  specialties: string[];
};

export const getCompaniesData = createAsyncThunk<
  any,
  GetCompaniesDataParams,
  any
>('company/getCompaniesQuery', async (params: GetCompaniesDataParams) => {
  const { data } = await client.query({
    query: getCompaniesQuery,
    variables: { ...params, perPage: 25 }
  });
  return { data };
});

export const getCompanyPageAmount = createAsyncThunk<
  any,
  GetCompanyPageAmountParams,
  any
>(
  'company/getCompanyPageAmount',
  async (params: GetCompanyPageAmountParams) => {
    const { data } = await client.query({
      query: getCompanyPageAmountQuery,
      variables: { ...params, perPage: 25 }
    });
    return { data };
  }
);

export const getSpecialtiesData = createAsyncThunk<any, undefined, any>(
  'company/getSpecialties',
  async () => {
    const { data } = await client.query({
      query: getSpecialtiesQuery
    });
    return { data };
  }
);
