// @flow
import { shallow } from 'enzyme';
import findByTestId from 'lib/jest/find-by-test-id';
import { ZoneForm } from './zone-form';

describe('Zone Form', () => {
  it('will render a CTA for clicking the regions', () => {
    const wrapper = shallow(
      <ZoneForm zone={{}} selectedRegions={new Map([])} />,
    );
    expect(findByTestId(wrapper, 'zone-cta').length).toBe(1);
  });
});
