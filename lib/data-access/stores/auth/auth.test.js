import { getSnapshot } from 'mobx-state-tree';
import { mockWmProfile, mockWmxUser } from 'lib/mocks/user';
import { mockBrand } from 'lib/mocks/brands';
import { mockOrg } from 'lib/mocks/organization';
import AuthStore from './';

function setup() {
  const mockSdk = {
    request: {
      isAuthenticated: jest.fn().mockReturnValue(true),
    },
    user: {
      me: jest.fn().mockReturnValue(Promise.resolve(mockWmProfile)),
    },
  };

  const mockFetchClient = {
    put: jest.fn().mockReturnValue(),
    fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockWmxUser })),
  };

  return { mockSdk, mockFetchClient };
}

const org = {
  id: '2f4ddb82-3b67-4780-8ae4-7f27da36d813',
  name: 'Big Baller Brand',
  address: '1795 N 1st St, Hermiston, OR, US, 97838',
  contactName: 'Androoooooo',
  phoneNumber: '4442223332',
  email: 'andrew@andrew.com',
  licenses: [],
};

describe('Auth Store', () => {
  it('actions will update the state of the model', () => {
    const auth = AuthStore.create();
    auth.setUser(mockWmxUser);
    auth.setWmProfile(mockWmProfile);
    expect(getSnapshot(auth)).toMatchSnapshot();
  });

  it('fetches user data and sets user computed value', async () => {
    const { mockSdk, mockFetchClient } = setup();

    const auth = AuthStore.create(
      {},
      { wmSdk: mockSdk, client: mockFetchClient },
    );

    await auth.fetchUser();

    expect(auth.user).toEqual({
      avatarUrl:
        'https://images-acceptance.weedmaps.com/users/002/208/463/avatar/square_fill/1544743547-image-1653344458.jpg',
      userContext: 'buyer',
      username: 'asciametta',
      wmUserId: 2208463,
    });
    expect(auth.activeContext).toEqual('buyer');
    expect(auth.loggedIn).toBe(true);
  });

  it('should have computed value for orgBrands', async () => {
    const auth = AuthStore.create({ org: mockOrg });
    expect(await auth.orgBrands.length).toEqual(2);
  });

  it('should be able to setUserContext', async () => {
    const { mockSdk } = setup();
    const mockFetchClient = {
      put: jest.fn().mockReturnValue({ data: mockWmxUser }),
    };
    const auth = AuthStore.create(
      {},
      { wmSdk: mockSdk, client: mockFetchClient },
    );
    auth.setUserContext('buyer');

    expect(mockFetchClient.put).toHaveBeenCalledWith(`/users/me/preferences`, {
      data: {
        type: 'user_preferences',
        attributes: {
          user_context: 'buyer',
        },
      },
    });
  });

  it('should be able to fetchBrand', async () => {
    const mockFetchClient = {
      fetch: jest.fn().mockReturnValue(Promise.resolve({ data: mockBrand })),
    };

    const auth = AuthStore.create({}, { client: mockFetchClient });

    await auth.fetchBrand('d60ca06a-89db-4584-99a8-1f9b9f427e42');
    expect(auth.brand).toEqual({
      avatarImage: undefined,
      deliveryEta: {
        etaMax: 2,
        etaMaxUnit: 'week',
        etaMin: 1,
        etaMinUnit: 'hr',
      },
      description: undefined,
      id: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
      licenses: null,
      minimumPurchasePrice: 80,
      name: 'GFarmaLabs',
      shippingFee: 100,
      slug: undefined,
    });
  });

  it('should be able to updateBrand', async () => {
    const mockFetchClient = {
      put: jest.fn().mockReturnValue(),
    };

    const auth = AuthStore.create({}, { client: mockFetchClient });

    const brand = {
      minimum_purchase_price: 10,
      shipping_fee: 10,
      delivery_eta: {
        eta_min_unit: 'hr',
        eta_min: 1,
        eta_max_unit: 'week',
        eta_max: 2,
      },
      name: 'test',
      id: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
    };

    const response = await auth.updateBrand(brand);
    expect(mockFetchClient.put).toHaveBeenCalledWith(
      '/brands/d60ca06a-89db-4584-99a8-1f9b9f427e42',
      {
        data: {
          attributes: {
            delivery_eta: {
              eta_max: 2,
              eta_max_unit: 'week',
              eta_min: 1,
              eta_min_unit: 'hr',
            },
            id: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
            minimum_purchase_price: 10,
            name: 'test',
            shipping_fee: 10,
          },
          type: 'brand',
        },
      },
    );
    expect(response).toEqual(true);
  });

  it('should be able to updateOrganization', async () => {
    const mockFetchClient = {
      put: jest.fn().mockReturnValue(),
    };

    const auth = AuthStore.create({}, { client: mockFetchClient });

    const organization = {
      address: '123 Irvine',
      contactName: 'Test',
      email: 'weedmaps@weedmaps.com',
      name: 'test',
      phoneNumber: '123-123-1234',
      id: '1234',
    };

    await auth.updateOrganization(organization);
    expect(mockFetchClient.put).toHaveBeenCalledWith('/organizations/1234', {
      data: {
        attributes: {
          address: '123 Irvine',
          contact_name: 'Test',
          email: 'weedmaps@weedmaps.com',
          name: 'test',
          phone_number: '123-123-1234',
          undefined: '1234',
        },
        id: '1234',
        type: 'address',
      },
    });
  });

  it('should be able to setActiveBrand ', async () => {
    const mockFetchClient = {
      put: jest.fn().mockReturnValue({ data: mockWmxUser }),
    };
    const auth = AuthStore.create({}, { client: mockFetchClient });
    auth.setActiveBrand('9ffabab9-75bd-4d17-b8f6-265470243155');
    expect(mockFetchClient.put).toHaveBeenCalledWith(`/users/me/preferences`, {
      data: {
        type: 'user_preferences',
        attributes: {
          brand_id: '9ffabab9-75bd-4d17-b8f6-265470243155',
        },
      },
    });
  });

  it('handles getAuthStatus', async () => {
    const { mockSdk } = setup();
    const authStore = AuthStore.create({}, { wmSdk: mockSdk });
    expect(authStore.isAuthenticated).toEqual(true);
    mockSdk.request.isAuthenticated.mockReturnValue(false);

    expect(authStore.isAuthenticated).toEqual(false);
  });

  it('can update the users active location', async () => {
    const { mockSdk } = setup();
    const mockFetchClient = {
      put: jest.fn().mockReturnValue({ data: mockWmxUser }),
    };
    const auth = AuthStore.create(
      {},
      { wmSdk: mockSdk, client: mockFetchClient },
    );
    await auth.patchUserLocation('1234');

    expect(mockFetchClient.put).toHaveBeenCalledWith(`/users/me/preferences`, {
      data: {
        type: 'user_preferences',
        attributes: {
          location_id: '1234',
        },
      },
    });
  });

  it('can update the organization ', async () => {
    const mockFetchClient = {
      put: jest.fn().mockReturnValue({ data: mockOrg }),
    };

    const authStore = AuthStore.create({}, { client: mockFetchClient });
    const result = await authStore.updateOrganization(org);
    expect(result).toEqual(true);
  });

  it('should catch when updating the organization ', async () => {
    const mockFetchClient = {
      put: () => {
        throw new Error('test');
      },
    };

    const authStore = AuthStore.create({}, { client: mockFetchClient });
    const result = await authStore.updateOrganization(org);
    expect(result).toEqual(false);
  });
});
