import { mount } from 'enzyme';
import RouterProvider from './index';

describe('RouterProvider', () => {
  it('behaves like an HOC', () => {
    expect(RouterProvider).toBeAHoc();
  });

  it('will expose the URL as context', () => {
    const Component = () => <div />;
    const Wrapped = RouterProvider(Component);
    expect(Wrapped.childContextTypes.url).toBeDefined();
  });

  it('will call getInitialProps on the wrapped component', async () => {
    const component = () => <div>test</div>;
    const store = {};
    const props = {};
    component.getInitialProps = jest.fn(() => null);
    const Wrapped = RouterProvider(component);
    await Wrapped.getInitialProps(props, store);
    expect(component.getInitialProps).toBeCalledWith(props, store);
  });

  it('will retrieve the url from props', () => {
    const mockUrl = { query: { slug: 123 } };
    const Component = () => <div />;
    const Wrapped = RouterProvider(Component);
    const wrapper = mount(<Wrapped url={mockUrl} />);
    expect(wrapper.instance().getChildContext().url).toEqual(mockUrl);
  });
});
