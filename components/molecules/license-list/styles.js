import styled from 'styled-components';
import { rem } from 'polished';
import theme from 'lib/styles/theme';

export const BrandHeader = styled.span`
  display: block;
  color: ${theme.colors.gullGray};
  font-size: ${rem(14)};
  line-height: ${rem(17)};
  margin: 24px 0 8px 0;
`;

export const LicenseType = styled.span`
  font-size: ${rem(14)};
  color: ${theme.colors.oxfordBlue};
  font-weight: 600;
  line-height: ${rem(20)};
`;

export const LicenseNumber = styled.span`
  font-size: ${rem(14)};
  color: ${theme.colors.oxfordBlue};
  font-weight: 400;
  line-height: ${rem(20)};
`;
