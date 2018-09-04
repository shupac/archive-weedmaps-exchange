import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import BackgroundColorDecorator from 'storybook/decorators/background-color';
import GlobalStyleDecorator from 'storybook/decorators/global-style';

import FilterContainer from './';

const Wrapper = styled.div`
  width: 220px;
`;

const Child = styled.div`
  height: 24px;
`;

class Parent extends React.Component {
  state = {
    collapsed: true,
  };

  render() {
    const { contents } = this.props;
    const { collapsed } = this.state;

    return (
      <FilterContainer
        collapsed={collapsed}
        onToggleCollapse={() => this.setState({ collapsed: !collapsed })}
        maxHeight={200}
        title={text('Title', 'Categories')}
        filters={text('Filters', 'All Categories')}
      >
        {contents.map(i => (
          <Child key={i}>{i}</Child>
        ))}
      </FilterContainer>
    );
  }
}

Parent.propTypes = {
  contents: PropTypes.array,
};

export default storiesOf('FilterContainer', module)
  .addDecorator(storybookBackgrounds())
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(BackgroundColorDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Wrapper>
      <Parent contents={[1, 2, 3]} />
    </Wrapper>
  ))
  .add('Scroll', () => (
    <Wrapper>
      <Parent
        contents={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
      />
    </Wrapper>
  ));
