import { getSnapshot } from 'mobx-state-tree';
import { mockWmProfile, mockWmxUser } from 'lib/mocks/user';
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
