import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from 'components/atoms/select';
import findByTestId from 'lib/jest/find-by-test-id';
import ColorKey from './styles';
import { ColorSelect } from './';

function setup(props) {
  const defaultProps = {
    onColorSelect: jest.fn(),
    ...props,
  };
  const wrapper = shallow(<ColorSelect {...defaultProps} />);
  const instance = wrapper.instance();
  return {
    wrapper,
    instance,
  };
}

describe('ColorSelect', () => {
  it('should transform color options for select ', () => {
    const { instance } = setup();
    expect(instance.colorOptions.length).toEqual(12);
  });

  it('should handle select change', () => {
    const { instance } = setup();
    instance.handleSelectChange({ value: 'blueDark', text: 'Dark Blue' });
    expect(instance.state).toEqual({
      selectedRegionColor: { value: 'blueDark', text: 'Dark Blue' },
    });
    expect(instance.props.onColorSelect).toHaveBeenCalledWith('#086788');
  });

  it('should handle an initial selection change', () => {
    const { wrapper } = setup({ initialSelection: '#ACEDFF' });
    const select = findByTestId(wrapper, 'select-box');
    expect(select.props().selectedItem).toEqual({
      icon: expect.anything(),
      text: 'Light Blue',
      value: 'blueLight',
    });
  });

  it('should render the component and option labels ', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
    expect(
      wrapper
        .find(Select)
        .props()
        .itemToString({ value: 'blueDark', text: 'Dark Blue' }),
    ).toEqual('Dark Blue');
  });

  it('should apply proper style to color keys ', () => {
    const styledComponent = mount(<ColorKey color="#BDE4A7" />);
    expect(styledComponent).toHaveStyleRule('border: 1px solid #BDE4A7');
    expect(styledComponent).toHaveStyleRule(
      'background-color: rgba(74,144,226,0.4)',
    );
  });
});
