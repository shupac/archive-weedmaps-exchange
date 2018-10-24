// should convert included array to hash mapped by type and id
export const mockIncluded = [
  {
    type: 'buyer_product',
    id: '9eee5973-4f82-4759-904d-9617378f0868',
    attributes: {
      unit: 'gram',
      min_price: 6.17,
      max_price: 10.58,
    },
    relationships: {
      product: {
        data: {
          type: 'product',
          id: '9eee5973-4f82-4759-904d-9617378f0868',
        },
      },
    },
  },
  {
    type: 'buyer_product',
    id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
    attributes: {
      unit: 'gram',
      min_price: 57.14,
      max_price: 60,
    },
    relationships: {
      product: {
        data: {
          type: 'product',
          id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
        },
      },
    },
  },
  // PRODUCT,
  {
    type: 'product',
    id: '9eee5973-4f82-4759-904d-9617378f0868',
    attributes: {
      slug: 'gfarmalabs-g-nugs-live-resin-shatter-super-glue',
      name: 'G NUGS Live Resin Shatter - Super Glue',
      description: 'Product description: G NUGS Live Resin Shatter',
    },
    relationships: {
      variants: {
        data: [
          {
            type: 'variant',
            id: 'bfc33d9e-202a-4154-9ef2-bec4e21d35d9',
          },
          {
            type: 'variant',
            id: 'f7842bcc-a6ba-4111-b3a7-b7fa81927095',
          },
        ],
      },
      departments: {
        data: [
          {
            type: 'category',
            id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
          },
        ],
      },
      brand: {
        data: {
          type: 'brand',
          id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
        },
      },
    },
  },
  // IMAGE,
  {
    type: 'image',
    id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
    attributes: {
      small_url: 'https://test.com/categories/images/concentrates.png',
      medium_url: 'https://test.com/categories/images/concentrates.png',
      large_url: 'https://test.com/categories/images/concentrates.png',
    },
  },
];

export const mockIncludedHash = {
  buyer_product: {
    '9eee5973-4f82-4759-904d-9617378f0868': {
      type: 'buyer_product',
      id: '9eee5973-4f82-4759-904d-9617378f0868',
      attributes: {
        unit: 'gram',
        min_price: 6.17,
        max_price: 10.58,
      },
      relationships: {
        product: {
          data: {
            type: 'product',
            id: '9eee5973-4f82-4759-904d-9617378f0868',
          },
        },
      },
    },
    '5cd4463d-52bf-4b18-84f4-e3b378fbc989': {
      type: 'buyer_product',
      id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
      attributes: {
        unit: 'gram',
        min_price: 57.14,
        max_price: 60,
      },
      relationships: {
        product: {
          data: {
            type: 'product',
            id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
          },
        },
      },
    },
  },
  product: {
    '9eee5973-4f82-4759-904d-9617378f0868': {
      type: 'product',
      id: '9eee5973-4f82-4759-904d-9617378f0868',
      attributes: {
        slug: 'gfarmalabs-g-nugs-live-resin-shatter-super-glue',
        name: 'G NUGS Live Resin Shatter - Super Glue',
        description: 'Product description: G NUGS Live Resin Shatter',
      },
      relationships: {
        variants: {
          data: [
            {
              type: 'variant',
              id: 'bfc33d9e-202a-4154-9ef2-bec4e21d35d9',
            },
            {
              type: 'variant',
              id: 'f7842bcc-a6ba-4111-b3a7-b7fa81927095',
            },
          ],
        },
        departments: {
          data: [
            {
              type: 'category',
              id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
            },
          ],
        },
        brand: {
          data: {
            type: 'brand',
            id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
          },
        },
      },
    },
  },
  image: {
    '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f': {
      type: 'image',
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      attributes: {
        small_url: 'https://test.com/categories/images/concentrates.png',
        medium_url: 'https://test.com/categories/images/concentrates.png',
        large_url: 'https://test.com/categories/images/concentrates.png',
      },
    },
  },
};

// should convert attributes to camel case
export const attributesObject = {
  data: [
    {
      id: '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      'phone-number': '(303) 555-5555',
      licenses: [
        {
          id: 'e5ae232c-9ae7-4e81-b6f6-67bd5562706f',
          license_type: 'medical',
        },
      ],
      address: {
        id: 'b393b3e0-0814-4352-aa63-95a4d07fe1af',
        street_address: '55 Discovery',
      },
    },
    {
      id: 'f1596f56-a5c5-4400-ba08-dadc0fe2dbe5',
      phone_number: '(555) 555-5555',
      testLicenses: [
        {
          id: 'ac2a2707-b276-4de1-b24b-22e358f8bc84',
          license_types: [
            {
              id: 'license1',
              license_type: 'license',
            },
            {
              id: 'license2',
              license_type: {
                id: 'type1',
                type_enum: 'TYPE',
              },
            },
          ],
        },
      ],
      address: {
        id: 'bf28b7bd-f9f0-4a9e-aa56-b7a27812579e',
        street_address: ' Discovery',
      },
    },
  ],
};

export const attributesObjectCamel = {
  data: [
    {
      id: '6039ad85-7be7-45ce-a5f9-3e802eeba1e5',
      phoneNumber: '(303) 555-5555',
      licenses: [
        {
          id: 'e5ae232c-9ae7-4e81-b6f6-67bd5562706f',
          licenseType: 'medical',
        },
      ],
      address: {
        id: 'b393b3e0-0814-4352-aa63-95a4d07fe1af',
        streetAddress: '55 Discovery',
      },
    },
    {
      id: 'f1596f56-a5c5-4400-ba08-dadc0fe2dbe5',
      phoneNumber: '(555) 555-5555',
      testLicenses: [
        {
          id: 'ac2a2707-b276-4de1-b24b-22e358f8bc84',
          licenseTypes: [
            {
              id: 'license1',
              licenseType: 'license',
            },
            {
              id: 'license2',
              licenseType: {
                id: 'type1',
                typeEnum: 'TYPE',
              },
            },
          ],
        },
      ],
      address: {
        id: 'bf28b7bd-f9f0-4a9e-aa56-b7a27812579e',
        streetAddress: ' Discovery',
      },
    },
  ],
};

// should remove all properties that are undefined
export const undefinedProperties = {
  jsonapi: {
    version: '1.0',
  },
  data: null,
  meta: undefined,
  errors: [
    {
      id: '1',
      text: 'error',
      status: undefined,
    },
  ],
};

export const undefinedPropertiesRemoved = {
  jsonapi: {
    version: '1.0',
  },
  data: null,
  errors: [
    {
      id: '1',
      text: 'error',
    },
  ],
};

// should deserialize an object without related data
export const noRelatedData = {
  jsonapi: {
    version: '1.0',
  },
  data: {
    type: 'buyer_department',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    attributes: {
      slug: 'flower',
      position: 2,
      name: 'Flower',
    },
  },
};

export const noRelatedDataDeserialized = {
  data: {
    slug: 'flower',
    position: 2,
    name: 'Flower',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
  },
};

// should deserialize an object with related data
export const relatedData = {
  jsonapi: {
    version: '1.0',
  },
  data: {
    type: 'buyer_department',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    attributes: {
      slug: 'flower',
      position: 2,
      name: 'Flower',
    },
    relationships: {
      avatar_image: {
        data: {
          type: 'image',
          id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
        },
      },
    },
  },
  included: [
    {
      type: 'image',
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      attributes: {
        small_url: 'https://test.com/categories/images/concentrates.png',
        medium_url: 'https://test.com/categories/images/concentrates.png',
        large_url: 'https://test.com/categories/images/concentrates.png',
      },
    },
  ],
};

export const relatedDataDeserialized = {
  data: {
    slug: 'flower',
    position: 2,
    name: 'Flower',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    avatar_image: {
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      small_url: 'https://test.com/categories/images/concentrates.png',
      medium_url: 'https://test.com/categories/images/concentrates.png',
      large_url: 'https://test.com/categories/images/concentrates.png',
    },
  },
};

export const relatedDataDeserializedCamel = {
  data: {
    slug: 'flower',
    position: 2,
    name: 'Flower',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    avatarImage: {
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      smallUrl: 'https://test.com/categories/images/concentrates.png',
      mediumUrl: 'https://test.com/categories/images/concentrates.png',
      largeUrl: 'https://test.com/categories/images/concentrates.png',
    },
  },
};

// should deserialize an array of data
export const arrayData = {
  jsonapi: {
    version: '1.0',
  },
  data: [
    {
      type: 'buyer_department',
      id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
      attributes: {
        slug: 'flower',
        position: 2,
        name: 'Flower',
      },
      relationships: {
        avatar_image: {
          data: {
            type: 'image',
            id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
          },
        },
      },
    },
    {
      type: 'buyer_department',
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      attributes: {
        slug: 'concentrates',
        position: 1,
        name: 'Concentrates',
      },
      relationships: {
        avatar_image: {
          data: {
            type: 'image',
            id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
          },
        },
        categories: {
          data: [
            {
              type: 'category',
              id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
            },
            {
              type: 'category',
              id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      type: 'image',
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      attributes: {
        small_url: 'https://test.com/categories/images/concentrates.png',
        medium_url: 'https://test.com/categories/images/concentrates.png',
        large_url: 'https://test.com/categories/images/concentrates.png',
      },
    },
    {
      type: 'category',
      id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
      attributes: {
        slug: 'crumble',
        name: 'Crumble',
      },
    },
    {
      type: 'category',
      id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
      attributes: {
        slug: 'live-resin',
        name: 'Live Resin',
      },
    },
  ],
};

export const arrayDataDeserialized = {
  data: [
    {
      slug: 'flower',
      position: 2,
      name: 'Flower',
      id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
      avatarImage: {
        id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
        smallUrl: 'https://test.com/categories/images/concentrates.png',
        mediumUrl: 'https://test.com/categories/images/concentrates.png',
        largeUrl: 'https://test.com/categories/images/concentrates.png',
      },
    },
    {
      slug: 'concentrates',
      position: 1,
      name: 'Concentrates',
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      avatarImage: {
        smallUrl: 'https://test.com/categories/images/concentrates.png',
        mediumUrl: 'https://test.com/categories/images/concentrates.png',
        largeUrl: 'https://test.com/categories/images/concentrates.png',
        id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      },
      categories: [
        {
          slug: 'crumble',
          name: 'Crumble',
          id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
        },
        {
          slug: 'live-resin',
          name: 'Live Resin',
          id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
        },
      ],
    },
  ],
};

// should deserialize nested related data
export const nestedData = {
  jsonapi: {
    version: '1.0',
  },
  data: [
    {
      type: 'buyer_department',
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      attributes: {
        slug: 'concentrates',
        position: 1,
        name: 'Concentrates',
      },
      relationships: {
        avatar_image: {
          data: {
            type: 'image',
            id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
          },
        },
        categories: {
          data: [
            {
              type: 'category',
              id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
            },
            {
              type: 'category',
              id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
            },
          ],
        },
        buyer_products: {
          data: [
            {
              type: 'buyer_product',
              id: '9eee5973-4f82-4759-904d-9617378f0868',
            },
            {
              type: 'buyer_product',
              id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
            },
          ],
        },
      },
    },
    {
      type: 'buyer_department',
      id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
      attributes: {
        slug: 'flower',
        position: 2,
        name: 'Flower',
      },
    },
  ],
  included: [
    // BUYER_PRODUCT,
    {
      type: 'buyer_product',
      id: '9eee5973-4f82-4759-904d-9617378f0868',
      attributes: {
        unit: 'gram',
        min_price: 6.17,
        max_price: 10.58,
      },
      relationships: {
        product: {
          data: {
            type: 'product',
            id: '9eee5973-4f82-4759-904d-9617378f0868',
          },
        },
      },
    },
    {
      type: 'buyer_product',
      id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
      attributes: {
        unit: 'gram',
        min_price: 57.14,
        max_price: 60,
      },
      relationships: {
        product: {
          data: {
            type: 'product',
            id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
          },
        },
      },
    },
    // PRODUCT,
    {
      type: 'product',
      id: '9eee5973-4f82-4759-904d-9617378f0868',
      attributes: {
        slug: 'gfarmalabs-g-nugs-live-resin-shatter-super-glue',
        name: 'G NUGS Live Resin Shatter - Super Glue',
        description: 'Product description: G NUGS Live Resin Shatter',
      },
      relationships: {
        variants: {
          data: [
            {
              type: 'variant',
              id: 'bfc33d9e-202a-4154-9ef2-bec4e21d35d9',
            },
            {
              type: 'variant',
              id: 'f7842bcc-a6ba-4111-b3a7-b7fa81927095',
            },
          ],
        },
        departments: {
          data: [
            {
              type: 'category',
              id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
            },
          ],
        },
        brand: {
          data: {
            type: 'brand',
            id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
          },
        },
      },
    },
    {
      type: 'product',
      id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
      attributes: {
        slug: 'gfarmalabs-nug-run-injector-indica',
        name: 'NUG RUN Injector, Indica',
        description: 'Product description: NUG RUN Injector, Indica',
      },
      relationships: {
        variants: {
          data: [
            {
              type: 'variant',
              id: 'c9889374-ba61-47e3-8cb1-21fa6f4bf512',
            },
          ],
        },
        departments: {
          data: [
            {
              type: 'category',
              id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
            },
          ],
        },
        brand: {
          data: {
            type: 'brand',
            id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
          },
        },
      },
    },
    // IMAGE,
    {
      type: 'image',
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      attributes: {
        small_url: 'https://test.com/categories/images/concentrates.png',
        medium_url: 'https://test.com/categories/images/concentrates.png',
        large_url: 'https://test.com/categories/images/concentrates.png',
      },
    },
    // CATEGORY,
    {
      type: 'category',
      id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
      attributes: {
        slug: 'crumble',
        name: 'Crumble',
      },
    },
    {
      type: 'category',
      id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
      attributes: {
        slug: 'live-resin',
        name: 'Live Resin',
      },
    },
    {
      type: 'category',
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      attributes: {
        slug: 'concentrates',
        name: 'Concentrates',
      },
    },
    // BRAND,
    {
      type: 'brand',
      id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
      attributes: {
        name: 'GfarmaLabs',
        shipping_fee: 0,
        delivery_eta: {
          eta_min_unit: 'day',
          eta_min: 1,
        },
      },
    },
    // VARIANT,
    {
      type: 'variant',
      relationships: {
        allocations: {
          data: [],
        },
      },
      id: 'bfc33d9e-202a-4154-9ef2-bec4e21d35d9',
      attributes: {
        unit: 'gram',
        sku: '12345',
        size: 1,
        name: '1 Gram Pack',
      },
    },
    {
      type: 'variant',
      id: 'f7842bcc-a6ba-4111-b3a7-b7fa81927095',
      attributes: {
        unit: 'ounce',
        sku: '111111111111x2',
        size: 1,
        name: '1 Ounce',
      },
      relationships: {
        allocations: {
          data: [
            {
              type: 'allocation',
              id: 'd690c5a5-8210-48d7-864a-2b1c91cc49fc',
            },
          ],
        },
      },
    },
    {
      type: 'variant',
      id: 'c9889374-ba61-47e3-8cb1-21fa6f4bf512',
      attributes: {
        unit: 'gram',
        sku: '111111111111',
        size: 1,
        name: '1 Gram',
      },
      relationships: {
        allocations: {
          data: [],
        },
      },
    },
    // ALLOCATION,
    {
      type: 'allocation',
      id: 'd690c5a5-8210-48d7-864a-2b1c91cc49fc',
      attributes: {
        price: '140',
        normalized_price: 10.58,
        currency: 'usd',
        amount: 10,
        active: true,
      },
    },
  ],
};

export const nestedDataDeserialized = {
  data: [
    {
      slug: 'concentrates',
      position: 1,
      name: 'Concentrates',
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      avatarImage: {
        smallUrl: 'https://test.com/categories/images/concentrates.png',
        mediumUrl: 'https://test.com/categories/images/concentrates.png',
        largeUrl: 'https://test.com/categories/images/concentrates.png',
        id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
      },
      categories: [
        {
          slug: 'crumble',
          name: 'Crumble',
          id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
        },
        {
          slug: 'live-resin',
          name: 'Live Resin',
          id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
        },
      ],
      buyerProducts: [
        {
          unit: 'gram',
          minPrice: 6.17,
          maxPrice: 10.58,
          id: '9eee5973-4f82-4759-904d-9617378f0868',
          product: {
            slug: 'gfarmalabs-g-nugs-live-resin-shatter-super-glue',
            name: 'G NUGS Live Resin Shatter - Super Glue',
            description: 'Product description: G NUGS Live Resin Shatter',
            id: '9eee5973-4f82-4759-904d-9617378f0868',
            brand: {
              name: 'GfarmaLabs',
              shippingFee: 0,
              deliveryEta: {
                etaMinUnit: 'day',
                etaMin: 1,
              },
              id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
            },
            departments: [
              {
                slug: 'concentrates',
                name: 'Concentrates',
                id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
              },
            ],
            variants: [
              {
                unit: 'gram',
                sku: '12345',
                size: 1,
                name: '1 Gram Pack',
                id: 'bfc33d9e-202a-4154-9ef2-bec4e21d35d9',
                allocations: [],
              },
              {
                unit: 'ounce',
                sku: '111111111111x2',
                size: 1,
                name: '1 Ounce',
                id: 'f7842bcc-a6ba-4111-b3a7-b7fa81927095',
                allocations: [
                  {
                    price: '140',
                    normalizedPrice: 10.58,
                    currency: 'usd',
                    amount: 10,
                    active: true,
                    id: 'd690c5a5-8210-48d7-864a-2b1c91cc49fc',
                  },
                ],
              },
            ],
          },
        },
        {
          unit: 'gram',
          minPrice: 57.14,
          maxPrice: 60,
          id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
          product: {
            slug: 'gfarmalabs-nug-run-injector-indica',
            name: 'NUG RUN Injector, Indica',
            description: 'Product description: NUG RUN Injector, Indica',
            id: '5cd4463d-52bf-4b18-84f4-e3b378fbc989',
            brand: {
              name: 'GfarmaLabs',
              shippingFee: 0,
              deliveryEta: {
                etaMinUnit: 'day',
                etaMin: 1,
              },
              id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
            },
            departments: [
              {
                slug: 'concentrates',
                name: 'Concentrates',
                id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
              },
            ],
            variants: [
              {
                unit: 'gram',
                sku: '111111111111',
                size: 1,
                name: '1 Gram',
                id: 'c9889374-ba61-47e3-8cb1-21fa6f4bf512',
                allocations: [],
              },
            ],
          },
        },
      ],
    },
    {
      slug: 'flower',
      position: 2,
      name: 'Flower',
      id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    },
  ],
};

// should deserialize data with no included data
export const noIncluded = {
  jsonapi: {
    version: '1.0',
  },
  data: [
    {
      type: 'brand',
      relationships: {
        licenses: {},
        avatar_image: {
          data: {
            type: 'image',
            id: '42e3faf8-edaa-4533-b63f-328d28ecb288',
          },
        },
      },
      id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
      attributes: {
        slug: 'gfarmalabs',
        shipping_fee: 0,
        name: 'GfarmaLabs',
        minimum_purchase_price: 10,
        delivery_eta: {
          eta_min_unit: 'day',
          eta_min: 1,
          eta_max_unit: 'day',
          eta_max: 3,
        },
      },
    },
    {
      type: 'brand',
      relationships: {
        licenses: {},
        avatar_image: {
          data: {
            type: 'image',
            id: '202793d4-1967-432f-bbf1-6a21842f3abf',
          },
        },
      },
      id: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
      attributes: {
        slug: 'thclear-co',
        shipping_fee: 0,
        name: 'THClear Co',
        minimum_purchase_price: 500,
        delivery_eta: {
          eta_min_unit: 'day',
          eta_min: 1,
          eta_max_unit: 'day',
          eta_max: 3,
        },
      },
    },
  ],
};

export const noIncludedDeserialized = {
  data: [
    {
      avatarImage: {
        id: '42e3faf8-edaa-4533-b63f-328d28ecb288',
      },
      deliveryEta: {
        etaMax: 3,
        etaMaxUnit: 'day',
        etaMin: 1,
        etaMinUnit: 'day',
      },
      id: 'd054b34f-428e-4583-a2a4-27f4e5aea6f3',
      minimumPurchasePrice: 10,
      name: 'GfarmaLabs',
      shippingFee: 0,
      slug: 'gfarmalabs',
    },
    {
      avatarImage: {
        id: '202793d4-1967-432f-bbf1-6a21842f3abf',
      },
      deliveryEta: {
        etaMax: 3,
        etaMaxUnit: 'day',
        etaMin: 1,
        etaMinUnit: 'day',
      },
      id: 'd60ca06a-89db-4584-99a8-1f9b9f427e42',
      minimumPurchasePrice: 500,
      name: 'THClear Co',
      shippingFee: 0,
      slug: 'thclear-co',
    },
  ],
};

// should add any meta data
export const meta = {
  jsonapi: {
    version: '1.0',
  },
  data: {
    type: 'buyer_department',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
    attributes: {
      slug: 'flower',
      position: 2,
      name: 'Flower',
    },
  },
  meta: {
    page_number: 1,
    page_size: 3,
    total_entries: 12,
  },
};

export const metaDeserialized = {
  data: {
    slug: 'flower',
    position: 2,
    name: 'Flower',
    id: 'd71cd660-91cb-4472-be4a-86f280c54e80',
  },
  meta: {
    pageNumber: 1,
    pageSize: 3,
    totalEntries: 12,
  },
};

// should add any errors
export const errors = {
  jsonapi: {
    version: '1.0',
  },
  data: null,
  errors: [
    {
      id: 'error1',
      status: 401,
      title: 'test error',
    },
    {
      id: 'error2',
      status: 400,
      title: 'test error',
    },
  ],
};

export const errorsDeserialized = {
  data: null,
  errors: [
    {
      id: 'error1',
      status: 401,
      title: 'test error',
    },
    {
      id: 'error2',
      status: 400,
      title: 'test error',
    },
  ],
};
