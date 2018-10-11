import React, { Component } from 'react';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import RouterProvider from 'components/containers/router-provider';

const h = { thisIsAnErrorInRender: () => {} };

export class Error2 extends Component<Props> {
  render() {
    h.thisIsAnErrorInRender(); // intentional error for Honeybadger
    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <h1>Error2</h1>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

export default RouterProvider(Error2);
