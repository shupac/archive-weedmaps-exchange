// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import AuthConnector from 'components/containers/auth-connector';
import { withRouter } from 'next/router';
import { PageContent, PageLayout } from 'components/layouts/page-layout';

type Props = {
  store?: any,
  router: any,
};

export class Home extends Component<Props> {
  static displayName = 'HomePage';

  render() {
    return (
      <PageLayout>
        <PageContent>
          <h1>Well, hello der</h1>
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(provide(AuthConnector(Home)));
