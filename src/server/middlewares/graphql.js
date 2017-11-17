
import graphQLHttp from 'express-graphql';

import schema from '../graphql/schema';
import graphQLRootResolver from '../graphql/resolvers/root';

export default graphQLHttp({
  schema,
  rootValue: graphQLRootResolver,
  graphiql: process.env.NODE_ENV === 'development',
});
