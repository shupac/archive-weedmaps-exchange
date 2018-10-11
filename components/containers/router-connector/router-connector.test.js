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

  it('will call getInitialProps on the wrapped component', async () => {
    const component = () => <div>test</div>;
    const store = {};
    const props = {};
    component.getInitialProps = jest.fn(() => null);
    const Wrapped = RouterConnector(component);
    await Wrapped.getInitialProps(props, store);
    expect(component.getInitialProps).toBeCalledWith(props, store);
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
