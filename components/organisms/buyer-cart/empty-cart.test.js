import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'lib/routes/index';
import EmptyCartPage from './empty-cart';

jest.mock('lib/routes');

describe('Empty Cart Page', () => {
  const props = {
    backToBrowseProduct: jest.fn(),
  };
  it('should render the EmptyCart', () => {
    const component = shallow(<EmptyCartPage {...props} />);
    expect(component.find('EmptyCartWrapper').exists()).toEqual(true);
  });
  it('should hand the backToBrowseProduct', () => {
    const component = shallow(<EmptyCartPage {...props} />);
    const pushRoute = jest.spyOn(Router, 'pushRoute');
    component.find('BrowseProductButton').simulate('click');
    expect(pushRoute).toHaveBeenCalledWith('/buyer/marketplace/discover');
  });
});
