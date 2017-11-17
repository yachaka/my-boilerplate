
import { graphql } from 'graphql';

import schema from './graphql/schema';
import rootResolver from './graphql/resolvers/root';

class ServerRelayFetcher {
  constructor(context) {
    this.context = context;
    this.payloads = [];
  }

  fetch(
    operation,
    variables,
  ) {
    return graphql(
      schema,
      operation.text,
      rootResolver,
      this.context,
      variables,
    )
      .then(result => {
        this.payloads.push(result);
        return result;
      });
  }

  toJSON() {
    return JSON.stringify(this.payloads);
  }
}

export default ServerRelayFetcher;
