import styled, { css } from 'styled-components';
import WmTheme from '@ghostgroup/ui.theme';
import TextArea from 'components/atoms/forms/text-area';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { background, text, icon, border, state, shadow } = WmTheme.style;

const gridColumnsBody = css`
  display: grid;
  color: ${text.normal};
  grid-template-columns: 3fr 1fr 1fr 70px 110px;
  grid-column-gap: 8px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  padding-left: 16px;
  a {
    display: flex;
  }
  &:hover {
    cursor: pointer;
  }
`;
ProductWrapper.displayName = 'ProductWrapper';

export const ProductPhoto = styled.div`
  flex-shrink: 0;
  height: 48px;
  width: 48px;
  border-radius: 3px;
  border: 1px solid ${border.default};
  background-color: ${background.light};
  background-size: cover;
  background-position: center center;
  margin-right: 8px;
`;
ProductPhoto.displayName = 'ProductPhoto';

export const ColLabel = styled.div`
  height: 30px;
  padding: 8px 0;
  background-color: ${background.light};
  text-transform: uppercase;
  color: ${icon.light};
  font-size: ${rem(12)};
  text-align: ${({ align }) => align || `center`};
  &:first-of-type {
    padding-left: 16px;
  }
`;

export const ColLabelRight = styled(ColLabel)`
  grid-column: span 2;
  padding-right: 16px;
  text-align: right;
`;

export const Border = styled.div`
  grid-column: 1/-1;
  height: 1px;
  margin: 16px 0;
  background-color: ${icon.inverted};
  &:first-child {
    margin-top: 16px;
  }
`;

export const TableBody = styled.div`
  ${gridColumnsBody};
  align-items: center;
  background-color: ${background.light};
  font-size: ${rem(14)};
  color: ${text.normal};
`;

export const TotalsRow = styled.div`
  background-color: ${background.light};
  padding-bottom: 16px;
  font-size: ${rem(14)};
  > p {
    margin: 0;
    grid-column: 4;
  }
`;

export const VendorCartHeader = styled.div`
  background-color: ${background.secondary};
  border-radius: 3px 3px 0 0;
  border-bottom: 1px solid ${icon.inverted};
  width: 100%;
  color: ${text.normal};
  font-size: 20px;
  font-weight: 600;
  padding: 16px 23px;
  > span {
    margin-left: 8px;
  }
`;
VendorCartHeader.displayName = 'VendorCartHeader';

export const RemoveItem = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  cursor: pointer;
`;
RemoveItem.displayName = 'RemoveItem';

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  line-height: ${rem(21)};
  span:first-of-type {
    font-weight: bold;
  }
`;
ProductDescription.displayName = 'ProductDescription';

export const Table = styled.div`
  box-shadow: 0 1px 3px 0 ${shadow};
  margin-top: 16px;
`;

export const QuantityInputWrapper = styled.div`
  position: relative;
`;

export const QuantityInput = styled.input`
  max-width: 55px;
  text-align: center;
  border-radius: 3px;
  background-color: ${background.light};
  border: 1px solid ${border.default};
  padding: 12px 0 12px 16px;
  color: ${text.normal};
  font-size: ${rem(14)};
  margin: 0 12px;
  :focus {
    border-color: ${state.primary};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;
QuantityInput.displayName = 'QuantityInput';

export const QuantityWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ outOfStock }) => (outOfStock ? 'none' : 'auto')};
`;
QuantityWrapper.displayName = 'QuantityWrapper';

export const QuantityButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;
QuantityButton.displayName = 'QuantityButton';

export const UpdateLink = styled.a`
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${rem(11)};
  font-weight: 600;
  color: ${state.primary};
  cursor: pointer;
`;
UpdateLink.displayName = 'UpdateLink';

export const SubtotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1/-1;
  text-align: right;
  padding: 0 16px;
  margin: 0 0 16px 0;
`;
SubtotalWrapper.displayName = 'SubtotalWrapper';

export const RowTotal = styled.p`
  text-align: right;
  padding-right: 16px;
`;
RowTotal.displayName = 'RowTotal';

export const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  grid-column: 1/4;
  border: 1px solid ${border.error};
  border-radius: 3px;
  background-color: ${theme.colors.bg.error};
  color: ${state.danger};
  font-size: ${rem(14)};
  padding: 8px 19px;
  margin: -8px 0 16px 16px;
  svg {
    margin-right: 8px;
  }
`;
ErrorMessage.displayName = 'ErrorMessage';

export const NoteInput = styled(TextArea)`
  height: 50px;
  min-width: 400px;
`;

export const NoteInputLabel = styled.label`
  text-align: left;
  display: block;
  font-size: ${rem(14)};
  font-weight: 600;
  color: ${icon.light};
  margin-bottom: 4px;
`;
