import { types } from 'mobx-state-tree';

export const ToastLink = types.model('ToastLink', {
  label: types.string,
  route: types.string,
});

export const Toast = types.model({
  title: '',
  body: '',
  id: types.identifier,
  status: types.maybeNull(types.string),
  link: types.maybeNull(ToastLink),
});

const Time = types.model('Time', {
  id: types.string,
  start: types.Date,
  delay: types.number,
  remaining: types.number,
});

export const Timer = types.model('Timer', {
  id: types.string,
  timer: Time,
});

export type ToastAlertType = {
  title: string,
  body: string,
  id: string,
  status?: 'SUCCESS' | 'ERROR',
  link?: {
    label: string,
    route: string,
  },
};
