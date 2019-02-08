import { shallow } from 'enzyme';
import { mockBrand } from 'lib/mocks/brands';
import { mockWmxUser } from 'lib/mocks/user';
import { mockOrg } from 'lib/mocks/organization';
import AuthStore from 'lib/data-access/stores/auth';
import UiStore from 'lib/data-access/stores/ui';
import Loader from 'components/atoms/loader';
import { GeneralSettings } from './';

const mockUserSeller = {
  ...mockWmxUser,
  preferences: {
    ...mockWmxUser.preferences,
    userContext: 'seller',
    brandId: 'e98a5787-2e60-4302-b566-c6454a69a91f',
  },
};

function setup(brand) {
  const mockStore = {
    authStore: AuthStore.create({
      brand,
      wmxUser: {
        ...mockWmxUser,
        preferences: {
          ...mockWmxUser.preferences,
          userContext: 'seller',
          brandId: '9ffabab9-75bd-4d17-b8f6-265470243155',
        },
      },
      org: mockOrg,
    }),
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

  it('disposes of the reaction when unmounting', () => {
    const { wrapper } = setup();
    const dispose = jest.spyOn(wrapper.instance(), 'dispose');
    wrapper.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('will refetch brand data when the brand id changes', () => {
    const { mockStore } = setup();
    const mockFetchBrand = jest.spyOn(mockStore.authStore, 'fetchBrand');
    mockStore.authStore.setUser(mockUserSeller);
    setTimeout(() => {
      expect(mockFetchBrand).toHaveBeenCalledWith(
        mockUserSeller.preferences.brandId,
      );
    }, 100);
  });
});
