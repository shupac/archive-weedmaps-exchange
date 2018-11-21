// @flow
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { ButtonPrimary } from 'components/atoms/button';
import StyledLink from './';

export default storiesOf('StyledLink', module)
  .addDecorator(centered)
  .add('Default', () => <StyledLink href="/">Text Link</StyledLink>)
  .add('With Children', () => (
    <StyledLink href="/">
      <ButtonPrimary width="200px">Continue</ButtonPrimary>
    </StyledLink>
  ));
