import styled from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';
import { StyledInput } from 'components/atoms/forms/styles.js';

const { background, state } = WmTheme.style;

export const DollarSignWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${rem(14)};
  height: ${props => props.height || 40}px;
  background-color: ${background.secondary};
  width: 30px;
  border: 1px ${state.secondaryCompanion} solid;
  border-right: 0;
  border-radius: 3px 0 0 3px;
`;

export const Input = styled(StyledInput)`
  border-radius: 0 3px 3px 0;
`;
