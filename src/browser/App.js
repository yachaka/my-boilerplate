// @flow

import React, { PureComponent } from 'react';
import {
  QueryRenderer,
  graphql,
  createFragmentContainer,
} from 'react-relay';

import Home from './Home';
import styles from './App.less';

import type { App_hello } from './__generated__/App_hello.graphql.js';
type AppProps = {
  hello: App_hello,
};

class App extends PureComponent<AppProps> {

  render() {
    return (
      <p className={styles.app}>Hello {this.props.hello.you}.</p>
    );
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_hello on Hello {
      you
    }
  `
);
