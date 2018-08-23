// @flow
import React from 'react';
import { StyledInput, InputError, InputWrap } from './styles';

export const TextInput = ({
  hasError,
  errorMessage,
  ...props
}: {
  hasError: boolean,
  errorMessage: string,
}) => (
  <InputWrap>
    <StyledInput hasError={hasError} {...props} />
    {errorMessage && <InputError>{errorMessage}</InputError>}
  </InputWrap>
);

export default TextInput;
