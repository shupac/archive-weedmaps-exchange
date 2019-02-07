// @flow
import WmTheme from '@ghostgroup/ui.theme';
import styled from 'styled-components';
import { rem } from 'polished';

const { text } = WmTheme.style;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  grid-column: 1/-1;
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
  max-width: 500px;
  line-height: 20px;
  white-space: pre-line;
  overflow-wrap: break-word;
  text-align: center;
`;
