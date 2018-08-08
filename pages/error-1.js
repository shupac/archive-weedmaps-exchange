import React, { Component } from 'react';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import RouterProvider from 'components/containers/router-provider';

const h = {};

export class Error1 extends Component<Props> {
  static async getInitialProps() {
    h.thisIsAnErrorInGetInitialProps(); // intentional error for Honeybadger
    return {};
  }

  render() {
    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <h1>Error1</h1>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

export default RouterProvider(Error1);
