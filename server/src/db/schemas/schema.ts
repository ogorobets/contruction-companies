import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  companiesQuery,
  specialtiesQuery,
  companyPageAmountQuery
} from '@query';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    companies: companiesQuery,
    companyPageAmount: companyPageAmountQuery,
    specialties: specialtiesQuery
  })
});

export default new GraphQLSchema({
  query: Query
});
