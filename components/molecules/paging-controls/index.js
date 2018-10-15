// @flow
import * as React from 'react';
import { WmTheme } from '@ghostgroup/ui';
import { rem } from 'polished';
import styled from 'styled-components';
import { Flex } from '@ghostgroup/grid-styled';
import {
  PaginationArrowRight,
  PaginationArrowLeft,
} from 'components/atoms/icons';

const PLACEHOLDER = 0;
console.log(WmTheme.style);
const PageButton = styled.button`
  min-width: ${rem(32)};
  height: ${rem(32)};
  font-size: ${rem(14)};
  border-radius: ${rem(3)};
  line-height: ${rem(29)};
  border: ${rem(1)} solid ${WmTheme.style.border.default};
  color: ${WmTheme.style.text.normal};
  margin: 0 ${rem(2)} 0 ${rem(2)};
  cursor: pointer;
  background: ${WmTheme.style.background.light};
`;
PageButton.displayName = 'PageButton';

const PlaceholderButton = styled(PageButton)`
  border: none;
  background-color: transparent;
  cursor: default;
`;

const CurrentPageButton = styled(PageButton)`
  border-color: ${WmTheme.style.border.default};
  color: ${WmTheme.style.text.inverted};
  background-color: ${WmTheme.style.state.primary};
  cursor: default;
`;
CurrentPageButton.displayName = 'CurrentPageButton';

const ChangePageButton = styled(PageButton)`
  width: ${rem(60)};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  path {
    fill: ${WmTheme.style.state.lightCompanion};
  }
`;

const PreviousPageButton = styled(ChangePageButton)`
  margin: 0 ${rem(6)} 0 0;
`;
PreviousPageButton.displayName = 'PreviousPageButton';

const NextPageButton = styled(ChangePageButton)`
  margin: 0 0 0 ${rem(6)};
`;
NextPageButton.displayName = 'NextPageButton';

type Props = {
  pageCount: number,
  currentPage: number,
  onSelectPage: number => any,
};

export default class PagingControls extends React.Component<Props> {
  static defaultProps = {
    currentPage: 1,
  };

  onSelectPage(pageNumber: number) {
    const { currentPage, onSelectPage, pageCount } = this.props;
    if (
      pageNumber > 0 &&
      pageNumber <= pageCount &&
      pageNumber !== currentPage
    ) {
      onSelectPage(pageNumber);
    }
  }

  pageButtonArray(): number[] {
    const { pageCount, currentPage } = this.props;

    if (!pageCount) return [];

    const pageButtonArray = Array(pageCount)
      .fill()
      .map((_, i) => i + 1);
    const trimSize = () => pageButtonArray.length - 6;
    const trimMidSize = currentPage - 3;
    const trimEnd = () => pageButtonArray.splice(5, trimSize(), PLACEHOLDER);
    const trimStart = () => pageButtonArray.splice(1, trimSize(), PLACEHOLDER);
    const trimMid = () => pageButtonArray.splice(1, trimMidSize, PLACEHOLDER);
    if (pageCount > 7) {
      if (currentPage <= 4) {
        trimEnd();
      } else if (currentPage >= pageCount - 3) {
        trimStart();
      } else {
        trimMid();
        trimEnd();
      }
    }
    return pageButtonArray;
  }

  pageButtons(): React.Node[] {
    const { currentPage } = this.props;
    return this.pageButtonArray().map((pageNumber, boxIndex) => {
      let box;
      const key = `box-${boxIndex}`;
      if (pageNumber === PLACEHOLDER) {
        box = <PlaceholderButton key={key}>…</PlaceholderButton>;
      } else if (pageNumber === currentPage) {
        box = <CurrentPageButton key={key}>{pageNumber}</CurrentPageButton>;
      } else {
        box = (
          <PageButton key={key} onClick={() => this.onSelectPage(pageNumber)}>
            {pageNumber}
          </PageButton>
        );
      }
      return box;
    });
  }

  render() {
    const { currentPage } = this.props;
    return (
      <Flex>
        <PreviousPageButton onClick={() => this.onSelectPage(currentPage - 1)}>
          <PaginationArrowRight />
        </PreviousPageButton>
        <div>{this.pageButtons()}</div>
        <NextPageButton onClick={() => this.onSelectPage(currentPage + 1)}>
          <PaginationArrowLeft />
        </NextPageButton>
      </Flex>
    );
  }
}
