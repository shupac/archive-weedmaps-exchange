// @flow
import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import TreeFilterSection from 'components/molecules/tree-filter-section';
import PriceRangeFilter from 'components/molecules/price-range-filter';
import SearchBar from 'components/molecules/search-bar';
import ProductCard from 'components/molecules/product-card';
import PagingControls from 'components/molecules/paging-controls';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { type RouterType } from 'lib/types/router';
import { type StoreType } from 'lib/types/store';
import CategoryCarousels from './carousels';
import { Wrapper, Content, Products, NoResults, Pagination } from './styles';

type Props = {
  router: RouterType,
  store: StoreType,
};

const DEFAULT_PAGE_SIZE = 96;

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

    this.props.store.buyerProducts.searchCatalog({
      page_size: DEFAULT_PAGE_SIZE,
      page: 1,
      ...query,
    });
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

  goToPage = (page: number) => {
    const { query } = this.props.router;
    const nextQuery = {
      ...query,
      page,
    };
    Router.pushRoute('marketplace', nextQuery);
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
    const {
      searchResultsLoading,
      searchResults,
      searchResultsTotalItems,
    } = store.buyerProducts;

    if (searchResultsLoading) {
      return (
        <NoResults>
          <Icons.Spinner fill={theme.style.icon.dark} />
        </NoResults>
      );
    }

    if (!searchResults.length) {
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

    const page = router.query.page || 1;
    const pageSize = router.query.page_size || DEFAULT_PAGE_SIZE;

    const countStart = (page - 1) * pageSize + 1;
    const countEnd = countStart + searchResults.length - 1;
    const countRange =
      countStart === countEnd ? countStart : `${countStart}-${countEnd}`;

    return (
      <Fragment>
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

        <Pagination>
          Showing {countRange} of {searchResultsTotalItems} Products
          {searchResultsTotalItems > pageSize && (
            <PagingControls
              pageCount={Math.ceil(searchResultsTotalItems / pageSize)}
              currentPage={page && Number(page)}
              onSelectPage={this.goToPage}
            />
          )}
        </Pagination>
      </Fragment>
    );
  }
}

export default withRouter(inject('store')(observer(Catalog)));
export { Catalog };
