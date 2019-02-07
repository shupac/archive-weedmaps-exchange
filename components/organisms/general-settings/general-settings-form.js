// @flow
import React from 'react';
import { withFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { Flex } from '@ghostgroup/grid-styled';
import Select from 'components/atoms/select';
import {
  GeneralWrapper,
  GeneralHeader,
  GeneralBody,
  GeneralFooter,
  ShippingHeader,
  ShippingMinInputWrapper,
  ShippingETAWrapper,
  ButtonWrapper,
  CancelButton,
  AddButton,
  InputTitle,
  ErrorMessage,
  EtaMaxErrorMessage,
  StyledCurrencyInput,
  StyledTextInput,
} from './styles';

type FormikProps = {
  values: any,
  errors: any,
  handleChange: any => void,
  handleReset: () => void,
  dirty: boolean,
  isSubmitting: boolean,
  setFieldValue: (string, string) => void,
  handleSubmit: () => void,
};

export const FormTemplate = ({
  values,
  dirty,
  errors,
  handleChange,
  handleSubmit,
  handleReset,
  isSubmitting,
  setFieldValue,
}: FormikProps) => (
  <form onSubmit={handleSubmit}>
    <GeneralWrapper>
      <GeneralHeader>General</GeneralHeader>
      <GeneralBody>
        <ShippingHeader>Shipping Minimum</ShippingHeader>
        <Flex>
          <ShippingMinInputWrapper>
            <InputTitle>Minimum Purchase</InputTitle>
            <StyledCurrencyInput
              name="minimumPurchasePrice"
              placeholder="ex. $50.00"
              value={parseFloat(values.minimumPurchasePrice || '0').toFixed(2)}
              setFieldValue={setFieldValue}
              data-test-id="minimum-purchase"
            />
          </ShippingMinInputWrapper>
          <ShippingMinInputWrapper>
            <InputTitle>Shipping Fee</InputTitle>
            <StyledCurrencyInput
              name="shippingFee"
              placeholder="ex. $50.00"
              value={parseFloat(values.shippingFee || '0').toFixed(2)}
              data-test-id="shipping-fee"
              setFieldValue={setFieldValue}
            />
          </ShippingMinInputWrapper>
        </Flex>
        <ShippingHeader>ETA For Shipping</ShippingHeader>
        <Flex>
          <ShippingETAWrapper>
            <StyledTextInput
              name="etaMin"
              type="number"
              value={values.etaMin}
              onChange={handleChange}
              hasError={!!errors.etaMin || !!errors.deliveryEta}
              data-test-id="eta-min"
            />
          </ShippingETAWrapper>
          <ShippingETAWrapper>
            <Select
              name="etaMinUnit"
              items={values.etaTimes}
              itemToString={item => item.text}
              selectedItem={values.etaTimes.find(
                times => times.value === values.etaMinUnit,
              )}
              onChange={value => setFieldValue('etaMinUnit', value.value)}
              hasError={!!errors.deliveryEta}
              data-test-id="eta-min-unit"
            />
          </ShippingETAWrapper>
          <ShippingETAWrapper>to</ShippingETAWrapper>
          <ShippingETAWrapper>
            <StyledTextInput
              name="etaMax"
              type="number"
              onChange={handleChange}
              value={values.etaMax}
              hasError={errors.etaMax}
              data-test-id="eta-max"
            />
          </ShippingETAWrapper>
          <ShippingETAWrapper>
            <Select
              items={values.etaTimes}
              itemToString={item => item.text}
              selectedItem={values.etaTimes.find(
                times => times.value === values.etaMaxUnit,
              )}
              onChange={value => setFieldValue('etaMaxUnit', value.value)}
              data-test-id="eta-max-unit"
            />
          </ShippingETAWrapper>
        </Flex>
        <Flex>
          {errors.etaMin && <ErrorMessage>{errors.etaMin}</ErrorMessage>}
          {errors.etaMax && (
            <EtaMaxErrorMessage>{errors.etaMax}</EtaMaxErrorMessage>
          )}
        </Flex>
        {errors.deliveryEta && (
          <ErrorMessage>{errors.deliveryEta}</ErrorMessage>
        )}
      </GeneralBody>
      <GeneralFooter>
        <ButtonWrapper>
          <CancelButton
            data-test-id="button-cancel"
            type="button"
            onClick={handleReset}
          >
            Cancel
          </CancelButton>
          <AddButton
            data-test-id="button-submit"
            type="submit"
            disabled={!dirty || !!Object.keys(errors).length || isSubmitting}
          >
            Save
          </AddButton>
        </ButtonWrapper>
      </GeneralFooter>
    </GeneralWrapper>
  </form>
);

const schema = Yup.object()
  .shape({
    etaMin: Yup.number().max(99, 'The min. value must be less than 100'),
    etaMax: Yup.number().max(99, 'The max. value must be less than 100'),
  })
  .test('deliveryEta', function test(value) {
    const { etaMin, etaMax, etaMinUnit, etaMaxUnit } = value;
    let valid = true;
    let errorPath;
    let errorMessage;

    const units = {
      hr: 'hours',
      min: 'minutes',
      day: 'days',
      week: 'weeks',
    };
    const startDuration = moment
      .duration(etaMin, units[etaMinUnit])
      .asMilliseconds();
    const endDuration = moment
      .duration(etaMax, units[etaMaxUnit])
      .asMilliseconds();
    if (startDuration >= endDuration) {
      valid = false;
      errorPath = 'deliveryEta';
      errorMessage = 'The min. value must be less than the max. value';
    } else if (!startDuration && endDuration) {
      valid = false;
      errorPath = 'etaMin';
      errorMessage = 'Please select a min. value';
    }

    return (
      valid ||
      this.createError({
        path: errorPath,
        message: errorMessage,
      })
    );
  });

const GeneralSettingsForm = withFormik({
  mapPropsToValues({ brand, etaTimes }) {
    return {
      minimumPurchasePrice: brand.minimumPurchasePrice,
      shippingFee: brand.shippingFee,
      etaMin: brand.deliveryEta.etaMin,
      etaMax: brand.deliveryEta.etaMax,
      etaMinUnit: brand.deliveryEta.etaMinUnit,
      etaMaxUnit: brand.deliveryEta.etaMaxUnit,
      etaTimes,
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'GeneralSettingsForm',
})(FormTemplate);

export default GeneralSettingsForm;
