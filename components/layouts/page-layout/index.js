// @flow
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'lib/styles/theme';
import TopNav from 'components/organisms/top-nav';
import { rem } from 'polished';
import { Flex } from '@ghostgroup/grid-styled';
import PageSideNav from 'components/layouts/page-layout/page-side-nav';

const PageContainer = styled(Flex)`
  min-height: 100%;
  overflow: auto;
  overflow-y: ${({ pageScrollY }: { pageScrollY: boolean }) =>
    pageScrollY
      ? `
scroll`
      : `hidden`};
  overflow-x: ${({ pageScrollX }: { pageScrollX: boolean }) =>
    pageScrollX ? `scroll` : `hidden`};
`;

const RightContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  min-width: ${rem(550)};
`;

const ContentContainer = styled(Flex)`
  flex: 1;
  position: relative;
  flex-direction: ${({ flexRow }: { flexRow: boolean }) =>
    flexRow ? `row` : `column`};
  overflow-y: ${({ contentScrollY }: { contentScrollY: boolean }) =>
    contentScrollY ? `scroll` : `hidden`};
  overflow-x: ${({ contentScrollX }: { contentScrollX: boolean }) =>
    contentScrollX ? `scroll` : `hidden`};
`;

type Props = {
  children?: React.Node,
  className: string,
  activeLink?: string,
  childActiveLink?: string,
  user: any,
  pageScrollY?: boolean,
  pageScrollX?: boolean,
  contentScrollY?: boolean,
  contentScrollX?: boolean,
  flexRow?: boolean,
};

type State = {
  collapse: boolean,
};

export class PageLayout extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { collapse: false };
  }
  static defaultProps = {
    className: '',
    children: null,
    pageScrollY: true,
    pageScrollX: false,
    contentScrollY: true,
    contentScrollX: true,
    flexRow: false,
    activeLink: '',
    childActiveLink: '',
  };

  onMenuClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  render() {
    const {
      activeLink,
      childActiveLink,
      user,
      pageScrollY,
      pageScrollX,
      contentScrollY,
      contentScrollX,
      flexRow,
    } = this.props;
    const { collapse } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <PageContainer pageScrollY={pageScrollY} pageScrollX={pageScrollX}>
          <PageSideNav
            activeLink={activeLink}
            childActiveLink={childActiveLink}
            collapse={collapse}
          />
          <RightContainer>
            <div>
              <TopNav
                activeLink={activeLink}
                // avatarUrl={get(user, 'avatar_url')}
                onMenuClick={this.onMenuClick}
              />
            </div>
            <ContentContainer
              className={`page ${this.props.className}`}
              flexRow={flexRow}
              contentScrollY={contentScrollY}
              contentScrollX={contentScrollX}
            >
              {this.props.children}
            </ContentContainer>
          </RightContainer>
        </PageContainer>
      </ThemeProvider>
    );
  }
}

export { default as PageHead } from './page-head';
export { default as PageContent } from './page-content';
export const PageLayoutWithProgressBar = PageLayout;
