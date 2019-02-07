// @flow
import React, { type Node } from 'react';
import theme from 'lib/styles/theme';
import Shiitake from 'shiitake';
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) this.setContentHeight();
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
        <Header onClick={() => this.setState({ collapsed: !collapsed })}>
          <FilterInfo>
            <FilterName>{title}</FilterName>
            <FiltersLabel>
              <Shiitake lines={2}>{filters}</Shiitake>
            </FiltersLabel>
          </FilterInfo>
          <Chevron collapsed={collapsed}>
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
            ref={n => {
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
