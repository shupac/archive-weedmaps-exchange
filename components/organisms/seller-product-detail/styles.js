import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { WmTheme, Select } from '@ghostgroup/ui';
import { Form } from 'formik';
import { ButtonPrimary } from 'components/atoms/button';

const { background, text, shadow, icon, border, state } = WmTheme.style;

export const StyledForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

StyledForm.displayName = 'StyledForm';

export const SellerProductWrapper = styled.div`
  flex: 1;
  padding: 0 16px 16px;
  color: ${text.normal};
  overflow-y: auto;
`;

export const ScrollWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

export const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 780px 374px;
  grid-column-gap: 16px;
  padding-bottom: 16px;

  > div {
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 ${shadow};
    padding: 24px;
    background-color: ${background.light};
  }
`;

export const ProductName = styled.div`
  font-size: ${rem(24)};
  line-height: ${rem(28)};
  font-weight: 600;
  margin-bottom: 16px;
`;

export const ContentWrapper = styled.div`
  font-size: ${rem(14)};
  line-height: ${rem(20)};
`;

export const AvailabilityWrapper = styled.div`
  font-size: ${rem(14)};
  align-self: baseline;

  p {
    margin: 24px 0;
    line-height: ${rem(20)};
  }

  div:last-of-type {
    display: flex;
    align-items: center;

    > :first-child {
      margin-right: 16px;
    }
  }
`;

export const AvailabilityHeader = styled.div`
  font-size: ${rem(20)};
  font-weight: 600;
`;

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

AddVariantButton.displayName = 'AddVariantButton';

export const InstructionsWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const ZonesLink = styled.div`
  margin-left: auto;
  cursor: pointer;
  text-decoration: underline;
`;

export const VariantsWrapper = styled.div`
  > div {
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const VariantCardWrapper = styled.div`
  border: 1px solid ${border.default};
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

export const VariantDetails = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 170px 86px 150px 32px;
  grid-column-gap: 8px;
  background-color: ${background.secondary};
  box-shadow: 0 1px 0 0 ${icon.inverted};
  border-radius: 3px 3px 0 0;
`;

export const FormGroup = styled.div``;

export const FormLabel = styled.div`
  font-size: ${rem(14)};
  line-height: ${rem(20)};
  font-weight: 600;
  color: ${icon.light};
  height: 20px;
  margin-bottom: 2px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid
    ${({ error }) => (error ? `${state.danger}` : `${border.default}`)};
  border-radius: 3px;
  padding-left: 16px;
  ::placeholder {
    font-style: italic;
    font-weight: normal;
  }
  :focus {
    border-color: ${state.primary};
  }
`;

FormInput.displayName = 'FormInput';

export const TrashWrapper = styled.div`
  background-color: ${background.light};
  border: 1px solid ${border.default};
  border-radius: 3px;
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  cursor: pointer;

  path {
    fill: ${icon.dark};
  }
`;

export const AllocationsWrapper = styled.div`
  padding: 16px;
`;

const gridColumns = css`
  display: grid;
  grid-template-columns: 294px 86px 86px 110px 51px 32px;
  grid-column-gap: 8px;
`;

export const AllocationTableHeader = styled.div`
  ${gridColumns};
  font-size: ${rem(12)};
  font-weight: 600;
  color: ${icon.light};
  text-transform: uppercase;
  padding-bottom: 10px;
  border-bottom: 1px solid ${icon.inverted};
`;

export const AddAllocation = styled.div`
  color: ${state.primary};
  font-size: ${rem(14)};
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 16px;
  cursor: pointer;
  width: fit-content;
`;

AddAllocation.displayName = 'AddAllocation';

export const AllocationRowWrapper = styled.div`
  ${gridColumns};
  margin-top: 8px;
`;

export const TotalValue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-size: ${rem(14)};
`;

export const ToggleWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  > div {
    justify-content: start;
  }

  label {
    display: none;
  }
`;

export const StyledSelect = styled(Select)`
  width: auto;
  background-color: ${background.light};

  button {
    padding-left: 16px;
    border-color: ${({ error }) =>
      error ? `${state.danger}` : `${border.default}`};
  }
`;

StyledSelect.displayName = 'StyledSelect';

export const Footer = styled.div`
  margin-top: auto;
  padding: 16px;
  background-color: ${background.secondary};
  box-shadow: 0 -1px 0 0 ${icon.inverted};
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 164px 164px;
  grid-column-gap: 16px;
  align-items: center;
  font-weight: 600;
  color: ${icon.light};
`;

Footer.displayName = 'Footer';
