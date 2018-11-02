export const mockCategories = [
  {
    slug: 'concentrates',
    position: 1,
    name: 'Concentrates',
    id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
    iconImage: {
      smallUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
      mediumUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
      largeUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
      id: 'c77396fe-4293-4911-805c-2cd3afb18949',
    },
    avatarImage: {
      smallUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
      mediumUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
      largeUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
      id: '82c8a744-10c6-48c9-b5a0-3a90de6d2c2f',
    },
    categories: [
      {
        slug: 'sauce',
        name: 'Sauce',
        id: 'c922a456-146e-4293-955b-bb517d3063ac',
      },
      {
        slug: 'live-resin',
        name: 'Live Resin',
        id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
      },
      {
        slug: 'hash-oil',
        name: 'Hash Oil',
        id: '2e6d3214-fac6-45a8-9786-6dbda76a6a33',
      },
      {
        slug: 'solventless',
        name: 'Solventless',
        id: '89af476a-0f1e-4158-9781-ac3109f3c96c',
      },
      {
        slug: 'ice-hash',
        name: 'Ice Hash',
        id: '0128b3c7-54d6-4b27-812d-718fc8ab4b4a',
      },
      {
        slug: 'dry-sift',
        name: 'Dry Sift',
        id: '68ea1a1c-9a5c-44a8-b97e-daceb020c284',
      },
      {
        slug: 'apparel',
        name: 'Apparel',
        id: '5e9573a9-a0b2-4b7e-b345-ce750ba62a41',
      },
      {
        slug: 'rosin',
        name: 'Rosin',
        id: 'bfae7a36-f12f-4faf-9a63-1d4e9b60d9be',
      },
      {
        slug: 'shatter',
        name: 'Shatter',
        id: '20eef949-8169-4a80-a80e-8482a393e29d',
      },
      {
        slug: 'distillate',
        name: 'Distillate',
        id: '934e604b-7ce6-4545-a61d-c44c32072a44',
      },
      {
        slug: 'crumble',
        name: 'Crumble',
        id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
      },
      {
        slug: 'budder',
        name: 'Budder',
        id: '6c56279f-be48-44be-8a53-8fb8303e154c',
      },
    ],
  },
  {
    slug: 'edibles',
    position: 3,
    name: 'Edibles',
    id: 'e306a27d-5076-4074-ab7a-21f6485ad4bb',
    iconImage: {
      smallUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/edibles.svg',
      mediumUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/edibles.svg',
      largeUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/edibles.svg',
      id: 'b252a9f9-f06e-4981-80db-cf74d6c7573a',
    },
    avatarImage: {
      smallUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/edibles.png',
      mediumUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/edibles.png',
      largeUrl:
        'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/edibles.png',
      id: '97cc29eb-0ce4-4b55-81ae-e1899b6dc7ce',
    },
    categories: [
      {
        slug: 'beverages',
        name: 'Beverages',
        id: '963d5e18-0feb-4263-9bd4-2ebd1e35693b',
      },
      {
        slug: 'munchies',
        name: 'Munchies',
        id: 'f245a838-fd25-4c7d-af45-e989c6702304',
      },
      {
        slug: 'baked-goods',
        name: 'Baked Goods',
        id: 'bf045477-c46d-4f12-b1bf-94f0f04e7f33',
      },
      {
        slug: 'candies',
        name: 'Candies',
        id: '1e9b1182-59e6-4b9a-92ae-2c731a517409',
      },
      {
        slug: 'cooking-ingredients',
        name: 'Cooking Ingredients',
        id: '95f27620-bc0f-421f-8d6f-d0e6abb1ec4c',
      },
      {
        slug: 'gummies',
        name: 'Gummies',
        id: 'af3eeab3-26f9-425b-99b5-fa70021e0d45',
      },
      {
        slug: 'chocolate',
        name: 'Chocolate',
        id: '330979e6-bacf-42e0-adbd-bf623c590a7a',
      },
    ],
  },
];

export const mockMappedCategories = [
  {
    parent: {
      id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
      name: 'Concentrates',
    },
    children: [
      {
        id: 'c922a456-146e-4293-955b-bb517d3063ac',
        name: 'Sauce',
      },
      {
        id: 'b7295924-975c-4e0c-bb18-250d4b233a35',
        name: 'Live Resin',
      },
      {
        id: '2e6d3214-fac6-45a8-9786-6dbda76a6a33',
        name: 'Hash Oil',
      },
      {
        id: '89af476a-0f1e-4158-9781-ac3109f3c96c',
        name: 'Solventless',
      },
      {
        id: '0128b3c7-54d6-4b27-812d-718fc8ab4b4a',
        name: 'Ice Hash',
      },
      {
        id: '68ea1a1c-9a5c-44a8-b97e-daceb020c284',
        name: 'Dry Sift',
      },
      {
        id: '5e9573a9-a0b2-4b7e-b345-ce750ba62a41',
        name: 'Apparel',
      },
      {
        id: 'bfae7a36-f12f-4faf-9a63-1d4e9b60d9be',
        name: 'Rosin',
      },
      {
        id: '20eef949-8169-4a80-a80e-8482a393e29d',
        name: 'Shatter',
      },
      {
        id: '934e604b-7ce6-4545-a61d-c44c32072a44',
        name: 'Distillate',
      },
      {
        id: '335bc5dd-15b1-4be8-8595-17cc1df3e853',
        name: 'Crumble',
      },
      {
        id: '6c56279f-be48-44be-8a53-8fb8303e154c',
        name: 'Budder',
      },
    ],
  },
  {
    parent: {
      id: 'e306a27d-5076-4074-ab7a-21f6485ad4bb',
      name: 'Edibles',
    },
    children: [
      {
        id: '963d5e18-0feb-4263-9bd4-2ebd1e35693b',
        name: 'Beverages',
      },
      {
        id: 'f245a838-fd25-4c7d-af45-e989c6702304',
        name: 'Munchies',
      },
      {
        id: 'bf045477-c46d-4f12-b1bf-94f0f04e7f33',
        name: 'Baked Goods',
      },
      {
        id: '1e9b1182-59e6-4b9a-92ae-2c731a517409',
        name: 'Candies',
      },
      {
        id: '95f27620-bc0f-421f-8d6f-d0e6abb1ec4c',
        name: 'Cooking Ingredients',
      },
      {
        id: 'af3eeab3-26f9-425b-99b5-fa70021e0d45',
        name: 'Gummies',
      },
      {
        id: '330979e6-bacf-42e0-adbd-bf623c590a7a',
        name: 'Chocolate',
      },
    ],
  },
];

export const mockEmptyCategories = [];
