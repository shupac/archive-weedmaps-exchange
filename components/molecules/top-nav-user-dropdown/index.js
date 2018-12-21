// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Router } from 'lib/routes';
import { withRouter } from 'next/router';
import config from 'config';
import { type StoreType } from 'lib/types/store';
import { Avatar } from 'components/atoms/avatar';
import { Arrow } from 'components/atoms/icons';
import ToggleButtons, { ToggleButton } from 'components/atoms/toggle-buttons';
import {
  UserDropdownContainer,
  UserDropdownMenu,
  DropdownSelector,
  Username,
  Divider,
  LogoutButton,
} from './styles';

type Props = {
  store: StoreType,
  user: {},
};

type State = {
  open: boolean,
};

export class UserDropdown extends React.Component<Props, State> {
  state = { open: false };

  componentDidMount() {
    global.addEventListener('click', this.documentClick);
  }

  componentWillUnmount() {
    global.removeEventListener('click', this.documentClick);
  }

  documentClick = () => {
    this.setState({ open: false });
  };

  handleContextToggle = (context: 'buyer' | 'seller') => {
    const { setUserContext, activeContext } = this.props.store.authStore;

    if (activeContext === 'seller') {
      Router.pushRoute('/buyer/marketplace/discover');
    }
    if (activeContext === 'buyer') {
      Router.pushRoute('/seller/products');
    }

    setUserContext(context);
  };

  handleToggle = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { open } = this.state;
    const {
      authStore: { user },
    } = this.props.store;
    const { avatarUrl, username, userContext } = user;

    return (
      <UserDropdownContainer>
        <DropdownSelector onClick={this.handleToggle}>
          <Avatar avatarUrl={avatarUrl} />
          <Username>
            <p>{username}</p>
            <p>{userContext}</p>
          </Username>
          <Arrow direction={open ? 'up' : 'down'} />
        </DropdownSelector>
        {this.state.open && (
          <UserDropdownMenu>
            <ToggleButtons>
              <ToggleButton
                onClick={() => this.handleContextToggle('buyer')}
                isActive={userContext === 'buyer'}
              >
                buyer
              </ToggleButton>
              <ToggleButton
                onClick={() => this.handleContextToggle('seller')}
                isActive={userContext === 'seller'}
              >
                seller
              </ToggleButton>
            </ToggleButtons>
            <Divider />
            <LogoutButton href={`${config.coreBaseUrl}/logout`}>
              logout
            </LogoutButton>
          </UserDropdownMenu>
        )}
      </UserDropdownContainer>
    );
  }
}

export default withRouter(inject('store')(observer(UserDropdown)));
