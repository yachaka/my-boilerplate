// @flow

import type { FetchFunction } from 'relay-runtime/lib/RelayNetworkTypes';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery: FetchFunction = (
  operation,
  variables,
  cacheConfig,
  uploadables,
) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
};

export default fetchQuery;
