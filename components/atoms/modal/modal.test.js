/* eslint-disable import/first */
/* globals document window */
jest.mock('./portal');
jest.mock('lib/common/universal-helpers');
import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from 'lib/styles/theme';
import { ModalTemplate } from './';
import * as universalHelpers from 'lib/common/universal-helpers';

describe('Modal', () => {
  let stores = {};
  let page;
  beforeEach(() => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    page = new ModalTemplate({ ...stores });
  });

  it('should render a modal ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Provider modal={{ showModalMap: new Map() }}>
          <ModalTemplate
            modal={{ showModalMap: new Map() }}
            modalHandle="modal"
          >
            MODAL
          </ModalTemplate>
        </Provider>
      </ThemeProvider>,
    );
    expect(tree.exists()).toEqual(true);
  });

  it('should be able to not render modal ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(true);
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Provider modal={{ showModalMap: new Map() }}>
          <ModalTemplate
            modal={{ showModalMap: new Map() }}
            modalHandle="modal"
          >
            MODAL
          </ModalTemplate>
        </Provider>
      </ThemeProvider>,
    );
    expect(tree.exists()).toEqual(true);
  });

  it('should be able to lock scrolling ', () => {
    page.lockBgScroll(true);
    const doc = [...document.body.classList];
    expect(doc[0]).toEqual('modal-open');
  });

  it('should be able to unlock scrolling ', () => {
    page.lockBgScroll(false);
    const doc = [...document.body.classList];
    expect(doc[0]).toBe(undefined);
  });

  describe('when page is loading', () => {
    let oldProps;
    let props;
    beforeEach(() => {
      jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
      const newShowModalMap = new Map();
      newShowModalMap.set('modal', true);

      stores = {
        modal: {
          onClosePress: jest.fn(),
        },
      };
      props = {
        store: {
          uiStore: {
            onCloseModal: jest.fn(),
            modalIsOpen: jest.fn().mockReturnValue(true),
          },
        },
        showOnMount: true,
        modalHandle: 'modal',
      };
      oldProps = {
        store: {
          uiStore: {
            onCloseModal: jest.fn(),
            modalIsOpen: jest.fn().mockReturnValue(false),
          },
        },
        modalHandle: 'modal',
      };
      page = new ModalTemplate({ ...stores });
    });

    it('should reset modal state when unmounts ', () => {
      page = new ModalTemplate({ ...stores, ...props });
      page.componentWillUnmount();
      expect(props.store.uiStore.onCloseModal).toHaveBeenCalled();
    });

    it('will lock the background if has new props', async () => {
      page = new ModalTemplate({ ...stores, ...props });
      const lockBackgroundScroll = jest.spyOn(page, 'lockBgScroll');
      page.componentDidUpdate(oldProps);
      expect(lockBackgroundScroll).toHaveBeenCalledWith(
        props.store.uiStore.modalIsOpen,
      );
    });
  });
});
