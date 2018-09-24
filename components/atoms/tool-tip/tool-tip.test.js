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
  });
});
