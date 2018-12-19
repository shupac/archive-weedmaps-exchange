import React, { Fragment } from 'react';
import { withFormik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { type StoreType } from 'lib/types/store';
import { LICENSE_TYPES } from 'lib/common/constants';
import { inject, observer } from 'mobx-react';
import isEqual from 'lodash.isequal';
import theme from 'lib/styles/theme';
import Trashcan from 'components/atoms/icons/trashcan';
import AddressSuggestions from 'components/molecules/address-suggestion';
import { Plus } from 'components/atoms/icons/plus';
import { normalizePhoneNumber, stripNonNumbers } from 'lib/common/strings';
import RequiredAsteriskLabel from 'components/atoms/required-asterisk';
import {
  AddButton,
  CancelButton,
  FormInput,
  ButtonWrapper,
  FormDivide,
  FormHeader,
  FormBody,
  FormWrapper,
  FormFooter,
  FormCategory,
  AddLicense,
  AddLicenseButton,
  LabelOnTop,
  SelectLocation,
  TrashcanBorder,
  ErrorMessage,
  LicenseNumberWrapper,
} from './styles';

type Props = {
  store: StoreType,
  values: any,
  initialValues: any,
  errors: any,
  touched: any,
  handleChange: () => void,
  handleReset: () => void,
  handleBlur: () => void,
  dirty: boolean,
  isSubmitting: boolean,
};

export const BuyerProfileForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  store,
  dirty,
  handleChange,
  handleReset,
  handleBlur,
  initialValues,
}: Props) => {
  const { addressSuggestions } = store;
  const { licenses } = values;
  const requiredKeys = [
    'name',
    'contactName',
    'address',
    'phoneNumber',
    'email',
  ];

  const licenseReq = values.licenses.every(license => license.number);

  const saveEnabled =
    dirty &&
    requiredKeys.every(key => values[key] && !errors[key]) &&
    licenseReq &&
    !isSubmitting &&
    !isEqual(values, initialValues);

  const remainingLicenses = LICENSE_TYPES.filter(
    option =>
      licenses.filter(license => license.licenseType === option).length === 0,
  );

  const hasError = index => errors.licenses && errors.licenses[index];

  addressSuggestions.setQuery(values.address);

  return (
    <FormWrapper>
      <Form>
        <FormHeader>Profile</FormHeader>
        <FormBody>
          <FormCategory>Organization</FormCategory>
          <RequiredAsteriskLabel>Name</RequiredAsteriskLabel>
          <FormInput
            data-test-id="form-name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter name"
            error={errors.name && touched.name}
          />
          {errors.name && touched.name && (
            <ErrorMessage>{errors.name}</ErrorMessage>
          )}
          <FormCategory>Contact Information</FormCategory>
          <RequiredAsteriskLabel>Address</RequiredAsteriskLabel>
          <AddressSuggestions
            id="form-address"
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Address"
            error={errors.address && touched.address}
          />
          {errors.address && touched.address && (
            <ErrorMessage>{errors.address}</ErrorMessage>
          )}
          <RequiredAsteriskLabel>Contact Name</RequiredAsteriskLabel>
          <FormInput
            data-test-id="form-contact"
            type="text"
            name="contactName"
            value={values.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Contact Name"
            error={errors.contactName && touched.contactName}
          />
          {errors.contactName && touched.contactName && (
            <ErrorMessage>{errors.contactName}</ErrorMessage>
          )}
          <FormDivide>
            <LabelOnTop>
              <RequiredAsteriskLabel>Phone</RequiredAsteriskLabel>
              <FormInput
                data-test-id="form-phone"
                type="text"
                name="phoneNumber"
                onChange={x => {
                  x.target.value = stripNonNumbers(x.target.value);
                  return handleChange(x);
                }}
                onBlur={handleBlur}
                value={normalizePhoneNumber(values.phoneNumber)}
                placeholder="Enter Phone"
                error={errors.phoneNumber && touched.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
              )}
            </LabelOnTop>
            <LabelOnTop>
              <RequiredAsteriskLabel>Email</RequiredAsteriskLabel>
              <FormInput
                data-test-id="form-email"
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter Email"
                error={errors.email && touched.email}
              />
              {errors.email && touched.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </LabelOnTop>
          </FormDivide>
          <FormCategory>License Information</FormCategory>
          <FieldArray
            data-test-id="form-licenses"
            name="licenses"
            validateOnChange
            render={({ push, replace, remove }) => (
              <Fragment>
                {values.licenses &&
                  values.licenses.length > 0 &&
                  values.licenses.map((license, index) => (
                    <FormDivide
                      style={{ marginBottom: '16px' }}
                      key={license.id ? license.id : index}
                    >
                      <LabelOnTop>
                        <RequiredAsteriskLabel required={false}>
                          License Type
                        </RequiredAsteriskLabel>
                        <SelectLocation
                          data-test-id={`form-${index}-type`}
                          key={license.id ? license.id : index}
                          name={`license.${index}.licenseType`}
                          style={{ width: '300px' }}
                          value={license.licenseType}
                          items={remainingLicenses.map(x => ({
                            text: x,
                            value: x,
                          }))}
                          itemToString={item => item.text}
                          singleItemSelect
                          searchable={false}
                          onChange={licenseName =>
                            replace(index, {
                              ...license,
                              licenseType: licenseName.value,
                            })
                          }
                          initialSelection={{
                            text: license.licenseType,
                            value: license.licenseType,
                          }}
                        />
                      </LabelOnTop>
                      <LabelOnTop>
                        <RequiredAsteriskLabel>
                          License Number
                        </RequiredAsteriskLabel>
                        <LicenseNumberWrapper>
                          <FormInput
                            data-test-id={`form-${index}-number`}
                            key={license.id ? license.id : index}
                            type="text"
                            name={`license.${index}.number`}
                            onChange={e =>
                              replace(index, {
                                ...license,
                                number: e.target.value,
                              })
                            }
                            placeholder="Enter License Number"
                            error={hasError(index)}
                            value={license.number}
                          />
                          <TrashcanBorder onClick={() => remove(index)}>
                            <Trashcan
                              size={{ width: '16px', height: '16px' }}
                            />
                          </TrashcanBorder>
                        </LicenseNumberWrapper>
                        {hasError(index) && (
                          <ErrorMessage style={{ marginBottom: '0px' }}>
                            {errors.licenses[index].number}
                          </ErrorMessage>
                        )}
                      </LabelOnTop>
                    </FormDivide>
                  ))}
                <AddLicenseButton
                  data-test-id="button-add"
                  disabled={remainingLicenses.length === 0}
                  type="button"
                  onClick={() =>
                    push({
                      licenseType: remainingLicenses[0],
                      number: '',
                    })
                  }
                >
                  <Plus fill={theme.colors.primary} />
                  <AddLicense>ADD NEW LICENSE</AddLicense>
                </AddLicenseButton>
              </Fragment>
            )}
          />
        </FormBody>
        <FormFooter>
          <ButtonWrapper>
            <CancelButton
              data-test-id="button-cancel"
              type="button"
              onClick={x => {
                handleReset(x);
                addressSuggestions.clearAddressInput();
              }}
            >
              Cancel
            </CancelButton>
            <AddButton
              data-test-id="button-submit"
              type="submit"
              disabled={!saveEnabled}
            >
              Save
            </AddButton>
          </ButtonWrapper>
        </FormFooter>
      </Form>
    </FormWrapper>
  );
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Should be a descriptive location name.')
    .max(155)
    .required('Location name is required.'),
  address: Yup.string().required('Address is required.'),
  contactName: Yup.string()
    .min(2, 'Name should be at least 2 characters')
    .max(50)
    .required('Contact name is required.'),
  phoneNumber: Yup.string()
    .min(10, 'Phone number is not valid')
    .max(10, 'Phone number is not valid')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  licenses: Yup.array().of(
    Yup.object().shape({
      number: Yup.string()
        .min(3, 'License must be valid')
        .required('License must have a number'),
    }),
  ),
});

const FormikWrapper = withFormik({
  mapPropsToValues({ organization }) {
    const {
      id,
      contactName,
      email,
      address,
      name,
      phoneNumber,
      licenses,
    } = organization;

    const addString = address
      ? `${address.streetAddress}, ${address.city}, ${
          address.territory
        }, ${address.country.toUpperCase()}, ${address.postalCode}`
      : '';

    return {
      id: id || '',
      name: name || '',
      address: addString,
      contactName: contactName || '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      licenses: licenses || [],
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    props.onSubmit(values);
    setSubmitting(false);
    resetForm(values);
  },
})(inject('store')(observer(BuyerProfileForm)));

const BuyerProfile = FormikWrapper;

export default BuyerProfile;
