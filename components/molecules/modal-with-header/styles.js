import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

const { charcoal, white, porcelain, iron } = theme.colors;

export const ModalBody = styled.div`
  width: ${props => (props.width ? props.width : '400px')};
  height: auto;
  background-color: ${white};
  font-size: ${rem(13)};
  font-weight: 300;
  line-height: ${rem(20)};
  color: ${charcoal};
  border-radius: ${rem(3)};
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: ${rem(45)};
  background-color: ${porcelain};
  border-radius: ${rem(3)} ${rem(3)} 0 0;
  border-bottom: 1px solid ${iron};
  line-height: ${rem(45)};
  padding-left: ${rem(16)};
  font-size: ${rem(18)};
  font-weight: ${400};
  color: ${charcoal};
`;
