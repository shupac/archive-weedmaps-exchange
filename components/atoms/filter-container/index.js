// @flow
import React, { type Node } from 'react';
import theme from 'lib/styles/theme';
import { ChevronDown } from 'components/atoms/icons';
import {
  Container,
  Header,
  FilterInfo,
  FilterName,
  Filters,
  Chevron,
  Expandable,
} from './styles';

type Props = {
  collapsed: boolean,
  maxHeight?: number,
  onToggleCollapse: () => void,
  children?: Node,
  title: string,
  filters: string,
};

type State = {
  contentHeight: ?number,
};

class FilterContainer extends React.Component<Props, State> {
  static defaultProps = {
    collapsed: true,
    maxHeight: 400,
  };

  state = {
    contentHeight: 0,
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
    const {
      collapsed,
      onToggleCollapse,
      children,
      maxHeight,
      title,
      filters,
    } = this.props;
    const { contentHeight } = this.state;

    return (
      <Container>
        <Header>
          <FilterInfo>
            <FilterName>{title}</FilterName>
            <Filters>{filters}</Filters>
          </FilterInfo>
          <Chevron collapsed={collapsed} onClick={onToggleCollapse}>
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
          <div
            ref={n => {
              this.contents = n;
            }}
          >
            {children}
          </div>
        </Expandable>
      </Container>
    );
  }
}

export default FilterContainer;
