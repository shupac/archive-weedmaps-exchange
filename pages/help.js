import React, { Component } from 'react';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import AuthConnector from 'components/containers/auth-connector';
import provide from 'lib/data-access/stores/provider';
import HelpPage from 'components/molecules/help-page';

export class Help extends Component {
  static displayName = 'Help';

  render() {
    return (
      <PageLayout>
        <PageContent>
          <HelpPage />
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(Help));
