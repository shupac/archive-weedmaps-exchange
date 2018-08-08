import React from 'react';
import { mount } from 'enzyme';
import RouterProvider from '../router-provider';
import RouterConnector from './index';

describe('RouterConnector', () => {
  it('behaves like an HOC', () => {
    expect(RouterConnector).toBeAHoc();
  });

  it('will expose the URL in context', () => {
    const Component = () => <div />;
    const Wrapped = RouterConnector(Component);
    expect(Wrapped.contextTypes.url).toBeDefined();
  });

  it('will pass the context', () => {
    const context = { url: { query: { slug: 123 } } };
    const Component = () => <div />;
    const ProvidedComponent = RouterProvider(Component);
    const Wrapped = RouterConnector(ProvidedComponent);
    const wrapper = mount(<Wrapped />, { context });
    expect(wrapper.find(Component).props('url')).toEqual(context);
  });
});
