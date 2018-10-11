import React from 'react';
import { shallow } from 'enzyme';
import Subheader from './';
import SubheaderWrapper from './styles';

describe('Subheader', () => {
  it('should render the subheader', () => {
    const component = shallow(
      <Subheader>
        <div>Hi</div>
      </Subheader>,
    );
    expect(component.find(SubheaderWrapper)).toBeDefined();
  });
});
