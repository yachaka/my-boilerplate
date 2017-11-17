
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import foundCreateInitialFarceRouter from 'found/lib/createInitialFarceRouter';
import createRender from 'found/lib/createRender';

import { getFoundRelayResolver } from '../relay/clientEnvironmentSingleton';

const historyProtocol = new BrowserProtocol();
const historyMiddlewares = [queryMiddleware];
const render = createRender({});

export default (routeConfig) => 
  foundCreateInitialFarceRouter({
    historyProtocol,
    historyMiddlewares,
    routeConfig,
    resolver: getFoundRelayResolver(),
    render,
  });
