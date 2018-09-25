import React from 'react';
import { shallow } from 'enzyme';
import { mockProduct } from 'lib/mocks/product';
import { Brand, Description, Title } from './styles';
import ProductDetails from './';

describe('Product Details', () => {
  it('should render the component with data', () => {
    const { data, included } = mockProduct;
    const component = shallow(
      <ProductDetails details={data} dataArr={included} />,
    );
    expect(component.find(Brand).length).toEqual(1);
    expect(component.find(Description).length).toEqual(1);
  });
  it('should render No Product Available if without data', () => {
    const component = shallow(
      <ProductDetails details={undefined} dataArr={undefined} />,
    );
    expect(
      component
        .find(Title)
        .children()
        .text(),
    ).toEqual('No Product Available');
  });
});
