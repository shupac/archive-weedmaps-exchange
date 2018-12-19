import React from 'react';
import { shallow } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import AuthStore from 'lib/data-access/stores/auth';
import { LICENSE_TYPES } from 'lib/common/constants';
import mockOrganization from 'lib/mocks/organization';
import mockUserData from 'lib/mocks/user-data';
import BuyerProfile, { BuyerProfileForm } from './buyer-profile-form';
import Profile from './';

function setup(org) {
  const mockFetchClient = {
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockUserData })),
  };
  const mockStore = {
    uiStore: UiStore.create(),
    authStore: AuthStore.create(
      { wmxUser: mockUserData, org },
      { client: mockFetchClient },
    ),
  };
  const component = <Profile store={mockStore} />;
  const wrapper = shallow(component).dive();
  return { wrapper };
}

function formSetup() {
  const store = {
    uiStore: {
      modalIsOpen: false,
      onCloseModal: jest.fn(),
    },
    buyerSettings: {
      createNewLocation: jest.fn(),
    },
    addressSuggestions: {
      isAddressCommitted: jest.fn(),
      setQuery: jest.fn(),
    },
  };
  const props = {
    errors: { name: 'address' },
    touched: { name: 'address' },
  };
  const formWrapper = shallow(
    <BuyerProfileForm
      store={store}
      values={mockOrganization}
      licenseTypes={LICENSE_TYPES}
      {...props}
    />,
  );
  return { formWrapper };
}

describe('Profile', () => {
  it('should not render the profile if there is no organization data', () => {
    const { wrapper } = setup(undefined);
    expect(wrapper.find(BuyerProfile).length).toEqual(0);
  });
  it('should render the Buyer Profile page when there is organization data', () => {
    const { wrapper } = setup(mockOrganization);
    expect(wrapper.find(BuyerProfile).exists()).toEqual(true);
  });
});

describe('LocationForm', () => {
  it('should render the Location Form with data, if data exists', () => {
    const { formWrapper } = formSetup();
    expect(formWrapper.exists()).toBe(true);
    expect(
      formWrapper.find('[data-test-id="form-name"]').props(),
    ).toHaveProperty('value', 'test');
  });

  it('FormTemplate should have values', () => {
    const { formWrapper } = formSetup();
    expect(formWrapper.props().value).not.toBeNull();
  });

  it('should render the Location Form with blank values if data does not exist', () => {
    const { formWrapper } = formSetup();
    expect(
      formWrapper.find('[data-test-id="form-name"]').props(),
    ).toHaveProperty('value', 'test');
    expect(
      formWrapper.find('[data-test-id="form-phone"]').props(),
    ).toHaveProperty('value', '(123) 456-6789');
    expect(
      formWrapper.find('[data-test-id="form-contact"]').props(),
    ).toHaveProperty('value', 'test contact');
    expect(
      formWrapper.find('[data-test-id="form-email"]').props(),
    ).toHaveProperty('value', 'weedmaps@weedmaps.com');
  });

  it('should not allow cancel or submit if the form state has not been changed', () => {
    const { formWrapper } = formSetup();
    const save = formWrapper.dive().find('[data-test-id="button-submit"]');
    expect(save.props().disabled).toBe(true);
  });
});
