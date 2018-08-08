/* eslint-disable import/first */
/* globals document window */
jest.mock('./portal');
jest.mock('lib/common/universal-helpers');
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from 'lib/styles/theme';
import { Modal } from './';
import * as universalHelpers from 'lib/common/universal-helpers';

describe('Modal', () => {
  let stores = {};
  let page;
  beforeEach(() => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    page = new Modal({ ...stores });
  });

  it('should render a modal ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(false);
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Provider modal={{ showModalMap: new Map() }}>
            <Modal modal={{ showModalMap: new Map() }} modalHandle="modal">
              MODAL
            </Modal>
          </Provider>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to not render modal ', () => {
    jest.spyOn(universalHelpers, 'isServer').mockReturnValue(true);
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Provider modal={{ showModalMap: new Map() }}>
            <Modal modal={{ showModalMap: new Map() }} modalHandle="modal">
              MODAL
            </Modal>
          </Provider>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to lock scrolling ', () => {
    page.lockBackgroundScroll(true);
    const doc = [...document.body.classList];
    expect(doc[0]).toEqual('modal-open');
  });

  it('should be able to unlock scrolling ', () => {
    page.lockBackgroundScroll(false);
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
          showModalMap: new Map(),
          toggleModal: jest.fn(),
          closeModal: jest.fn(),
        },
      };
      props = {
        modal: {
          showModalMap: newShowModalMap,
          toggleModal: jest.fn(),
          closeModal: jest.fn(),
        },
        showOnMount: true,
        modalHandle: 'modal',
      };
      oldProps = {
        modal: {
          showModalMap: new Map(),
          toggleModal: jest.fn(),
          closeModal: jest.fn(),
        },
        modalHandle: 'modal',
      };
      page = new Modal({ ...stores });
    });

    it('should be able to show on mount ', () => {
      page = new Modal({ ...stores, ...props });
      page.componentDidMount();
      expect(props.modal.toggleModal).toHaveBeenCalled();
    });

    it('should reset modal state when unmounts ', () => {
      page = new Modal({ ...stores, ...props });
      page.componentWillUnmount();
      expect(props.modal.closeModal).toHaveBeenCalled();
    });

    it('will lock the background if has new props', async () => {
      page = new Modal({ ...stores, ...props });
      const lockBackgroundScroll = jest.spyOn(page, 'lockBackgroundScroll');
      await page.componentDidUpdate(oldProps);
      expect(lockBackgroundScroll).toHaveBeenCalled();
    });
  });
});
