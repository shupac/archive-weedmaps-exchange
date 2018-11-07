const address1 = JSON.stringify({
  street_address: '1431 South Los Angeles Street',
  city: 'Los Angeles',
  territory: 'CA',
  postal_code: '90015',
  country: 'USA',
});

const address2 = JSON.stringify({
  street_address: '5618 Denesik Wells',
  city: 'Los Angeles',
  territory: 'CA',
  postal_code: '90015',
  country: 'USA',
});

export default {
  id: "bcd18188-d01e-45a9-b542-a207f77a430b",
  totalItems: 144,
  subtotal: 1600.40,
  shippingFee: 10,
  total: 1610.40,
  purchaseOrders: [
    {
      id: "4087d1a1-0b91-4aa4-a479-c8d241b3d69a",
      sellerData: {
        id: "bcd18188-d01e-45a9-b542-a207f77a430b",
        name: "West Coast Cure",
        phone: "555-555-5555",
        email: "fake@wm.test",
        location: { // currently coming back as string
          id: "asdf",
          name: "Irvine Warehouse",
          address: address1,
        },
      },
    },
    {
      id: "9a87d1a1-0b91-4aa4-a479-c8d241b3d69a",
      sellerData: {
        id: "acd18188-d01e-45a9-b542-a207f77a430b",
        name: "STIIZY",
        phone: "555-555-5555",
        email: "stizzy@gmail.com",
        location: { // currently coming back as string
          id: "asdf",
          name: "Irvine Warehouse",
          address: address2,
        },
      },
    },
  ]
}
