import React from 'react';
import { shallow, mount } from 'enzyme';

import PagingControls from './';

const pageButtonArray = (pageCount, currentPage) => {
  const wrapper = shallow(
    <PagingControls pageCount={pageCount} currentPage={currentPage} />,
  );
  const componentInstance = wrapper.instance();
  return componentInstance.pageButtonArray();
};
describe('Paging Controls', () => {
  it('should render with four pages', () => {
    const component = <PagingControls pageCount={4} />;
    const tree = shallow(component);
    expect(tree.exists()).toEqual(true);
  });

  it('should render with nine pages', () => {
    const component = <PagingControls pageCount={9} currentPage={5} />;
    const tree = shallow(component);
    expect(tree.exists()).toEqual(true);
  });

  it('should render with 0 pages', () => {
    const component = <PagingControls pageCount={0} />;
    const tree = shallow(component);
    expect(tree.exists()).toEqual(true);
  });

  it('should have the right page number values with four pages', () => {
    expect(pageButtonArray(4, 1)).toEqual([1, 2, 3, 4]);
    expect(pageButtonArray(4, 2)).toEqual([1, 2, 3, 4]);
    expect(pageButtonArray(4, 3)).toEqual([1, 2, 3, 4]);
    expect(pageButtonArray(4, 4)).toEqual([1, 2, 3, 4]);
  });

  it('should have the right page number values with seven pages', () => {
    expect(pageButtonArray(7, 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 2)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 3)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 5)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 6)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(pageButtonArray(7, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should have the right page number values with nine pages', () => {
    expect(pageButtonArray(9, 1)).toEqual([1, 2, 3, 4, 5, 0, 9]);
    expect(pageButtonArray(9, 2)).toEqual([1, 2, 3, 4, 5, 0, 9]);
    expect(pageButtonArray(9, 3)).toEqual([1, 2, 3, 4, 5, 0, 9]);
    expect(pageButtonArray(9, 4)).toEqual([1, 2, 3, 4, 5, 0, 9]);
    expect(pageButtonArray(9, 5)).toEqual([1, 0, 4, 5, 6, 0, 9]);
    expect(pageButtonArray(9, 6)).toEqual([1, 0, 5, 6, 7, 8, 9]);
    expect(pageButtonArray(9, 7)).toEqual([1, 0, 5, 6, 7, 8, 9]);
    expect(pageButtonArray(9, 8)).toEqual([1, 0, 5, 6, 7, 8, 9]);
    expect(pageButtonArray(9, 9)).toEqual([1, 0, 5, 6, 7, 8, 9]);
  });

  it('should have the right page number values with twelve pages', () => {
    expect(pageButtonArray(12, 1)).toEqual([1, 2, 3, 4, 5, 0, 12]);
    expect(pageButtonArray(12, 2)).toEqual([1, 2, 3, 4, 5, 0, 12]);
    expect(pageButtonArray(12, 3)).toEqual([1, 2, 3, 4, 5, 0, 12]);
    expect(pageButtonArray(12, 4)).toEqual([1, 2, 3, 4, 5, 0, 12]);
    expect(pageButtonArray(12, 5)).toEqual([1, 0, 4, 5, 6, 0, 12]);
    expect(pageButtonArray(12, 6)).toEqual([1, 0, 5, 6, 7, 0, 12]);
    expect(pageButtonArray(12, 7)).toEqual([1, 0, 6, 7, 8, 0, 12]);
    expect(pageButtonArray(12, 8)).toEqual([1, 0, 7, 8, 9, 0, 12]);
    expect(pageButtonArray(12, 9)).toEqual([1, 0, 8, 9, 10, 11, 12]);
    expect(pageButtonArray(12, 10)).toEqual([1, 0, 8, 9, 10, 11, 12]);
    expect(pageButtonArray(12, 11)).toEqual([1, 0, 8, 9, 10, 11, 12]);
    expect(pageButtonArray(12, 12)).toEqual([1, 0, 8, 9, 10, 11, 12]);
  });

  it('should call onSelectPage when clicking on a page number', () => {
    const onSelectPage = jest.fn();
    const wrapper = mount(
      <PagingControls
        pageCount={4}
        currentPage={3}
        onSelectPage={onSelectPage}
      />,
    );
    wrapper
      .find('PageButton')
      .at(4)
      .simulate('click');
    expect(onSelectPage).toHaveBeenCalledWith(4);
  });

  it('should call onSelectPage when clicking previous page button', () => {
    const onSelectPage = jest.fn();
    const wrapper = mount(
      <PagingControls
        pageCount={4}
        currentPage={4}
        onSelectPage={onSelectPage}
      />,
    );
    wrapper.find('PreviousPageButton').simulate('click');
    expect(onSelectPage).toHaveBeenCalledWith(3);
  });

  it('should call onSelectPage when clicking next page button', () => {
    const onSelectPage = jest.fn();
    const wrapper = mount(
      <PagingControls
        pageCount={4}
        currentPage={1}
        onSelectPage={onSelectPage}
      />,
    );
    wrapper.find('NextPageButton').simulate('click');
    expect(onSelectPage).toHaveBeenCalledWith(2);
  });

  it('should not call onSelectPage when clicking previous page button while on the first page', () => {
    const onSelectPage = jest.fn();
    const wrapper = mount(
      <PagingControls
        pageCount={4}
        currentPage={1}
        onSelectPage={onSelectPage}
      />,
    );
    wrapper.find('PreviousPageButton').simulate('click');
    expect(onSelectPage).not.toHaveBeenCalled();
  });

  it('should not call onSelectPage when clicking next page button while on the last page', () => {
    const onSelectPage = jest.fn();
    const wrapper = mount(
      <PagingControls
        pageCount={4}
        currentPage={4}
        onSelectPage={onSelectPage}
      />,
    );
    wrapper.find('NextPageButton').simulate('click');
    expect(onSelectPage).not.toHaveBeenCalled();
  });
});
