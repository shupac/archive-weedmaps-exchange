// @flow
import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import SearchBar from 'components/molecules/search-bar';
import CategoryCard from 'components/molecules/category-card';
import CatalogCarousel from 'components/molecules/carousel';

type Props = {
  store: any,
};

export const Discover = ({ store }: Props) => {
  const { departmentCards } = store.categoryStore;
  return (
    <Fragment>
      <SearchBar />
      <CatalogCarousel title="Categories" cardMargin={16}>
        {departmentCards.map(({ id, name, avatarImageUrl, iconImageUrl }) => (
          <CategoryCard
            title={name}
            icon={iconImageUrl}
            image={avatarImageUrl}
            id={id}
            key={id}
          />
        ))}
      </CatalogCarousel>
    </Fragment>
  );
};

export default inject('store')(observer(Discover));
