import React from 'react';
import { storiesOf } from '@storybook/react';
import { title, image, mockCategoryCard } from 'lib/mocks/category-card';
import styled from 'styled-components';
import CategoryCard from './';

const CategoryCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
`;

export default storiesOf('CategoryCard', module)
  .add('Default', () => <CategoryCard title={title} image={image} />)
  .add('CategoryCards', () => (
    <CategoryCardWrapper>
      {mockCategoryCard.data.map(t => (
        <div>
          <span>{t.attributes.name}</span>
          <CategoryCard
            title={t.attributes.name}
            image={t.attributes.images.medium_url}
            icon={t.attributes.icons.medium_url}
          />
        </div>
      ))}
    </CategoryCardWrapper>
  ));
