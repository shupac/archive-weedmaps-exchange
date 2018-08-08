import React from 'react';
import { shallow } from 'enzyme';
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
});
