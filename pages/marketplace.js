// @flow
import React, { Component } from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import { Tabs } from '@ghostgroup/ui';
import { Link } from 'lib/routes';
import {
  PageContent,
  PageLayout,
  TabContent,
} from 'components/layouts/page-layout';
import ShowIfRoute from 'components/atoms/show-if-route';
import TabButton from 'components/atoms/tab-button';
import Subheader from 'components/atoms/subheader';
import DiscoverTab from 'components/organisms/marketplace-discover';
import CatalogTab from 'components/organisms/marketplace-catalog';

import { type Store } from 'lib/types/stores';

const tabs = [
  {
    path: 'discover',
    label: 'Discover',
  },
  {
    path: 'catalog',
    label: 'Catalog',
  },
  // {
  //   path: 'watchlist',
  //   label: 'Watchlist',
  // },
];

type Props = {
  store: Store,
  url: any,
};

export class Marketplace extends Component<Props> {
  componentDidMount() {
    this.props.store.categoryStore.getDepartments();
  }

  render() {
    const { url } = this.props;

    return (
      <PageLayout>
        <PageContent>
          <Subheader>
            <Tabs>
              {tabs.map(({ path, label }) => (
                <TabButton key={label} isSelected={path === url.query.tab}>
                  <Link route="marketplace" params={{ tab: path }}>
                    <a>{label}</a>
                  </Link>
                </TabButton>
              ))}
            </Tabs>
          </Subheader>
          <TabContent>
            <ShowIfRoute match="/buyer/marketplace/discover">
              <DiscoverTab />
            </ShowIfRoute>

            <ShowIfRoute match="/buyer/marketplace/catalog(.*)">
              <CatalogTab />
            </ShowIfRoute>
          </TabContent>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(inject('store')(Marketplace)));
