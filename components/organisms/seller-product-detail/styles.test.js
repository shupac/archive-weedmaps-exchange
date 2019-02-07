import { shallow, mount } from 'enzyme';
import WmTheme from '@ghostgroup/ui.theme';

import { FormInput, StyledSelect } from './styles';

const { danger } = WmTheme.style.state;

describe('FormInput component styles', () => {
  it('should render the component', () => {
    const wrapper = shallow(<FormInput />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should show red border when error is true', () => {
    const wrapper = mount(<FormInput error />);
    expect(wrapper.find('input')).toHaveStyleRule(
      'border',
      `1px solid ${danger}`,
    );
  });
});

describe('StyledSelect component styles', () => {
  it('should render the component', () => {
    const wrapper = shallow(<StyledSelect />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should show when error is true', () => {
    const wrapper = shallow(<StyledSelect error />);
    expect(wrapper.exists()).toEqual(true);
  });
});
