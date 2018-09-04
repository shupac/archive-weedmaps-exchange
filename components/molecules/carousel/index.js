// @flow
import * as React from 'react';
import { Icons } from '@ghostgroup/ui';

import {
  Wrapper,
  Header,
  Title,
  Controls,
  Control,
  ViewAllButton,
  ContentWrapper,
  Content,
  CardWrapper,
} from './styles';

const {
  PaginationArrowLeft: ArrowRight,
  PaginationArrowRight: ArrowLeft,
} = Icons;

type Props = {
  cardMargin?: number,
  title?: string,
  onViewAll?: () => mixed,
  children?: React.ChildrenArray<*>,
};

type State = {
  currentIndex: number,
  scrollLeft: number,
  atLimit?: boolean,
};

class CatalogCarousel extends React.Component<Props, State> {
  static defaultProps = {
    cardMargin: 8,
    title: 'Title',
  };

  state = {
    currentIndex: 0,
    scrollLeft: 0,
    atLimit: false,
  };

  componentDidMount() {
    this.scrollToIndex(0); // sets atLimit
  }

  cardRefs = [];
  content = {};
  wrapper = {};

  onPrev() {
    const { currentIndex } = this.state;
    this.setState({ atLimit: false }, () => {
      this.scrollToIndex(currentIndex - 1);
    });
  }

  onNext() {
    const { currentIndex } = this.state;
    this.scrollToIndex(currentIndex + 1);
  }

  scrollToIndex(index: number) {
    const { atLimit } = this.state;

    if (index < 0 || atLimit || index > this.cardRefs.length - 1) return;

    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset += this.cardRefs[i].clientWidth;
    }

    const maxOffset = Math.max(
      0,
      this.content.clientWidth - this.wrapper.clientWidth,
    );

    this.setState({
      currentIndex: index,
      scrollLeft: Math.min(offset, maxOffset),
      atLimit: offset > maxOffset || maxOffset === 0,
    });
  }

  render() {
    const { children, title, cardMargin, onViewAll } = this.props;
    const { currentIndex, scrollLeft, atLimit } = this.state;

    if (!children) return null;

    const productCards = children.map((card, i) => (
      <CardWrapper
        // eslint-disable-next-line
        key={i}
        margin={cardMargin}
        innerRef={n => this.cardRefs.push(n)}
      >
        {card}
      </CardWrapper>
    ));

    return (
      <Wrapper>
        <Header>
          <Title>{title}</Title>

          {!(currentIndex === 0 && atLimit) && (
            <Controls>
              <Control
                onClick={() => this.onPrev()}
                disabled={currentIndex === 0}
              >
                <ArrowLeft />
              </Control>
              <Control onClick={() => this.onNext()} disabled={atLimit}>
                <ArrowRight />
              </Control>
            </Controls>
          )}

          {onViewAll && (
            <ViewAllButton onClick={onViewAll}>View All</ViewAllButton>
          )}
        </Header>

        <ContentWrapper
          innerRef={n => {
            this.wrapper = n;
          }}
        >
          <Content
            innerRef={n => {
              this.content = n;
            }}
            style={{ left: -scrollLeft }}
          >
            {productCards}
          </Content>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default CatalogCarousel;
