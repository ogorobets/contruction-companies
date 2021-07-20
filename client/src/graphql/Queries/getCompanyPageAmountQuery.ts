import { gql } from '@apollo/client';

export const getCompanyPageAmountQuery = gql`
  query companyPageAmount(
    $search: String
    $specialties: [String]
    $perPage: Int
  ) {
    companyPageAmount(
      search: $search
      specialties: $specialties
      perPage: $perPage
    ) {
      pageAmount
    }
  }
`;
