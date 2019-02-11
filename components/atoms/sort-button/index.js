// @flow
import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import Caret, { DIRECTION } from 'components/atoms/icons/caret';

const { icon } = theme.style;

const ClickableTableHeaderItem = styled.button`
  display: flex;
  color: ${icon.light};
  font-size: ${rem(12)};
  appearance: none;
  border: none;
  padding: 0;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;

  > p {
    margin: 0;
    white-space: nowrap;
  }
  > svg {
    opacity: ${props => (props.isActive ? '1' : '0')};
    margin-left: ${rem(8)};
  }
  &:hover {
    > svg {
      opacity: 1;
    }
  }
`;

type Props = {
  children: string,
  pointsUp: string,
  isActive?: boolean,
};

export const SortButton = ({
  children,
  pointsUp,
  isActive,
  ...rest
}: Props) => (
  <ClickableTableHeaderItem {...rest} isActive={isActive}>
    <p>{children}</p>
    <Caret direction={pointsUp ? DIRECTION.up : DIRECTION.down} />
  </ClickableTableHeaderItem>
);

SortButton.displayName = 'SortButton';

export default SortButton;
