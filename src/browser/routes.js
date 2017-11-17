// @flow

import { makeRouteConfig, Route } from 'found';
import React from 'react';
import { graphql } from 'react-relay';

import App from './App';

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={graphql`
      query routes_App_Query {
        hello {
          ...App_hello
        }
      }
    `}
  />,
);
