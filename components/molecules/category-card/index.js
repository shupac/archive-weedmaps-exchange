// @flow
import React from 'react';
import { CategoryCardWrapper, CategoryCardTitle } from './styles';

type Props = {
  title: string,
  image: string,
  icon: string,
};

const CategoryCard = ({ title, image, icon }: Props) => (
  <CategoryCardWrapper style={{ backgroundImage: `url(${image})` }}>
    <div style={{ maxHeight: '50px' }}>
      <img src={icon} alt="Icon" />
    </div>
    <CategoryCardTitle>{title}</CategoryCardTitle>
  </CategoryCardWrapper>
);

export default CategoryCard;
