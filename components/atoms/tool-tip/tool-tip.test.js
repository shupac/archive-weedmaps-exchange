import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './';
import { TooltipStyle, SpeechBubble } from './styles';

describe('Tooltip', () => {
  it('should render tooltip', () => {
    const component = shallow(<Tooltip message="tooltip">Hello</Tooltip>);
    component.setState({ hover: true });
    expect(component.find(TooltipStyle).exists()).toEqual(true);
    expect(
      component
        .find(SpeechBubble)
        .dive()
        .text(),
    ).toEqual('tooltip');
    expect(component.find(TooltipStyle).dive()).toHaveStyleRule(
      'display: block',
    );
  });
  it('should handle onMouseOver', () => {
    const component = shallow(<Tooltip message="tooltip">Hello</Tooltip>);
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState');
    instance.onMouseOver();
    expect(setState).toHaveBeenCalledWith({ hover: true });
  });
  it('should handle onMouseOut', () => {
    const component = shallow(<Tooltip message="tooltip">Hello</Tooltip>);
    const instance = component.instance();
    const setState = jest.spyOn(instance, 'setState');
    instance.onMouseOut();
    expect(setState).toHaveBeenCalledWith({ hover: false });
  });
});
