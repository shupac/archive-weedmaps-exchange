// @flow
import * as React from 'react';
import { observable, action } from 'mobx';
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
  Select,
  SelectWrapper,
} from './styles';

type Props = {
  store: StoreType,
  user: {},
};

type State = {
  open: boolean,
};

export class UserDropdown extends React.Component<Props, State> {
  @observable
  open = false;

  componentDidMount() {
    global.addEventListener('click', this.documentClick);
  }

  componentWillUnmount() {
    global.removeEventListener('click', this.documentClick);
  }

  @action
  documentClick = () => {
    this.open = false;
  };

  @action
  handleToggle = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    this.open = !this.open;
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

  handleSelectChange = (item: { value: string, name: string }) => {
    const { setActiveBrand } = this.props.store.authStore;
    setActiveBrand(item.value);
  };

  render() {
    const { authStore } = this.props.store;
    const { user, orgBrands, activeSellerBrand } = authStore;
    const { avatarUrl, username, userContext } = user;

    return (
      <UserDropdownContainer>
        <DropdownSelector onClick={this.handleToggle}>
          <Avatar avatarUrl={avatarUrl} />
          <Username>
            <p>{username}</p>
            <p>{userContext}</p>
          </Username>
          <Arrow direction={this.open ? 'up' : 'down'} />
        </DropdownSelector>
        {this.open && (
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

            {userContext === 'seller' && orgBrands.length > 1 && (
              <SelectWrapper onClick={e => e.stopPropagation()}>
                <Select
                  items={orgBrands}
                  selectedItem={activeSellerBrand}
                  itemToString={item => item.text}
                  onChange={this.handleSelectChange}
                  placeholder="Select your brand.."
                />
              </SelectWrapper>
            )}
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
