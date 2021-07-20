import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { CompanyType } from 'db/schemas/types';
import { companies } from 'stubData/stubData';

export type Company = {
  id: string;
  name: string;
  logo: string;
  specialty: string;
  city: string;
};

export const companiesQuery = {
  type: new GraphQLList(CompanyType),
  args: {
    search: { type: GraphQLString },
    specialties: { type: GraphQLList(GraphQLString) },
    page: { type: GraphQLInt },
    perPage: { type: GraphQLInt }
  },
  async resolve(
    parent: any,
    { search = '', specialties = [], page = 0, perPage = 10 }: any
  ) {
    let filteredCompanies = companies.filter((company: Company) => {
      return company.name.toLowerCase().includes(search.toLowerCase());
    });
    if (specialties.length > 0) {
      filteredCompanies = filteredCompanies.filter((company: Company) => {
        return specialties.includes(company.specialty);
      });
    }
    const from = page * perPage;
    const to = (page + 1) * perPage;
    filteredCompanies = filteredCompanies.slice(from, to);
    return filteredCompanies;
  }
};
