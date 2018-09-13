import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import { Card } from '@ghostgroup/ui';

const textNormal = theme.style.text.normal;
const textGray = theme.palette.darkGrey1;
const { red } = theme.palette;

export const CardWrapper = styled(Card)`
  width: ${({ width }) => width || '217px'};
  height: 330px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px ${theme.style.shadow};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

export const Product = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: ${({ outOfStock }) => (outOfStock ? 0.4 : 1)};
`;

export const ImageWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 12px 16px;
`;

export const Brand = styled.div`
  font-size: ${rem(14)};
  font-weight: 600;
  line-height: 1.5;
`;

export const Name = styled.div`
  color: ${textNormal};
  font-size: ${rem(16)};
  line-height: ${rem(20)};
  margin-bottom: auto;
`;
export const PriceUnit = styled.div`
  color: ${textGray};
  font-size: ${rem(12)};
  font-weight: 600;
  line-height: 1.5;
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: ${rem(14)};
  font-weight: 600;
`;

export const Price = styled.div`
  color: ${textNormal};
  margin-right: auto;
`;

export const Category = styled.div`
  color: ${textGray};
`;

export const OutOfStock = styled.div`
  width: 90px;
  height: 24px;
  z-index: 2;
  background-color: ${red};
  position: absolute;
  left: 0;
  font-size: ${rem(12)};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
