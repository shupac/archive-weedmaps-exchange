// @flow
import React, { Component } from 'react';
// $FlowFixMe
import ToggleSwitch from '@ghostgroup/ui.toggle';
import set from 'lodash.set';
import { stripNonNumbers, formatCurrency } from 'lib/common/strings';
import Trashcan from 'components/atoms/icons/trashcan';
import { type AllocationType } from 'models/allocation';
import { type ZoneType } from 'models/zone';
import InputError from './form-input-error';
import {
  AllocationRowWrapper,
  FormInput,
  ToggleWrapper,
  TotalValue,
  TrashWrapper,
  FormGroup,
  StyledSelect,
} from './styles';

type FormikErrors = {
  zone: string,
  price: string,
  amount: string,
};

type FormikTouched = {
  zone: boolean,
  price: boolean,
  amount: boolean,
};

type Props = {
  namePath: string,
  index: number,
  allocation: AllocationType,
  availableZones: ZoneType[],
  onUpdate: mixed => void,
  errors: FormikErrors,
  touched: FormikTouched,
  onDelete: () => void,
  handleBlur: (SyntheticEvent<FocusEvent>) => void,
};

class AllocationRow extends Component<Props> {
  getNamePath = (pathArray: mixed[]) =>
    this.props.namePath
      .split('.')
      .concat(pathArray)
      .join('.');

  render() {
    const {
      index,
      allocation,
      availableZones,
      onUpdate,
      onDelete,
      errors,
      touched,
      handleBlur,
    } = this.props;

    const { price, amount, active, zone } = allocation;

    return (
      <AllocationRowWrapper>
        <FormGroup>
          <StyledSelect
            value={zone && zone.id}
            initialSelection={zone && { value: zone.id, text: zone.name }}
            items={availableZones.map(({ id, name }) => ({
              value: id,
              text: name,
            }))}
            itemToString={option => option && option.text}
            onChange={({ value, text }) =>
              onUpdate({
                zone: { id: value, name: text },
              })
            }
            onBlur={() => {
              const namePath = this.getNamePath([index, 'zone']);
              const e = set({}, ['target', 'name'], namePath);
              handleBlur(e);
            }}
            error={errors.zone && touched.zone}
          />
          <InputError errors={errors} touched={touched} name="zone" />
        </FormGroup>
        <FormGroup>
          <FormInput
            name={this.getNamePath([index, 'price'])}
            value={price}
            onChange={e => {
              onUpdate({ price: stripNonNumbers(e.target.value, true) });
            }}
            onBlur={e => {
              onUpdate({ price: price ? formatCurrency(price) : '' });
              handleBlur(e);
            }}
            error={errors.price && touched.price}
          />
          <InputError errors={errors} touched={touched} name="price" />
        </FormGroup>
        <FormGroup>
          <FormInput
            name={this.getNamePath([index, 'amount'])}
            value={amount}
            onChange={e =>
              onUpdate({ amount: stripNonNumbers(e.target.value) })
            }
            onBlur={e => {
              onUpdate({ amount: amount && parseInt(amount, 10) });
              handleBlur(e);
            }}
            error={errors.amount && touched.amount}
          />
          <InputError errors={errors} touched={touched} name="amount" />
        </FormGroup>
        <TotalValue>
          {formatCurrency(stripNonNumbers(price, true) * amount, {
            prefix: '$',
            addCommas: 'true',
          })}
        </TotalValue>
        <ToggleWrapper>
          {/* // $FlowFixMe */}
          <ToggleSwitch
            name={this.getNamePath([index, 'active'])}
            checked={active}
            onChange={() => onUpdate({ active: !active })}
            hideLabel
          />
        </ToggleWrapper>
        <TrashWrapper onClick={onDelete}>
          <Trashcan />
        </TrashWrapper>
      </AllocationRowWrapper>
    );
  }
}

AllocationRow.displayName = 'AllocationRow';
export default AllocationRow;
