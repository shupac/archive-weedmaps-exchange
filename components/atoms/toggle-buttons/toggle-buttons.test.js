import React from 'react';
import { shallow } from 'enzyme';
import ToggleButtons, { ToggleButton } from './';

describe('Toggle Buttons', () => {
  it('should render active and inactive styles', () => {
    const wrapper = shallow(
      <ToggleButtons>
        <ToggleButton isActive>First</ToggleButton>
        <ToggleButton>Second</ToggleButton>
      </ToggleButtons>,
    );
    const activeToggle = wrapper.find('ToggleButton').first();
    const inActiveToggle = wrapper.find('ToggleButton').last();

    expect(activeToggle.exists()).toEqual(true);
    expect(inActiveToggle.exists()).toEqual(true);
  });
});
