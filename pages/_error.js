import React, { Component } from 'react';
// import { number } from 'prop-types';

export class ErrorPage extends Component {
  static displayName = 'ErrorPage';

  static defaultProps = {
    statusCode: null,
  };

  // static propTypes = {
  //   statusCode: number,
  // };

  static async getInitialProps(props) {
    const initialProps = {};
    initialProps.statusCode = props.res ? props.res.statusCode : 200;

    /**
     * Next.js swallows error when thrown within the `getInitialProps` cycle
     * but passes the error down through the props to this error page. From
     * here we can then return it to the result so we can properly report it
     * to Honeybadger.
     */

    if (props.err && props.res) {
      props.res.capturedError = props.err;
    }

    return initialProps;
  }

  render() {
    // const { statusCode } = this.props;
    return <h1>ERROR</h1>;
  }
}

export default ErrorPage;
