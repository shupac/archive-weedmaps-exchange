// @flow
import * as React from 'react';
import { Icons } from '@ghostgroup/ui';
import { PanelContainer, ToggleRow, CloseButton } from './styles';

type DrawerProps = {
  show: boolean,
  children?: React.Node,
};

type DrawerHeadProps = {
  onClick?: () => void,
  children?: React.Node,
};

export const DrawerHead = ({ children, onClick }: DrawerHeadProps) => (
  <ToggleRow>
    <CloseButton onClick={onClick}>
      close
      <Icons.Arrow rotate="270deg" />
    </CloseButton>
    {children}
  </ToggleRow>
);

export const SlideInDrawer = ({ children, show, ...rest }: DrawerProps) => (
  <PanelContainer show={show} {...rest}>
    {children}
  </PanelContainer>
);

export default SlideInDrawer;
