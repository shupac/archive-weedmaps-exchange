// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { rem } from 'polished/lib/index';
import get from 'lodash/get';
import has from 'lodash/has';
import { formIsValid } from 'lib/common/form-helpers';
import { Button } from '@ghostgroup/ui';
import LoadingButton from 'components/atoms/loading-button';
import type TaxesStore from 'lib/stores/taxes';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Button} {
    font-size: ${rem(14)};
    width: 132px;
    &:focus {
      box-shadow: none;
    }
  }
`;
FooterWrapper.displayName = 'FooterWrapper';

type Props = {
  onTogglePreviewDrawer: any => void,
  onSaveForm: any => Promise<*>,
  taxesEnabled: boolean,
  form: any,
  previewVisible: boolean,
  isLoading: boolean,
  taxes: TaxesStore,
};

class FormSaveFooter extends React.Component<Props> {
  handlePreviewClick = async () => {
    const { onTogglePreviewDrawer, form } = this.props;
    const formValues = get(this.props.form, 'values.taxes', []);
    const isValidForm = await formIsValid(form);

    if (!isValidForm) return;
    onTogglePreviewDrawer(formValues);
  };

  async refreshForm(updatedForm: any) {
    const { form } = this.props;
    await form.setFormState({
      values: {
        taxes: updatedForm,
      },
    });
  }

  handleOnSave = async () => {
    const { form, onSaveForm } = this.props;
    const formValues = get(this.props.form, 'values.taxes', []);
    const isValidForm = await formIsValid(form);

    if (!isValidForm) return;
    await onSaveForm(formValues).then(resp => this.refreshForm(resp));
  };

  render() {
    const {
      taxesEnabled,
      previewVisible,
      form,
      taxes: taxesStore,
    } = this.props;
    const formValues = get(form, 'values.taxes', []);
    const formValid = !has(form, 'errors') && formValues.length >= 1;
    const buttonDisable =
      !taxesEnabled || !formValid || previewVisible || taxesStore.loading;

    return (
      <FooterWrapper>
        <Button
          state="secondary"
          onClick={this.handlePreviewClick}
          disabled={buttonDisable}
        >
          Preview
        </Button>
        <LoadingButton
          onClick={this.handleOnSave}
          isLoading={taxesStore.loading}
          loadingText="Saving"
          disabled={buttonDisable}
        >
          Save
        </LoadingButton>
      </FooterWrapper>
    );
  }
}

export default observer(FormSaveFooter);
