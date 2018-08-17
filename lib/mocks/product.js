export const mockProduct = {
  data: {
    type: 'product',
    id: 'ffgds9-1f4sdf-4r4fsf-343dsa',
    uuid: 'jkh5g8-qwe4p7-570zrx-m38u18',
    attributes: {
      id: 'fgtd24-78a422-pq83df-9z7e4e',
      uuid: '520aw4-qe7zh8-aas442-8887zx',
      name: 'Blue Dream',
      slug: 'blue-dream',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      priceMin: 11.11,
      priceMax: 22.22,
      images: [
        {
          small_url: 'weedmaps.com/images/blue-dream-small.jpg',
          medium_url: 'weedmaps.com/images/blue-dream-medium.jpg',
          large_url: 'weedmaps.com/images/blue-dream-large.jpg',
        },
      ],
    },
    relationships: {
      brand: {
        type: 'brand',
        id: 'ffgdfs-34gfsd-fdsf44-gf5g5g',
        uuid: 'gjf15k-th43ub-86hgn1-95jf8h',
      },
      department: {
        type: 'department',
        id: 'lkjv13-49ng88-23kgj3-23h5h6',
        uuid: 'ljh482-k54hjz-mb4v18-uyq8hj',
      },
      category: {
        type: 'category',
        id: 'lkjv13-49ng88-23kgj3-23h5h6',
        uuid: 'ljh482-k54hjz-mb4v18-uyq8hj',
      },
      variants: [
        {
          type: 'variant',
          id: 'absg4m-9kjh1d-fh4zp9-k1j5v4',
          uuid: 'absg4m-9kjh1d-fh4zp9-49z8bn',
        },
        {
          type: 'variant',
          id: 'gjf15k-th43ub-86hgn1-sdfg71',
          uuid: 'gjf15k-th43ub-86hgn1-jq18gv',
        },
      ],
    },
  },
  included: [
    {
      type: 'brand',
      id: 'ffgdfs-34gfsd-fdsf44-gf5g5g',
      uuid: 'gjf15k-th43ub-86hgn1-95jf8h',
      attributes: {
        name: 'West Coast Cure',
        slug: 'west-coast-cure',
        licenses: [
          {
            number: 'ABC-123-420-YAY',
            type: 'Medical Retailer',
          },
          {
            number: 'DEF-456-024-AYA',
            type: 'Recreational Grower',
          },
        ],
      },
    },
    {
      type: 'department',
      id: 'f5rf48-6ht54x-z71264-0rmbcp',
      uuid: 'f5rf48-6ht54x-z71264-0rmbcp',
      attributes: {
        name: 'Concentrate',
        slug: 'concentrate',
      },
    },
    {
      type: 'category',
      id: 'lkjv13-49ng88-23kgj3-23h5h6',
      uuid: 'ljh482-k54hjz-mb4v18-uyq8hj',
      attributes: {
        name: 'Concentrate',
        slug: 'concentrate',
      },
    },
    {
      type: 'variant',
      id: 'absg4m-9kjh1d-fh4zp9-k1j5v4',
      uuid: 'absg4m-9kjh1d-fh4zp9-49z8bn',
      attributes: {
        name: '1 Gram Pack',
        size: 1,
        unit: 'gram',
        amount: 100,
        price: 9.99,
        currency: 'usd',
        inStock: true,
      },
    },
    {
      type: 'variant',
      id: 'gjf15k-th43ub-86hgn1-sdfg71',
      uuid: 'gjf15k-th43ub-86hgn1-jq18gv',
      attributes: {
        name: '28 Gram Pack',
        size: 28,
        unit: 'gram',
        amount: 0,
        price: 249.99,
        currency: 'usd',
        inStock: false,
      },
    },
    {
      type: 'variant',
      id: 'gjf15k-th43ub-86hgn1-asf44g',
      uuid: 'gjf15k-th43ub-86hgn1-ku6yth',
      attributes: {
        name: '50 Gram Pack',
        size: 50,
        unit: 'gram',
        amount: 5,
        price: 502.49,
        currency: 'usd',
        inStock: true,
      },
    },
  ],
};

export const mockEmptyProduct = {};
