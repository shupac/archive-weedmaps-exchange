import React from 'react';
import { shallow } from 'enzyme';
import RequiredAsterisk from './';

function setup() {
  const component = <RequiredAsterisk>Test</RequiredAsterisk>;
  const wrapper = shallow(component);
  return { wrapper };
}

describe('Required Asterisk', () => {
  it('should render the asterisk', () => {
    const { wrapper } = setup();
    expect(wrapper.find('span').text()).toEqual('*');
  });
});
