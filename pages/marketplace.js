// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
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
import ProductDetail from 'components/organisms/product-detail';
import { type StoreType } from 'lib/types/store';

const tabs = [
  {
    path: 'discover',
    label: 'Discover',
  },
  {
    path: 'catalog',
    label: 'Catalog',
  },
];

type Props = {
  store: StoreType,
  router: any,
};

export class Marketplace extends Component<Props> {
  render() {
    const { router } = this.props;
    return (
      <PageLayout>
        <PageContent>
          <Subheader>
            <Tabs disableSelectionIndicatorBar>
              {tabs.map(({ path, label }) => (
                <TabButton key={label} isSelected={path === router.query.tab}>
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

            <ShowIfRoute
              match={[
                '/buyer/marketplace/catalog',
                '/buyer/marketplace/catalog?(.*)',
              ]}
            >
              <CatalogTab />
            </ShowIfRoute>

            <ShowIfRoute match="/buyer/marketplace/catalog/product(.*)">
              <ProductDetail productId={router.query.productId} />
            </ShowIfRoute>
          </TabContent>
        </PageContent>
      </PageLayout>
    );
  }
}

export default withRouter(AuthConnector(inject('store')(Marketplace)));
