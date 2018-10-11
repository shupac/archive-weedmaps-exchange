import React from 'react';
import { shallow } from 'enzyme';
import Error1 from 'pages/error-1.js';

describe('Error1', () => {
  it('should render out the Error1', () => {
    const component = shallow(<Error1 />).dive();
    expect(component.find('h1').text()).toEqual('Error1');
  });
  it('should handle the getInitialProps', async () => {
    const initialProps = await Error1.getInitialProps();
    expect(initialProps).toEqual({});
  });
});
