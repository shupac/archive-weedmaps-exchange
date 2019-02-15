import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import Card from '@ghostgroup/ui.card';

const textNormal = theme.style.text.normal;
const textGray = theme.palette.darkGrey1;
const { red } = theme.palette;

export const CardWrapper = styled(Card)`
  width: ${({ width }) => width || '217px'};
  height: 361px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px ${theme.style.shadow};
`;
CardWrapper.displayName = 'CardWrapper';

export const Product = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: ${({ outOfStock }) => (outOfStock ? 0.4 : 1)};
`;
Product.displayName = 'Product';

export const ImageWrapper = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.palette.lightGrey1};
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
`;

export const Grouped = styled.div`
  font-size: ${rem(12)};
  font-weight: 400;
  line-height: ${rem(16)};
  color: ${textGray};
`;

export const Name = styled.div`
  color: ${textNormal};
  font-size: ${rem(16)};
  line-height: ${rem(22)};
  margin-bottom: auto;
`;

export const PriceUnit = styled.div`
  color: ${textGray};
  font-size: ${rem(12)};
  font-weight: 600;
  line-height: ${rem(17)};
  margin: 5px 3px 0px 0px;
  margin-left: 3px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: ${rem(14)};
  font-weight: 600;
`;

export const Price = styled.div`
  color: ${textNormal};
  margin-top: 5px;
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
