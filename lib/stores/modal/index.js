import { observable, action, runInAction } from 'mobx';
import Store from '../base';

export default class ModalStore extends Store {
  @observable modalInView = null;
  @observable showModalMap = new Map();

  @action
  viewModal() {
    this.modalInView = true;
  }

  @action
  hideModal() {
    this.modalInView = false;
  }

  @action('toggleModal')
  toggleModal(modalHandle) {
    const state = this.showModalMap.get(modalHandle);
    runInAction(() => {
      this.showModalMap.set(modalHandle, !state);
    });
  }

  @action('openModal')
  openModal(modalHandle) {
    runInAction(() => {
      this.showModalMap.set(modalHandle, true);
    });
  }

  @action('closeModal')
  closeModal(modalHandle) {
    runInAction(() => {
      this.showModalMap.set(modalHandle, false);
    });
  }

  dehydrate() {
    return {
      showModalMap: this.showModalMap,
    };
  }
}
