// @flow

import { buildSchema } from 'graphql';
import fs from 'fs';
import schema from './schema.graphql';

export default buildSchema(schema);
