import React from 'react';
import { Router } from 'lib/routes';
import { withRouter } from 'next/router';
// import urlConfig from 'lib/common/url-config';
import styled from 'styled-components';

// UI Components
import { SideNav, SideNavLayout, SideNavLink, AppHeader } from '@ghostgroup/ui';

// Component Data
import {
  buyerData,
  // sellerData,
  buyerFooterData,
  // sellerFooterData,
} from './nav-data';

// Styled Components
const { SideNavHeader, SideNavFooter } = SideNavLayout;
const Wrapper = styled.div`
  align-self: stretch;

  @media print {
    display: none;
  }
`;

type Props = {
  collapse: any,
  router: {
    route: string,
  },
};

class SideNavComponent extends React.Component<Props> {
  render() {
    const { collapse } = this.props;

    return (
      <Wrapper>
        <SideNav collapse={collapse}>
          <SideNavHeader>
            <AppHeader
              title="exchange"
              onClick={e => {
                e.preventDefault();
              }}
            />
          </SideNavHeader>

          {this.renderNavLinks(buyerData)}

          <SideNavFooter>{this.renderNavLinks(buyerFooterData)}</SideNavFooter>
        </SideNav>
      </Wrapper>
    );
  }

  renderNavLinks(data) {
    const { router } = this.props;

    return data.map(({ name, icon, route }) => (
      <SideNavLink
        key={name}
        name={name}
        icon={icon}
        isActive={route && route.path === router.route}
        onClick={() => route && Router.pushRoute(route.name, route.params)}
      />
    ));
  }
}

export default withRouter(SideNavComponent);
export { SideNavComponent };
