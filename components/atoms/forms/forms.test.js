import React from 'react';
import { mount } from 'enzyme';
import TextArea from './text-area';
import TextInput from './text-input';
import { InputError, StyledArea, StyledInput } from './styles';

describe('Forms', () => {
  it('should render out the TextArea', () => {
    const component = mount(<TextArea hasError errorMessage="error" />);
    expect(component.find(InputError).text()).toEqual('error');
    expect(component.find(StyledArea)).toHaveStyleRule('height: 72px');
    expect(component.find(StyledArea)).toHaveStyleRule(
      'background-color: #FFFFFF',
    );
  });

  it('should render out the TextInput', () => {
    const component = mount(
      <TextInput errorMessage="error" height={200} hasError />,
    );
    expect(component.find(InputError).text()).toEqual('error');
    expect(component.find(StyledInput)).toHaveStyleRule('height: 40px');
    expect(component.find(StyledInput)).toHaveStyleRule(
      'background-color: #FFFFFF',
    );
  });
});
