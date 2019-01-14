// @flow
import * as React from 'react';
import provide from 'lib/data-access/stores/provider';
import { inject } from 'mobx-react';
import AuthConnector from 'components/containers/auth-connector';
import {
  PageContent,
  PageLayout,
  TabContent,
} from 'components/layouts/page-layout';
import { Tabs } from '@ghostgroup/ui';
import { Link } from 'lib/routes';
import TabButton from 'components/atoms/tab-button';
import Subheader from 'components/atoms/subheader';
import ShowIfRoute from 'components/atoms/show-if-route';
import SettingsProfile from 'components/organisms/settings-profile';
import ZoneEditor from 'components/organisms/zone-editor';
import { type StoreType } from 'lib/types/store';

type Props = {
  store: StoreType,
  url: any,
};

const tabs = [
  {
    path: 'general',
    label: 'General',
  },
  {
    path: 'zones',
    label: 'Zones',
  },
  {
    path: 'profile',
    label: 'Profile',
  },
];

export class SellerSettingsPage extends React.Component<Props> {
  static displayName = 'Seller Settings';

  render() {
    const { url } = this.props;
    const { pathname, query } = url;

    return (
      <PageLayout pathname={pathname}>
        <PageContent>
          <Subheader>
            <Tabs disableSelectionIndicatorBar>
              {tabs.map(({ path, label }) => (
                <TabButton key={label} isSelected={path === query.tab}>
                  <Link route="sellerSettings" params={{ tab: path }}>
                    <a>{label}</a>
                  </Link>
                </TabButton>
              ))}
            </Tabs>
          </Subheader>
          <ShowIfRoute match="/seller/settings/profile">
            <TabContent>
              <SettingsProfile />
            </TabContent>
          </ShowIfRoute>
          <ShowIfRoute match="/seller/settings/zones">
            <ZoneEditor />
          </ShowIfRoute>
        </PageContent>
      </PageLayout>
    );
  }
}

export default provide(AuthConnector(inject('store')(SellerSettingsPage)));
