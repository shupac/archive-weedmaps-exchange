import { WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';

const { text } = WmTheme.style;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  text-align: center;
  color: ${text.normal};
  > img {
    align-self: center;
  }
`;

export const NoResultsTitle = styled.h2`
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const NoResultsInstructions = styled.span`
  font-size: ${rem(14)};
  margin-bottom: 24px;
  white-space: pre;
`;
