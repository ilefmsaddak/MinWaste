import { ApolloClientOptions, InMemoryCache, ErrorPolicy } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export function apolloOptionsFactory(httpLink: HttpLink) {
  const errorPolicy: ErrorPolicy = 'all';
  
  return {
    link: httpLink.create({
      uri: 'http://localhost:3000/graphql',
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy,
      },
      query: {
        errorPolicy,
      },
    },
  };
}
