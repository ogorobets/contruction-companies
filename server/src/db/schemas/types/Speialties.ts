import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const SpecialtiesType = new GraphQLObjectType({
  name: 'Specialties',
  fields: () => ({
    specialties: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) }
  })
});
