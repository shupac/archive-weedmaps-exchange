import React from 'react';
import styled from 'styled-components';
import { shallow } from 'enzyme';

import CatalogCarousel from './';
import {
  Wrapper,
  Header,
  Title,
  Controls,
  Control,
  ViewAllButton,
  ContentWrapper,
  Content,
  CardWrapper,
} from './styles';
import data from './mock-data';

const Card = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  cursor: pointer;
`;

const cards = data.map((width, i) => (
  <Card key={width} width={width} height={200}>
    {i}
  </Card>
));

describe('Product Card', () => {
  it('should render the catalog carousel', () => {
    const component = shallow(<CatalogCarousel>{cards}</CatalogCarousel>);
    expect(component.find(Wrapper).length).toEqual(1);
    expect(component.find(Header).length).toEqual(1);
    expect(component.find(Title).length).toEqual(1);
    expect(component.find(Controls).length).toEqual(1);
    expect(component.find(Control).length).toEqual(2);
    expect(component.find(ViewAllButton).length).toEqual(0);
    expect(component.find(ContentWrapper).length).toEqual(1);
    expect(component.find(Content).length).toEqual(1);
    expect(component.find(CardWrapper).length).toEqual(cards.length);
  });

  it('should not render when no children are passed', () => {
    const component = shallow(<CatalogCarousel />);
    expect(component.find(Wrapper).length).toEqual(0);
    expect(component.find(Header).length).toEqual(0);
    expect(component.find(Title).length).toEqual(0);
    expect(component.find(Controls).length).toEqual(0);
    expect(component.find(Control).length).toEqual(0);
    expect(component.find(ViewAllButton).length).toEqual(0);
    expect(component.find(ContentWrapper).length).toEqual(0);
    expect(component.find(Content).length).toEqual(0);
    expect(component.find(CardWrapper).length).toEqual(0);
  });

  it('should scroll to next', () => {
    const component = shallow(<CatalogCarousel>{cards}</CatalogCarousel>);

    const onNext = jest.spyOn(component.instance(), 'onNext');
    const scrollToIndex = jest.spyOn(component.instance(), 'scrollToIndex');

    component
      .find(Control)
      .last()
      .simulate('click');
    expect(onNext).toHaveBeenCalled();
    expect(scrollToIndex).toHaveBeenCalled();
  });

  it('should scroll to previous', () => {
    const component = shallow(<CatalogCarousel>{cards}</CatalogCarousel>);

    const onPrev = jest.spyOn(component.instance(), 'onPrev');
    const scrollToIndex = jest.spyOn(component.instance(), 'scrollToIndex');

    component
      .find(Control)
      .first()
      .simulate('click');
    expect(onPrev).toHaveBeenCalled();
    expect(scrollToIndex).toHaveBeenCalled();
  });

  it('should render view all button and call when clicked', () => {
    const onViewAll = jest.fn();
    const component = shallow(
      <CatalogCarousel onViewAll={onViewAll}>{cards}</CatalogCarousel>,
    );
    expect(component.find(Wrapper).length).toEqual(1);
    expect(component.find(Header).length).toEqual(1);
    expect(component.find(Title).length).toEqual(1);
    expect(component.find(Controls).length).toEqual(1);
    expect(component.find(Control).length).toEqual(2);
    expect(component.find(ViewAllButton).length).toEqual(1);
    expect(component.find(ContentWrapper).length).toEqual(1);
    expect(component.find(Content).length).toEqual(1);
    expect(component.find(CardWrapper).length).toEqual(cards.length);

    component.find(ViewAllButton).simulate('click');
    expect(onViewAll).toHaveBeenCalled();
  });
});
