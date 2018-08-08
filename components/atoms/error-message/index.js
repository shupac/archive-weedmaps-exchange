import React from 'react';
import PropTypes, { string } from 'prop-types';
import { Wrapper } from './styled-components';

function renderMessage(statusCode) {
  switch (statusCode) {
    case 404:
      return "We're sorry. The page you're looking for does not exist.";
    case 500:
      return 'Internal server error.';
    default:
      return 'Something went wrong. Please refresh and try again.';
  }
}

export const ErrorMessage = ({ statusCode, message }) => (
  <Wrapper>
    <h1>{statusCode}</h1>
    <div>{message || renderMessage(statusCode)}</div>
  </Wrapper>
);

ErrorMessage.propTypes = {
  statusCode: PropTypes.number.isRequired,
  message: string,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
