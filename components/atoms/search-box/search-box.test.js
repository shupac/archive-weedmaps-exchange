import * as React from 'react';
import { shallow } from 'enzyme';
import { InputText } from './styles';
import { SearchBox } from './';

function setUp() {
  const tree = shallow(<SearchBox onHandleSearch={jest.fn()} />);
  const instance = tree.instance();
  return { tree, instance };
}

describe('The SearchBox', () => {
  it('should be able to call the onChange prop when the SearchInputText component within it changes', () => {
    const { tree, instance } = setUp();

    tree.find(InputText).simulate('change', { target: { value: 'high' } });
    expect(instance.query).toEqual('high');
  });

  it('should be able to clear the input value', () => {
    const { tree, instance } = setUp();
    tree.find(InputText).simulate('change', { target: { value: 'high' } });
    tree.find('SearchClear').simulate('click');

    expect(instance.query).toEqual('');
  });

  it('should be able call submit handler on button click', () => {
    const { tree, instance } = setUp();
    const mockSearchSubmit = jest.spyOn(instance, 'onSearchSubmit');
    tree.find(InputText).simulate('change', { target: { value: 'high' } });
    tree.find('SearchSubmit').simulate('click');
    expect(mockSearchSubmit).toHaveBeenCalled();
  });

  it('will submit on Enter keydown ', () => {
    const { instance } = setUp();
    instance.onKeyDown({ key: 'Enter', preventDefault: jest.fn() });
    expect(instance.props.onHandleSearch).toHaveBeenCalled();
  });
});
