// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import ErrorPageComponent from 'components/layouts/error-page';
import type { NextContext } from 'lib/next/types';

export type Props = {
  statusCode: number,
  children?: Node,
};

export class ErrorPage extends Component<Props> {
  static displayName = 'ErrorPage';

  static defaultProps = {
    statusCode: 500,
  };

  static async getInitialProps(ctx: NextContext) {
    const initialProps = {};

    initialProps.statusCode = ctx.res ? ctx.res.statusCode : 200;

    /**
     * Next.js swallows error when thrown within the `getInitialProps` cycle
     * but passes the error down through the props to this error page. From
     * here we can then return it to the result so we can properly report it
     * to Honeybadger.
     */
    if (ctx.err && ctx.res && !ctx.res.capturedError) {
      ctx.res.capturedError = ctx.err;
    }

    // Log to console for dev mode
    if (process.env.NODE_ENV !== 'production') {
      console.error(ctx.err || (ctx.res && ctx.res.capturedError));
    }

    return initialProps;
  }

  render() {
    const { statusCode, children } = this.props;
    return (
      <ErrorPageComponent statusCode={statusCode}>
        {children}
      </ErrorPageComponent>
    );
  }
}

export default ErrorPage;
