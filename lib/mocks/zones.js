const zones = [
  {
    "cId": "0ccf7a68-8f23-4dad-91bb-8d93f9d7cf29",
    "id": "0ccf7a68-8f23-4dad-91bb-8d93f9d7cf29",
    "name": "NorCal",
    "color": "#4A90E2",
    "regions": []
  },
  {
    "cId": "78d2a139-bf28-4570-a787-be3d3b297487",
    "id": "78d2a139-bf28-4570-a787-be3d3b297487",
    "name": "SoCal",
    "color": "#F5A623",
    "regions": [
      {
        "id": "64d05017-4339-4cda-9e57-0da061bf6b00",
        "wmRegionId": 3,
        "name": "South OC"
      }
    ]
  },
  {
    "cId": "89cfc0ca-4410-49e2-af3a-f74808926bbd",
    "id": "89cfc0ca-4410-49e2-af3a-f74808926bbd",
    "name": "Andrew's Zone #3 3449 Updated 5",
    "color": "#D0021B",
    "regions": [
      {
        "id": "2411d92b-d816-4d63-be75-d1a526cb84b3",
        "wmRegionId": 4,
        "name": "Central California"
      },
      {
        "id": "f72ef8f0-3ba0-40d7-b328-613ab851bc26",
        "wmRegionId": 5,
        "name": "Oregon"
      },
      {
        "id": "fd167cb8-5be3-4c5e-9207-1e78b771c11d",
        "wmRegionId": 6,
        "name": "Arkansas"
      },
      {
        "id": "edd2ef7e-00b4-444d-b3e3-996ccbaa7b95",
        "wmRegionId": 7,
        "name": "Texas"
      },
    ]
  },
];

export const mockRegionsWithGeometries = {
  "3": {
    "id": 3,
    "name": "Arizona",
    "geometry": {
      "coordinates": []
    }
  },
  "6": {
    "id": 6,
    "name": "Colorado",
    "geometry": {
      "coordinates": []
    }
  },
  "15": {
    "id": 15,
    "name": "Idaho",
    "geometry": {
      "coordinates": []
    }
  },
  "28": {
    "id": 28,
    "name": "Nevada",
    "geometry": {
      "coordinates": []
    }
  },
  "31": {
    "id": 31,
    "name": "New Mexico",
    "geometry": {
      "coordinates": []
    }
  },
  "37": {
    "id": 37,
    "name": "Oregon",
    "geometry": {
      "coordinates": []
    }
  },
  "885": {
    "id": 885,
    "name": "5 Cities",
    "geometry": {
      "coordinates": []
    }
  },
  "1010": {
    "id": 1010,
    "name": "South Bay - Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1303": {
    "id": 1303,
    "name": "West LA Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1305": {
    "id": 1305,
    "name": "Downtown LA Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1306": {
    "id": 1306,
    "name": "Hollywood Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1307": {
    "id": 1307,
    "name": "Riverside Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1308": {
    "id": 1308,
    "name": "San Bernardino Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1309": {
    "id": 1309,
    "name": "Palm Springs Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1312": {
    "id": 1312,
    "name": "San Jose Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1313": {
    "id": 1313,
    "name": "Oakland Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1314": {
    "id": 1314,
    "name": "San Francisco Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1316": {
    "id": 1316,
    "name": "North San Diego Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1318": {
    "id": 1318,
    "name": "North OC Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1319": {
    "id": 1319,
    "name": "South OC Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1320": {
    "id": 1320,
    "name": "Beach Cities Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1323": {
    "id": 1323,
    "name": "Sacramento Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1324": {
    "id": 1324,
    "name": "Northern California Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1325": {
    "id": 1325,
    "name": "Central California Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1326": {
    "id": 1326,
    "name": "San Fernando Valley Brands",
    "geometry": {
      "coordinates": []
    }
  },
  "1327": {
    "id": 1327,
    "name": "San Gabriel Valley Brands",
    "geometry": {
      "coordinates": []
    }
  }
};

export const mockZoneRegions = [
  {
    "id": "5a1e2bf7-5f28-408a-a265-37377e73c780",
    "name": "North OC",
    "wmRegionId": 1318
  },
  {
    "id": "7e6e4f9a-60e3-489d-ab19-57a3d80d03bb",
    "name": "Downtown LA",
    "wmRegionId": 1305
  },
  {
    "id": "79681597-2e12-401b-aa02-4183ae4f7151",
    "name": "Beach Cities",
    "wmRegionId": 1320
  },
  {
    "id": "64d05017-4339-4cda-9e57-0da061bf6b00",
    "name": "South OC",
    "wmRegionId": 1319
  },
  {
    "id": "5da6c1fc-aefe-4440-a74a-201be04b775a",
    "name": "San Bernardino",
    "wmRegionId": 1308
  },
  {
    "id": "d62bf366-f18e-4df5-9aed-15e7c9b48805",
    "name": "San Francisco",
    "wmRegionId": 1314
  },
  {
    "id": "2d4f5595-91ff-453b-87d8-99cea20e749c",
    "name": "Arizona",
    "wmRegionId": 3
  },
  {
    "id": "f7ef7775-334f-4c97-8e0b-d6e0450921df",
    "name": "Nevada",
    "wmRegionId": 28
  }
];

export const mockRegionsWithoutZones = [
  {
    "id": 1306,
    "name": "Hollywood Brands",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
      ]
    }
  },
  {
    "id": 1326,
    "name": "San Fernando Valley Brands",
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [
      ]
    }
  }
];

export const mockZoneRegionsById = {
  "3": {
    "zone": {
      "cId": "dff3ccf2-991a-49df-a75e-c4362d98f14c",
      "id": "dff3ccf2-991a-49df-a75e-c4362d98f14c",
      "name": "Arizona Zone",
      "color": "#086788",
      "regions": [
        {
          "id": "2d4f5595-91ff-453b-87d8-99cea20e749c",
          "name": "Arizona",
          "wmRegionId": 3
        },
        {
          "id": "f7ef7775-334f-4c97-8e0b-d6e0450921df",
          "name": "Nevada",
          "wmRegionId": 28
        }
      ]
    },
    "region": {
      "id": "2d4f5595-91ff-453b-87d8-99cea20e749c",
      "name": "Arizona",
      "wmRegionId": 3
    }
  },
  "28": {
    "zone": {
      "cId": "dff3ccf2-991a-49df-a75e-c4362d98f14c",
      "id": "dff3ccf2-991a-49df-a75e-c4362d98f14c",
      "name": "Arizona Zone",
      "color": "#086788",
      "regions": [
        {
          "id": "2d4f5595-91ff-453b-87d8-99cea20e749c",
          "name": "Arizona",
          "wmRegionId": 3
        },
        {
          "id": "f7ef7775-334f-4c97-8e0b-d6e0450921df",
          "name": "Nevada",
          "wmRegionId": 28
        }
      ]
    },
    "region": {
      "id": "f7ef7775-334f-4c97-8e0b-d6e0450921df",
      "name": "Nevada",
      "wmRegionId": 28
    }
  },
  "1305": {
    "zone": {
      "cId": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "id": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "name": "DTLA",
      "color": "#D0021B",
      "regions": [
        {
          "id": "5a1e2bf7-5f28-408a-a265-37377e73c780",
          "name": "North OC",
          "wmRegionId": 1318
        },
        {
          "id": "7e6e4f9a-60e3-489d-ab19-57a3d80d03bb",
          "name": "Downtown LA",
          "wmRegionId": 1305
        },
        {
          "id": "79681597-2e12-401b-aa02-4183ae4f7151",
          "name": "Beach Cities",
          "wmRegionId": 1320
        }
      ]
    },
    "region": {
      "id": "7e6e4f9a-60e3-489d-ab19-57a3d80d03bb",
      "name": "Downtown LA",
      "wmRegionId": 1305
    }
  },
  "1308": {
    "zone": {
      "cId": "1ca38d8d-b658-4376-9c68-ed015deb93c9",
      "id": "1ca38d8d-b658-4376-9c68-ed015deb93c9",
      "name": "San Francisco Brands Zone 1",
      "color": "#00B359",
      "regions": [
        {
          "id": "5da6c1fc-aefe-4440-a74a-201be04b775a",
          "name": "San Bernardino",
          "wmRegionId": 1308
        },
        {
          "id": "d62bf366-f18e-4df5-9aed-15e7c9b48805",
          "name": "San Francisco",
          "wmRegionId": 1314
        }
      ]
    },
    "region": {
      "id": "5da6c1fc-aefe-4440-a74a-201be04b775a",
      "name": "San Bernardino",
      "wmRegionId": 1308
    }
  },
  "1314": {
    "zone": {
      "cId": "1ca38d8d-b658-4376-9c68-ed015deb93c9",
      "id": "1ca38d8d-b658-4376-9c68-ed015deb93c9",
      "name": "San Francisco Brands Zone 1",
      "color": "#00B359",
      "regions": [
        {
          "id": "5da6c1fc-aefe-4440-a74a-201be04b775a",
          "name": "San Bernardino",
          "wmRegionId": 1308
        },
        {
          "id": "d62bf366-f18e-4df5-9aed-15e7c9b48805",
          "name": "San Francisco",
          "wmRegionId": 1314
        }
      ]
    },
    "region": {
      "id": "d62bf366-f18e-4df5-9aed-15e7c9b48805",
      "name": "San Francisco",
      "wmRegionId": 1314
    }
  },
  "1318": {
    "zone": {
      "cId": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "id": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "name": "DTLA",
      "color": "#D0021B",
      "regions": [
        {
          "id": "5a1e2bf7-5f28-408a-a265-37377e73c780",
          "name": "North OC",
          "wmRegionId": 1318
        },
        {
          "id": "7e6e4f9a-60e3-489d-ab19-57a3d80d03bb",
          "name": "Downtown LA",
          "wmRegionId": 1305
        },
        {
          "id": "79681597-2e12-401b-aa02-4183ae4f7151",
          "name": "Beach Cities",
          "wmRegionId": 1320
        }
      ]
    },
    "region": {
      "id": "5a1e2bf7-5f28-408a-a265-37377e73c780",
      "name": "North OC",
      "wmRegionId": 1318
    }
  },
  "1319": {
    "zone": {
      "cId": "a7e93f46-9dbf-47a8-ad8f-2010e3f92de3",
      "id": "a7e93f46-9dbf-47a8-ad8f-2010e3f92de3",
      "name": "South OC(Don't Delete ME :) )",
      "color": "#FF68D2",
      "regions": [
        {
          "id": "64d05017-4339-4cda-9e57-0da061bf6b00",
          "name": "South OC",
          "wmRegionId": 1319
        }
      ]
    },
    "region": {
      "id": "64d05017-4339-4cda-9e57-0da061bf6b00",
      "name": "South OC",
      "wmRegionId": 1319
    }
  },
  "1320": {
    "zone": {
      "cId": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "id": "4d0e5d31-c22b-4e1a-83c3-ad50741be136",
      "name": "DTLA",
      "color": "#D0021B",
      "regions": [
        {
          "id": "5a1e2bf7-5f28-408a-a265-37377e73c780",
          "name": "North OC",
          "wmRegionId": 1318
        },
        {
          "id": "7e6e4f9a-60e3-489d-ab19-57a3d80d03bb",
          "name": "Downtown LA",
          "wmRegionId": 1305
        },
        {
          "id": "79681597-2e12-401b-aa02-4183ae4f7151",
          "name": "Beach Cities",
          "wmRegionId": 1320
        }
      ]
    },
    "region": {
      "id": "79681597-2e12-401b-aa02-4183ae4f7151",
      "name": "Beach Cities",
      "wmRegionId": 1320
    }
  }
};

export default zones;
