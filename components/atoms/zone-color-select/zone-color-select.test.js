import React from 'react';
import { shallow } from 'enzyme';
import Select from 'components/atoms/select';
import ColorKey from './styles';
import { ColorSelect } from './';

function setup() {
  const props = {
    onColorSelect: jest.fn(),
  };
  const wrapper = shallow(<ColorSelect {...props} />);
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
    expect(instance.props.onColorSelect).toHaveBeenCalledWith('blueDark');
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
    const styledComponent = shallow(<ColorKey color="#BDE4A7" />);
    expect(styledComponent).toHaveStyleRule('border: 1px solid #BDE4A7');
    expect(styledComponent).toHaveStyleRule(
      'background-color: rgba(74,144,226,0.4)',
    );
  });
});
