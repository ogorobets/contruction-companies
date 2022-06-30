import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink
} from '@apollo/client';

const link = new HttpLink({
  uri: 'http://localhost:4200/graphql'
});
const cache = new InMemoryCache();
const client = new ApolloClient<NormalizedCacheObject>({
  link: link as unknown as ApolloLink,
  cache
});
export default client;
