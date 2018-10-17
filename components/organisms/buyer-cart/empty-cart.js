// @flow
import React from 'react';
import { Router } from 'lib/routes/index';
import {
  EmptyCart,
  EmptyCartInstructions,
  EmptyCartTitle,
  EmptyCartWrapper,
  BrowseProductButton,
} from './styles';

const EmptyCartPage = () => (
  <EmptyCartWrapper>
    <EmptyCart>
      <img src="/static/images/empty_cart.png" alt="Empty Cart" />
    </EmptyCart>
    <EmptyCartTitle>Your Cart Is Empty</EmptyCartTitle>
    <EmptyCartInstructions>
      Click the button below to browse products in your area.
    </EmptyCartInstructions>
    <BrowseProductButton
      onClick={() => Router.pushRoute('/buyer/marketplace/discover')}
    >
      Browse Products
    </BrowseProductButton>
  </EmptyCartWrapper>
);

export default EmptyCartPage;
