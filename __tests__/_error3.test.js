import React from 'react';
import { shallow } from 'enzyme';
import Error3 from 'pages/error-3';

describe('Error3', () => {
  it('should render out Error3 ', () => {
    const component = shallow(<Error3 />).dive();
    expect(component.find('h1').text()).toEqual('Error3');
  });
});
