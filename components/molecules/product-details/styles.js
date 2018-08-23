import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Title = styled.span`
  flex: 1;
  color: ${theme.colors.oxfordBlue};
  font-weight: 600;
  font-size: ${rem(24)};
  line-height: ${rem(24)};
`;

export const PricingWrapper = styled.div``;

export const PricingTitle = styled.span`
  margin: 8px;
  font-size: ${rem(20)};
  font-weight: 600;
`;

export const PricingUnit = styled.span`
  color: ${theme.colors.gullGray};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
`;

export const Brand = styled.span`
  color: ${theme.colors.oxfordBlue};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
`;

export const Description = styled.p`
  color: ${theme.colors.oxfordBlue};
  font-size: ${rem(14)};
  line-height: ${rem(20)};
`;
