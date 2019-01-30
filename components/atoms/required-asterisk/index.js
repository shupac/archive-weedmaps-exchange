// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { WmTheme } from '@ghostgroup/ui';
import theme from 'lib/styles/theme';
import { rem } from 'polished';

const { state } = WmTheme.style;

export const RequiredAsteriskWrapper = styled.div`
  display: flex;
  font-size: ${rem(14)};
  margin-bottom: 8px;
  color: ${theme.colors.gullGray};
  > span {
    padding-left: 8px;
    color: ${state.danger};
  }
`;

type Props = {
  children: Node,
  required?: boolean,
};

const RequiredAsteriskLabel = ({ children, required = true }: Props) => (
  <RequiredAsteriskWrapper>
    {children} {required && <span>*</span>}
  </RequiredAsteriskWrapper>
);

export default RequiredAsteriskLabel;
