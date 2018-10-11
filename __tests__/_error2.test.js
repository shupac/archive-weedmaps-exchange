import React from 'react';
import { shallow } from 'enzyme';
import Error2 from 'pages/error-2';

describe('Error2', () => {
  it('should render the Error2', () => {
    const component = shallow(<Error2 />).dive();
    expect(component.find('h1').text()).toEqual('Error2');
  });
});
