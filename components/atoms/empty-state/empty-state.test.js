import React from 'react';
import { shallow } from 'enzyme';
import EmptyState from '.';
import { NoResultsInstructions, NoResultsTitle } from './styles';

describe('empty-state', () => {
  it('should render an image', () => {
    const component = shallow(
      <EmptyState
        image="no_products_available"
        title="No Products Available"
        body="There are currently no products available, please try again later."
      />,
    );

    expect(component.exists()).toBe(true);
    expect(
      component
        .dive()
        .find('img')
        .exists(),
    ).toBe(true);
  });

  it('should render a title', () => {
    const component = shallow(
      <EmptyState
        image="no_products_available"
        title="No Products Available"
        body="There are currently no products available, please try again later."
      />,
    );

    expect(component.find(NoResultsTitle).text()).toEqual(
      'No Products Available',
    );
  });

  it('should render a button and route', () => {
    const component = shallow(
      <EmptyState
        image="no_products_available"
        title="No Products Available"
        body="There are currently no products available, please try again later."
        route="/catalog"
        buttonLabel="Button Label"
      />,
    );

    expect(component.find('BrowseProductButton').text()).toEqual(
      'Button Label',
    );
  });

  it('should render a body with instructions', () => {
    const component = shallow(
      <EmptyState
        image="no_products_available"
        title="No Products Available"
        body="There are currently no products available, please try again later."
      />,
    );

    expect(component.find(NoResultsInstructions).text()).toEqual(
      'There are currently no products available, please try again later.',
    );
  });
});
