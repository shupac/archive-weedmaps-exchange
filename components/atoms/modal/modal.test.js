/* eslint-disable import/first */
/* globals document window */
import React from 'react';
import { shallow, mount } from 'enzyme';
import UiStore from 'lib/data-access/stores/ui';
import { Modal } from './';
import { ModalHeader } from './styles';

function setup() {
  const mockUiStore = UiStore.create();
  const mockStore = { uiStore: mockUiStore };
  const component = <Modal store={mockStore} />;
  const wrapper = shallow(component, {
    disableLifecycleMethods: true,
  });
  return { wrapper, mockStore };
}

describe('Modal', () => {
  it('should render a modal ', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toEqual(true);
  });

  it('should be able to lock scrolling ', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.lockBgScroll(true);
    const doc = [...document.body.classList];
    expect(doc[0]).toEqual('modal-open');
  });

  it('should be able to unlock scrolling ', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.lockBgScroll(false);
    const doc = [...document.body.classList];
    expect(doc[0]).toBe(undefined);
  });

  it('should reset modal state when unmounts ', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const closeModal = jest.spyOn(mockStore.uiStore, 'closeModal');
    instance.componentWillUnmount();
    expect(closeModal).toHaveBeenCalled();
    closeModal.mockRestore();
  });

  it('should set the ref node', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    instance.setRef('node');
    expect(instance.nodeRef).toEqual('node');
  });

  it('should handle keydown events', () => {
    const mockUiStore = UiStore.create();
    const mockStore = { uiStore: mockUiStore };
    const keyDownHandler = jest.fn();
    const component = (
      <Modal store={mockStore} keyDownHandler={keyDownHandler} />
    );
    const wrapper = mount(component, {
      disableLifecycleMethods: true,
    });
    const instance = wrapper.instance();
    const onKeyDown = jest.spyOn(instance, 'onKeyDown');
    const keydownEvent = document.createEvent('Event');
    keydownEvent.initEvent('keydown', true, true);
    document.dispatchEvent(keydownEvent);
    expect(onKeyDown).toHaveBeenCalled();
    expect(keyDownHandler).toHaveBeenCalled();
    onKeyDown.mockRestore();
  });

  it('should handle mousedown events', () => {
    const mockUiStore = UiStore.create();
    const mockStore = { uiStore: mockUiStore };
    const mouseDownHandler = jest.fn();
    const component = (
      <Modal store={mockStore} mouseDownHandler={mouseDownHandler} />
    );
    const wrapper = mount(component, {
      disableLifecycleMethods: true,
    });
    const instance = wrapper.instance();
    instance.nodeRef = document;
    const onMouseDown = jest.spyOn(instance, 'onMouseDown');
    const mousedownEvent = document.createEvent('Event');
    mousedownEvent.initEvent('mousedown', true, true);
    document.dispatchEvent(mousedownEvent);
    expect(onMouseDown).toHaveBeenCalled();
    expect(mouseDownHandler).toHaveBeenCalled();
    onMouseDown.mockRestore();
  });

  it('should close modal on escape key', () => {
    const { wrapper, mockStore } = setup();
    const instance = wrapper.instance();
    const closeModal = jest.spyOn(mockStore.uiStore, 'closeModal');
    instance.onKeyDown({ keyCode: 27 });
    expect(closeModal).toHaveBeenCalled();
    closeModal.mockRestore();
  });

  it('will lock the background if has new props', async () => {
    const { wrapper } = setup();
    const instance = wrapper.instance();
    const lockBackgroundScroll = jest.spyOn(instance, 'lockBgScroll');
    const prevUiStore = UiStore.create({ activeModal: 'foo' });
    const store = { uiStore: prevUiStore };
    instance.componentDidUpdate({ store });
    expect(lockBackgroundScroll).toHaveBeenCalled();
    lockBackgroundScroll.mockRestore();
  });

  it('will not lock the background if props have not changed', async () => {
    const mockUiStore = UiStore.create({ activeModal: 'foo' });
    const mockStore = { uiStore: mockUiStore };
    const component = <Modal store={mockStore} />;
    const wrapper = mount(component, {
      disableLifecycleMethods: true,
    });
    const instance = wrapper.instance();
    const lockBackgroundScroll = jest.spyOn(instance, 'lockBgScroll');
    instance.componentDidUpdate({ store: mockStore });
    expect(lockBackgroundScroll).not.toHaveBeenCalled();
    lockBackgroundScroll.mockRestore();
  });

  it('will render the header if defined', () => {
    const mockUiStore = UiStore.create({ activeModal: 'foo' });
    const mockStore = { uiStore: mockUiStore };
    const component = <Modal store={mockStore} header="bar" />;
    const wrapper = mount(component, {
      disableLifecycleMethods: true,
    });
    expect(wrapper.find(ModalHeader).exists()).toEqual(true);
  });
});
