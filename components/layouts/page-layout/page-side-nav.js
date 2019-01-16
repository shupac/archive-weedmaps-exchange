import React from 'react';
import { inject, observer } from 'mobx-react';
import { Router } from 'lib/routes';
import { withRouter } from 'next/router';
import { type StoreType } from 'lib/types/store';
import styled from 'styled-components';

// UI Components
import { SideNav, SideNavLayout, SideNavLink, AppHeader } from '@ghostgroup/ui';

// Component Data
import {
  buyerData,
  sellerData,
  buyerFooterData,
  sellerFooterData,
} from './nav-data';

// Styled Components
const { SideNavHeader, SideNavFooter } = SideNavLayout;
const Wrapper = styled.div`
  align-self: stretch;

  @media print {
    display: none;
  }
`;

const StyledSideNavLink = styled(SideNavLink)`
  line-height: normal;
`;

StyledSideNavLink.displayName = 'StyledSideNavLink';

type Props = {
  store: StoreType,
  router: {
    route: string,
  },
};

class SideNavComponent extends React.Component<Props> {
  get mainNavLinks() {
    const { activeContext } = this.props.store.authStore;

    if (activeContext === 'buyer') {
      return buyerData;
    }
    return sellerData;
  }

  get footerNavLinks() {
    const { activeContext } = this.props.store.authStore;
    if (activeContext === 'buyer') {
      return buyerFooterData;
    }
    return sellerFooterData;
  }

  render() {
    const { uiStore } = this.props.store;

    return (
      <Wrapper>
        <SideNav collapse={uiStore.sideNavCollapse}>
          <SideNavHeader>
            <AppHeader
              title="exchange"
              onClick={e => {
                e.preventDefault();
              }}
            />
          </SideNavHeader>

          {this.renderNavLinks(this.mainNavLinks)}

          <SideNavFooter>
            {this.renderNavLinks(this.footerNavLinks)}
          </SideNavFooter>
        </SideNav>
      </Wrapper>
    );
  }

  renderNavLinks(data) {
    const { router } = this.props;

    return data.map(({ name, icon, route }) => (
      <StyledSideNavLink
        key={name}
        name={name}
        icon={icon}
        isActive={route && route.path === router.route}
        onClick={() => route && Router.pushRoute(route.name, route.params)}
      />
    ));
  }
}

export default withRouter(inject('store')(observer(SideNavComponent)));
export { SideNavComponent };
