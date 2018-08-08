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

  it('will retrieve the url from props', () => {
    const mockUrl = { query: { slug: 123 } };
    const Component = () => <div />;
    const Wrapped = RouterProvider(Component);
    const wrapper = mount(<Wrapped url={mockUrl} />);
    expect(wrapper.instance().getChildContext().url).toEqual(mockUrl);
  });
});
