// @flow
import React, { Component, Fragment } from 'react';
import dynamic from 'next/dynamic';
import withStores from 'lib/stores/focused-store-provider';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import AuthStore from 'lib/stores/auth';
import { Tabs } from '@ghostgroup/ui';
import { Link } from 'lib/routes';
import {
  PageContent,
  PageLayoutWithProgressBar,
} from 'components/layouts/page-layout';
import ShowIfRoute from 'components/atoms/show-if-route';
import TabButton from 'components/atoms/tab-button';
import Subheader from 'components/atoms/subheader';

const DiscoverTab = dynamic(
  import('components/organisms/marketplace-discover'),
  {
    loading: () => <p>loading</p>,
  },
);

const tabs = [
  {
    path: 'discover',
    label: 'Discover',
  },
  {
    path: 'catalog',
    label: 'Catalog',
  },
  {
    path: 'watchlist',
    label: 'Watchlist',
  },
];

export class Marketplace extends Component<Props, State> {
  render() {
    const { router } = this.props;

    return (
      <PageLayoutWithProgressBar>
        <PageContent>
          <Subheader>
            <Tabs>
              {tabs.map(({ path, label }) => (
                <TabButton key={label} isSelected={path === router.query.tab}>
                  <Link route="marketplace" params={{ tab: path }}>
                    <a>{label}</a>
                  </Link>
                </TabButton>
              ))}
            </Tabs>
          </Subheader>
          <ShowIfRoute match="/buyer/marketplace/catalog">
            {<DiscoverTab />}
          </ShowIfRoute>
        </PageContent>
      </PageLayoutWithProgressBar>
    );
  }
}

const pageStores = {
  auth: { Store: AuthStore },
};

export default withStores(
  withRouter(inject('auth')(observer(Marketplace))),
  pageStores,
);
