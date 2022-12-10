import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const URI =
  `https://${import.meta.env.VITE_APP_GRAPHQL_HOST}.onrender.com/graphql` ||
  'http://localhost:4004/graphql';
const httpLink = new HttpLink({
  uri: URI,
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
