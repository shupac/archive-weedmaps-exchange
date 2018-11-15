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
      "orderItems": [
        {
          "id": "2b113f61-1b7f-4d18-bd20-7c3ebc7d2007",
          "variantName": "1 ounces",
          "sku": "zzzzzzzz",
          "productName": "Gelato",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        },
        {
          "id": "7ada039c-fca7-462c-b87c-6d69a815d442",
          "variantName": "50 Units",
          "sku": "zzzzzzzz",
          "productName": "Tahoe OG 3PC Cured Joints",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        }
      ]
    },
    {
      "id": "234f908e-02d8-4946-8eff-c04297f1a9e2",
      "total": "100800",
      "subtotal": "100700.00",
      "statusReason": "",
      "status": "not_started",
      "shippingFee": "100.00",
      "sellerData": {
        "sellerPhone": "1112223333",
        "sellerName": "GfarmaLabs",
        "sellerLicenses": [],
        "sellerEmail": "test@test.com",
        "sellerAddress": mockAddressString,
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
      "orderItems": [
        {
          "id": "69e84bc7-7126-44ef-8564-83aebde54e74",
          "variantName": "3 Gram",
          "sku": "3333333",
          "productName": "G NUGS Shatter Live Resin - Super Dream",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        },
        {
          "id": "7504b38c-b6e6-4642-a73c-e3ed0ffd2cab",
          "variantName": "100 Pack Data Test",
          "sku": "100",
          "productName": "Test Product 7",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        },
        {
          "id": "e38b1bc2-65bf-44dd-91e7-e7048a46cfc5",
          "variantName": "200 Pack Data Test",
          "sku": "200",
          "productName": "Test Product 7",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        }
      ]
    },
    {
      "id": "d20a6d4d-14d6-476e-856d-9c93ad156839",
      "total": "89250",
      "subtotal": "89150.00",
      "statusReason": "",
      "status": "not_started",
      "shippingFee": "100.00",
      "sellerData": {
        "sellerPhone": "1112223333",
        "sellerName": "THClear Co",
        "sellerLicenses": [],
        "sellerEmail": "test@test.com",
        "sellerAddress": mockAddressString,
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
      "orderItems": [
        {
          "id": "5398e371-64eb-4341-96ec-82b9811dc6e4",
          "variantName": "1 KG Variant",
          "sku": "zzzzzzzzz",
          "productName": "BATH SALTS - LAVENDAR",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        },
        {
          "id": "06e8c37d-5902-4d37-8e95-bbef5bd8c65f",
          "variantName": "Ounce Variant",
          "sku": "p450uye73je3",
          "productName": "PRE-ROLL CONES- STRAWBERRY GLUE",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        },
        {
          "id": "51cdd830-09cc-4e0d-971e-af54dedd4a3c",
          "variantName": "100 Units",
          "sku": "zzzzzzzz",
          "productName": "SYRINGES - PABLO ESCOBAR OG (1 GRAM)",
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
              "description": "Description",
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
                "description": "Description",
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
          }
        }
      ]
    }
  ]
}
