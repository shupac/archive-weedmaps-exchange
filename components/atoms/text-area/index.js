// @flow
import React from 'react';
import { StyledArea, ErrorMessage } from './styles';

type Props = {
  placeholder?: string,
  hasError?: boolean,
  minHeight?: number,
  maxHeight?: number,
  minWidth?: number,
  rows?: number,
  maxRows?: number,
  errorMessage?: string,
};

export const TextArea = ({ hasError, errorMessage, ...props }: Props) => (
  <div>
    <StyledArea hasError={!!errorMessage || hasError} {...props} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

export default TextArea;
TextArea.displayName = 'TextArea';
