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

export const mockProductShow = {
  unit: "gram",
  minPrice: null,
  maxPrice: null,
  id: "7e0fb515-f87b-4d07-82fb-d2168aa859dc",
  product: {
    slug: "gfarmalabs-g-nugs-shatter-live-resin-super-dream",
    name: "G NUGS Shatter Live Resin - Super Dream",
    description: "<p>G NUGS Shatter, the purest form of dabbing enjoyment. With its unrivaled potency and terpene profile G NUGS Shatter will not disappoint. Available in 0.5g cases.</p>",
    id: "7e0fb515-f87b-4d07-82fb-d2168aa859dc",
    avatarImage: {
      smallUrl: "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
      mediumUrl: "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
      largeUrl: "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
      hashCode: "HAjgF7IirXkvrI6uG+14SQ==",
      id: "50db6ba9-b2f3-4d68-a220-c83a20d82076"
    },
    galleryImages: [
      {
        smallUrl: "https://images.weedmaps.com/photos/products/000/055/730/square/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        mediumUrl: "https://images.weedmaps.com/photos/products/000/055/730/medium/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        largeUrl: "https://images.weedmaps.com/photos/products/000/055/730/large/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        hashCode: "ynRVIvm2/NdScY11OSZIXg==",
        id: "e79ac020-eba1-4a6b-b49e-82e212663acf"
      },
      {
        smallUrl: "https://images.weedmaps.com/photos/products/000/055/730/square/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        mediumUrl: "https://images.weedmaps.com/photos/products/000/055/730/medium/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        largeUrl: "https://images.weedmaps.com/photos/products/000/055/730/large/108615_G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
        hashCode: "ynRVIvm2/NdScY11OSZIXg==",
        id: "e79ac020-eba1-4a6b-b49e-82e21266sdfg"
      }
    ],
    departments: [
      {
        slug: "concentrates",
        parentCategoryId: null,
        name: "Concentrates",
        id: "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
        iconImage: null,
        avatarImage: null,
      }
    ],
    categories: [
      {
        slug: "shatter",
        parentCategoryId: "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
        name: "Shatter",
        id: "20eef949-8169-4a80-a80e-8482a393e29d",
        iconImage: null,
        avatarImage: null,
      }
    ],
    brand: {
      vendorId: 64,
      slug: "gfarmalabs",
      name: "GfarmaLabs",
      id: "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
      description: "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>Leader of the American Cannabis Revolution</em></p> <p> </p> <p>G FarmaLabs has become a well known brand throughout the cannabis community with both cannabis patients and connoisseurs alike. G FarmaLabs is committed to applying science and global resources to design and develop market leading brands in the cannabis flower, extracts, and edible product areas.</p> <p><strong><ins>History:</ins></strong></p> <p>Family owned and operated, G Farmalabs was conceived in 2007 by husband and wife team Ata and Nicole Gonzalez. Forced to relocate to California in 2009 after the financial crisis known as “The Great Recession,” Ata and Nicole believed the end of marijuana prohibition was near. Upon arriving in California, Ata attended Oaksterdam University and rented their first farm in Northern California. Together they carefully planted and harvested their first batch of marijuana flowers. Nicole is a member of a fourth generation tobacco family and has a strong background in the cigar industry. In 2013, G FarmaLabs launched America’s first complete brand of cannabis products.</p> <p>In 2015, Ata and Nicole’s idea had now become reality. G FarmaBrands was born. G FarmaLabs is the world’s first cannabis company that dedicates their effort to following the traditional lessons adapted from the Tobacco Industry. G FarmaLabs infused the two commercial enterprises to create a variety of products in an emerging market, setting the trend for the future of cannabis by merging the two industries.</p> <p><strong><ins>Process:</ins></strong></p> <p>G FarmaLabs works closely with a team of professionals who designed the California based processing center and production facility called the “Innovation Center” located in Desert Hot Springs, California. They have adopted the phrase “Napa Valley of Cannabis” and focus on blending the finest Domestic Cultivated Cannabis. Consistently cultivated, G FarmaLabs uses the same secret strains, each carefully chosen to guarantee a consistent experience.</p> <p>Perfecting the recipe and process, the G FarmaLabs farmers cultivate, harvest, dry, and trim their seven strains making it possible for customers to experience the aroma and feel the passion and precision the team at G FarmaLabs dedicates to their line of products.</p> <p><strong><ins>Products:</ins></strong></p> <p>Offering a variety of products from pre-rolls to edibles, G FarmaLabs caters to a wide market of cannabis users. G Stiks, their line of prestigious, 100% indoor grown pre-rolled joints are grown, processed, and rolled by G FarmaLabs and are available in 6 different options depending on user preference. For people who prefer Indica, G FarmaLabs G Stiks offers “ROJO”, packaged in red symbolizing a potent form of medicine. Patients in medical marijuana states enjoy the highly desired “VIOLETA” G Stik, packaged in purple, similar to violet, symbolizing various things from royalty to wealth, magic and mystery. The “AMARILLO” Sativa G Stiks symbolize a yellow butterfly purposely chosen to create a euphoric feeling for patients who suffer from depression. The “ROSADO” Sativa G Stik symbolizing one of the most celebrated flowers, the Pink Lotus Flower and is designed to uplift the heart and mind. The “VERDE” G Stik symbolizes energy and healing and the “NARAN-JA” G Stik symbolizes the Orange Rose. G FarmaLabs’ hybrid G Stiks offer a solution for connoisseurs on the go who need a product that is ready to go. The “VERDE” blend promotes energy healing and stress relief.</p> <p>In addition to G Stiks, G FarmaLabs also offers a line of vapor products, injectors, and edibles. Their Liquid Gold vape battery pens support 1.5 grams and are available in Super Silver Haze, Silver Haze, Blue Diamond, Green Crack , Orange Kush, Red Diesel, Pink Lemonade, Blackberry Kush, White Widow, and Purple Haze. They also proudly offer Indica, Sativa, and Hybrid Red Cannabis Oil Injectors in 0.5-1 gram dosages as well as NUG RUN Cannabis Oil injectors that are currently only offered in a 0.5 gram dosages designed to allow users to inhale Cannabinoids while avoiding harmful smoke toxins. G FarmaLabs offers infused decadent edible chocolate bars and truffles and 100% raw and unfiltered honey.</p> <p>From the detail of their packaging to their meticulous formula, G FarmaLabs proudly manufactures their own products delivering only the highest quality cannabis.</p> <p><strong><ins>Networks:</ins></strong></p> <p>Recognized as a Leader in the American Cannabis Revolution, G FarmaLabs has influenced celebrities such as The Game and has been featured on ABC News 7 and 790 KABC Talk Radio. G FarmaLabs can be found in dispensaries throughout Northern California, San Bernardino, Los Angeles, Orange County, Southern California, and Washington.</p>",
      avatarImage: null,
      licenses: {
        updatedAt: null,
        number: null,
        licenseType: null,
        insertedAt: null,
        id: ""
      }
    },
    variants: [
      {
        unit: "gram",
        sku: "123123",
        size: 1,
        sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
        name: "Gram Packs",
        description: "Gram Packs",
        defaultPrice: "20",
        defaultCurrency: "usd",
        id: "cb429ae1-cb29-46b8-adcc-1eb234dc266b",
        entry: null,
        allocations: [
          {
            sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
            price: "20",
            currency: "usd",
            amount: 151,
            active: true,
            id: "40a299c6-ba4b-4b2b-8f7f-1a9bac303032",
            zone: null,
            variant: null
          }
        ]
      },
      {
        unit: "gram",
        sku: "1123123",
        size: 28,
        sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
        name: "Ounce Packs",
        description: "Ounce PackS",
        defaultPrice: "225",
        defaultCurrency: "usd",
        id: "630580e0-c20b-48fc-8ea1-e03abe831b05",
        entry: null,
        allocations: [
          {
            sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
            price: "45",
            currency: "usd",
            amount: 22,
            active: true,
            id: "8e23c1b9-e82f-46a0-b42c-7706837d909a",
            zone: null,
            variant: null
          }
        ]
      }
    ]
  }
}