// @flow

import type { $Request, $Response } from 'express';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { getFarceResult } from 'found/lib/server';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';
import {
  Environment as RelayEnvironment,
  Store as RelayStore,
  RecordSource as RelayRecordSource,
  Network as RelayNetwork,
} from 'relay-runtime';

import ServerFetcher from '../serverRelayFetcher';
import routes from '../../browser/routes';

function getIndexHtml() {
  return fs.readFileSync(__dirname + '/../index.generated.html').toString();
}

let indexHtml = getIndexHtml();

const historyMiddlewares = [queryMiddleware];
const render = createRender({})

export default (req: $Request, res: $Response) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // In development, we expect index.html could have changed between each request (build retriggering).
    indexHtml = getIndexHtml();
  }

  const fetcher = new ServerFetcher();

  const environment = new RelayEnvironment({
    store: new RelayStore(new RelayRecordSource()),
    network: RelayNetwork.create((...args) => fetcher.fetch(...args)),
  });

  getFarceResult({
    url: req.path,
    historyMiddlewares,
    routeConfig: routes,
    resolver: new Resolver(environment),
    render,
  })
    .then(({ redirect, status, element }) => {
      if (redirect) {
        res.redirect(302, redirect.url);
        return ;
      }

      const context = {};
      const appMarkup = renderToString(element);

      let html = indexHtml;

      html = html.replace('{{appMarkup}}', appMarkup);
      html = html.replace('{{relayPayloads}}', fetcher.toJSON());
      res.status(status).send(html);
    });
};
