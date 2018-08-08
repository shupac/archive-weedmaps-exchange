// @flow
import React, { Component } from 'react';
import theme from 'lib/styles/theme';
import styled from 'styled-components';
import { Bell } from 'components/atoms/icons';
import { rem } from 'polished';

const NotificationContainer = styled.div`
  align-content: center;
  border-left: 1px solid ${theme.colors.smoke};
  display: flex;
  height: ${rem(60)};
  width: ${rem(60)};
`;

const IconWrapper = styled.div`
  transform: translate(90%, 34%);
`;

type Props = {
  notificationCount: number,
};

export default class Notification extends Component<Props> {
  static defaultProps = {
    notificationCount: 0,
  };

  render() {
    return (
      <NotificationContainer>
        <IconWrapper>
          <Bell size={{ width: '22px', height: '22px' }} />
        </IconWrapper>
      </NotificationContainer>
    );
  }
}
