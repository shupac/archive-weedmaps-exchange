import { WmTheme } from '@ghostgroup/ui';
import styled from 'styled-components';
import { rem } from 'polished';

const { text, background, border } = WmTheme.style;

export const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${text.normal};
  margin-top: 81px;
`;
EmptyCartWrapper.displayName = 'EmptyCartWrapper';

export const EmptyCart = styled.div`
  width: 99px;
  height: 99px;
`;

export const EmptyCartTitle = styled.h2`
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const EmptyCartInstructions = styled.span`
  font-size: ${rem(14)};
  margin-bottom: 24px;
`;

export const BrowseProductButton = styled.button`
  background-color: ${background.light};
  height: 40px;
  width: 192px;
  border-radius: 3px;
  border: 1px solid ${border.default};
  font-size: ${rem(14)};
  font-weight: 600;
  text-transform: uppercase;
  color: ${text.normal};
  &:hover {
    cursor: pointer;
  }
`;
BrowseProductButton.displayName = 'BrowseProductButton';

export const CartWrapper = styled.div`
  margin-left: 16px;
`;

export const CartLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 352px;
  grid-column-gap: 16px;
`;

export const CartMain = styled.div`
  // CartMain styles
`;

export const CartSidebar = styled.div`
  // CartSidebar styles
`;
