// @flow
import React, { Component, Fragment } from 'react';
import { reaction } from 'mobx';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { ToggleSwitch } from '@ghostgroup/ui';
import { Link, Router } from 'lib/routes';
import { type RouterType } from 'lib/types/router';
import { type StoreType } from 'lib/types/store';
import { type SellerProductType } from 'models/seller-product';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import SearchBar from 'components/molecules/search-bar';
import PagingControls from 'components/molecules/paging-controls';
import TreeFilterSection from 'components/molecules/tree-filter-section';
import { SortButton } from 'components/atoms/sort-button';
import EmptyState from 'components/atoms/empty-state';
import Loader, { LoaderWrapper } from 'components/atoms/loader';
import {
  PUBLISHED_FILTERS,
  SELLER_PRODUCTS_QUERY_PARAMS,
} from 'lib/common/constants';
import { removeUndefinedProperties } from 'lib/common/universal-helpers';

import {
  SellerProductsWrapper,
  Content,
  ProductsTable,
  TableHeader,
  TableBody,
  TableFooter,
  TableCell,
  AvatarName,
  NoValue,
} from './styles';

const DEFAULT_PAGE_SIZE = 15;

type Props = {
  store: StoreType,
  router: RouterType,
};

type State = {
  mounted: boolean,
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category_names', label: 'Category' },
  { key: 'quantity', label: 'Inventory' },
  { key: 'zone_count', label: 'Zones' },
  { key: 'active', label: 'Published' },
];

const defaultState = {
  sortBy: 'name',
  ascending: true,
};

export class SellerProducts extends Component<Props, State> {
  prevRoute = null; // needed to detect route change

  state = {
    mounted: false,
  };

  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.activeSellerBrand.value;
    },
    () => {
      const { sellerSettings } = this.props.store;
      sellerSettings.fetchDepartments();
      Router.pushRoute('sellerProducts', {}, { shallow: true });
    },
    { name: 'Refetch Seller Products on brand change' },
  );

  componentDidMount() {
    const { sellerSettings } = this.props.store;

    sellerSettings.fetchDepartments();
    this.searchProducts();

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
    this.dispose();
  }

  getRouterState = () => {
    const { router } = this.props;

    const state = {
      ...defaultState,
      ...router.query,
    };

    return {
      ...state,
      ascending: state.ascending === 'true' || state.ascending === true,
    };
  };

  setRouterState = (state: mixed) => {
    const { router } = this.props;

    Router.pushRoute(
      'sellerProducts',
      {
        ...router.query,
        ...state,
      },
      { shallow: true },
    );
  };

  clearAll = () => {
    const { router } = this.props;
    const { search, sortBy, ascending } = router.query;

    const query = removeUndefinedProperties({
      search,
      sortBy,
      ascending,
    });

    Router.pushRoute('sellerProducts', query, { shallow: true });
  };

  getCategories = () => {
    const { departments } = this.props.store.sellerSettings;
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

  searchProducts = () => {
    const { router, store } = this.props;

    const {
      sortBy,
      ascending,
      search,
      active,
      categories,
      page,
    } = this.getRouterState();

    const sort = `${ascending ? '' : '-'}${sortBy}`;

    const pageSize = router.query.page_size || DEFAULT_PAGE_SIZE;

    store.sellerProducts.fetchProducts({
      pageSize,
      page: page || 1,
      sort,
      query: search,
      active,
      categories,
    });
  };

  onSort = (key: string) => {
    const { ascending, sortBy } = this.getRouterState();

    this.setRouterState({
      sortBy: key,
      ascending: sortBy === key ? !ascending : true,
    });
  };

  goToPage = (page: number) => {
    const { query } = this.props.router;
    const nextQuery = {
      ...query,
      page,
    };
    Router.pushRoute('sellerProducts', nextQuery, { shallow: true });
  };

  setActive = (sellerProduct: SellerProductType, active: boolean) => {
    const { sellerProducts } = this.props.store;

    sellerProducts.updateSellerProduct({
      ...sellerProduct,
      active,
    });
  };

  render() {
    return (
      <SellerProductsWrapper>
        <FilterPanel onClearAll={this.clearAll}>
          <TreeFilterSection
            paramKey="categories"
            title="Categories"
            defaultLabel="All Categories"
            route="sellerProducts"
            trees={this.getCategories()}
            maxHeight={500}
          />
          <FilterSection
            paramKey="active"
            title="Availability"
            defaultLabel="All Availability"
            route="sellerProducts"
            options={PUBLISHED_FILTERS}
            singleSelection
          />
        </FilterPanel>

        <Content>
          <SearchBar
            showCategory={false}
            route="sellerProducts"
            queryParams={SELLER_PRODUCTS_QUERY_PARAMS}
          />

          {this.renderProductsTable()}
        </Content>
      </SellerProductsWrapper>
    );
  }

  renderProductsTable = () => {
    const { store, router } = this.props;

    const { mounted } = this.state;

    const { sortBy, ascending } = this.getRouterState();

    const {
      sellerProducts,
      sellerProductsTotalItems,
      fetchingProducts,
    } = store.sellerProducts;

    const page = router.query.page || 1;
    const pageSize = router.query.page_size || DEFAULT_PAGE_SIZE;

    const countStart = (page - 1) * pageSize + 1;
    const countEnd = countStart + sellerProducts.length - 1;
    const countRange =
      countStart === countEnd ? countStart : `${countStart}-${countEnd}`;

    if (!mounted || fetchingProducts) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    if (!sellerProducts.length) {
      return (
        <EmptyState
          image="no_results_found"
          title="No Products Found"
          body="Try adjusting your search or filters to find what you're
            looking for."
        />
      );
    }

    return (
      <ProductsTable>
        <TableHeader>
          {columns.map(({ key, label }) => (
            <TableCell key={key}>
              <SortButton
                onClick={() => this.onSort(key)}
                isActive={sortBy === key}
                pointsUp={ascending}
              >
                {label}
              </SortButton>
            </TableCell>
          ))}
        </TableHeader>

        <TableBody>{this.renderSellerProducts()}</TableBody>

        <TableFooter>
          Showing {countRange} of {sellerProductsTotalItems} Products
          {sellerProductsTotalItems > pageSize && (
            <PagingControls
              pageCount={Math.ceil(sellerProductsTotalItems / pageSize)}
              currentPage={page && Number(page)}
              onSelectPage={this.goToPage}
            />
          )}
        </TableFooter>
      </ProductsTable>
    );
  };

  renderSellerProducts = () => {
    const { sellerProducts } = this.props.store.sellerProducts;

    return sellerProducts.map(sellerProduct => {
      const {
        active,
        categoryNames: { departmentName, categoryName },
        product,
        quantity,
        variantCount,
        zoneCount,
      } = sellerProduct;

      let category = departmentName;
      if (categoryName) category += ` > ${categoryName}`;

      const inventory = quantity ? (
        `${quantity} in stock for ${variantCount} variant${
          variantCount === 1 ? '' : 's'
        }`
      ) : (
        <NoValue>0</NoValue>
      );

      const { id, name, avatarImage } = product;

      return (
        <Fragment key={id}>
          <TableCell>
            <AvatarName>
              <img src={avatarImage.smallUrl} alt={name} />
              <Link href={`/seller/products/${id}`}>
                <a>{name}</a>
              </Link>
            </AvatarName>
          </TableCell>

          <TableCell>{category}</TableCell>

          <TableCell>{inventory}</TableCell>

          <TableCell>{zoneCount || <NoValue>{zoneCount}</NoValue>}</TableCell>

          <TableCell>
            <ToggleSwitch
              checked={active}
              onChange={() => this.setActive(sellerProduct, !active)}
              disabled={!quantity}
            />
          </TableCell>
        </Fragment>
      );
    });
  };
}

export default withRouter(inject('store')(observer(SellerProducts)));
