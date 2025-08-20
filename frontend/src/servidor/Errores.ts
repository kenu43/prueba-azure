import Toast from 'comunes/informativos/Notificaciones';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    Toast(`[Network error]: ${networkError}`, 'error');
  }

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      Toast(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        'error'
      );
    });
});

export default errorLink;
