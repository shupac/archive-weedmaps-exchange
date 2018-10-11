import React from 'react';
import { shallow } from 'enzyme';
import TextArea from './text-area';
import TextInput from './text-input';
import { InputError, StyledArea, StyledInput } from './styles';

describe('Forms', () => {
  it('should render out the TextArea', () => {
    const component = shallow(<TextArea hasError errorMessage="error" />);
    expect(
      component
        .find(InputError)
        .dive()
        .text(),
    ).toEqual('error');
    expect(component.find(StyledArea).dive()).toHaveStyleRule('height: 72px');
    expect(component.find(StyledArea).dive()).toHaveStyleRule(
      'background-color: #FFFFFF',
    );
  });
  it('should render out the TextInput', () => {
    const component = shallow(
      <TextInput errorMessage="error" height={200} hasError />,
    );
    expect(
      component
        .find(InputError)
        .dive()
        .text(),
    ).toEqual('error');
    expect(component.find(StyledInput).dive()).toHaveStyleRule('height: 40px');
    expect(component.find(StyledInput).dive()).toHaveStyleRule(
      'background-color: #FFFFFF',
    );
  });
});
