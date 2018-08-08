import { observable } from 'mobx';
import ModalStore from './index';

describe('ModalStore', () => {
  let store;
  it('should be able to view a modal', () => {
    store = new ModalStore();
    store.viewModal();
    expect(store.modalInView).toEqual(true);
  });
  it('should be able to hide a modal', () => {
    store = new ModalStore();
    store.hideModal();
    expect(store.modalInView).toEqual(false);
  });
  it('should be able to turn on modal', () => {
    store = new ModalStore();
    store.toggleModal('modal');
    expect(store.showModalMap.get('modal')).toEqual(true);
  });

  it('should be able to open modal', () => {
    store = new ModalStore();
    store.openModal('modal');
    expect(store.showModalMap.get('modal')).toEqual(true);
  });

  it('should be able to close modal', () => {
    store = new ModalStore();
    store.closeModal('modal');
    expect(store.showModalMap.get('modal')).toEqual(false);
  });

  it('returns a serializable data structure', () => {
    store = new ModalStore();
    expect(store.dehydrate()).toEqual({ showModalMap: observable(new Map()) });
  });
});
