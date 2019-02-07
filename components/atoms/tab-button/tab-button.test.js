import React from 'react';
import { mount } from 'enzyme';
import { Tab } from '@ghostgroup/ui.tabs';
import TabButton from './';

describe('Tab Button', () => {
  it('should render Tab Button', () => {
    const component = mount(<TabButton />);
    expect(component.find(Tab)).toHaveStyleRule('padding: 16px');
  });
});
