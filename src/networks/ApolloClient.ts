import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import axios from 'axios';

const httpLink = createHttpLink({
  uri: 'https://tmdbgraphql-21xuo56l.b4a.run/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      API_KEY: '7265bf8d24516ee6c0e1a79b05805c13',
      'Custom-Header': 'value',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export default client;
