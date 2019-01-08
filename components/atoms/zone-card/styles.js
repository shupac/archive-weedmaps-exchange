import styled from 'styled-components';
import { rem, transparentize } from 'polished';
import { WmTheme } from '@ghostgroup/ui';

const { border, state } = WmTheme.style;

export const ZoneWrapper = styled.div`
  width: 100%;
  min-height: 78px;
  padding: 16px;
  background-color: ${state.light};
  border-bottom: 1px solid ${border.default};
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  > p {
    margin: 0;
    font-size: ${rem(16)};
    font-weight: 600;
    flex-grow: 1;
  }
`;

export const RegionRow = styled.div`
  flex: 1;
  max-width: 90%;
  margin-left: 20px;
  font-size: ${rem(14)};
  line-height: 1.5;
`;

export const ColorKey = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid ${({ color }) => color};
  background-color: ${({ color }) => transparentize(0.6, color)};
`;
