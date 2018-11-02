import React from 'react';
import { NoResults, NoResultsInstructions, NoResultsTitle } from './styles';

type Props = {
  image: string,
  title: string,
  body: string,
};

const EmptyState = ({ image, title, body }: Props) => (
  <NoResults>
    <img src={`/static/images/${image}.png`} alt={title} />
    <NoResultsTitle>{title}</NoResultsTitle>
    <NoResultsInstructions>{body}</NoResultsInstructions>
  </NoResults>
);

export default EmptyState;
