import React from 'react';
import { shallow, mount } from 'enzyme';
import zones from 'lib/mocks/zones';
import ContextMenu from 'components/molecules/context-menu';
import ZoneCard from './';

function setup(menuFlag) {
  const component = shallow(<ZoneCard zone={zones[2]} withMenu={menuFlag} />);
  return {
    component,
  };
}

describe('Zone Card', () => {
  it('should render the component ', () => {
    const { component } = setup(true);
    const wrapper = component.find('[data-test-id="zone-card-wrapper"]');
    expect(wrapper.exists()).toEqual(true);
  });

  it('should be able to have a context menu', () => {
    const { component } = setup(true);
    const menu = component.find(ContextMenu);
    expect(menu.exists()).toEqual(true);
  });

  it('should be able to not have a context menu ', () => {
    const { component } = setup(false);
    const menu = component.find(ContextMenu);
    expect(menu.exists()).toEqual(false);
  });

  it('should render the correct color key style', () => {
    const component = mount(<ZoneCard zone={zones[2]} />);
    const colorKey = component.find('[data-test-id="zone-card-color"]');
    expect(colorKey).toHaveStyleRule('background-color: #4A90E2');
  });
});
