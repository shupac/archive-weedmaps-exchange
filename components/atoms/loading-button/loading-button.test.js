import React from 'react';
import { shallow, mount } from 'enzyme';
import LoadingButton from './';
import ButtonLoadingProgress from './styles';

describe('Button Save', () => {
  it('renders Button Primary', () => {
    const tree = shallow(<LoadingButton isLoading={false} />);
    expect(tree.find(ButtonLoadingProgress).props().isLoading).toEqual(false);
  });

  it('renders Button Save Progress', () => {
    const tree = shallow(<LoadingButton isLoading />);
    expect(tree.find(ButtonLoadingProgress).props().isLoading).toEqual(true);
  });

  it('should render all of the styling of the Button', () => {
    const tree = mount(
      <LoadingButton isLoading width="200px" height="200px" />,
    );
    expect(tree.find('ButtonLoadingProgress')).toHaveStyleRule('opacity: 0.8');
    expect(tree.find('ButtonLoadingProgress')).toHaveStyleRule('width: 200px');
    expect(tree.find('ButtonLoadingProgress')).toHaveStyleRule('height: 200px');
  });
});
