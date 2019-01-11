// @flow
import React from 'react';
import { ToggleSwitch } from '@ghostgroup/ui';
import { formatDollars } from 'lib/common/strings';
import Trashcan from 'components/atoms/icons/trashcan';
import { type AllocationType } from 'models/allocation';
import { type ZoneType } from 'models/zone';
import {
  AllocationRowWrapper,
  FormInput,
  ToggleWrapper,
  TotalValue,
  TrashWrapper,
  StyledSelect,
} from './styles';

type Props = {
  allocation: AllocationType,
  availableZones: ZoneType[],
  onUpdate: mixed => void,
  onDelete: () => void,
};

const AllocationRow = (props: Props) => {
  const { allocation, availableZones, onUpdate, onDelete } = props;

  const { price, amount, active, zone } = allocation;

  return (
    <AllocationRowWrapper>
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
      />
      <FormInput
        value={price}
        onChange={e => onUpdate({ price: e.target.value })}
      />
      <FormInput
        value={amount}
        onChange={e => onUpdate({ amount: e.target.value })}
      />
      <TotalValue>{formatDollars(Number(price) * amount)}</TotalValue>
      <ToggleWrapper>
        <ToggleSwitch
          checked={active}
          onChange={() => onUpdate({ active: !active })}
        />
      </ToggleWrapper>
      <TrashWrapper onClick={onDelete}>
        <Trashcan />
      </TrashWrapper>
    </AllocationRowWrapper>
  );
};

AllocationRow.displayName = 'AllocationRow';
export default AllocationRow;
