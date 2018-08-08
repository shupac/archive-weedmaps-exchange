import React, { Component } from 'react';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { Box, Flex } from '@ghostgroup/grid-styled';
import { rem } from 'polished';
import Button from 'components/atoms/button';
import { color } from 'lib/styles/theme-getters';

const ConfirmCardWrapper = styled.div`
  background-color: ${theme.colors.white};
  box-shadow: 0 ${rem(1)} ${rem(5)} ${theme.colors.aluminum};
  width: ${rem(450)};
  border-radius: ${rem(3)};
  font-size: ${rem(14)};
  align-items: center;
  justify-content: center;
`;

const Title = styled(Flex)`
  height: ${rem(45)};
  align-items: center;
  justify-content: left;
  padding: 0 ${rem(16)};
  font-size: ${rem(18)};
  color: ${theme.colors.oil};
`;

const ChildrenWrapper = styled(Flex)`
  padding: ${rem(16)};
  line-height: ${rem(24)};
`;

const ButtonWrapper = styled(Flex)`
  padding: 0 ${rem(16)} ${rem(16)};
`;

const ConfirmButton = Button.extend`
  color: ${color('white')};
  background-color: ${color('approveGreen')};
  text-transform: uppercase;
  opacity: ${props => (props.disabled ? 0.65 : 1.0)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CancelButton = ConfirmButton.extend`
  background-color: ${color('denyRed')};
`;

type Props = {
  title: string,
  children: any,
  onCancel?: () => void,
  onConfirm?: () => void,
};

export default class ConfirmModalCard extends Component<Props> {
  render() {
    const { children, title } = this.props;
    return (
      <ConfirmCardWrapper>
        <Title>{title}</Title>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        <ButtonWrapper>
          <Box mr={rem(10)}>
            <ConfirmButton w={200} h={44} onClick={this.props.onConfirm}>
              Confirm
            </ConfirmButton>
          </Box>
          <Box>
            <CancelButton w={200} h={44} onClick={this.props.onCancel}>
              Cancel
            </CancelButton>
          </Box>
        </ButtonWrapper>
      </ConfirmCardWrapper>
    );
  }
}
