import React from 'react';
import { withRouter } from 'next/router';
import { Router } from 'lib/routes';
import { inject, observer } from 'mobx-react';
import FilterPanel from 'components/molecules/filter-panel';
import FilterSection from 'components/molecules/filter-section';
import {
  categories,
  availabilities,
  brands,
} from 'components/molecules/filter-panel/mock-data';
import qs from 'qs';

import { Wrapper, Content } from './styles';

class Catalog extends React.Component {
  state = {
    sections: {
      categories,
      availabilities,
      brands,
    },
  };

  componentDidMount() {
    const { router } = this.props;
    console.log(router);
  }

  updateOptions = section => nextState => {
    const states = this.state.sections[section];

    const nextStates = states.map(state => {
      const thisId = state.id || state.parent.id;
      const nextId = nextState.id || nextState.parent.id;

      if (thisId === nextId) return nextState;
      return state;
    });

    this.setState({
      sections: {
        ...this.state.sections,
        [section]: nextStates,
      },
    });
  };

  clearAll = () => {
    this.setState({
      sections: {
        categories,
        availabilities,
        brands,
      },
    });
  };

  render() {
    const { sections } = this.state;
    const { store } = this.props;
    const { departments } = store.categoryStore;

    return (
      <Wrapper>
        <FilterPanel onClearAll={this.clearAll}>
          <FilterSection
            type="tree"
            title="Categories"
            defaultLabel="All Categories"
            state={sections.categories}
            onChange={this.updateOptions('categories')}
          />
          <FilterSection
            title="Availability"
            defaultLabel="All Availability"
            state={sections.availabilities}
            onChange={this.updateOptions('availabilities')}
          />
          <FilterSection
            title="Brands"
            defaultLabel="All Brands"
            state={sections.brands}
            onChange={this.updateOptions('brands')}
          />
        </FilterPanel>

        <Content>Search</Content>
      </Wrapper>
    );
  }
}

export default inject('store')(observer(withRouter(Catalog)));
