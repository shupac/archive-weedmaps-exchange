// @flow
import React from 'react';
import FailIcon from 'components/atoms/icons/fail';
import {
  ErrorPageContent,
  ErrorPageWrapper,
  IconWrapper,
  StyledLink,
} from './styles';

type Props = {
  statusCode: number,
};

const backLink = code => {
  if (code === 403) {
    return {
      path: 'https://weedmaps.com/',
      label: 'Back to Weedmaps',
    };
  }
  return {
    path: '/help',
    label: 'Back to Dashboard',
  };
};

export const ErrorPageComponent = ({ statusCode }: Props) => (
  <ErrorPageWrapper>
    <ErrorPageContent>
      <IconWrapper>
        {statusCode === 404 ? (
          <FailIcon src="/static/images/404.svg" />
        ) : (
          <FailIcon src="/static/images/500.svg" />
        )}
      </IconWrapper>
      <h1>{statusCode}</h1>
      <h2>
        {statusCode === 404 && 'Page does not exist'}
        {statusCode === 500 && 'Internal Server Error'}
        {statusCode === 403 && 'User is not enabled for this product '}
      </h2>
      <p>
        {statusCode === 404 &&
          'Sorry, the page you are looking for does not exist'}
        {statusCode === 500 && "Sorry. It's not you. It's us."}
        {statusCode === 403 &&
          'Please contact your sales rep to get on-boarded.'}
      </p>

      <StyledLink
        href={backLink(statusCode).path}
        data-test-id="link-button-to-home"
      >
        {backLink(statusCode).label}
      </StyledLink>
    </ErrorPageContent>
  </ErrorPageWrapper>
);

export default ErrorPageComponent;
