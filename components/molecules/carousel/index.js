// @flow
import * as React from 'react';
// $FlowFixMe
import Icons from '@ghostgroup/ui.icons';

import {
  Wrapper,
  Header,
  Title,
  Controls,
  Control,
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
  additionalActions?: React.Node,
  children?: React.ChildrenArray<*>,
};

type State = {
  currentIndex: number,
  scrollLeft: number,
  atLimit?: boolean,
};

class Carousel extends React.Component<Props, State> {
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) {
      this.scrollToIndex(this.state.currentIndex);
    }
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
      // $FlowFixMe
      offset += this.cardRefs[i].clientWidth;
    }

    const maxOffset = Math.max(
      0,
      // $FlowFixMe
      this.content.clientWidth - this.wrapper.clientWidth,
    );

    this.setState({
      currentIndex: index,
      scrollLeft: Math.min(offset, maxOffset),
      atLimit: offset > maxOffset || maxOffset === 0,
    });
  }

  render() {
    const { children, title, cardMargin, additionalActions } = this.props;
    const { currentIndex, scrollLeft, atLimit } = this.state;
    const showAdditionalActions =
      !(currentIndex === 0 && atLimit) && !!additionalActions;

    if (!children) return null;

    const productCards = children.map((card, i) => (
      <CardWrapper
        // eslint-disable-next-line
        key={i}
        margin={cardMargin}
        ref={n => {
          this.cardRefs[i] = n;
        }}
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
              {showAdditionalActions && additionalActions}
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
        </Header>

        <ContentWrapper
          ref={n => {
            this.wrapper = n;
          }}
        >
          <Content
            ref={n => {
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

export default Carousel;
