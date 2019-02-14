import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Carousel from '.';
import data from './mock-data.js';

const PageWrapper = styled.div`
  flex: 1;
  margin: 16px;
`;

const Card = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  cursor: pointer;
`;

export default storiesOf('Carousel', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <PageWrapper>
      <Carousel
        title={text('Title', 'Edibles')}
        cardMargin={number('Card Margin', 16)}
      >
        {data.map((width, i) => (
          <Card
            key={width}
            width={width}
            height={200}
            style={{
              backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255})`,
            }}
            onClick={action(`select card ${i}`)}
          >
            {i}
          </Card>
        ))}
      </Carousel>
    </PageWrapper>
  ))
  .add('With additional actions', () => (
    <PageWrapper>
      <Carousel
        title={text('Title', 'Edibles')}
        cardMargin={number('Card Margin', 16)}
        additionalActions={<div onClick={action('view all')}>View All</div>}
      >
        {data.map((width, i) => (
          <Card
            key={width}
            width={width}
            height={200}
            style={{
              backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255})`,
            }}
            onClick={action(`select card ${i}`)}
          >
            {i}
          </Card>
        ))}
      </Carousel>
    </PageWrapper>
  ))
  .add('No controls', () => (
    <PageWrapper>
      <Carousel
        title={text('Title', 'Edibles')}
        cardMargin={number('Card Margin', 16)}
      >
        {data.slice(0, 2).map((width, i) => (
          <Card
            key={width}
            width={width}
            height={200}
            style={{
              backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255})`,
            }}
            onClick={action(`select card ${i}`)}
          >
            {i}
          </Card>
        ))}
      </Carousel>
    </PageWrapper>
  ))
  .add('Multiple carousels', () => (
    <PageWrapper>
      <Carousel title="Edibles" cardMargin={16}>
        {data.map((width, i) => (
          <Card
            key={width}
            width={width}
            height={100}
            style={{
              backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255})`,
            }}
          >
            {i}
          </Card>
        ))}
      </Carousel>
      <Carousel title="Flower" cardMargin={16}>
        {data.map((width, i) => (
          <Card
            key={width}
            width={width}
            height={300}
            style={{
              backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255})`,
            }}
          >
            {i}
          </Card>
        ))}
      </Carousel>
    </PageWrapper>
  ));
