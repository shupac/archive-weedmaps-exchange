import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from 'lib/jest/find-by-test-id';
import { ErrorPage } from './index';

describe('The Error Page Layout', () => {
  it('renders the right heading for a 404', () => {
    const wrapper = shallow(<ErrorPage statusCode={404} />);
    expect(wrapper.find('h1').text()).toBe('404');
  });

  it('renders the right content for a 404', () => {
    const wrapper = shallow(<ErrorPage statusCode={404} />);
    expect(wrapper.find('h2').text()).toBe('Page does not exist');
  });

  it('renders the right heading for a 500', () => {
    const wrapper = shallow(<ErrorPage statusCode={500} intl={({}: any)} />);
    expect(wrapper.find('h1').text()).toBe('500');
  });

  it('renders the right content for a 500', () => {
    const wrapper = shallow(<ErrorPage statusCode={500} />);
    expect(wrapper.find('h2').text()).toBe('Internal Server Error');
  });

  it('renders a back to Dashboard button', () => {
    const wrapper = shallow(<ErrorPage statusCode={500} />);
    expect(findByTestId(wrapper, 'link-button-to-home').props().href).toBe(
      '/help',
    );
    expect(findByTestId(wrapper, 'link-button-to-home').html()).toContain(
      'Back to Dashboard',
    );
  });
});
