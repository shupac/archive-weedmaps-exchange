/* eslint-disable import/first,react/no-multi-comp */
// @flow
jest.mock('lib/common/axios');
jest.mock('lib/common/universal-helpers');
import * as React from 'react';
import { mount } from 'enzyme';
import withStores from './focused-store-provider';
import Store from './base';

class MockPageComponent extends React.Component<{}> {
  render() {
    return <div>My mock page</div>;
  }
}

class MockPageWithGIPsComponent extends React.Component<{}> {
  static getInitialProps(props, stores) {
    return {
      results: {
        props,
        stores,
      },
    };
  }

  render() {
    return <div>My mock page</div>;
  }
}

class MockStore extends Store {}

function setup(Component, mockIsOnServer = false, withAuth = false) {
  const uniHelpers = require('lib/common/universal-helpers');
  jest.spyOn(uniHelpers, 'isServer').mockReturnValue(mockIsOnServer);

  const mockPageStoresDefinition: { [key: string]: any } = {
    mock: { Store: MockStore },
  };

  if (withAuth) {
    mockPageStoresDefinition.auth = {
      Store: MockStore,
      client: true,
    };
  }

  const ComponentWithStores = withStores(Component, mockPageStoresDefinition);
  return {
    ComponentWithStores,
  };
}

describe('The FocusedStoreProvider', () => {
  it('should be able to wrap a PageComponent with a simple store without a Service', () => {
    const { ComponentWithStores } = setup(MockPageComponent);

    const wrapper = mount(<ComponentWithStores />);
    const mockStore = wrapper.find('Provider').props().mock;
    expect(mockStore).toMatchObject({
      service: null,
    });
  });

  it('should be able to wrap a PageComponent with a simple store without a Service and call the getInitialProps of the page', async () => {
    const { ComponentWithStores } = setup(MockPageComponent);

    // $FlowFixMe
    const initialProps = await ComponentWithStores.getInitialProps({});
    expect(initialProps).toMatchObject({ storeInitialState: {} });
  });

  it('should be able to wrap a PageComponent with a simple store without a Service and call getInitialProps passing down the store', async () => {
    const { ComponentWithStores } = setup(MockPageWithGIPsComponent);

    // $FlowFixMe
    const initialProps = await ComponentWithStores.getInitialProps({});
    expect(initialProps).toMatchObject({
      results: {
        props: {},
        stores: { mock: { service: null } },
      },
      storeInitialState: {},
    });
  });

  it('should be able to wrap a PageComponent with a simple store without a Service in the service', async () => {
    const { ComponentWithStores } = setup(MockPageWithGIPsComponent, true);

    // $FlowFixMe
    const initialProps = await ComponentWithStores.getInitialProps({});
    expect(initialProps).toMatchObject({
      results: {
        props: {},
        stores: { mock: { service: null } },
      },
      storeInitialState: {
        mock: {},
      },
    });
  });

  it('should be able to redirect if WMredirecting is set', async () => {
    const { ComponentWithStores } = setup(MockPageComponent, true);

    const res = {
      WMredirecting: '/login',
      redirect: jest.fn(),
      end: jest.fn(),
      finished: false,
    };
    // $FlowFixMe
    const initialProps = await ComponentWithStores.getInitialProps({
      res,
    });

    expect(res.redirect).toHaveBeenCalledWith('/login');
    expect(res.end).toHaveBeenCalled();
    expect(res.finished).toBe(true);
    expect(initialProps).toMatchObject({});
  });
});
