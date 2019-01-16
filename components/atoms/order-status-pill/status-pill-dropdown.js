// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import type { StoreType } from 'lib/types/store';
import { StatusPillDropDownWrapper, StatusPillFinalState } from './styles';

type Props = {
  status: string,
  store: StoreType,
  orderId: string,
};

type CategorySelected = {
  value: string,
  text: string,
};

type State = {
  status: string,
  filteredItems?: CategorySelected[],
};

const items = [
  { text: 'In Progress', value: 'in_progress' },
  { text: 'Not Started', value: 'not_started' },
  { text: 'Shipped', value: 'shipped' },
  { text: 'Completed', value: 'completed' },
  { text: 'Canceled', value: 'canceled' },
];

const possibleFilteredItems = {
  not_started: ['in_progress', 'shipped', 'completed'],
  in_progress: ['completed', 'canceled'],
  shipped: ['completed'],
};

// eslint-disable-next-line
const statusPossibility = (status: string) => {
  if (status in possibleFilteredItems) {
    return items.reduce((accum, curr) => {
      // eslint-disable-next-line
      for (let i = 0; i <= possibleFilteredItems[status].length - 1; i++) {
        if (curr.value === possibleFilteredItems[status][i]) {
          accum.push(curr);
        }
      }
      return accum;
    }, []);
  }
};

const getInitialSelection = status => items.find(item => item.value === status);

export class StatusPillDropDown extends React.Component<Props, State> {
  state = {
    status: this.props.status,
    filteredItems: statusPossibility(this.props.status),
  };

  handleSelectChange = ({ value }: { value: string }) => {
    const { orderId, store } = this.props;
    const { sellerOrders } = store;
    this.setState({
      status: value,
      filteredItems: statusPossibility(value),
    });
    sellerOrders.updateOrderStatus(orderId, value);
  };

  render() {
    const { status, filteredItems } = this.state;
    return (
      <>
        {filteredItems ? (
          <StatusPillDropDownWrapper
            data-test-id="status-drop-down"
            status={status}
            items={filteredItems}
            itemToString={item => item.text}
            initialSelection={getInitialSelection(status)}
            onChange={this.handleSelectChange}
          />
        ) : (
          <StatusPillFinalState status={status}>{status}</StatusPillFinalState>
        )}
      </>
    );
  }
}

export default inject('store')(observer(StatusPillDropDown));
