// @flow
import React, { type Node } from 'react';
import theme from 'lib/styles/theme';
import { ChevronDown } from 'components/atoms/icons';
import {
  Container,
  Header,
  FilterInfo,
  FilterName,
  FiltersLabel,
  Chevron,
  Expandable,
  Filters,
} from './styles';

type Props = {
  title: string,
  filters: string,
  maxHeight?: number,
  children?: Node,
};

type State = {
  collapsed: boolean,
  contentHeight: ?number,
};

class FilterContainer extends React.Component<Props, State> {
  static defaultProps = {
    maxHeight: 400,
  };

  state = {
    contentHeight: 0,
    collapsed: true,
  };

  contents: ?HTMLDivElement;

  componentDidMount() {
    this.setContentHeight();
  }

  setContentHeight() {
    this.setState({
      contentHeight: this.contents && this.contents.clientHeight,
    });
  }

  render() {
    const { children, maxHeight, title, filters } = this.props;
    const { contentHeight, collapsed } = this.state;

    return (
      <Container>
        <Header>
          <FilterInfo>
            <FilterName>{title}</FilterName>
            <FiltersLabel>{filters}</FiltersLabel>
          </FilterInfo>
          <Chevron
            collapsed={collapsed}
            onClick={() => this.setState({ collapsed: !collapsed })}
          >
            <ChevronDown
              fill={theme.palette.darkGrey2}
              size={{ width: '16px', height: '16px' }}
            />
          </Chevron>
        </Header>

        <Expandable
          collapsed={collapsed}
          contentHeight={contentHeight}
          maxHeight={maxHeight}
        >
          <Filters
            innerRef={n => {
              this.contents = n;
            }}
          >
            {children}
          </Filters>
        </Expandable>
      </Container>
    );
  }
}

export default FilterContainer;
