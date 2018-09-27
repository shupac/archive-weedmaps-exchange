import { Component, Fragment } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { truncate } from 'lib/common/strings';
import AddressManager from './';

// TODO: Need to confirm the data structure coming back from BE.
// TODO: Need to confirm what BE needs for the post call to change address
// const mockAddressData = [
//   {
//     id: '1',
//     name: 'Irvine Warehouse',
//     street: '41 Discovery',
//     city: 'Irvine',
//     state: 'California',
//     country: 'USA',
//     postalCode: '92618',
//   },
//   {
//     id: '2',
//     name: 'LA Warehouse',
//     street: '123 Waldorf Creek',
//     city: 'Los Angeles',
//     state: 'California',
//     country: 'USA',
//     postalCode: '93484',
//   },
//   {
//     id: '3',
//     name: 'Costa Mesa Warehouse',
//     street: '35 John Doe Drive',
//     city: 'Costa Mesa',
//     state: 'California',
//     country: 'USA',
//     postalCode: '91010',
//   },
// ];

// This is the structure that the dropdown needs
const mockAddresses = [
  {
    text: 'Irvine Warehouse - 41 Discovery, Irvine, California',
    value: '1',
  },
  {
    text: 'LA Warehouse - 123 Waldorf Creek, Los Angeles, California',
    value: '2',
  },
  {
    text: 'Costa Mesa Warehouse - 35 John Doe Drive, Costa Mesa, California',
    value: '3',
  },
  {
    text:
      'Long Address Warehouse - 1234 Annoyingly Long Named Road, Cambridge, Massachusetts',
    value: '4',
  },
];

const Text = styled.div`
  margin-bottom: 24px;
`;

type AddressObject = {
  text: string,
  value: string,
};

type Props = {
  addresses: AddressObject[],
};

type State = {
  address: AddressObject,
};

class AddressManagerWrapper extends Component<Props, State> {
  state = {
    address: {
      text: 'LA Warehouse - 123 Waldorf Creek, Los Angeles, California',
      value: '2',
    },
  };

  onSubmit = (address: AddressObject) => {
    console.log('Address Changed:', address);
    this.setState({ address });
  };

  render() {
    const { address } = this.state;
    const { addresses } = this.props;

    return (
      <Fragment>
        <Text>
          <b>Selected Address:</b> {truncate(address.text, 60)}
        </Text>
        <AddressManager
          addresses={addresses}
          selectedAddress={address}
          onSelectAddress={this.onSubmit}
          addNewAddress={() => console.log('Add New Address Clicked')}
        />
      </Fragment>
    );
  }
}

export default storiesOf('Address Manager', module)
  .addDecorator(centered)
  .add('Default', () => <AddressManagerWrapper addresses={mockAddresses} />);
