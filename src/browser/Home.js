
import React, {
  PureComponent,
} from 'react';

// import styles from './style.less';
import svg from './react.svg';

export default class Home extends PureComponent {
  state = {
    count: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }

  render() {

    return (<h1>I am the Home.{this.state.count}<img src={svg} />ss</h1>);
  }
};
