import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './';
import { ErrorMessage } from './styles';

describe('Text Input', () => {
  it('should render the text input', () => {
    const wrapper = shallow(<TextInput />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render an error message if passed in', () => {
    const wrapper = shallow(<TextInput errorMessage="There is an error" />);
    expect(wrapper.find(ErrorMessage).exists()).toEqual(true);
  });
});
