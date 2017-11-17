// @flow

/*
 * Constructs with an array of payloads.
 * Returns the entries as cached results.
 */

import type { FetchFunction } from 'relay-runtime/lib/RelayNetworkTypes';
import relayFetchQuery from './relayFetchQuery';

const cachedRelayPayloads = window.__RELAY_PAYLOADS__;

const relayCachedFetch: FetchFunction = (...args) => {
  if (cachedRelayPayloads.length > 0) {
    return cachedRelayPayloads.shift();
  }

  return relayFetchQuery(...args);
};
