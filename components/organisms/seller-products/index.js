// @flow
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { type RouterType } from 'lib/types/router';
import { type StoreType } from 'lib/types/store';
import { Router } from 'lib/routes';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import SearchBar from 'components/molecules/search-bar';
import {
  AVAILABILITY_FILTERS,
  SELLER_PRODUCTS_QUERY_PARAMS,
} from 'lib/common/constants';

import { SellerProductsWrapper, Content } from './styles';

type Props = {
  store: StoreType,
  router: RouterType,
};

export class SellerProducts extends Component<Props> {
  clearAll = () => {
    const { router } = this.props;
    const { search } = router.query;

    const query = search ? { search } : {};
    Router.pushRoute('sellerProducts', query);
  };

  render() {
    return (
      <SellerProductsWrapper>
        <FilterPanel onClearAll={this.clearAll}>
          <FilterSection
            paramKey="availability"
            title="Availability"
            defaultLabel="All Availability"
            route="sellerProducts"
            options={AVAILABILITY_FILTERS}
          />
        </FilterPanel>

        <Content>
          <SearchBar
            showCategory={false}
            route="sellerProducts"
            queryParams={SELLER_PRODUCTS_QUERY_PARAMS}
          />
        </Content>
      </SellerProductsWrapper>
    );
  }
}

export default withRouter(inject('store')(observer(SellerProducts)));
