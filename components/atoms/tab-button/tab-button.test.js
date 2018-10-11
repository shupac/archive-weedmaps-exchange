import React from 'react';
import { shallow } from 'enzyme';
import { Tab } from '@ghostgroup/ui';
import TabButton from './';

describe('Tab Button', () => {
  it('should render Tab Button', () => {
    const component = shallow(<TabButton />);
    expect(component.find(Tab).dive()).toHaveStyleRule('padding: 16px');
  });
});
