export const mockAddressString = JSON.stringify({
  street_address: '1431 South Los Angeles Street',
  city: 'Los Angeles',
  territory: 'CA',
  postal_code: '90015',
  country: 'USA',
});

export default {
  "id": "3ba25532-ab4e-4f15-9c66-550295857231",
  "purchaseOrders": [
    {
      "id": "b97329d4-a7ae-4c7a-ab5e-4de8aec22f50",
      "total": "4400",
      "subtotal": "4400.0",
      "statusReason": "",
      "status": "not_started",
      "shippingFee": "0.0",
      "sellerData": {
        "sellerPhone": "1112223333",
        "sellerName": "West Coast Cure",
        "sellerLicenses": [],
        "sellerId": "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
        "sellerEmail": "test@test.com",
        "sellerAddress": mockAddressString,
      },
      "orderDate": "2018-11-09T17:48:29.174071Z",
      "givenDeliveryEta": {
        "etaMinUnit": "day",
        "etaMin": 4,
        "etaMaxUnit": "day",
        "etaMax": 6
      },
      "expectedShipDateMin": "2018-11-13T17:48:29.169876Z",
      "expectedShipDateMax": "2018-11-15T17:48:29.169876Z",
      "buyerData": {
        "buyerPhone": "(303) 555-5555",
        "buyerLocationName": "Andrew's Cryb",
        "buyerLicenses": [
          {
            "number": "THX1138",
            "licenseType": "medical",
            "id": "e5ae232c-9ae7-4e81-b6f6-67bd5562706f"
          }
        ],
        "buyerEmail": "asciametta@aol.com",
        "buyerDeliveryInstructions": "TEST.",
        "buyerAddress": "{\"territory\":\"CA\",\"street_address\":\"55 Discovery\",\"region\":{\"name\":\"South OC Brands\",\"id\":\"64d05017-4339-4cda-9e57-0da061bf6b00\"},\"postal_code\":\"92618\",\"country\":\"us\",\"city\":\"Irvine\"}"
      },
      "orderItems": [
        {
          "id": "2b113f61-1b7f-4d18-bd20-7c3ebc7d2007",
          "variantName": "1 ounces",
          "sku": "zzzzzzzz",
          "productName": "Gelato",
          "productId": "856c2fc1-854d-4eec-b62b-9d1670609110",
          "price": "100",
          "categories": {
            "parent": "Flower",
            "child": "Hybrid"
          },
          "amount": 24,
          "variant": {
            "id": "3ef2595c-85e6-4209-be76-6559eceb6454",
            "unit": "ounce",
            "sku": "zzzzzzzz",
            "size": 1,
            "name": "1 ounces",
            "product": {
              "id": "856c2fc1-854d-4eec-b62b-9d1670609110",
              "slug": "wcc-gelato",
              "name": "Gelato",
              "description": "<p>West Coast Cure's Gelato is Nitrogen-sealed to cure and maintain these buds at their ultimate potency. A sweet dessert not to be missed, their Gelato strain is a tasty Hybrid descended from the equally delicious and potent Thin Mint GSC and Sunset Sherbert. This THC motherload may be a bit much for new consumers, but with heavy-handed physical relaxation and invigorated mental agility, Gelato is the perfect strain for creative productivity and pain relief during the day.</p>",
              "departments": [
                {
                  "id": "d71cd660-91cb-4472-be4a-86f280c54e80",
                  "slug": "flower",
                  "name": "Flower",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "categories": [
                {
                  "id": "c5787376-ab60-4060-acef-f5929c817c09",
                  "slug": "hybrid-flower",
                  "name": "Hybrid",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "brand": {
                "id": "16326c8a-0726-4a2b-92a4-57e5f67f97db",
                "slug": "west-coast-cure82160046",
                "shippingFee": 0,
                "name": "West Coast Cure",
                "minimumPurchasePrice": 0,
                "description": "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>There’s no question; West Coast Cure is the first name in high-end wax products.</em></p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 4,
                  "etaMaxUnit": "day",
                  "etaMax": 6
                },
                "licenses": [],
                "avatarImage": {
                  "id": "a9fe3fae-dff8-43c5-8d74-7f81f726b40f",
                  "smallUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/square/WCC_LOGO_v4.jpg",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/medium/WCC_LOGO_v4.jpg",
                  "largeUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/large/WCC_LOGO_v4.jpg"
                }
              },
              "avatarImage": {
                "id": "1d962557-b9bc-4e4a-9e16-a426820023be",
                "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/square/wcc_gelatocan-12.jpg",
                "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/medium/wcc_gelatocan-12.jpg",
                "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/large/wcc_gelatocan-12.jpg"
              }
            }
          },
          "avatarImage": {
            "id": "1d962557-b9bc-4e4a-9e16-a426820023be",
            "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/square/wcc_gelatocan-12.jpg",
            "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/medium/wcc_gelatocan-12.jpg",
            "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/035/422/avatar/large/wcc_gelatocan-12.jpg"
          }
        },
        {
          "id": "7ada039c-fca7-462c-b87c-6d69a815d442",
          "variantName": "50 Units",
          "sku": "zzzzzzzz",
          "productName": "Tahoe OG 3PC Cured Joints",
          "productId": "dbfa378b-85e6-44c0-a783-fe9650dc99f8",
          "price": "1000",
          "categories": {
            "parent": "Flower",
            "child": "Pre Rolls"
          },
          "amount": 2,
          "variant": {
            "id": "0d90ca51-0a96-401d-8cfb-b8d9934d08c0",
            "unit": "unit",
            "sku": "zzzzzzzz",
            "size": 50,
            "name": "50 Units",
            "product": {
              "id": "dbfa378b-85e6-44c0-a783-fe9650dc99f8",
              "slug": "west-coast-cure-3-pc-cured-joints-tahoe-og",
              "name": "Tahoe OG 3PC Cured Joints",
              "description": "<p>You can never have too many West Coast Cure joints, or West Coast Cure anything for that matter. West Coast Cure is pleased to offer their three-piece Cured Joints filled with premium Tahoe OG flowers. Each joint contains one (1) gram of Tahoe OG flowers perfectly rolled and ready to spark. West Coast Cure’s Tahoe OG flower deliver a lemony and spicy flavor profile with notes of wood, and the effects leave smokers in a lulling haze. Wind down with one (or maybe two) of these West Coast Cure jays and feel the euphoric relaxation sink into your every fiber.</p>",
              "departments": [
                {
                  "id": "d71cd660-91cb-4472-be4a-86f280c54e80",
                  "slug": "flower",
                  "name": "Flower",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "categories": [
                {
                  "id": "1ccbbffa-634f-413e-b565-6978d3d79fca",
                  "slug": "pre-rolls",
                  "name": "Pre Rolls",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "brand": {
                "id": "16326c8a-0726-4a2b-92a4-57e5f67f97db",
                "slug": "west-coast-cure82160046",
                "shippingFee": 0,
                "name": "West Coast Cure",
                "minimumPurchasePrice": 0,
                "description": "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>There’s no question; West Coast Cure is the first name in high-end wax products.</em></p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 4,
                  "etaMaxUnit": "day",
                  "etaMax": 6
                },
                "licenses": [],
                "avatarImage": {
                  "id": "a9fe3fae-dff8-43c5-8d74-7f81f726b40f",
                  "smallUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/square/WCC_LOGO_v4.jpg",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/medium/WCC_LOGO_v4.jpg",
                  "largeUrl": "https://images.weedmaps.com/brands/000/000/015/avatar/large/WCC_LOGO_v4.jpg"
                }
              },
              "avatarImage": {
                "id": "d636f9ff-411c-4d77-a32b-cf035ea77dd5",
                "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/square/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg",
                "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/medium/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg",
                "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/large/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg"
              }
            }
          },
          "avatarImage": {
            "id": "d636f9ff-411c-4d77-a32b-cf035ea77dd5",
            "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/square/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg",
            "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/medium/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg",
            "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/053/262/avatar/large/1507323767-171005_WestCoastCure_Lemon-Hard-Gelato-InsideShot-2072.jpg"
          }
        }
      ]
    },
    {
      "id": "234f908e-02d8-4946-8eff-c04297f1a9e2",
      "total": "100800",
      "subtotal": "100700.00",
      "statusReason": "",
      "status": "shipped",
      "shippingFee": "100.00",
      "sellerData": {
        "sellerPhone": "1112223333",
        "sellerName": "GfarmaLabs",
        "sellerLicenses": [],
        "sellerId": "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
        "sellerEmail": "test@test.com",
        "sellerAddress": null
      },
      "orderDate": "2018-11-09T17:48:29.180251Z",
      "givenDeliveryEta": {
        "etaMinUnit": "day",
        "etaMin": 1,
        "etaMaxUnit": "day",
        "etaMax": 3
      },
      "expectedShipDateMin": "2018-11-10T17:48:29.170187Z",
      "expectedShipDateMax": "2018-11-12T17:48:29.170187Z",
      "buyerData": {
        "buyerPhone": "(303) 555-5555",
        "buyerLocationName": "Andrew's Cryb",
        "buyerLicenses": [
          {
            "number": "THX1138",
            "licenseType": "medical",
            "id": "e5ae232c-9ae7-4e81-b6f6-67bd5562706f"
          }
        ],
        "buyerEmail": "asciametta@aol.com",
        "buyerDeliveryInstructions": "TEST.",
        "buyerAddress": "{\"territory\":\"CA\",\"street_address\":\"55 Discovery\",\"region\":{\"name\":\"South OC Brands\",\"id\":\"64d05017-4339-4cda-9e57-0da061bf6b00\"},\"postal_code\":\"92618\",\"country\":\"us\",\"city\":\"Irvine\"}"
      },
      "orderItems": [
        {
          "id": "69e84bc7-7126-44ef-8564-83aebde54e74",
          "variantName": "3 Gram",
          "sku": "3333333",
          "productName": "G NUGS Shatter Live Resin - Super Dream",
          "productId": "7e0fb515-f87b-4d07-82fb-d2168aa859dc",
          "price": "300",
          "categories": {
            "parent": "Concentrates",
            "child": ""
          },
          "amount": 36,
          "variant": {
            "id": "67879046-6491-4f6b-869b-75e94adeb9f0",
            "unit": "gram",
            "sku": "3333333",
            "size": 3,
            "name": "3 Gram",
            "product": {
              "id": "7e0fb515-f87b-4d07-82fb-d2168aa859dc",
              "slug": "gfarmalabs-g-nugs-shatter-live-resin-super-dream",
              "name": "G NUGS Shatter Live Resin - Super Dream",
              "description": "<p>G NUGS Shatter, the purest form of dabbing enjoyment. With its unrivaled potency and terpene profile G NUGS Shatter will not disappoint. Available in 0.5g cases.</p>",
              "departments": [
                {
                  "id": "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
                  "slug": "concentrates",
                  "name": "Concentrates",
                  "iconImage": {
                    "id": "c77396fe-4293-4911-805c-2cd3afb18949"
                  },
                  "avatarImage": {
                    "id": "82c8a744-10c6-48c9-b5a0-3a90de6d2c2f"
                  }
                }
              ],
              "categories": [],
              "brand": {
                "id": "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
                "slug": "gfarmalabs",
                "shippingFee": 100,
                "name": "GfarmaLabs",
                "minimumPurchasePrice": 7500,
                "description": "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>Leader of the American Cannabis Revolution</em></p> <p> </p> <p>G FarmaLabs has become a well known brand throughout the cannabis community with both cannabis patients and connoisseurs alike. G FarmaLabs is committed to applying science and global resources to design and develop market leading brands in the cannabis flower, extracts, and edible product areas.</p> <p><strong><ins>History:</ins></strong></p> <p>Family owned and operated, G Farmalabs was conceived in 2007 by husband and wife team Ata and Nicole Gonzalez. Forced to relocate to California in 2009 after the financial crisis known as “The Great Recession,” Ata and Nicole believed the end of marijuana prohibition was near. Upon arriving in California, Ata attended Oaksterdam University and rented their first farm in Northern California. Together they carefully planted and harvested their first batch of marijuana flowers. Nicole is a member of a fourth generation tobacco family and has a strong background in the cigar industry. In 2013, G FarmaLabs launched America’s first complete brand of cannabis products.</p> <p>In 2015, Ata and Nicole’s idea had now become reality. G FarmaBrands was born. G FarmaLabs is the world’s first cannabis company that dedicates their effort to following the traditional lessons adapted from the Tobacco Industry. G FarmaLabs infused the two commercial enterprises to create a variety of products in an emerging market, setting the trend for the future of cannabis by merging the two industries.</p> <p><strong><ins>Process:</ins></strong></p> <p>G FarmaLabs works closely with a team of professionals who designed the California based processing center and production facility called the “Innovation Center” located in Desert Hot Springs, California. They have adopted the phrase “Napa Valley of Cannabis” and focus on blending the finest Domestic Cultivated Cannabis. Consistently cultivated, G FarmaLabs uses the same secret strains, each carefully chosen to guarantee a consistent experience.</p> <p>Perfecting the recipe and process, the G FarmaLabs farmers cultivate, harvest, dry, and trim their seven strains making it possible for customers to experience the aroma and feel the passion and precision the team at G FarmaLabs dedicates to their line of products.</p> <p><strong><ins>Products:</ins></strong></p> <p>Offering a variety of products from pre-rolls to edibles, G FarmaLabs caters to a wide market of cannabis users. G Stiks, their line of prestigious, 100% indoor grown pre-rolled joints are grown, processed, and rolled by G FarmaLabs and are available in 6 different options depending on user preference. For people who prefer Indica, G FarmaLabs G Stiks offers “ROJO”, packaged in red symbolizing a potent form of medicine. Patients in medical marijuana states enjoy the highly desired “VIOLETA” G Stik, packaged in purple, similar to violet, symbolizing various things from royalty to wealth, magic and mystery. The “AMARILLO” Sativa G Stiks symbolize a yellow butterfly purposely chosen to create a euphoric feeling for patients who suffer from depression. The “ROSADO” Sativa G Stik symbolizing one of the most celebrated flowers, the Pink Lotus Flower and is designed to uplift the heart and mind. The “VERDE” G Stik symbolizes energy and healing and the “NARAN-JA” G Stik symbolizes the Orange Rose. G FarmaLabs’ hybrid G Stiks offer a solution for connoisseurs on the go who need a product that is ready to go. The “VERDE” blend promotes energy healing and stress relief.</p> <p>In addition to G Stiks, G FarmaLabs also offers a line of vapor products, injectors, and edibles. Their Liquid Gold vape battery pens support 1.5 grams and are available in Super Silver Haze, Silver Haze, Blue Diamond, Green Crack , Orange Kush, Red Diesel, Pink Lemonade, Blackberry Kush, White Widow, and Purple Haze. They also proudly offer Indica, Sativa, and Hybrid Red Cannabis Oil Injectors in 0.5-1 gram dosages as well as NUG RUN Cannabis Oil injectors that are currently only offered in a 0.5 gram dosages designed to allow users to inhale Cannabinoids while avoiding harmful smoke toxins. G FarmaLabs offers infused decadent edible chocolate bars and truffles and 100% raw and unfiltered honey.</p> <p>From the detail of their packaging to their meticulous formula, G FarmaLabs proudly manufactures their own products delivering only the highest quality cannabis.</p> <p><strong><ins>Networks:</ins></strong></p> <p>Recognized as a Leader in the American Cannabis Revolution, G FarmaLabs has influenced celebrities such as The Game and has been featured on ABC News 7 and 790 KABC Talk Radio. G FarmaLabs can be found in dispensaries throughout Northern California, San Bernardino, Los Angeles, Orange County, Southern California, and Washington.</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [
                  {
                    "id": "8c4369fc-a767-4e5c-9863-b5225705d563",
                    "number": "420710",
                    "licenseType": "Sales"
                  }
                ],
                "avatarImage": {
                  "id": "42e3faf8-edaa-4533-b63f-328d28ecb288",
                  "smallUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/square/gfarmalabs_new_logo.jpg?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/medium/gfarmalabs_new_logo.jpg?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/large/gfarmalabs_new_logo.jpg?development=1"
                }
              },
              "avatarImage": {
                "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
                "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
              }
            }
          },
          "avatarImage": {
            "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
            "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
          }
        },
        {
          "id": "7504b38c-b6e6-4642-a73c-e3ed0ffd2cab",
          "variantName": "100 Pack Data Test",
          "sku": "100",
          "productName": "Test Product 7",
          "productId": "55b7a361-6177-4d9a-9b99-0d32a946d6ed",
          "price": "5000",
          "categories": {
            "parent": "Concentrates",
            "child": ""
          },
          "amount": 14,
          "variant": {
            "id": "e1bf1d8c-cf4a-46d4-b310-abc5378b5226",
            "unit": "unit",
            "sku": "100",
            "size": 100,
            "name": "100 Pack Data Test",
            "product": {
              "id": "55b7a361-6177-4d9a-9b99-0d32a946d6ed",
              "slug": "test-product7",
              "name": "Test Product 7",
              "description": "Test Product 7",
              "departments": [
                {
                  "id": "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
                  "slug": "concentrates",
                  "name": "Concentrates",
                  "iconImage": {
                    "id": "c77396fe-4293-4911-805c-2cd3afb18949"
                  },
                  "avatarImage": {
                    "id": "82c8a744-10c6-48c9-b5a0-3a90de6d2c2f"
                  }
                }
              ],
              "categories": [],
              "brand": {
                "id": "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
                "slug": "gfarmalabs",
                "shippingFee": 100,
                "name": "GfarmaLabs",
                "minimumPurchasePrice": 7500,
                "description": "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>Leader of the American Cannabis Revolution</em></p> <p> </p> <p>G FarmaLabs has become a well known brand throughout the cannabis community with both cannabis patients and connoisseurs alike. G FarmaLabs is committed to applying science and global resources to design and develop market leading brands in the cannabis flower, extracts, and edible product areas.</p> <p><strong><ins>History:</ins></strong></p> <p>Family owned and operated, G Farmalabs was conceived in 2007 by husband and wife team Ata and Nicole Gonzalez. Forced to relocate to California in 2009 after the financial crisis known as “The Great Recession,” Ata and Nicole believed the end of marijuana prohibition was near. Upon arriving in California, Ata attended Oaksterdam University and rented their first farm in Northern California. Together they carefully planted and harvested their first batch of marijuana flowers. Nicole is a member of a fourth generation tobacco family and has a strong background in the cigar industry. In 2013, G FarmaLabs launched America’s first complete brand of cannabis products.</p> <p>In 2015, Ata and Nicole’s idea had now become reality. G FarmaBrands was born. G FarmaLabs is the world’s first cannabis company that dedicates their effort to following the traditional lessons adapted from the Tobacco Industry. G FarmaLabs infused the two commercial enterprises to create a variety of products in an emerging market, setting the trend for the future of cannabis by merging the two industries.</p> <p><strong><ins>Process:</ins></strong></p> <p>G FarmaLabs works closely with a team of professionals who designed the California based processing center and production facility called the “Innovation Center” located in Desert Hot Springs, California. They have adopted the phrase “Napa Valley of Cannabis” and focus on blending the finest Domestic Cultivated Cannabis. Consistently cultivated, G FarmaLabs uses the same secret strains, each carefully chosen to guarantee a consistent experience.</p> <p>Perfecting the recipe and process, the G FarmaLabs farmers cultivate, harvest, dry, and trim their seven strains making it possible for customers to experience the aroma and feel the passion and precision the team at G FarmaLabs dedicates to their line of products.</p> <p><strong><ins>Products:</ins></strong></p> <p>Offering a variety of products from pre-rolls to edibles, G FarmaLabs caters to a wide market of cannabis users. G Stiks, their line of prestigious, 100% indoor grown pre-rolled joints are grown, processed, and rolled by G FarmaLabs and are available in 6 different options depending on user preference. For people who prefer Indica, G FarmaLabs G Stiks offers “ROJO”, packaged in red symbolizing a potent form of medicine. Patients in medical marijuana states enjoy the highly desired “VIOLETA” G Stik, packaged in purple, similar to violet, symbolizing various things from royalty to wealth, magic and mystery. The “AMARILLO” Sativa G Stiks symbolize a yellow butterfly purposely chosen to create a euphoric feeling for patients who suffer from depression. The “ROSADO” Sativa G Stik symbolizing one of the most celebrated flowers, the Pink Lotus Flower and is designed to uplift the heart and mind. The “VERDE” G Stik symbolizes energy and healing and the “NARAN-JA” G Stik symbolizes the Orange Rose. G FarmaLabs’ hybrid G Stiks offer a solution for connoisseurs on the go who need a product that is ready to go. The “VERDE” blend promotes energy healing and stress relief.</p> <p>In addition to G Stiks, G FarmaLabs also offers a line of vapor products, injectors, and edibles. Their Liquid Gold vape battery pens support 1.5 grams and are available in Super Silver Haze, Silver Haze, Blue Diamond, Green Crack , Orange Kush, Red Diesel, Pink Lemonade, Blackberry Kush, White Widow, and Purple Haze. They also proudly offer Indica, Sativa, and Hybrid Red Cannabis Oil Injectors in 0.5-1 gram dosages as well as NUG RUN Cannabis Oil injectors that are currently only offered in a 0.5 gram dosages designed to allow users to inhale Cannabinoids while avoiding harmful smoke toxins. G FarmaLabs offers infused decadent edible chocolate bars and truffles and 100% raw and unfiltered honey.</p> <p>From the detail of their packaging to their meticulous formula, G FarmaLabs proudly manufactures their own products delivering only the highest quality cannabis.</p> <p><strong><ins>Networks:</ins></strong></p> <p>Recognized as a Leader in the American Cannabis Revolution, G FarmaLabs has influenced celebrities such as The Game and has been featured on ABC News 7 and 790 KABC Talk Radio. G FarmaLabs can be found in dispensaries throughout Northern California, San Bernardino, Los Angeles, Orange County, Southern California, and Washington.</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [
                  {
                    "id": "8c4369fc-a767-4e5c-9863-b5225705d563",
                    "number": "420710",
                    "licenseType": "Sales"
                  }
                ],
                "avatarImage": {
                  "id": "42e3faf8-edaa-4533-b63f-328d28ecb288",
                  "smallUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/square/gfarmalabs_new_logo.jpg?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/medium/gfarmalabs_new_logo.jpg?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/large/gfarmalabs_new_logo.jpg?development=1"
                }
              },
              "avatarImage": {
                "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
                "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
              }
            }
          },
          "avatarImage": {
            "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
            "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
          }
        },
        {
          "id": "e38b1bc2-65bf-44dd-91e7-e7048a46cfc5",
          "variantName": "200 Pack Data Test",
          "sku": "200",
          "productName": "Test Product 7",
          "productId": "55b7a361-6177-4d9a-9b99-0d32a946d6ed",
          "price": "10000",
          "categories": {
            "parent": "Concentrates",
            "child": ""
          },
          "amount": 2,
          "variant": {
            "id": "3c68dbac-84c6-45ea-aecf-f538a2f13a59",
            "unit": "unit",
            "sku": "200",
            "size": 200,
            "name": "200 Pack Data Test",
            "product": {
              "id": "55b7a361-6177-4d9a-9b99-0d32a946d6ed",
              "slug": "test-product7",
              "name": "Test Product 7",
              "description": "Test Product 7",
              "departments": [
                {
                  "id": "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
                  "slug": "concentrates",
                  "name": "Concentrates",
                  "iconImage": {
                    "id": "c77396fe-4293-4911-805c-2cd3afb18949"
                  },
                  "avatarImage": {
                    "id": "82c8a744-10c6-48c9-b5a0-3a90de6d2c2f"
                  }
                }
              ],
              "categories": [],
              "brand": {
                "id": "d054b34f-428e-4583-a2a4-27f4e5aea6f3",
                "slug": "gfarmalabs",
                "shippingFee": 100,
                "name": "GfarmaLabs",
                "minimumPurchasePrice": 7500,
                "description": "<p><strong><ins>Our Mission:</ins></strong></p> <p><em>Leader of the American Cannabis Revolution</em></p> <p> </p> <p>G FarmaLabs has become a well known brand throughout the cannabis community with both cannabis patients and connoisseurs alike. G FarmaLabs is committed to applying science and global resources to design and develop market leading brands in the cannabis flower, extracts, and edible product areas.</p> <p><strong><ins>History:</ins></strong></p> <p>Family owned and operated, G Farmalabs was conceived in 2007 by husband and wife team Ata and Nicole Gonzalez. Forced to relocate to California in 2009 after the financial crisis known as “The Great Recession,” Ata and Nicole believed the end of marijuana prohibition was near. Upon arriving in California, Ata attended Oaksterdam University and rented their first farm in Northern California. Together they carefully planted and harvested their first batch of marijuana flowers. Nicole is a member of a fourth generation tobacco family and has a strong background in the cigar industry. In 2013, G FarmaLabs launched America’s first complete brand of cannabis products.</p> <p>In 2015, Ata and Nicole’s idea had now become reality. G FarmaBrands was born. G FarmaLabs is the world’s first cannabis company that dedicates their effort to following the traditional lessons adapted from the Tobacco Industry. G FarmaLabs infused the two commercial enterprises to create a variety of products in an emerging market, setting the trend for the future of cannabis by merging the two industries.</p> <p><strong><ins>Process:</ins></strong></p> <p>G FarmaLabs works closely with a team of professionals who designed the California based processing center and production facility called the “Innovation Center” located in Desert Hot Springs, California. They have adopted the phrase “Napa Valley of Cannabis” and focus on blending the finest Domestic Cultivated Cannabis. Consistently cultivated, G FarmaLabs uses the same secret strains, each carefully chosen to guarantee a consistent experience.</p> <p>Perfecting the recipe and process, the G FarmaLabs farmers cultivate, harvest, dry, and trim their seven strains making it possible for customers to experience the aroma and feel the passion and precision the team at G FarmaLabs dedicates to their line of products.</p> <p><strong><ins>Products:</ins></strong></p> <p>Offering a variety of products from pre-rolls to edibles, G FarmaLabs caters to a wide market of cannabis users. G Stiks, their line of prestigious, 100% indoor grown pre-rolled joints are grown, processed, and rolled by G FarmaLabs and are available in 6 different options depending on user preference. For people who prefer Indica, G FarmaLabs G Stiks offers “ROJO”, packaged in red symbolizing a potent form of medicine. Patients in medical marijuana states enjoy the highly desired “VIOLETA” G Stik, packaged in purple, similar to violet, symbolizing various things from royalty to wealth, magic and mystery. The “AMARILLO” Sativa G Stiks symbolize a yellow butterfly purposely chosen to create a euphoric feeling for patients who suffer from depression. The “ROSADO” Sativa G Stik symbolizing one of the most celebrated flowers, the Pink Lotus Flower and is designed to uplift the heart and mind. The “VERDE” G Stik symbolizes energy and healing and the “NARAN-JA” G Stik symbolizes the Orange Rose. G FarmaLabs’ hybrid G Stiks offer a solution for connoisseurs on the go who need a product that is ready to go. The “VERDE” blend promotes energy healing and stress relief.</p> <p>In addition to G Stiks, G FarmaLabs also offers a line of vapor products, injectors, and edibles. Their Liquid Gold vape battery pens support 1.5 grams and are available in Super Silver Haze, Silver Haze, Blue Diamond, Green Crack , Orange Kush, Red Diesel, Pink Lemonade, Blackberry Kush, White Widow, and Purple Haze. They also proudly offer Indica, Sativa, and Hybrid Red Cannabis Oil Injectors in 0.5-1 gram dosages as well as NUG RUN Cannabis Oil injectors that are currently only offered in a 0.5 gram dosages designed to allow users to inhale Cannabinoids while avoiding harmful smoke toxins. G FarmaLabs offers infused decadent edible chocolate bars and truffles and 100% raw and unfiltered honey.</p> <p>From the detail of their packaging to their meticulous formula, G FarmaLabs proudly manufactures their own products delivering only the highest quality cannabis.</p> <p><strong><ins>Networks:</ins></strong></p> <p>Recognized as a Leader in the American Cannabis Revolution, G FarmaLabs has influenced celebrities such as The Game and has been featured on ABC News 7 and 790 KABC Talk Radio. G FarmaLabs can be found in dispensaries throughout Northern California, San Bernardino, Los Angeles, Orange County, Southern California, and Washington.</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [
                  {
                    "id": "8c4369fc-a767-4e5c-9863-b5225705d563",
                    "number": "420710",
                    "licenseType": "Sales"
                  }
                ],
                "avatarImage": {
                  "id": "42e3faf8-edaa-4533-b63f-328d28ecb288",
                  "smallUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/square/gfarmalabs_new_logo.jpg?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/medium/gfarmalabs_new_logo.jpg?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/000/064/avatar/large/gfarmalabs_new_logo.jpg?development=1"
                }
              },
              "avatarImage": {
                "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
                "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
                "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
              }
            }
          },
          "avatarImage": {
            "id": "50db6ba9-b2f3-4d68-a220-c83a20d82076",
            "smallUrl": "https://images.weedmaps.com/products/000/055/730/avatar/square/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "mediumUrl": "https://images.weedmaps.com/products/000/055/730/avatar/medium/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1",
            "largeUrl": "https://images.weedmaps.com/products/000/055/730/avatar/large/1509052410-G_Nug_Shatter_-_Super_Dream.jpeg?development=1"
          }
        }
      ]
    },
    {
      "id": "d20a6d4d-14d6-476e-856d-9c93ad156839",
      "total": "89250",
      "subtotal": "89150.00",
      "statusReason": "",
      "status": "shipped",
      "shippingFee": "100.00",
      "sellerData": {
        "sellerPhone": "1112223333",
        "sellerName": "THClear Co",
        "sellerLicenses": [],
        "sellerId": "2f4ddb82-3b67-4780-8ae4-7f27da36d813",
        "sellerEmail": "test@test.com",
        "sellerAddress": null
      },
      "orderDate": "2018-11-09T17:48:29.187542Z",
      "givenDeliveryEta": {
        "etaMinUnit": "day",
        "etaMin": 1,
        "etaMaxUnit": "day",
        "etaMax": 3
      },
      "expectedShipDateMin": "2018-11-10T17:48:29.170463Z",
      "expectedShipDateMax": "2018-11-12T17:48:29.170463Z",
      "buyerData": {
        "buyerPhone": "(303) 555-5555",
        "buyerLocationName": "Andrew's Cryb",
        "buyerLicenses": [
          {
            "number": "THX1138",
            "licenseType": "medical",
            "id": "e5ae232c-9ae7-4e81-b6f6-67bd5562706f"
          }
        ],
        "buyerEmail": "asciametta@aol.com",
        "buyerDeliveryInstructions": "TEST.",
        "buyerAddress": "{\"territory\":\"CA\",\"street_address\":\"55 Discovery\",\"region\":{\"name\":\"South OC Brands\",\"id\":\"64d05017-4339-4cda-9e57-0da061bf6b00\"},\"postal_code\":\"92618\",\"country\":\"us\",\"city\":\"Irvine\"}"
      },
      "orderItems": [
        {
          "id": "5398e371-64eb-4341-96ec-82b9811dc6e4",
          "variantName": "1 KG Variant",
          "sku": "zzzzzzzzz",
          "productName": "BATH SALTS - LAVENDAR",
          "productId": "d505df6b-b79d-41cb-8387-32d21493cbc4",
          "price": "50",
          "categories": {
            "parent": "Medical",
            "child": "Topicals"
          },
          "amount": 23,
          "variant": {
            "id": "4c466b34-d232-4459-a69c-bd5b17f341c8",
            "unit": "kg",
            "sku": "zzzzzzzzz",
            "size": 1,
            "name": "1 KG Variant",
            "product": {
              "id": "d505df6b-b79d-41cb-8387-32d21493cbc4",
              "slug": "thclear-co-bath-salts-lavendar",
              "name": "BATH SALTS - LAVENDAR",
              "description": "<p>To use: in bath dissolve entire tube of bath salts. Soak for 15-30 min. Massage residual oil into skin after bath, and rinse thoroughly. Relax and enjoy!</p> <p>A luxurious blend of epsom salt, sea salt, 100mg CBD, &amp; infused with essential oils.</p>",
              "departments": [
                {
                  "id": "a29a6ee9-5658-429c-bcc9-18c28f17970c",
                  "slug": "medical",
                  "name": "Medical",
                  "iconImage": {
                    "id": "bb64547b-7c25-4604-a4f9-86e65fe499eb"
                  },
                  "avatarImage": {
                    "id": "7c296558-ad63-40e1-8546-e0ccf4d1a72d"
                  }
                }
              ],
              "categories": [
                {
                  "id": "a8225de4-db5b-4ea8-b292-42a8f9cf27c7",
                  "slug": "topicals",
                  "name": "Topicals",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "brand": {
                "id": "d60ca06a-89db-4584-99a8-1f9b9f427e42",
                "slug": "thclear-co",
                "shippingFee": 100,
                "name": "THClear Co",
                "minimumPurchasePrice": 10000,
                "description": "<p>We are the industry leader in solventless distillate. We currently produce 6 different products with our Thclear Distillate, with our infamous uncut Private Reserve Cartridge being the most popular. Our other amazing products include: Disposable Pens, Cartridges, Syringes, Honeypot Vials, and our funky 50/50!</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [],
                "avatarImage": {
                  "id": "202793d4-1967-432f-bbf1-6a21842f3abf",
                  "smallUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/square/THC-FINAL-LOGO-01.png?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/medium/THC-FINAL-LOGO-01.png?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/large/THC-FINAL-LOGO-01.png?development=1"
                }
              },
              "avatarImage": {
                "id": "35852b12-66ab-49a6-b2e6-73eb0cb5e38c",
                "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/square/1510950797-BATHSALT-LAVENDAR.png",
                "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/medium/1510950797-BATHSALT-LAVENDAR.png",
                "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/large/1510950797-BATHSALT-LAVENDAR.png"
              }
            }
          },
          "avatarImage": {
            "id": "35852b12-66ab-49a6-b2e6-73eb0cb5e38c",
            "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/square/1510950797-BATHSALT-LAVENDAR.png",
            "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/medium/1510950797-BATHSALT-LAVENDAR.png",
            "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/058/052/avatar/large/1510950797-BATHSALT-LAVENDAR.png"
          }
        },
        {
          "id": "06e8c37d-5902-4d37-8e95-bbef5bd8c65f",
          "variantName": "Ounce Variant",
          "sku": "p450uye73je3",
          "productName": "PRE-ROLL CONES- STRAWBERRY GLUE",
          "productId": "a3c62aa0-2c32-4252-b385-e4e1b6f4c630",
          "price": "4000",
          "categories": {
            "parent": "Flower",
            "child": "Pre Rolls"
          },
          "amount": 22,
          "variant": {
            "id": "8693bc89-8c5e-4424-8ba5-32d82bda6ee7",
            "unit": "ounce",
            "sku": "p450uye73je3",
            "size": 1,
            "name": "Ounce Variant",
            "product": {
              "id": "a3c62aa0-2c32-4252-b385-e4e1b6f4c630",
              "slug": "thclear-co-pre-roll-cones-strawberry-glue",
              "name": "PRE-ROLL CONES- STRAWBERRY GLUE",
              "description": "<p>Experience the stickiest strawberry Hybrid yet with THClear Co. Strawberry Glue Pre-Roll Cones. These convenient, easy-to-transport prerolls are filled with top-shelf flower, infused with hash, covered in a layer of distillate and coated with kief. What’s more, terpenes have been added for extra flavor. Let this sticky explosion of Strawbanana Cream and Goji Glue send your head into the clouds. You’ll thank us. </p>",
              "departments": [
                {
                  "id": "d71cd660-91cb-4472-be4a-86f280c54e80",
                  "slug": "flower",
                  "name": "Flower",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "categories": [
                {
                  "id": "1ccbbffa-634f-413e-b565-6978d3d79fca",
                  "slug": "pre-rolls",
                  "name": "Pre Rolls",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "brand": {
                "id": "d60ca06a-89db-4584-99a8-1f9b9f427e42",
                "slug": "thclear-co",
                "shippingFee": 100,
                "name": "THClear Co",
                "minimumPurchasePrice": 10000,
                "description": "<p>We are the industry leader in solventless distillate. We currently produce 6 different products with our Thclear Distillate, with our infamous uncut Private Reserve Cartridge being the most popular. Our other amazing products include: Disposable Pens, Cartridges, Syringes, Honeypot Vials, and our funky 50/50!</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [],
                "avatarImage": {
                  "id": "202793d4-1967-432f-bbf1-6a21842f3abf",
                  "smallUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/square/THC-FINAL-LOGO-01.png?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/medium/THC-FINAL-LOGO-01.png?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/large/THC-FINAL-LOGO-01.png?development=1"
                }
              },
              "avatarImage": {
                "id": "36c13f11-acdb-44c5-a3ca-196041cef927",
                "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/square/1503004147-THClear_HYBRID-1.jpg",
                "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/medium/1503004147-THClear_HYBRID-1.jpg",
                "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/large/1503004147-THClear_HYBRID-1.jpg"
              }
            }
          },
          "avatarImage": {
            "id": "36c13f11-acdb-44c5-a3ca-196041cef927",
            "smallUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/square/1503004147-THClear_HYBRID-1.jpg",
            "mediumUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/medium/1503004147-THClear_HYBRID-1.jpg",
            "largeUrl": "https://images-acceptance.internal-weedmaps.com/products/000/045/077/avatar/large/1503004147-THClear_HYBRID-1.jpg"
          }
        },
        {
          "id": "51cdd830-09cc-4e0d-971e-af54dedd4a3c",
          "variantName": "100 Units",
          "sku": "zzzzzzzz",
          "productName": "SYRINGES - PABLO ESCOBAR OG (1 GRAM)",
          "productId": "8a7ada70-f4fc-4863-a586-ea328cbd4d45",
          "price": "100",
          "categories": {
            "parent": "Concentrates",
            "child": "Distillate"
          },
          "amount": 1,
          "variant": {
            "id": "a4844a49-7f92-4e2f-be6d-60bb072a4447",
            "unit": "unit",
            "sku": "zzzzzzzz",
            "size": 100,
            "name": "100 Units",
            "product": {
              "id": "8a7ada70-f4fc-4863-a586-ea328cbd4d45",
              "slug": "thclear-co-syringes-pablo-escobar-og-1-gram",
              "name": "SYRINGES - PABLO ESCOBAR OG (1 GRAM)",
              "description": "<p>Dig a tunnel, cross an ocean, kill your enemies… oh wait. Wrong Pablo. But if your enemies are pain and stress, this THClear Co. Pablo Escobar OG Syringe can probably help. All the potent cannabinoid and terpenes of Pablo Escobar OG are encapsulated in this convenient syringe. THClear Co. Syringes are a great way to dose your dabs.</p>",
              "departments": [
                {
                  "id": "81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6",
                  "slug": "concentrates",
                  "name": "Concentrates",
                  "iconImage": {
                    "id": "c77396fe-4293-4911-805c-2cd3afb18949"
                  },
                  "avatarImage": {
                    "id": "82c8a744-10c6-48c9-b5a0-3a90de6d2c2f"
                  }
                }
              ],
              "categories": [
                {
                  "id": "934e604b-7ce6-4545-a61d-c44c32072a44",
                  "slug": "distillate",
                  "name": "Distillate",
                  "iconImage": {
                    "id": "27c04b60-fc9c-4bba-920b-383d823119f6"
                  },
                  "avatarImage": {
                    "id": "a1bb7c94-1b69-4006-9cc4-156b7c73a6a4"
                  }
                }
              ],
              "brand": {
                "id": "d60ca06a-89db-4584-99a8-1f9b9f427e42",
                "slug": "thclear-co",
                "shippingFee": 100,
                "name": "THClear Co",
                "minimumPurchasePrice": 10000,
                "description": "<p>We are the industry leader in solventless distillate. We currently produce 6 different products with our Thclear Distillate, with our infamous uncut Private Reserve Cartridge being the most popular. Our other amazing products include: Disposable Pens, Cartridges, Syringes, Honeypot Vials, and our funky 50/50!</p>",
                "deliveryEta": {
                  "etaMinUnit": "day",
                  "etaMin": 1,
                  "etaMaxUnit": "day",
                  "etaMax": 3
                },
                "licenses": [],
                "avatarImage": {
                  "id": "202793d4-1967-432f-bbf1-6a21842f3abf",
                  "smallUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/square/THC-FINAL-LOGO-01.png?development=1",
                  "mediumUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/medium/THC-FINAL-LOGO-01.png?development=1",
                  "largeUrl": "https://images.weedmaps.com/brands/000/001/623/avatar/large/THC-FINAL-LOGO-01.png?development=1"
                }
              },
              "avatarImage": {
                "id": "c6ce0b54-cbec-475f-8fe6-bc7d3e17e4bc",
                "smallUrl": "https://images.weedmaps.com/products/000/043/188/avatar/square/1503008593-THClear_SYRINGES-1.jpg?development=1",
                "mediumUrl": "https://images.weedmaps.com/products/000/043/188/avatar/medium/1503008593-THClear_SYRINGES-1.jpg?development=1",
                "largeUrl": "https://images.weedmaps.com/products/000/043/188/avatar/large/1503008593-THClear_SYRINGES-1.jpg?development=1"
              }
            }
          },
          "avatarImage": {
            "id": "c6ce0b54-cbec-475f-8fe6-bc7d3e17e4bc",
            "smallUrl": "https://images.weedmaps.com/products/000/043/188/avatar/square/1503008593-THClear_SYRINGES-1.jpg?development=1",
            "mediumUrl": "https://images.weedmaps.com/products/000/043/188/avatar/medium/1503008593-THClear_SYRINGES-1.jpg?development=1",
            "largeUrl": "https://images.weedmaps.com/products/000/043/188/avatar/large/1503008593-THClear_SYRINGES-1.jpg?development=1"
          }
        }
      ]
    }
  ]
}
