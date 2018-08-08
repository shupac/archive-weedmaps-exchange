import React, { Component } from 'react';
import { number } from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import GlobalStyleDecorator from 'storybook/decorators/global-style';
import { ThemeProvider } from 'styled-components';
import theme from 'lib/styles/theme';
import backgroundColor from 'react-storybook-decorator-background';
import PagingControls from './index';

class PagingContainer extends Component {
  static propTypes = {
    pageCount: number,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.onSelectPage = this.onSelectPage.bind(this);
  }

  onSelectPage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { pageCount } = this.props;
    const { currentPage } = this.state;
    return (
      <PagingControls
        pageCount={pageCount}
        currentPage={currentPage}
        onSelectPage={this.onSelectPage}
      />
    );
  }
}

export default storiesOf('Paging Controls')
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(backgroundColor(['#F2F5F5', '#FFFFFF', '#000000']))
  .addDecorator(withKnobs)
  .add('With four pages', () => (
    <ThemeProvider theme={theme}>
      <PagingContainer pageCount={4} />
    </ThemeProvider>
  ))
  .add('With seven pages', () => (
    <ThemeProvider theme={theme}>
      <PagingContainer pageCount={7} />
    </ThemeProvider>
  ))
  .add('With eight pages', () => (
    <ThemeProvider theme={theme}>
      <PagingContainer pageCount={8} />
    </ThemeProvider>
  ))
  .add('With nine pages', () => (
    <ThemeProvider theme={theme}>
      <PagingContainer pageCount={9} />
    </ThemeProvider>
  ))
  .add('With twelve pages', () => (
    <ThemeProvider theme={theme}>
      <PagingContainer pageCount={12} />
    </ThemeProvider>
  ));
