// @flow

import React from 'react';
import { StyledArea, InputError, InputWrap } from './styles';

type Props = {
  height?: number,
  hasError: boolean,
  errorMessage?: string,
};

export const TextArea = ({ hasError, errorMessage, ...props }: Props) => (
  <InputWrap>
    <StyledArea hasError={hasError} {...props} />
    {errorMessage && <InputError>{errorMessage}</InputError>}
  </InputWrap>
);

export default TextArea;
