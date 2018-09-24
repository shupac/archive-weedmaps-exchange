import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { ButtonWhiteNoHover } from 'components/atoms/button';

export const LocationCardWrapper = styled.div`
  height: 343px;
  width: 256px;
  border-radius: 3px;
  background-color: ${theme.colors.white};
  box-shadow: 0 1px 3px 0 ${theme.colors.shadow.light};
  padding: 17px;
  display: flex;
  flex-direction: column;
  font-family: ${theme.text.proximaNovaFont};
  color: ${theme.palette.darkBlue1};
`;
LocationCardWrapper.displayName = 'LocationCardWrapper';

export const LocationCardTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;
LocationCardTitle.displayName = 'LocationCardTitle';

export const IconWrapper = styled.div`
  cursor: pointer;
  font-weight: normal;
`;

export const LocationCardAddress = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
  margin-bottom: 12px;
`;
LocationCardAddress.displayName = 'LocationCardAddress';

export const LocationCardInstructions = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  > span {
    font-weight: bold;
  }
`;
LocationCardInstructions.displayName = 'LocationCardInstructions';

export const LocationCardContact = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  > span:first-child {
    font-weight: bold;
  }
`;
LocationCardContact.displayName = 'LocationCardContact';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LocationCardButton = styled(ButtonWhiteNoHover)`
  height: 32px;
  width: ${({ isPrimary }) => (isPrimary ? '100%' : '108px')};
  border: 1px solid ${theme.palette.lightGrey2};
  color: ${theme.palette.darkBlue1};
`;
LocationCardButton.displayName = 'LocationCardButton';

export const ContactLine = styled.span`
  display: block;
`;
ContactLine.displayName = 'ContactLine';
