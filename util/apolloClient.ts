import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  // Local server Link
  const localLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'same-origin',
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
  });
});
