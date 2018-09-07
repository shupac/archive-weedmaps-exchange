import { types } from 'mobx-state-tree';

const Toast = types.model({
  title: '',
  body: '',
  id: types.identifier,
});

export default Toast;
