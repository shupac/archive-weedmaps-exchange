// @flow
import React, { Component, Fragment } from 'react';
import { FieldArray } from 'formik';
import get from 'lodash.get';
import set from 'lodash.set';
import Trashcan from 'components/atoms/icons/trashcan';
import uniqueKey from 'lib/common/unique-key';
import { UNIT_TYPES } from 'lib/common/constants';
import { stripNonNumbers } from 'lib/common/strings';
import { type VariantType } from 'models/variant';
import { type AllocationType } from 'models/allocation';
import { type ZoneType } from 'models/zone';
import AllocationRow from './allocation-row';
import InputError from './form-input-error';
import {
  VariantCardWrapper,
  VariantDetails,
  FormGroup,
  FormLabel,
  FormInput,
  TrashWrapper,
  AllocationsWrapper,
  AllocationTableHeader,
  AddAllocation,
  StyledSelect,
} from './styles';

class Allocation {
  id = uniqueKey();
  active = false;
  amount = '';
  currency = 'usd';
  price = '';
  isNew = true;
}

type FormikErrors = {
  name: string,
  sku: string,
  size: string,
  unit: string,
};

type FormikTouched = {
  name: boolean,
  sku: boolean,
  size: boolean,
  unit: boolean,
};

type Props = {
  variant: VariantType,
  zones: ZoneType[],
  namePath: string,
  index: number,
  onUpdate: mixed => void,
  onDelete: () => void,
  errors: FormikErrors,
  touched: FormikTouched,
  handleBlur: (SyntheticEvent<FocusEvent>) => void,
};

type FormData = {
  allocations: AllocationType[],
  errors: FormikErrors,
  touched: FormikTouched,
  handleBlur: (SyntheticEvent<FocusEvent>) => void,
};

type ArrayHelpers = {
  push: mixed => void,
  replace: (number, mixed) => void,
  remove: number => void,
};

class VariantCard extends Component<Props> {
  getAvailableZones = () => {
    const {
      variant: { allocations },
      zones,
    } = this.props;

    const allocatedZones = allocations.reduce((acc, allocation) => {
      if (allocation.zone) {
        return {
          ...acc,
          [allocation.zone.id]: true,
        };
      }
      return acc;
    }, {});

    return zones.filter(zone => !allocatedZones[zone.id]);
  };

  getNamePath = (pathArray: mixed[]) =>
    this.props.namePath
      .split('.')
      .concat(pathArray)
      .join('.');

  render() {
    const {
      index,
      variant,
      onUpdate,
      onDelete,
      errors,
      touched,
      handleBlur,
    } = this.props;

    const { name, sku, size, unit, allocations } = variant;

    return (
      <VariantCardWrapper>
        <VariantDetails>
          <FormGroup>
            <FormLabel>Variant Name</FormLabel>
            <FormInput
              name={this.getNamePath([index, 'name'])}
              value={name}
              placeholder="i.e. 1/8"
              onChange={e => onUpdate({ name: e.target.value })}
              onBlur={handleBlur}
              error={errors.name && touched.name}
            />
            <InputError errors={errors} touched={touched} name="name" />
          </FormGroup>
          <FormGroup>
            <FormLabel>SKU #</FormLabel>
            <FormInput
              name={this.getNamePath([index, 'sku'])}
              value={sku}
              onChange={e => onUpdate({ sku: e.target.value })}
              onBlur={handleBlur}
              error={errors.sku && touched.sku}
            />
            <InputError errors={errors} touched={touched} name="sku" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Measure</FormLabel>
            <FormInput
              name={this.getNamePath([index, 'size'])}
              value={size}
              placeholder="i.e. 3.5"
              onChange={e =>
                onUpdate({ size: stripNonNumbers(e.target.value, true) })
              }
              onBlur={e => {
                onUpdate({ size: size && parseFloat(size) });
                handleBlur(e);
              }}
              error={errors.size && touched.size}
            />
            <InputError errors={errors} touched={touched} name="size" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Unit Type</FormLabel>
            <StyledSelect
              value={unit}
              initialSelection={UNIT_TYPES.find(({ value }) => value === unit)}
              items={UNIT_TYPES}
              itemToString={option => option && option.text}
              onChange={({ value }) => onUpdate({ unit: value })}
              onBlur={() => {
                const namePath = this.getNamePath([index, 'unit']);
                const e = set({}, ['target', 'name'], namePath);
                handleBlur(e);
              }}
              error={errors.unit && touched.unit}
            />
            <InputError errors={errors} touched={touched} name="unit" />
          </FormGroup>
          <FormGroup>
            <FormLabel />
            <TrashWrapper onClick={onDelete}>
              <Trashcan />
            </TrashWrapper>
          </FormGroup>
        </VariantDetails>
        <AllocationsWrapper>
          <AllocationTableHeader>
            <div>Zone</div>
            <div>Unit price</div>
            <div>Quantity</div>
            <div>Total value</div>
            <div>Publish</div>
            <div />
          </AllocationTableHeader>

          <FieldArray
            name={this.getNamePath([index, 'allocations'])}
            render={this.renderAllocations({
              allocations,
              errors,
              touched,
              handleBlur,
            })}
          />
        </AllocationsWrapper>
      </VariantCardWrapper>
    );
  }

  renderAllocations = (formData: FormData) => (arrayHelpers: ArrayHelpers) => {
    const { allocations, errors, touched, handleBlur } = formData;
    const { push, replace, remove } = arrayHelpers;

    const availableZones = this.getAvailableZones();

    return (
      <Fragment>
        {allocations.map((allocation, i) => (
          <AllocationRow
            key={allocation.id}
            namePath={this.getNamePath([this.props.index, 'allocations'])}
            index={i}
            allocation={allocation}
            availableZones={availableZones}
            onUpdate={values => replace(i, { ...allocation, ...values })}
            onDelete={() => remove(i)}
            errors={get(errors, ['allocations', i], {})}
            touched={get(touched, ['allocations', i], {})}
            handleBlur={handleBlur}
          />
        ))}
        <AddAllocation onClick={() => push(new Allocation())}>
          Add Zone Allocation
        </AddAllocation>
      </Fragment>
    );
  };
}

VariantCard.displayName = 'VariantCard';
export default VariantCard;
