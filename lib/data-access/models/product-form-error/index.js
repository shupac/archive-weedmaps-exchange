// @flow
import { types } from 'mobx-state-tree';

export const ProductFormError = types.model('ProductFormError', {
  detail: types.string,
  title: types.string,
  meta: types.maybe(
    types.model('ProductFormError', {
      ref_id: types.string,
      type: types.string,
    }),
  ),
});

export type ProductFormErrorType = {
  detail: string,
  title: string,
  meta: {
    ref_id: string,
    type: string,
  },
};

export default ProductFormError;
