// @flow
import React, { Component, Fragment } from 'react';
import { FieldArray } from 'formik';
import { Select } from '@ghostgroup/ui';
import Trashcan from 'components/atoms/icons/trashcan';
import uniqueKey from 'lib/common/unique-key';
import { UNIT_TYPES } from 'lib/common/constants';
import { type VariantType } from 'models/variant';
import { type AllocationType } from 'models/allocation';
import { type ZoneType } from 'models/zone';
import AllocationRow from './allocation-row';
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
} from './styles';

class Allocation {
  id = uniqueKey();
  active = false;
  amount = '';
  currency = 'usd';
  price = '';
  isNew = true;
}

type Props = {
  variant: VariantType,
  zones: ZoneType[],
  index: number,
  onUpdate: mixed => void,
  onDelete: () => void,
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

  render() {
    const { index, variant, onUpdate, onDelete } = this.props;

    const { name, sku, size, unit, allocations } = variant;

    return (
      <VariantCardWrapper>
        <VariantDetails>
          <FormGroup>
            <FormLabel>Variant Name</FormLabel>
            <FormInput
              value={name}
              onChange={e => onUpdate({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>SKU #</FormLabel>
            <FormInput
              value={sku}
              onChange={e => onUpdate({ sku: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Measure</FormLabel>
            <FormInput
              value={size}
              onChange={e => onUpdate({ size: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Unit Type</FormLabel>
            <Select
              value={unit}
              initialSelection={UNIT_TYPES.find(({ value }) => value === unit)}
              items={UNIT_TYPES}
              itemToString={({ text }) => text}
              onChange={({ value }) => onUpdate({ unit: value })}
            />
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
            name={`product.variants.${index}.allocations`}
            render={this.renderAllocations(allocations)}
          />
        </AllocationsWrapper>
      </VariantCardWrapper>
    );
  }

  renderAllocations = (allocations: AllocationType[]) => (
    arrayHelpers: ArrayHelpers,
  ) => {
    const { push, replace, remove } = arrayHelpers;

    const availableZones = this.getAvailableZones();

    return (
      <Fragment>
        {allocations.map((allocation, i) => (
          <AllocationRow
            key={allocation.id}
            allocation={allocation}
            availableZones={availableZones}
            onUpdate={values => replace(i, { ...allocation, ...values })}
            onDelete={() => remove(i)}
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
