const mockCart = {
  total: 93890,
  subtotal: 93890,
  shippingFee: 0,
  cartErrors: [],
  id: "238ee8c0-0297-44c0-b768-41397260df40",
  shippingAddress: {
    territory: "CA",
    streetAddress: "55 Discovery",
    postalCode: "92618",
    longitude: -117.7597545,
    latitude: 33.6618199,
    country: "us",
    city: "Irvine",
    id: "b393b3e0-0814-4352-aa63-95a4d07fe1af"
  },
  items: [
    {
      variantId: "630580e0-c20b-48fc-8ea1-e03abe831b05",
      price: 2800,
      amount: 3,
      id: "126974e5-a216-4b63-98c8-d065c0180125"
    },
    {
      variantId: "67879046-6491-4f6b-869b-75e94adeb9f0",
      price: 300,
      amount: 3,
      id: "6b1e92e0-ce45-442a-b54d-e6e9ba617614"
    },
  ],
  brands: [
    {
      slug: "gfarmalabs",
      shippingFee: 0,
      name: "GfarmaLabs",
      minimumPurchasePrice: 0,
      description: "this is the brand description",
      deliveryEta: {
        etaMinUnit: "day",
        etaMin: 1,
        etaMaxUnit: "day",
        etaMax: 3
      },
      id: "d054b34f-428e-4583-a2a4-27f4e5aea6f3"
    }
  ]
};

export const mockErrorCart = {
  total: 93890,
  subtotal: 93890,
  shippingFee: 10,
  cartErrors: [
    {
      itemId: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
      error: 'minimum_purchase',
    },
    {
      itemId: 'fd12602a-fd03-4bd1-bc75-cdcc2b1f5dcd',
      error: 'quantity_unavailable',
    },
    {
      itemId: '6bc87d73-f182-43ec-8ee4-42e96d7373eb',
      error: 'location_unavailable',
    },
  ],
  id: "238ee8c0-0297-44c0-b768-41397260df40",
  shippingAddress: {
    territory: "CA",
    streetAddress: "55 Discovery",
    postalCode: "92618",
    longitude: -117.7597545,
    latitude: 33.6618199,
    country: "us",
    city: "Irvine",
    id: "b393b3e0-0814-4352-aa63-95a4d07fe1af"
  },
  items: [
    {
      variantId: "630580e0-c20b-48fc-8ea1-e03abe831b05",
      price: 2800,
      amount: 3,
      id: "126974e5-a216-4b63-98c8-d065c0180125"
    },
    {
      variantId: "67879046-6491-4f6b-869b-75e94adeb9f0",
      price: 300,
      amount: 3,
      id: "6b1e92e0-ce45-442a-b54d-e6e9ba617614"
    },
  ],
  brands: [
    {
      slug: "gfarmalabs",
      shippingFee: 0,
      name: "GfarmaLabs",
      minimumPurchasePrice: 0,
      description: "this is the brand description",
      deliveryEta: {
        etaMinUnit: "day",
        etaMin: 1,
        etaMaxUnit: "day",
        etaMax: 3
      },
      id: "d054b34f-428e-4583-a2a4-27f4e5aea6f3"
    }
  ]
};

export default mockCart;
