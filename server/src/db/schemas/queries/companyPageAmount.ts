import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { PageAmountType } from 'db/schemas/types';
import { Company } from './companies';
import { companies } from 'stubData/stubData';

export const companyPageAmountQuery = {
  type: PageAmountType,
  args: {
    search: { type: GraphQLString },
    specialties: { type: GraphQLList(GraphQLString) },
    perPage: { type: GraphQLInt }
  },
  async resolve(
    parent: any,
    { search = '', specialties = [], perPage = 10 }: any
  ) {
    let filteredCompanies = companies.filter((company: Company) => {
      return company.name.toLowerCase().includes(search.toLowerCase());
    });
    if (specialties.length > 0) {
      filteredCompanies = filteredCompanies.filter((company: Company) => {
        return specialties.includes(company.specialty);
      });
    }
    return { pageAmount: Math.ceil(filteredCompanies.length / perPage) };
  }
};
