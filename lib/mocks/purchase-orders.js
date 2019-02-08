const mockPurchaseOrders = [
  {
    id: "3b4b09e2-4f0f-4c83-8b1c-2760f3af12f9",
    total: "25000",
    subtotal: "24900.00",
    statusReason: "",
    status: "not_started",
    shippingFee: "100.00",
    sellerData: {
      sellerPhone: "1112223333",
      sellerName: "GfarmaLabs",
      sellerContactName: "Andrew",
      sellerLicenses: [],
      sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
      sellerEmail: "test@test.com",
      sellerAddress: "{\"territory\":\"OR\",\"street_address\":\"120 Columbia Ave NE\",\"region\":{\"name\":\"Washington\",\"id\":\"bd457c68-fee7-485b-b3ab-c2daabba3e4f\"},\"postal_code\":\"97818\",\"country\":\"us\",\"city\":\"Boardman\"}",
      brandId: "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
      brandName: "GfarmaLabs",
    },
    orderDate: "2018-11-27T21:52:52.332967Z",
    givenDeliveryEta: {
      etaMinUnit: "day",
      etaMin: 1,
      etaMaxUnit: "day",
      etaMax: 3
    },
    expectedShipDateMin: "2018-11-28T21:52:52.321156Z",
    expectedShipDateMax: "2018-11-30T21:52:52.321156Z",
    buyerData: {
      buyerPhone: "5555555555",
      buyerLocationName: "Sciametta Burweedos",
      buyerName: "Andrew",
      buyerContactName: "Andrew",
      buyerLicenses: [
        {
          number: "888888888",
          licenseType: "medical",
          id: "6099e0b7-c7f9-4894-8df6-639469df8e5d"
        }
      ],
      buyerEmail: "joesmith@aol.com",
      buyerDeliveryInstructions: "Delivery Instruction",
      buyerAddress: "{\"territory\":\"CA\",\"street_address\":\"41 Discovery\",\"region\":{\"name\":\"South OC Brands\",\"id\":\"64d05017-4339-4cda-9e57-0da061bf6b00\"},\"postal_code\":\"92618\",\"country\":\"us\",\"city\":\"Irvine\"}"
    },
    orderItems: [
      {
        id: "eea69c02-9a58-40d5-9ea5-275c4059055e"
      }
    ],
    zoneName: 'Zone1',
  },
  {
    id: "11690783-9715-4ec7-a184-f0b25638fb05",
    total: "115000",
    subtotal: "114900.00",
    statusReason: "Not needed",
    status: "canceled",
    shippingFee: "100.00",
    sellerData: {
      sellerPhone: "1112223333",
      sellerName: "THClear Co",
      sellerLicenses: [],
      sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
      sellerEmail: "test@test.com",
      sellerAddress: "{\"territory\":\"OR\",\"street_address\":\"120 Columbia Ave NE\",\"region\":{\"name\":\"Washington\",\"id\":\"bd457c68-fee7-485b-b3ab-c2daabba3e4f\"},\"postal_code\":\"97818\",\"country\":\"us\",\"city\":\"Boardman\"}",
      brandId: "d60ca06a-89db-4584-99a8-1f9b9f427e42"
    },
    orderDate: "2018-11-27T20:27:02.311382Z",
    givenDeliveryEta: {
      etaMinUnit: "day",
      etaMin: 1,
      etaMaxUnit: "day",
      etaMax: 3
    },
    expectedShipDateMin: "2018-11-28T20:27:02.297357Z",
    expectedShipDateMax: "2018-11-30T20:27:02.297357Z",
    buyerData: {
      buyerPhone: "5555555555",
      buyerLocationName: "Sciametta Burweedos",
      buyerName: "Andrew",
      buyerLicenses: [
        {
          number: "888888888",
          licenseType: "medical",
          id: "6099e0b7-c7f9-4894-8df6-639469df8e5d"
        }
      ],
      buyerEmail: "joesmith@aol.com",
      buyerDeliveryInstructions: "Delivery Instruction",
      buyerAddress: "{\"territory\":\"CA\",\"street_address\":\"41 Discovery\",\"region\":{\"name\":\"South OC Brands\",\"id\":\"64d05017-4339-4cda-9e57-0da061bf6b00\"},\"postal_code\":\"92618\",\"country\":\"us\",\"city\":\"Irvine\"}"
    },
    orderItems: [
      {
        id: "87623787-bdbe-4ec1-8dba-b39e99d4d597"
      }
    ],
    zoneName: 'Zone1',
  },
];

export const ordersLocations = [
    { label: 'SF Location', id: '244a4623-009f-48de-b294-9d463b9973c6' },
  ];

export const ordersBrands = [
  { label: 'GfarmaLabs', id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3' },
  ];

export default mockPurchaseOrders
