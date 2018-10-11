import React, { Component } from 'react';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import RouterProvider from 'components/containers/router-provider';

const h = { thisIsAnErrorInGlobalScope: () => {} };

h.thisIsAnErrorInGlobalScope(); // intentional error for Honeybadger

export class Error3 extends Component<Props> {
  render() {
    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <h1>Error3</h1>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

export default RouterProvider(Error3);
