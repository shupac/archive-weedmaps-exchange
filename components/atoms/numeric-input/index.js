// @flow
import Cleave from 'cleave.js/react';
import styled from 'styled-components';
import { InputStyles } from 'components/atoms/text-input/styles';

export const NumericInput = styled(Cleave)`
  ${InputStyles}
`;

export default NumericInput;

// See https://github.com/nosir/cleave.js/blob/master/doc/options.md#numericonly for options
// Currency Example
// <NumericInput
//  options={{
//    numeral: true,
//    prefix: '$',
//    rawValueTrimPrefix: true,
//  }}
// />;
