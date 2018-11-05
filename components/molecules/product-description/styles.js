import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const DescriptionWrapper = styled.div`
  padding: 24px 24px 0 24px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const Title = styled.span`
  flex: 1;
  color: ${theme.colors.oxfordBlue};
  font-weight: 600;
  font-size: ${rem(24)};
  line-height: ${rem(24)};
  margin-bottom: 6px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Price = styled.span`
  font-size: ${rem(16)};
  font-weight: 600;
  line-height: ${rem(24)};
  margin-right: 3px;
`;

export const Unit = styled.span`
  align-self: center;
  color: ${theme.colors.gullGray};
  font-size: ${rem(12)};
  line-height: ${rem(24)};
  text-align: right;
`;

export const Brand = styled.span`
  color: ${theme.colors.oxfordBlue};
  font-size: ${rem(14)};
  line-height: ${rem(24)};
`;

export const Description = styled.p`
  color: ${theme.colors.oxfordBlue};
  font-size: ${rem(14)};
  line-height: ${rem(20)};
`;
