import { gql } from '@apollo/client';

export const getSpecialtiesQuery = gql`
  query specialties {
    specialties {
      specialties
    }
  }
`;
