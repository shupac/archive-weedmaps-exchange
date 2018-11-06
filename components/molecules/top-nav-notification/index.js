// @flow
import React, { Component } from 'react';
import { Router } from 'lib/routes';
import theme from 'lib/styles/theme';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Cart } from 'components/atoms/icons';
import { rem } from 'polished';

const CartContainer = styled.div`
  display: flex;
  align-content: center;
  height: ${rem(60)};
  width: ${rem(60)};
  border-left: 1px solid ${theme.colors.smoke};
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: ${theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  transform: translate(79%, 35%);
`;

export const NotificationCount = styled.div`
  background-color: ${theme.colors.red};
  color: ${theme.colors.white};
  border-radius: 10px;
  border: 2px solid ${theme.colors.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
  font-size: ${rem(10)};
  padding: 3px 4px;
  min-width: 20px;
  text-align: center;
`;
NotificationCount.displayName = 'NotificationCount';

export const NotificationWrapper = styled.div`
  transform: scale(${props => (props.show ? 1.0 : 0.0)});
  transform-origin: 50% 50%;
  transition: transform 0.3s ease-out;
  position: absolute;
  top: -10px;
  left: 15px;
`;
NotificationWrapper.displayName = 'NotificationWrapper';

class Notification extends Component {
  render() {
    const { buyerCart } = this.props.store;
    console.log('buyerCart', buyerCart.cartItemCount);
    return (
      <CartContainer onClick={() => Router.pushRoute('/buyer/cart')}>
        <IconWrapper>
          <a>
            <Cart size={{ width: '24px', height: '24px' }} />
          </a>
          <NotificationWrapper show={buyerCart.cartItemCount}>
            <NotificationCount>{buyerCart.cartItemCount}</NotificationCount>
          </NotificationWrapper>
        </IconWrapper>
      </CartContainer>
    );
  }
}

// const Notification = ({ store }) => (
//   <CartContainer onClick={() => Router.pushRoute('/buyer/cart')}>
//     <IconWrapper>
//       <a>
//         <Cart size={{ width: '24px', height: '24px' }} />
//       </a>
//       <NotificationWrapper show={store.buyerCart.cartItemCount}>
//         <NotificationCount>{store.buyerCart.cartItemCount}</NotificationCount>
//       </NotificationWrapper>
//     </IconWrapper>
//   </CartContainer>
// );

export default inject('store')(observer(Notification));
