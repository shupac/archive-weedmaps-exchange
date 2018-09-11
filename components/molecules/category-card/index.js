// @flow
import React from 'react';
import { Link } from 'lib/routes';
import { CategoryCardWrapper, CategoryCardTitle } from './styles';

type Props = {
  title: string,
  image: string,
  icon: string,
  id: string,
};

const CategoryCard = ({ title, image, icon, id }: Props) => (
  <Link key={id} route="marketplace" params={{ tab: 'catalog', category: id }}>
    <a style={{ textDecoration: 'none' }}>
      <CategoryCardWrapper style={{ backgroundImage: `url(${image})` }}>
        <div style={{ maxHeight: '50px' }}>
          <img src={icon} alt="Icon" />
        </div>
        <CategoryCardTitle>{title}</CategoryCardTitle>
      </CategoryCardWrapper>
    </a>
  </Link>
);

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
