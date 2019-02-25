// @flow
import React from 'react';
import { StyledInput, ErrorMessage } from './styles';

type Props = {
  errorMessage?: string,
  hasError?: boolean,
  height?: number,
};

export const TextInput = ({ hasError, errorMessage, ...props }: Props) => (
  <div>
    <StyledInput hasError={!!errorMessage || hasError} {...props} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

export default TextInput;
