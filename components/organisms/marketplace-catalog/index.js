import React from 'react';
import FilterPanel from 'components/molecules/filter-panel';
import FilterContainer from 'components/atoms/filter-container';
import CheckboxTree from 'components/atoms/checkbox-tree';
import categoriesData from 'components/atoms/checkbox-tree/mock-data';
import { CheckboxGroup } from 'components/atoms/combo-checkbox';

import { Wrapper, Content } from './styles';

class Catalog extends React.Component {
  state = {
    categories: categoriesData,
    availabilities: [
      {
        id: 'inStock',
        name: 'In Stock',
        checked: false,
      },
      {
        id: 'outOfStock',
        name: 'Out of Stock',
        checked: false,
      },
    ],
  };

  toggleCheckbox = (section, clickedId, checked) => {
    const options = this.state[section];

    const next = options.map(option => {
      if (option.id !== clickedId) return option;
      return {
        ...option,
        checked,
      };
    });

    this.setState({
      [section]: next,
    });
  };

  render() {
    const { categories, availabilities } = this.state;

    return (
      <Wrapper>
        <FilterPanel>
          <FilterContainer title="Categories" filters="All Categories">
            <CheckboxTree
              state={categories}
              onChange={state => this.setState({ categories: state })}
            />
          </FilterContainer>

          <FilterContainer title="Availability" filters="All Availability">
            {availabilities.map(({ id, name, checked }) => (
              <CheckboxGroup
                key={id}
                name={name}
                checked={checked}
                onChange={next =>
                  this.toggleCheckbox('availabilities', id, next)
                }
              />
            ))}
          </FilterContainer>
        </FilterPanel>
        <Content>Search</Content>
      </Wrapper>
    );
  }
}

export default Catalog;
