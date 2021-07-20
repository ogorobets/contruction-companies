import { gql } from '@apollo/client';

export const getCompaniesQuery = gql`
  query companies(
    $search: String
    $specialties: [String]
    $page: Int
    $perPage: Int
  ) {
    companies(
      search: $search
      specialties: $specialties
      page: $page
      perPage: $perPage
    ) {
      id
      name
      logo
      specialty
      city
    }
  }
`;
