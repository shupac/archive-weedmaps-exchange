import React from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import flatten from 'lodash/flatten';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import PriceRangeFilter from 'components/molecules/price-range-filter';
import SearchBar from 'components/molecules/search-bar';
import ProductCard from 'components/molecules/product-card';
import * as mockData from 'components/molecules/filter-panel/mock-data';

import { Wrapper, Content, Products, NoResults } from './styles';

class Catalog extends React.Component {
  state = {
    sections: {
      category: mockData.categories,
      availability: mockData.availabilities,
      brands: mockData.brands,
      price: {
        min: '',
        max: '',
      },
    },
  };

  prevRoute = null; // needed to detect route change

  componentDidMount() {
    this.updateFilterStates();
  }

  componentDidUpdate() {
    if (this.props.router.asPath !== this.prevRoute) {
      this.loadData();
      this.prevRoute = this.props.router.asPath;
    }
  }

  updateFilterStates = () => {
    const { router } = this.props;
    const { query } = router;

    const { sections } = this.state;

    const category = query.category && query.category.split('/');
    const availability = query.availability && query.availability.split('/');
    const brands = query.brands && query.brands.split('/');
    const { minPrice, maxPrice } = query;

    const nextCategoryStates = sections.category.map(({ parent, children }) => {
      if (category && category.includes(parent.id)) {
        children = children.map(child => ({
          ...child,
          checked: true,
        }));
      } else {
        children = children.map(child => ({
          ...child,
          checked: category && category.includes(child.id),
        }));
      }

      return { parent, children };
    });

    const nextAvailabilityStates = sections.availability.map(option => ({
      ...option,
      checked: availability && availability.includes(option.id),
    }));

    const nextBrandStates = sections.brands.map(option => ({
      ...option,
      checked: brands && brands.includes(option.id),
    }));

    const nextPriceStates = { ...sections.price };
    if (minPrice !== undefined) nextPriceStates.min = minPrice;
    if (maxPrice !== undefined) nextPriceStates.max = maxPrice;

    this.setState({
      sections: {
        ...this.state.sections,
        category: nextCategoryStates,
        availability: nextAvailabilityStates,
        brands: nextBrandStates,
        price: nextPriceStates,
      },
    });
  };

  loadData = () => {
    const { router } = this.props;
    const { query } = router;

    console.log('load data', query);

    this.props.store.catalogSearchStore.getProducts(query.search);
  };

  updateFilters = section => nextState => {
    const states = this.state.sections[section];

    let nextStates;
    if (section === 'price') {
      nextStates = nextState;
    } else {
      nextStates = states.map(state => {
        const thisId = state.id || state.parent.id;
        const nextId = nextState.id || nextState.parent.id;

        if (thisId === nextId) return nextState;
        return state;
      });
    }

    const stateChanged = JSON.stringify(states) !== JSON.stringify(nextState);

    this.setState(
      {
        sections: {
          ...this.state.sections,
          [section]: nextStates,
        },
      },
      stateChanged ? this.updateQueryString : null,
    );
  };

  updateQueryString = () => {
    const { router } = this.props;
    const { query: existingQuery } = router;

    const { sections } = this.state;

    const categoriesSelected = flatten(
      sections.category.map(({ parent, children }) => {
        if (parent.checked === 2) return [parent.id];
        return children.filter(({ checked }) => checked).map(({ id }) => id);
      }),
    );

    const availabilitySelected = sections.availability
      .filter(({ checked }) => checked)
      .map(({ id }) => id);

    const brandsSelected = sections.brands
      .filter(({ checked }) => checked)
      .map(({ id }) => id);

    const queryParams = {
      ...existingQuery,
      category: categoriesSelected,
      availability: availabilitySelected,
      brands: brandsSelected,
      minPrice: sections.price && sections.price.min,
      maxPrice: sections.price && sections.price.max,
    };

    Object.keys(queryParams).forEach(key => {
      if (
        (Array.isArray(queryParams[key]) && !queryParams[key].length) ||
        !queryParams[key]
      ) {
        delete queryParams[key];
      }
    });

    Router.pushRoute('marketplace', queryParams);
  };

  clearAll = () => {
    this.setState(
      {
        sections: {
          category: mockData.categories,
          availability: mockData.availabilities,
          brands: mockData.brands,
          price: {
            min: '',
            max: '',
          },
        },
      },
      this.updateQueryString,
    );
  };

  render() {
    const { sections } = this.state;

    return (
      <Wrapper>
        <FilterPanel onClearAll={this.clearAll}>
          <FilterSection
            type="tree"
            title="Categories"
            defaultLabel="All Categories"
            state={sections.category}
            onChange={this.updateFilters('category')}
          />
          <FilterSection
            title="Availability"
            defaultLabel="All Availability"
            state={sections.availability}
            onChange={this.updateFilters('availability')}
          />
          <FilterSection
            title="Brands"
            defaultLabel="All Brands"
            state={sections.brands}
            onChange={this.updateFilters('brands')}
          />
          <PriceRangeFilter
            state={sections.price}
            onChange={this.updateFilters('price')}
          />
        </FilterPanel>

        <Content>
          <SearchBar showCategory={false} />

          {this.renderProducts()}
        </Content>
      </Wrapper>
    );
  }

  renderProducts() {
    const { products } = this.props.store.catalogSearchStore;

    if (!products) return <h1>Catalog Home</h1>;

    if (!products.length)
      return (
        <NoResults>
          <h2>No Results Found</h2>
          <p>
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
        </NoResults>
      );

    const gotoProduct = productId =>
      Router.push(`/buyer/marketplace/catalog/product/${productId}`);

    return (
      <Products>
        {products.map(product => (
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
