// @flow

import {
  Environment,
  RecordSource,
  Store,
  Network,
} from 'relay-runtime';
import { Resolver } from 'found-relay';

import clientRelayFetcher from './clientRelayFetcher';

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(clientRelayFetcher);

let Instance = null;
let FoundRelayResolver = null;

export const recreateEnvironment = () => {
  Instance = new Environment({
    network,
    store,
  });

  FoundRelayResolver = new Resolver(Instance);
};

export const getEnvironment = () => Instance;
export const getFoundRelayResolver = () => FoundRelayResolver;

recreateEnvironment();
