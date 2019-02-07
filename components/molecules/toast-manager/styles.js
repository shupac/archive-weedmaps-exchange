import styled from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';
import { NotificationCard as NotificationCardBase } from '@ghostgroup/ui.toast-notifications';

const { state } = WmTheme.style;

export const getStatusBorder = status => {
  if (status === 'SUCCESS') {
    return `3px solid ${state.success}`;
  } else if (status === 'ERROR') {
    return `3px solid ${state.danger}`;
  }
  return 'unset';
};

export const NotificationCard = styled(NotificationCardBase)`
  border-left: ${({ status }) => getStatusBorder(status)};
  padding-right: 30px;
`;
NotificationCard.displayName = 'NotificationCard';

export const NotificationLink = styled.a`
  color: ${state.primary};
  font-size: ${rem(14)};
  font-weight: 600;
  cursor: pointer;
`;
NotificationLink.displayName = 'NotificationLink';

export const NotificationList = styled.div`
  ul {
    z-index: 100;
    min-height: 100px;
  }
`;
