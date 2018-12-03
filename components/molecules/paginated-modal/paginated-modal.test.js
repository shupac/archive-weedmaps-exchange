/* eslint-disable import/first */
jest.mock('components/atoms/modal/portal.js');
import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from 'lib/styles/theme';
import PaginatedModal, { PaginatedModalTemplate } from './';

describe('PaginatedModalTemplate', () => {
  let stores;
  let page;
  beforeEach(() => {
    page = new PaginatedModalTemplate({ ...stores });
  });

  it('should render a modal ', () => {
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Provider store={{ uiStore: { activeModal: 'foo' } }}>
          <PaginatedModal store={{ uiStore: { activeModal: 'foo' } }}>
            MODAL
          </PaginatedModal>
        </Provider>
      </ThemeProvider>,
    );
    expect(component.exists()).toEqual(true);
  });

  it('should be able to not render store ', () => {
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Provider store={{ uiStore: { activeModal: 'foo' } }}>
          <PaginatedModal store={{ uiStore: { activeModal: 'foo' } }}>
            MODAL
          </PaginatedModal>
        </Provider>
      </ThemeProvider>,
    );
    expect(component.exists()).toEqual(true);
  });

  it('should be able to scroll on left key down ', () => {
    const props = {
      onPrevItem: jest.fn(),
    };
    const store = {
      uiStore: {
        activeModal: 'foo',
        closeModal: jest.fn(),
      },
    };
    const component = shallow(
      <PaginatedModalTemplate store={store} {...props}>
        MODAL
      </PaginatedModalTemplate>,
    );
    page = component.instance();
    page.keyDownHandler({ keyCode: 37 });
    expect(props.onPrevItem).toHaveBeenCalled();
  });

  it('should be able to scroll on right key down ', () => {
    const props = {
      onNextItem: jest.fn(),
    };
    const store = {
      uiStore: {
        activeModal: 'foo',
        closeModal: jest.fn(),
      },
    };
    const component = shallow(
      <PaginatedModalTemplate store={store} {...props}>
        MODAL
      </PaginatedModalTemplate>,
    );
    page = component.instance();
    page.keyDownHandler({ keyCode: 39 });
    expect(props.onNextItem).toHaveBeenCalled();
  });

  it('should not handle keypress when no active modal', () => {
    const props = {
      onNextItem: jest.fn(),
    };
    const store = {
      uiStore: {
        activeModal: null,
        closeModal: jest.fn(),
      },
    };
    const component = shallow(
      <PaginatedModalTemplate store={store} {...props}>
        MODAL
      </PaginatedModalTemplate>,
    );
    page = component.instance();
    page.keyDownHandler({ keyCode: 39 });
    expect(props.onNextItem).not.toHaveBeenCalled();
  });
});
