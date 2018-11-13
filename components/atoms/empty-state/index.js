// @flow
import React from 'react';
import { Link } from 'lib/routes';
import { BrowseProductButton } from 'components/organisms/buyer-cart/styles';
import { NoResults, NoResultsInstructions, NoResultsTitle } from './styles';

type Props = {
  image: string,
  title: string,
  body: string,
  route?: ?string,
  buttonLabel?: string,
};

const EmptyState = ({ image, title, body, route, buttonLabel }: Props) => (
  <NoResults>
    <img src={`/static/images/${image}.png`} alt={title} />
    <NoResultsTitle>{title}</NoResultsTitle>
    <NoResultsInstructions>{body}</NoResultsInstructions>
    {route &&
      buttonLabel && (
        <Link href={route}>
          <a>
            <BrowseProductButton>{buttonLabel}</BrowseProductButton>
          </a>
        </Link>
      )}
  </NoResults>
);

export default EmptyState;
