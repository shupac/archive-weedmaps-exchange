import React from 'react';
import { shallow } from 'enzyme';
import HelpPage from './';

function setup() {
  const component = <HelpPage />;
  const wrapper = shallow(component);

  return { wrapper };
}

describe('HelpPage', () => {
  it('should render the component', () => {
    const { wrapper } = setup();

    expect(wrapper.find('[data-test-id="help-title"]').text()).toEqual('Help');
    expect(wrapper.find('[data-test-id="contact-phone"]').text()).toEqual(
      '1-844-WEEDMAPS (933-3627)',
    );
    expect(wrapper.find('[data-test-id="contact-email"]').text()).toEqual(
      'customerservice@weedmaps.com',
    );
  });
});
