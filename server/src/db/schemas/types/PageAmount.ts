import { GraphQLNonNull, GraphQLObjectType, GraphQLInt } from 'graphql';

export const PageAmountType = new GraphQLObjectType({
  name: 'PageAmount',
  fields: () => ({
    pageAmount: { type: GraphQLNonNull(GraphQLInt) }
  })
});
