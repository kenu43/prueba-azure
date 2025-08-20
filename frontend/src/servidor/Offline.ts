import { InMemoryCache } from '@apollo/client';

const offline = new InMemoryCache({
  addTypename: false,
});

export default offline;
