export const mockLocations = [
  {
    source: "weedmaps",
    phoneNumber: "(303) 555-5555",
    name: "Andrew's Cryb",
    email: "asciametta@aol.com",
    deliveryInstructions: "TEST.",
    contactName: "Andre Smithh",
    active: true,
    id: "6039ad85-7be7-45ce-a5f9-3e802eeba1e5",
    address: {
      territory: "CA",
      streetAddress: "55 Discovery",
      postalCode: "92618",
      longitude: -117.7597545,
      latitude: 33.6618199,
      country: "us",
      city: "Irvine",
      id: "b393b3e0-0814-4352-aa63-95a4d07fe1af"
    },
    licenses: [
      {
        number: "THX1138",
        licenseType: "medical",
        id: "e5ae232c-9ae7-4e81-b6f6-67bd5562706f"
      }
    ]
  },
  {
    source: "exchange",
    phoneNumber: "(303) 555-5555",
    name: "Test Location",
    email: "joesmith@aol.com",
    deliveryInstructions: "Knock four times.",
    contactName: "Joe Smith",
    active: false,
    id: "7f98075f-a924-4606-a817-b6f99a61f289",
    address: {
      territory: "CA",
      streetAddress: "44 Discovery",
      postalCode: "92618",
      longitude: -117.756439,
      latitude: 33.66517839999999,
      country: "us",
      city: "Irvine",
      id: "3cdf8df1-4a9d-43cc-9aac-2548eb08dc58"
    },
    licenses: [
      {
        number: "THX1138",
        licenseType: "medical",
        id: "6a102cdd-e21b-46ef-b4e7-55cfcb6e3bcb"
      }
    ]
  },
  {
    source: "weedmaps",
    phoneNumber: null,
    name: 'Incomplete Location',
    email: null,
    deliveryInstructions: "TEST.",
    contactName: null,
    active: true,
    id: "2a57860a-62d7-40c7-a2c6-0ebc32e5ce48",
    address: {
      territory: "CA",
      streetAddress: "55 Discovery",
      postalCode: "92618",
      longitude: -117.7597545,
      latitude: 33.6618199,
      country: "us",
      city: "Irvine",
      id: "0f1c4675-4d74-4895-9d08-c0ba3a99ef96"
    },
    licenses: [
      {
        number: "THX1138",
        licenseType: "medical",
        id: "95dce1e6-ef2d-4ca8-8161-fea6cff5efae"
      }
    ]
  },
];

export const mockParsedLocation = {
  name: 'ShowGrow Irvine',
  address: '824 East 17th Street,Irvine, CA',
  instructions: 'Buzz 12345',
  contact: 'John Doe',
  phone: '2139735232',
  email: 'john@showgrowirvine.com',
  licenses: [
    {
      id: '123456',
      licenseType: 'Adult-Use Retail',
      number: '7645-2347-8743-3786',
    },
    {
      id: '54321',
      licenseType: 'Medical Retail',
      number: '3453-3453-3453-5435',
    },
  ],
};

export const mockFormLocation = {
  name: 'ShowGrow Irvine',
  address: '824 East 17th Street,Irvine, CA',
  instructions: 'Buzz 12345',
  contactName: 'John Doe',
  phoneNumber: '2139735232',
  email: 'john@showgrowirvine.com',
  licenses: [
    {
      id: '123456',
      licenseType: 'Adult-Use Retail',
      number: '7645-2347-8743-3786',
    },
    {
      id: '54321',
      licenseType: 'Medical Retail',
      number: '3453-3453-3453-5435',
    },
  ],
};
