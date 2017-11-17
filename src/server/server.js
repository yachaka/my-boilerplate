
import React from 'react';
import express from 'express';
import path from 'path';

import graphqlMiddleware from './middlewares/graphql';
import universalRenderingMiddleware from './middlewares/universalRendering';


const server = express();

server
  .disable('x-powered-by')
  .use('/public', express.static(path.resolve(__dirname, '../../public')))

  .use('/graphql', graphqlMiddleware)
  .get('/*', universalRenderingMiddleware);

export default server;
