import styled from 'styled-components';
import { rem } from 'polished';
import { WmTheme } from '@ghostgroup/ui';
import { ButtonPrimary } from 'components/atoms/button';

const { background, text, shadow } = WmTheme.style;

export const SellerProductWrapper = styled.div`
  padding: 0 16px 16px;
  color: ${text.normal};
`;

export const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(700px, 1fr) 374px;
  grid-column-gap: 16px;
  padding-bottom: 16px;
`;

export const ProductName = styled.div`
  font-size: ${rem(24)};
  line-height: ${rem(28)};
  font-weight: 600;
  margin-bottom: 16px;
`;

export const VariantWrapper = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 ${shadow};
  padding: 24px;
  background-color: ${background.light};
`;

export const AvailabilityWrapper = styled.div``;

export const VariantHeader = styled.div`
  font-size: ${rem(20)};
  line-height: ${rem(22)};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const VariantInfo = styled.div`
  margin-bottom: 16px;
`;

export const AddVariantButton = styled(ButtonPrimary)`
  width: auto;
  margin-bottom: 24px;
`;

export const InstructionsWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const ZonesLink = styled.div`
  margin-left: auto;
  cursor: pointer;
  text-decoration: underline;
`;
