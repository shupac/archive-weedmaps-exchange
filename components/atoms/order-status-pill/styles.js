import styled from 'styled-components';
import { Select, SelectStyles, WmTheme } from '@ghostgroup/ui';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { colors, palette } = theme;

const { Item, SelectButton, Menu } = SelectStyles;

const statusColor = {
  in_progress: colors.amethyst,
  not_started: colors.havelockBlue,
  canceled: colors.red,
  completed: colors.fountainBlue,
  shipped: palette.green,
};

export const StatusPillDropDownWrapper = styled(Select)`
  margin-right: 16px;
  width: 139px;
  height: 24px;
  & svg > path {
    fill: ${({ status }) => statusColor[status]};
  }

  ${SelectButton} {
    background-color: ${WmTheme.style.background.light};
    padding-left: 16px;
    line-height: 2px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: ${rem(12)};
    color: ${({ status }) => statusColor[status]};
    border-color: ${({ status }) => statusColor[status]};
    width: 139px;
    height: 24px;
    & div {
      margin-right: 5px;
      margin-top: -8px;
    }
    &:focus {
      border-color: ${({ status }) => statusColor[status]};
    }
  }

  ${Menu} {
    width: 139px;
    min-width: 139px;
    top: 30px;
  }

  ${Item} {
    font-family: ${theme.text.proximaNovaFont};
    font-weight: 400;
    font-size: ${rem(14)};
    line-height: ${rem(24)};
    color: ${theme.colors.oxfordBlue};
    cursor: pointer;
    padding: 9px 16px;
    :hover {
      background-color: ${theme.colors.lightGrey3};
      font-weight: 600;
    }
  }
`;

export const Pill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 120px;
  border: 1px solid ${({ status }) => statusColor[status]};
  border-radius: 4px;
  color: ${({ status }) => statusColor[status]};
  line-height: ${rem(12)};
  font-size: ${rem(12)};
  font-weight: 600;
  text-transform: uppercase;

  @media print {
    border: none;
    color: ${WmTheme.style.text.normal};
    justify-content: flex-start;
  }
`;

export const StatusPillFinalState = styled(Pill)`
  width: 139px;
  height: 24px;
  font-size: ${rem(12)};
`;
