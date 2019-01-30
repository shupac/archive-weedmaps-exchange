import React, { Component } from 'react';
import { PageContent, PageLayout } from 'components/layouts/page-layout';
import AuthConnector from 'components/containers/auth-connector';
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

export default AuthConnector(Help);
