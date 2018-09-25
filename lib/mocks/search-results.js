export const mockResponse = [
  {
    unit: 'gram',
    minPrice: 2.3,
    maxPrice: 3.2,
    id: '2f3ac24c-6528-4fef-94e8-ec43820c2c76',
    product: {
      slug: "gfarmalabs-nug-run-injector-indica",
      name: "NUG RUN Injector, Indica",
      description: "<p>G FarmaLabs is proud to bring you NUG RUN Cannabis Oil Injectors. This pharmaceutical grade Co2 extract is created by using 100% IndoorCannabis Flower and then further removing any undesirable compounds. </p>",
      id: "5cd4463d-52bf-4b18-84f4-e3b378fbc989",
      categories: [],
      avatarImage: {
        smallUrl: "https://images.weedmaps.com/products/000/023/221/avatar/square/gfarmsalab_nug-run-indica_2.jpg?development=1",
        mediumUrl: "https://images.weedmaps.com/products/000/023/221/avatar/medium/gfarmsalab_nug-run-indica_2.jpg?development=1",
        largeUrl: "https://images.weedmaps.com/products/000/023/221/avatar/large/gfarmsalab_nug-run-indica_2.jpg?development=1",
        hashCode: "p6ba8iGQQuOl8fbvnOztjA==",
        id: "41c06b6d-099c-48c4-82c6-015d3b8dcc3e"
      },
      galleryImages: [
        {
          smallUrl: "https://images.weedmaps.com/photos/products/000/023/221/square/29923_gfarmsalab_nug-run-indica_2.jpg?development=1",
          mediumUrl: "https://images.weedmaps.com/photos/products/000/023/221/medium/29923_gfarmsalab_nug-run-indica_2.jpg?development=1",
          largeUrl: "https://images.weedmaps.com/photos/products/000/023/221/large/29923_gfarmsalab_nug-run-indica_2.jpg?development=1",
          hashCode: "hfg8b/VF6TnRM5VJGrSlfw==",
          id: "1608ec15-013e-4a77-9cb9-27cc232a6640"
        },
        {
          smallUrl: "https://images.weedmaps.com/photos/products/000/023/221/square/29969_gfarmsalab_nug-run-indica_1.jpg?development=1",
          mediumUrl: "https://images.weedmaps.com/photos/products/000/023/221/medium/29969_gfarmsalab_nug-run-indica_1.jpg?development=1",
          largeUrl: "https://images.weedmaps.com/photos/products/000/023/221/large/29969_gfarmsalab_nug-run-indica_1.jpg?development=1",
          hashCode: "0t01fMlxRZtcQEyGEoq63g==",
          id: "b2d1cf18-e1e1-443a-985a-bec6b104eaac"
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
          categories: []
        }
      ],
      brand: {
        vendorId: 64,
        slug: "gfarmalabs",
        name: "GfarmaLabs",
        id: "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
        description: "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>Leader of the American Cannabis Revolution</em></p> <p> </p> <p>G FarmaLabs has become a well known brand throughout the cannabis community with both cannabis patients and connoisseurs alike. G FarmaLabs is committed to applying science and global resources to design and develop market leading brands in the cannabis flower, extracts, and edible product areas.</p> <p><strong><ins>History:</ins></strong></p> <p>Family owned and operated, G Farmalabs was conceived in 2007 by husband and wife team Ata and Nicole Gonzalez. Forced to relocate to California in 2009 after the financial crisis known as “The Great Recession,” Ata and Nicole believed the end of marijuana prohibition was near. Upon arriving in California, Ata attended Oaksterdam University and rented their first farm in Northern California.</p>",
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
          sku: 'sku',
          size: 3.5,
          sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
          name: "Eighth Pack",
          description: "Eighth Gram Pack",
          defaultPrice: "30",
          defaultCurrency: "usd",
          id: "5cfce13e-b8b9-4da0-a363-4becc6a06bb9",
          product: null,
          allocations: [
            {
              sellerId: "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
              price: "30",
              currency: "usd",
              amount: 81,
              active: true,
              id: "091ed653-2f28-4904-89b8-5ba31330a21d",
              zone: null,
              variant: null,
            },
          ],
        },
      ],
    },
  },

];

// export const mockCarouselCategories = [
//   {
//     slug: "concentrates",
//     position: 1,
//     name: "Concentrates",
//     id: "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
//     products: [ mockResponse.product],
//   },
//   {
//     slug: "edibles",
//     position: 3,
//     name: "Edibles",
//     id: "e306a27d-5076-4074-ab7a-21f6485ad4bb",
//     products: [
//       mockResponse.product
//     ]
//   }
// ]


export const mockProduct =
  {
    id: '1234',
    name: 'Product Card',
    imageUrl: 'https://images.weedmaps.com/products/000/023/221/avatar/medium/gfarmsalab_nug-run-indica_2.jpg?development=1',
    priceUnit: 'gram',
    brand: 'GfarmaLabs',
    minPrice: 200,
    maxPrice: 400,
    category: 'Concentrate',
    outOfStock: false,
  }
