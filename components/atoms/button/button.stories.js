import React from 'react';
import { storiesOf } from '@storybook/react';
import storybookBackgrounds from 'lib/common/storybook-backgrounds';
import { action } from '@storybook/addon-actions';
import BackgroundColorDecorator from '../../../.storybook/decorators/background-color';
import GlobalStyleDecorator from '../../../.storybook/decorators/global-style';
import Button, {
  ButtonPrimary,
  ButtonGradient,
  ButtonWhite,
  ButtonWhiteNoHover,
} from './';

export default storiesOf('Button', module)
  .addDecorator(GlobalStyleDecorator)
  .addDecorator(BackgroundColorDecorator)
  .addDecorator(storybookBackgrounds())
  .add('Default', () => (
    <Button onClick={action('Button Default Clicked')}>Button Default</Button>
  ))
  .add('ButtonPrimary', () => (
    <ButtonPrimary onClick={action('ButtonPrimary Clicked')}>
      Button Primary
    </ButtonPrimary>
  ))
  .add('ButtonGradient', () => (
    <ButtonGradient onClick={action('ButtonGradient Clicked')}>
      Button Gradient
    </ButtonGradient>
  ))
  .add('ButtonWhiteNoHover', () => (
    <ButtonWhiteNoHover onClick={action('ButtonWhiteNoHover Clicked')}>
      ButtonWhiteNoHover
    </ButtonWhiteNoHover>
  ))
  .add('ButtonWhite', () => (
    <ButtonWhite onClick={action('ButtonWhite Clicked')}>
      Button White
    </ButtonWhite>
  ));
