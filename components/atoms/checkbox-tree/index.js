// @flow
import React from 'react';
import styled from 'styled-components';

import CheckboxGroup, { Row } from 'components/atoms/checkbox-group';

const Children = styled(Row)`
  margin-left: 33px;
  display: block;
`;

type Checked = 0 | 1 | 2 | boolean;

type Option = {
  id: string,
  name: string,
  checked: Checked,
};

type State = {
  parent: Option,
  children: Option[],
};

type Props = {
  state: State,
  onChange: (state: State) => void,
};

const isParentChecked = (children: Option[]) => {
  const numChecked = children.filter(({ checked }) => checked).length;
  if (!numChecked) return 0;
  if (numChecked === children.length) return 2;
  return 1;
};

const getNextState = (clickedId: string, state: State) => {
  const { parent, children } = state;

  let nextChildren;

  if (clickedId === parent.id) {
    const numChecked = children.filter(({ checked }) => checked).length;
    if (numChecked === children.length) {
      nextChildren = children.map(child => ({
        ...child,
        checked: false,
      }));
    } else {
      nextChildren = children.map(child => ({
        ...child,
        checked: true,
      }));
    }
  } else {
    nextChildren = children.map(child => {
      if (child.id !== clickedId) return child;

      return {
        ...child,
        checked: !child.checked,
      };
    });
  }

  return {
    parent: {
      ...parent,
      checked: isParentChecked(nextChildren),
    },
    children: nextChildren,
  };
};

const ComboCheckbox = ({ state, onChange }: Props) => {
  const { parent, children } = state;

  return (
    <div>
      <CheckboxGroup
        state={{
          id: parent.id,
          name: parent.name,
          checked: isParentChecked(children),
          allowPartial: true,
        }}
        onChange={() => {
          const nextState = getNextState(parent.id, state);
          onChange(nextState);
        }}
      />
      <Children>
        {children.map(child => (
          <CheckboxGroup
            key={child.id}
            state={{
              id: child.id,
              name: child.name,
              checked: child.checked,
            }}
            onChange={() => {
              const nextState = getNextState(child.id, state);
              onChange(nextState);
            }}
          />
        ))}
      </Children>
    </div>
  );
};

export { Children };
export default ComboCheckbox;
