export const mockVariants = [
  {
    type: 'brand',
    id: 'uuid',
    attributes: {
      name: 'West Coast Cure',
      slug: 'west-coast-cure',
      licenses: {
        number: 'ABC-123-420-YAY',
        type: 'Medical Retailer',
      },
    },
  },
  {
    type: 'department',
    id: 'uuid',
    attributes: {
      name: 'Concentrate',
      slug: 'concentrate',
    },
  },
  {
    type: 'category',
    id: 'uuid',
    attributes: {
      name: 'Concentrate',
      slug: 'concentrate',
    },
  },
  {
    type: 'variant',
    id: '12341254',
    attributes: {
      name: '1 Gram Bag',
      size: 1,
      unit: 'gram',
      amount: 100,
      price: 15.99,
      currency: 'usd',
      inStock: true,
    },
  },
  {
    type: 'variant',
    id: '456783672d',
    attributes: {
      name: '1/8 Ounce',
      size: 28,
      unit: 'gram',
      amount: 10,
      price: 59,
      currency: 'usd',
      inStock: true,
    },
  },
  {
    type: 'variant',
    id: '2304598',
    attributes: {
      name: '1/2 Ounce',
      size: 28,
      unit: 'gram',
      amount: 10,
      price: 150,
      currency: 'usd',
      inStock: false,
    },
  },
];
