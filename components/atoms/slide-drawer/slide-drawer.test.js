import React from 'react';
import { shallow, mount } from 'enzyme';
import { CloseButton, PanelContainer } from './styles';
import { DrawerHead, SlideInDrawer } from './';

describe('Slide In Drawer ', () => {
  it('should render passed in children', () => {
    const wrapper = shallow(
      <SlideInDrawer>
        <p>Hey</p>
        <p>there</p>
      </SlideInDrawer>,
    );
    expect(wrapper.props().children.length).toEqual(2);
  });
  it('should be visible when show prop is true ', () => {
    const wrapper = shallow(<SlideInDrawer show />);
    const panel = wrapper.find(PanelContainer);
    expect(panel).toHaveStyleRule('width: 100%');
  });

  it('should be hidden when show prop is false ', () => {
    const wrapper = shallow(<SlideInDrawer />);
    const panel = wrapper.find(PanelContainer);
    expect(panel).toHaveStyleRule('width: 0%');
  });

  describe('ships with a Head component that ', () => {
    it('will call a passed func on close button click ', () => {
      const closeMe = jest.fn();
      const wrapper = shallow(<DrawerHead onClick={closeMe} />);
      const closeBtn = wrapper.find(CloseButton);
      closeBtn.simulate('click');
      expect(closeMe).toHaveBeenCalled();
    });
  });
});
