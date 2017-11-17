// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import createInitialFarceRouter from './routing/createInitialFarceRouter';
import routeConfig from './routes';

import { getFoundRelayResolver } from './relay/clientEnvironmentSingleton';

const renderApp = ({ fn, routeConfig }) => {
  // This is async so the render markup matches the one on the server.
  // We don't need to display a `Loading...` screen as there is already the server-generated markup on screen.
  createInitialFarceRouter(routeConfig)
    .then(Router => {
      // $FlowFixMe
      ReactDOM[fn](
        <AppContainer>
          <Router resolver={getFoundRelayResolver()} />
        </AppContainer>,
        // $FlowFixMe
        document.getElementById('app'),
      );
    });
};

// Initial render, we re-hydrate server-side markup
renderApp({
  fn: 'hydrate',
  routeConfig,
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp({
      fn: 'render',
      routeConfig: require('./routes').default,
    });
  });
}
