// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import TreeFilterSection from 'components/molecules/tree-filter-section';
import PriceRangeFilter from 'components/molecules/price-range-filter';
import SearchBar from 'components/molecules/search-bar';
import ProductCard from 'components/molecules/product-card';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { type RouterType } from 'lib/types/router';
import { type StoreType } from 'lib/types/store';
import CategoryCarousels from './carousels';
import { Wrapper, Content, Products, NoResults } from './styles';

type Props = {
  router: RouterType,
  store: StoreType,
};

class Catalog extends Component<Props> {
  prevRoute = null; // needed to detect route change

  componentDidMount() {
    this.fetchFiltersData();
  }

  componentDidUpdate() {
    if (this.props.router.asPath !== this.prevRoute) {
      this.searchProducts();
      this.prevRoute = this.props.router.asPath;
    }
  }

  fetchFiltersData = () => {
    const { store } = this.props;

    store.buyerSettings.getDepartments();
    store.buyerSettings.getBrands();
  };

  searchProducts = () => {
    const { router } = this.props;
    const { query } = router;

    this.props.store.buyerProducts.searchCatalog(query);
  };

  clearAll = () => {
    const { router } = this.props;
    const { search } = router.query;
    const queryParams = { tab: 'catalog', search };
    if (!search) delete queryParams.search;
    Router.pushRoute('marketplace', queryParams);
  };

  getCategories = () => {
    const { departments } = this.props.store.buyerSettings;

    return departments.map(parent => ({
      parent: {
        id: parent.id,
        name: parent.name,
      },
      children: parent.categories.map(category => ({
        id: category.id,
        name: category.name,
      })),
    }));
  };

  render() {
    const { store } = this.props;
    const { availabilities, brands } = store.buyerSettings;

    return (
      <Wrapper>
        <FilterPanel onClearAll={this.clearAll}>
          <TreeFilterSection
            paramKey="categories"
            title="Categories"
            defaultLabel="All Categories"
            trees={this.getCategories()}
          />
          <FilterSection
            paramKey="availability"
            title="Availability"
            defaultLabel="All Availability"
            options={availabilities}
          />
          <FilterSection
            paramKey="brands"
            title="Brands"
            defaultLabel="All Brands"
            options={brands}
          />
          <PriceRangeFilter />
        </FilterPanel>

        <Content>
          <SearchBar showCategory={false} />

          {this.renderProducts()}
        </Content>
      </Wrapper>
    );
  }

  renderProducts() {
    const { router, store } = this.props;

    // no search or filter, show carousels
    if (router.asPath === '/buyer/marketplace/catalog')
      return <CategoryCarousels />;

    // show search results
    const { searchResultsLoading, searchResults } = store.buyerProducts;

    if (searchResultsLoading) {
      return (
        <NoResults>
          <Icons.Spinner fill={theme.style.icon.dark} />
        </NoResults>
      );
    }

    if (!searchResults) {
      return (
        <NoResults>
          <h2>No Results Found</h2>
          <p>
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
        </NoResults>
      );
    }

    const gotoProduct = productId =>
      Router.push(`/buyer/marketplace/catalog/product/${productId}`);

    return (
      <Products>
        {searchResults.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            width="100%"
            onClick={() => gotoProduct(product.id)}
          />
        ))}
      </Products>
    );
  }
}

export default withRouter(inject('store')(observer(Catalog)));
export { Catalog };
