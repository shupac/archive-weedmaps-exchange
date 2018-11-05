// @flow
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { Icons } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import SearchBar from 'components/molecules/search-bar';
import CategoryCard from 'components/molecules/category-card';
import CatalogCarousel from 'components/molecules/carousel';
import EmptyState from 'components/atoms/empty-state';
import { type DepartmentType } from 'models/department';
import { NoResults } from './styles';

type Props = {
  store: any,
};

type State = {
  mounted: boolean,
};

export class Discover extends Component<Props, State> {
  state = {
    mounted: false,
  };

  dispose = reaction(
    () => {
      const { authStore } = this.props.store;
      return authStore.selectedLocation;
    },
    () => {
      this.fetchDepartmentData();
    },
    { name: 'Fetch department data' },
  );

  componentDidMount() {
    this.fetchDepartmentData();
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.dispose();
  }

  fetchDepartmentData() {
    const { buyerSettings } = this.props.store;
    buyerSettings.getDepartments();
  }

  renderFullState = (departments: DepartmentType[]) => (
    <CatalogCarousel title="Categories" cardMargin={16}>
      {departments.map(({ id, name, avatarImageUrl, iconImageUrl }) => (
        <CategoryCard
          key={id}
          id={id}
          title={name}
          icon={iconImageUrl}
          image={avatarImageUrl}
        />
      ))}
    </CatalogCarousel>
  );

  render() {
    const { store } = this.props;
    const { departments, departmentsLoading } = store.buyerSettings;
    const { mounted } = this.state;
    if (!mounted || departmentsLoading) {
      return (
        <NoResults>
          <Icons.Spinner fill={theme.style.icon.dark} />
        </NoResults>
      );
    }

    return (
      <Fragment>
        <SearchBar />
        {departments.length !== 0 ? (
          this.renderFullState(departments)
        ) : (
          <EmptyState
            image="no_products_available"
            title="No Products Available"
            body="There are currently no products available, please try again later."
          />
        )}
      </Fragment>
    );
  }
}

export default inject('store')(observer(Discover));
