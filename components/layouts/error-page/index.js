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

export const ErrorPage = ({ statusCode }: Props) => (
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
        {statusCode === 404 ? 'Page does not exist' : 'Internal Server Error'}
      </h2>
      <p>
        {statusCode === 404
          ? 'Sorry, the page you are looking for does not exist'
          : "Sorry. It's not you. It's us."}
        <br />
        {statusCode === 404
          ? 'but feel free to explore more below'
          : 'Please try again later or explore more below.'}
      </p>

      <StyledLink href="/help" data-test-id="link-button-to-home">
        Back to Dashboard
      </StyledLink>
    </ErrorPageContent>
  </ErrorPageWrapper>
);

export default ErrorPage;
