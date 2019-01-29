import { shallow } from 'enzyme';
import { observable } from 'mobx';
import findByTestId from 'lib/jest/find-by-test-id';
import { ZoneForm } from './zone-form';

function setup(withSelectedRegion) {
  let selectedRegions;

  if (withSelectedRegion) {
    selectedRegions = observable([{ id: 1324, name: 'Northern California' }]);
  } else {
    selectedRegions = observable([]);
  }

  return shallow(<ZoneForm zone={{}} selectedRegions={selectedRegions} />);
}

describe('Zone Form', () => {
  it('will render a CTA for clicking the regions', () => {
    const wrapper = setup(false);
    expect(findByTestId(wrapper, 'zone-cta').length).toBe(1);
  });

  it('will disable the save button if 1 condition is not met', () => {
    let wrapper = setup(false);

    // initial load into form
    expect(findByTestId(wrapper, 'save-button').props().disabled).toEqual(true);

    // zone name valid but no selected region
    findByTestId(wrapper, 'zone-name-input').simulate('change', {
      currentTarget: { value: 'valid name' },
    });
    expect(findByTestId(wrapper, 'save-button').props().disabled).toEqual(true);

    // 1 selected region but zone name invalid
    wrapper = setup(true);
    findByTestId(wrapper, 'zone-name-input').simulate('change', {
      currentTarget: { value: '   ' },
    });
    expect(findByTestId(wrapper, 'save-button').props().disabled).toEqual(true);
  });

  it('will enable the save button if all conditions are met', () => {
    const wrapper = setup(true);
    findByTestId(wrapper, 'zone-name-input').simulate('change', {
      currentTarget: { value: 'valid name' },
    });
    expect(findByTestId(wrapper, 'save-button').props().disabled).toEqual(
      false,
    );
  });
});
