/* eslint-disable import/first */
jest.mock('components/atoms/modal/portal.js');
jest.mock('lib/common/universal-helpers');
import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from 'lib/styles/theme';
import PaginatedModal, { PaginatedModalTemplate } from './';
import * as universalHelpers from 'lib/common/universal-helpers';

describe('PaginatedModalTemplate', () => {
  let stores;
  let page;
  beforeEach(() => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    page = new PaginatedModalTemplate({ ...stores });
  });

  it('should render a modal ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Provider store={{ uiStore: { modalIsOpen: true } }}>
          <PaginatedModal store={{ uiStore: { modalIsOpen: true } }}>
            MODAL
          </PaginatedModal>
        </Provider>
      </ThemeProvider>,
    );
    expect(component.exists()).toEqual(true);
  });

  it('should be able to not render store ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(true);
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Provider store={{ uiStore: { modalIsOpen: true } }}>
          <PaginatedModal store={{ uiStore: { modalIsOpen: true } }}>
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
        modalIsOpen: true,
        onCloseModal: jest.fn(),
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
        modalIsOpen: true,
        onCloseModal: jest.fn(),
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
});
