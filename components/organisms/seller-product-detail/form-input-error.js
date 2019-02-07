// @flow
import styled from 'styled-components';
import { rem } from 'polished';
import WmTheme from '@ghostgroup/ui.theme';

const { danger } = WmTheme.style.state;

const ErrorMessage = styled.div`
  font-size: ${rem(12)};
  line-height: ${rem(16)};
  margin-top: 8px;
  margin-bottom: 16px;
  color: ${danger};
`;
// $FlowFixMe
ErrorMessage.displayName = 'ErrorMessage';

type Props = {
  errors: Object,
  touched: Object,
  name: string,
};

const FormInputError = ({ errors, touched, name }: Props) => {
  const error = errors[name];
  if (error && touched[name]) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  return null;
};

FormInputError.displayName = 'FormInputError';

export default FormInputError;
