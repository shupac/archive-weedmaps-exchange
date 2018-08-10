import React from 'react';
import styled from 'styled-components';

// UI Components
import { SideNav, SideNavLayout, SideNavLink, AppHeader } from '@ghostgroup/ui';

// Component Data
import {
  buyerData,
  sellerData,
  buyerFooterData,
  sellerFooterData,
} from './navData';

// Styled Components
const { SideNavHeader, SideNavFooter } = SideNavLayout;
const Wrapper = styled.div`
  align-self: stretch;
`;

class SideNavComponent extends React.Component {
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

    return data.map(({ name, icon, path }) => (
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
