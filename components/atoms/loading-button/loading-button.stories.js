import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import LoadingButton from './';
import BackgroundColorDecorator from '../../../.storybook/decorators/background-color';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';

class LoadingButtonContainer extends Component {
  state = {
    isLoading: false,
  };

  loadingClick = () => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={this.loadingClick}
        loadingText="Saving"
      >
        Save
      </LoadingButton>
    );
  }
}

export default storiesOf('Loading Button', module)
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(BackgroundColorDecorator)
  .addDecorator(storybookBackgrounds())
  .add('Default', () => <LoadingButtonContainer />);
