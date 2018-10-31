
const mockCart = {
  id: "32647882-a91a-49cd-b06a-b86192c0d0fb",
  total: 108100,
  subtotal: 108000,
  shippingFee: 100,
  cartErrors: [],
  items: [
    {
      id: "8ec23207-a194-4b82-be11-a1cb7392c6cf",
      price: 1000,
      amount: 100,
      variant: {
        id: "feafa975-e1cf-4665-8be3-e4be80eba2d6",
        unit: "unit",
        sku: "zzzzzzzz",
        size: 50,
        name: "50 Units",
        product: {
          id: "920c3b08-707a-459e-9d4b-dcb49eb73298",
          slug: "thclear-co-bath-bomb-lavender",
          name: "BATH BOMB - LAVENDER",
          description: "<p>THClear refreshing lavender bath bomb is infused with 100 MG CBD oil. Drop the bath bomb into water for a relaxing soak that will help with aches and pains! Be very careful leaving because the oil can leave your tub slippery. </p> <p> </p> <p>How to use: Fill your bathtub with warm water, drop in the bath bomb and lie back to enjoy its lovely color and gorgeous fragrance. The heat of the water allows the product to penetrate into the skin deeper while soothing muscle aches and pains, and alleviating dry skin leaving you with a feeling of bliss and comfort.</p>",
          brand: {
            id: "d60ca06a-89db-4584-99a8-1f9b9f427e42",
            slug: "thclear-co",
            shippingFee: 100,
            name: "THClear Co",
            minimumPurchasePrice: 10000,
            description: "<p>We are the industry leader in solventless distillate. We currently produce 6 different products with our Thclear Distillate, with our infamous uncut Private Reserve Cartridge being the most popular. Our other amazing products include: Disposable Pens, Cartridges, Syringes, Honeypot Vials, and our funky 50/50!</p>",
            deliveryEta: {
              minUnits: "day",
              min: 1,
              maxUnits: "day",
              max: 3
            },
            avatarImage: {
              id: "202793d4-1967-432f-bbf1-6a21842f3abf"
            }
          },
          avatarImage: {
            id: "bbd07ee4-865a-4d70-a484-15348fed7f0f",
            smallUrl: "https://images-acceptance.internal-weedmaps.com/products/000/055/416/avatar/square/1508885935-bathbomb-LAVENDER.png",
            mediumUrl: "https://images-acceptance.internal-weedmaps.com/products/000/055/416/avatar/medium/1508885935-bathbomb-LAVENDER.png",
            largeUrl: "https://images-acceptance.internal-weedmaps.com/products/000/055/416/avatar/large/1508885935-bathbomb-LAVENDER.png"
          }
        }
      }
    },
    {
      id: "fb7d8304-dfff-438f-8a80-013e5e9674c5",
      price: 4000,
      amount: 2,
      variant: {
        id: "8693bc89-8c5e-4424-8ba5-32d82bda6ee7",
        unit: "ounce",
        sku: "p450uye73je3",
        size: 1,
        name: "Ounce Variant",
        product: {
          id: "a3c62aa0-2c32-4252-b385-e4e1b6f4c630",
          slug: "thclear-co-pre-roll-cones-strawberry-glue",
          name: "PRE-ROLL CONES- STRAWBERRY GLUE",
          description: "Experience the stickiest strawberry Hybrid yet with THClear Co.",
          brand: {
            id: "d60ca06a-89db-4584-99a8-1f9b9f427e42",
            slug: "thclear-co",
            shippingFee: 100,
            name: "THClear Co",
            minimumPurchasePrice: 10000,
            description: "We are the industry leader in solventless distillate.",
            deliveryEta: {
              minUnits: "day",
              min: 1,
              maxUnits: "day",
              max: 3
            },
            avatarImage: {
              id: "202793d4-1967-432f-bbf1-6a21842f3abf"
            }
          },
          avatarImage: {
            id: "36c13f11-acdb-44c5-a3ca-196041cef927",
            smallUrl: "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/square/1503004147-THClear_HYBRID-1.jpg",
            mediumUrl: "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/medium/1503004147-THClear_HYBRID-1.jpg",
            largeUrl: "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/large/1503004147-THClear_HYBRID-1.jpg"
          }
        }
      }
    }
  ]
}

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
    {
      itemId: '6bc87d73-f182-43ec-8ee4-42e96d7373eb',
      error: 'item_unavailable',
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
        minUnits: "day",
        min: 1,
        maxUnits: "day",
        max: 3
      },
      id: "d054b34f-428e-4583-a2a4-27f4e5aea6f3"
    }
  ]
};

export default mockCart;
