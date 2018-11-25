import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import StatusPill from './';

describe('Styled Link', () => {
  it('should render the status pill', () => {
    const component = <StatusPill status="canceled" />;
    const wrapper = shallow(component);
    expect(wrapper.exists()).toEqual(true);
    const pill = renderer.create(component);
    expect(pill).toMatchSnapshot();
  });
});
