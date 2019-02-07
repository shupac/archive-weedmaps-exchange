import { shallow } from 'enzyme';
import { mockBrand } from 'lib/mocks/brands';
import { mockWmxUser } from 'lib/mocks/user';
import { mockOrg } from 'lib/mocks/organization';
import UiStore from 'lib/data-access/stores/ui';
import Loader from 'components/atoms/loader';
import { GeneralSettings } from './';

function setup(brand) {
  const mockStore = {
    authStore: {
      wmxUser: mockWmxUser,
      org: mockOrg,
      brand,
      activeSellerBrand: {
        text: 'Harmony Extracts',
        value: 'e98a5787-2e60-4302-b566-c6454a69a91f',
      },
      updateBrand: jest.fn(),
    },
    uiStore: UiStore.create(),
  };
  const component = <GeneralSettings store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('GeneralSettings', () => {
  it('should render the component', () => {
    const { wrapper } = setup(mockBrand);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should show a loader if brand does not exist', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });

  it('should show success toast', () => {
    const { wrapper, mockStore } = setup(mockBrand);
    const notifyToast = jest.spyOn(mockStore.uiStore, 'notifyToast');
    const notification = {
      title: 'Settings Success',
      body: 'Your settings have been saved',
      autoDismiss: 3000,
      status: 'SUCCESS',
    };
    wrapper.instance().onConfirmToast(true);
    expect(notifyToast).toHaveBeenCalledWith(notification);
  });

  it('should show error toast', () => {
    const { wrapper, mockStore } = setup(mockBrand);
    const notifyToast = jest.spyOn(mockStore.uiStore, 'notifyToast');
    const notification = {
      title: 'Settings Error',
      body:
        'There was a problem saving your settings. Please check for any errors and try again',
      autoDismiss: 8000,
      status: 'ERROR',
    };
    wrapper.instance().onConfirmToast(false);
    expect(notifyToast).toHaveBeenCalledWith(notification);
  });
});
