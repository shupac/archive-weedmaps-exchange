import React from 'react';
// import { withRouter } from 'next/router';
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
} from './navData';

// Styled Components
const { SideNavHeader, SideNavFooter } = SideNavLayout;
const Wrapper = styled.div`
  align-self: stretch;
`;

type Props = {
  collapse: any,
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
    // const { dispatch, activePath } = this.props;

    return data.map(({ name, icon }) => (
      <SideNavLink
        key={name}
        name={name}
        icon={icon}
        // isActive={matchPath(activePath, path)}
        // onClick={() => dispatch(push(path))}
      />
    ));
  }
}

export default SideNavComponent;
