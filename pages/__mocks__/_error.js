import React from 'react';
import { number } from 'prop-types';

export const ErrorPage = ({ statusCode }) => (
  <div>Error page mock: {statusCode}</div>
);

ErrorPage.propTypes = {
  statusCode: number,
};

export default ErrorPage;
