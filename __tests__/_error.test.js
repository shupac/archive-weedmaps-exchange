/* eslint-disable import/first, jsx-a11y/anchor-has-content */
/* global it, expect, describe, jest, beforeEach */
jest.mock('lib/routes');
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'mobx-react';
import { ErrorPage } from 'pages/_error';

describe('The ErrorPage Page', () => {
  it('returns a status code in initial props', async () => {
    const statusCode = 200;
    const props = { statusCode };
    const initialProps = await ErrorPage.getInitialProps({
      res: { statusCode },
    });
    expect(initialProps).toEqual(props);
  });

  it('is able to detect an error passed down by Next.js and passes it to the response', async () => {
    const statusCode = 500;
    const props = { statusCode };
    const passedProps = {
      err: 'Test Fake Error',
      res: { statusCode },
    };
    const initialProps = await ErrorPage.getInitialProps(passedProps);

    expect(initialProps).toEqual(props);
    expect(passedProps).toMatchObject({
      ...passedProps,
      res: {
        capturedError: 'Test Fake Error',
        statusCode,
      },
    });
  });

  it('should render an error page', () => {
    const tree = shallow(
      <Provider
        suggestions={{ addressSuggestions: [] }}
        address={{}}
        cart={{}}
        listing={{ listing: {} }}
        ui={{}}
      >
        <ErrorPage statusCode={200} />
      </Provider>,
    ).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('should render a 404', () => {
    const tree = shallow(
      <Provider
        suggestions={{ addressSuggestions: [] }}
        address={{}}
        cart={{}}
        listing={{ listing: {} }}
        ui={{}}
      >
        <ErrorPage statusCode={404} />
      </Provider>,
    ).dive();
    expect(tree.exists()).toEqual(true);
  });

  it('should render anything not 404', () => {
    const tree = shallow(
      <Provider
        suggestions={{ addressSuggestions: [] }}
        address={{}}
        cart={{}}
        listing={{ listing: {} }}
        ui={{}}
      >
        <ErrorPage statusCode={500} />
      </Provider>,
    ).dive();
    expect(tree.exists()).toEqual(true);
  });
});
