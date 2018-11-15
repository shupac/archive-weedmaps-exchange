// @flow
import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { reaction } from 'mobx';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import TreeFilterSection from 'components/molecules/tree-filter-section';
import PriceRangeFilter from 'components/molecules/price-range-filter';
import SearchBar from 'components/molecules/search-bar';
import ProductCard from 'components/molecules/product-card';
import PagingControls from 'components/molecules/paging-controls';
import EmptyState from 'components/atoms/empty-state';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import { type RouterType } from 'lib/types/router';
import { type StoreType } from 'lib/types/store';
import CategoryCarousels from './carousels';
import { Wrapper, Content, Products, Pagination } from './styles';

type Props = {
  router: RouterType,
  store: StoreType,
};

type State = {
  mounted: boolean,
};

const queryParams = [
  'categories',
  'brands',
  'availability',
  'minPrice',
  'maxPrice',
  'search',
];

const DEFAULT_PAGE_SIZE = 96;

class Catalog extends Component<Props, State> {
  prevRoute = null; // needed to detect route change

  state = {
    mounted: false,
  };

  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      this.searchProducts();
      this.fetchFiltersData();
    },
    { name: 'Search and fetch filters data' },
  );

  componentDidMount() {
    this.fetchFiltersData();
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    if (this.props.router.asPath !== this.prevRoute) {
      this.searchProducts();
      this.prevRoute = this.props.router.asPath;
    }
  }

  componentWillUnmount() {
    const { buyerProducts } = this.props.store;
    buyerProducts.setSearchResultsData([]);
    this.dispose();
  }

  fetchFiltersData = () => {
    const { store } = this.props;

    store.buyerSettings.getDepartments();
    store.buyerSettings.getBrands();
  };

  searchProducts = () => {
    const { router, store } = this.props;
    const { query } = router;

    store.buyerProducts.searchCatalog({
      page_size: DEFAULT_PAGE_SIZE,
      page: 1,
      ...query,
    });
  };

  clearAll = () => {
    const { router } = this.props;
    const { search } = router.query;
    const query = { tab: 'catalog', search };
    if (!search) delete query.search;
    Router.pushRoute('marketplace', query);
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

  gotoProduct = (productId: string) =>
    Router.push(`/buyer/marketplace/catalog/product/${productId}`);

  renderProducts() {
    const { router, store } = this.props;
    const { mounted } = this.state;

    // no search or filter, show carousels
    const hasQuery = Object.keys(router.query).filter(param =>
      queryParams.includes(param),
    ).length;
    if (!hasQuery) return <CategoryCarousels gotoProduct={this.gotoProduct} />;

    // show search results
    const {
      searchResultsLoading,
      searchResults,
      searchResultsTotalItems,
    } = store.buyerProducts;

    if (!mounted || searchResultsLoading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    if (!searchResults.length) {
      return (
        <EmptyState
          image="no_results_found"
          title="No Results Found"
          body="Try adjusting your search or filters to find what you&quot;re
            looking for."
        />
      );
    }

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
              onClick={() => this.gotoProduct(product.id)}
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
