import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { charcoal, white, iron, gullGray, oxfordBlue } = theme.colors;

export const ModalBody = styled.div`
  width: ${props => (props.width ? props.width : '400px')};
  height: auto;
  background-color: ${white};
  font-size: ${rem(13)};
  font-weight: 300;
  line-height: ${rem(20)};
  color: ${charcoal};
  border-radius: ${rem(3)};
  font-family: ${theme.text.proximaNovaFont};
  margin: 23px 16px;
`;

export const ModalHeader = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || rem(45)};
  font-family: ${theme.text.proximaNovaFont};
  background-color: ${white};
  border-radius: ${rem(3)} ${rem(3)} 0 0;
  border-bottom: 1px solid ${iron};
  padding-left: ${rem(16)};
  font-size: ${rem(18)};
  font-weight: ${400};
  color: ${charcoal};
  display: flex;
  align-items: center;
`;

export const SellerDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${gullGray};
  font-size: ${rem(14)};
  font-weight: 600;
  margin-bottom: 20px;
  span {
    color: ${oxfordBlue};
    font-weight: normal;
  }
`;
