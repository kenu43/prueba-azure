import type { ReactElement } from 'react';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
} from '@apollo/client';

import { useUserStore } from 'app/store/PrincipalStore';

import { version } from '../../package.json';
import offline from './Offline';

type ServerProps = {
  children: ReactElement | ReactElement[];
};

const Servidor = ({ children }: ServerProps) => {
  const { appCheckToken, token } = useUserStore.getState();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        'authorization': `Bearer ${token}`,
        'X-Firebase-AppCheck': appCheckToken,
      },
    });

    return forward(operation);
  });

  const httplink = new HttpLink({
    uri: import.meta.env.VITE_URI,
  });

  const link = from([authLink, httplink]);

  const cliente = new ApolloClient({
    link,
    cache: offline,
    connectToDevTools: import.meta.env.DEV,
    version,
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentFetchPolicy) {
          if (
            currentFetchPolicy === 'network-only'
            || currentFetchPolicy === 'cache-and-network'
          ) {
            // Demote the network policies (except "no-cache") to "cache-first"
            // after the first request.
            return 'cache-first';
          }
          // Leave all other fetch policies unchanged.
          return currentFetchPolicy;
        },
      },
    },
  });

  return <ApolloProvider client={cliente}>{children}</ApolloProvider>;
};

export default Servidor;
