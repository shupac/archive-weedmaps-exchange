export const mockIndex = {
  data: {
    id: '1',
    type: 'index_card',
    relationships: {
      driver_cards: {
        data: [
          {
            type: 'driver_card',
            id: '1',
          },
          {
            type: 'driver_card',
            id: '2',
          },
          {
            type: 'driver_card',
            id: '3',
          },
        ],
      },
      route_cards: {
        data: [
          {
            type: 'route_card',
            id: '1',
          },
        ],
      },
      delivery_cards: {
        data: [
          {
            type: 'delivery_card',
            id: '1',
          },
          {
            type: 'delivery_card',
            id: '2',
          },
        ],
      },
    },
  },
  jsonapi: {
    version: '1.0',
  },
  included: [
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'started',
        destination_address: '1234',
        destination_latitude: 90,
        destination_longitude: 90,
        recipient_name: 'Alan Tirado',
        contact_email: 'atirado@weedmaps.com',
        ordered_at: '2018-05-08T23:00:42.075253Z',
        contact_number: '123-123-1234',
        item_count: 4,
        order_id: '1234',
        total: 1,
      },
      id: '1',
      relationships: {
        package: {
          data: {
            id: '1',
            type: 'package',
          },
        },
      },
      type: 'delivery_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'created',
        destination_address: '11234 W S St',
        destination_latitude: 90,
        destination_longitude: 90,
        recipient_name: 'Bob Truman',
        contact_email: 'bob@truman.com',
        ordered_at: '2018-05-08T23:00:42.075253Z',
        contact_number: '343-345-3452',
        item_count: 4,
        order_id: '3421',
        total: 3455,
      },
      id: '2',
      relationships: {
        package: {
          data: {
            id: '1',
            type: 'package',
          },
        },
      },
      type: 'delivery_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'started',
        destination_address: '11234 W S St',
        destination_latitude: 90,
        destination_longitude: 90,
        recipient_name: 'Bob Truman',
        contact_email: 'bob@truman.com',
        ordered_at: '2018-05-08T23:00:42.075253Z',
        contact_number: '343-345-3452',
        item_count: 4,
        order_id: '3421',
        total: 3455,
      },
      id: '3',
      relationships: {
        package: {
          data: {
            id: '3',
            type: 'package',
          },
        },
      },
      type: 'delivery_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'assigned',
      },
      id: '1',
      relationships: {
        delivery_cards: {
          data: [
            {
              id: '1',
              type: 'delivery_card',
            },
          ],
        },
        driver: {
          data: {
            id: '1',
            type: 'driver_card',
          },
        },
      },
      type: 'route_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'in_progress',
      },
      id: '2',
      relationships: {
        delivery_cards: {
          data: [
            {
              id: '3',
              type: 'delivery_card',
            },
          ],
        },
        driver: {
          data: {
            id: '2',
            type: 'driver_card',
          },
        },
      },
      type: 'route_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'on_duty',
        name: 'Bob',
        phone_number: '714-277-9631',
        avatar_url:
          'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
      },
      id: '1',
      type: 'driver_card',
      relationships: {
        in_progress_route_cards: {
          data: [
            {
              id: '1',
              type: 'route_card',
            },
          ],
        },
      },
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'on_duty',
        name: 'James',
        phone_number: '123-123-1234',
        avatar_url:
          'https://images.weedmaps.com/users/000/331/653/avatar/square_fill/1510567490-ShortRound.jpg?development=1',
      },
      id: '2',
      type: 'driver_card',
      relationships: {
        in_progress_route_cards: {
          data: [],
        },
      },
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'off_duty',
        name: 'Val',
        phone_number: '666-666-5656',
        avatar_url: null,
      },
      id: '3',
      type: 'driver_card',
      relationships: {
        in_progress_route_cards: {
          data: [],
        },
      },
    },
  ],
};
export const mockBaseIndex = {
  data: [
    {
      id: '1',
      type: 'index_card',
      relationships: {
        driver_cards: {
          data: [
            {
              type: 'driver_card',
              id: '1',
            },
          ],
        },
        route_cards: {
          data: [],
        },
        delivery_cards: {
          data: [
            {
              type: 'delivery_card',
              id: '1',
            },
          ],
        },
      },
    },
  ],
  jsonapi: {
    version: '1.0',
  },
  included: [
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'successful',
        destination_address: '1234',
        destination_latitude: 90,
        destination_longitude: 90,
        recipient_name: 'String',
        ordered_at: '2018-05-08T23:00:42.075253Z',
        contact_number: 'String',
        item_count: 4,
        order_id: 'String',
        total: 1,
      },
      id: '1',
      relationships: {
        package: {
          data: {
            id: '1',
            type: 'package',
          },
        },
      },
      type: 'delivery_card',
    },
    {
      attributes: {
        inserted_at: '2018-05-08T23:00:42.075253Z',
        status: 'free',
        name: 'Bob',
        phone_number: '714-277-9631',
        avatar_url:
          'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
      },
      id: '1',
      type: 'driver_card',
      relationships: {
        in_progress_route_cards: {
          data: [],
        },
      },
    },
  ],
};
export const mockNewRoute = {
  data: {
    attributes: {
      inserted_at: '2018-05-08T23:00:42.075253Z',
      status: 'assigned',
    },
    id: '1',
    relationships: {
      delivery_cards: {
        data: [
          {
            id: '1',
            type: 'delivery_card',
          },
        ],
      },
      driver: {
        data: {
          id: '1',
          type: 'driver_card',
        },
      },
    },
  },
  included: [],
  jsonapi: { version: '1.0' },
};
export const mockNewDelivery = {
  data: {
    attributes: {
      inserted_at: '2018-05-08T23:00:42.075253Z',
      status: 'created',
      destination_address: '41 Discovery',
      destination_latitude: 33.666629,
      destination_longitude: -117.756304,
      recipient_name: 'Alan Tirado',
      ordered_at: '2018-05-08T23:00:42.075253Z',
      contact_number: '123-123-1234',
      item_count: 4,
      order_id: '420',
      total: 420,
    },
    id: '2',
    relationships: {
      package: {
        data: {
          id: '2',
          type: 'package',
        },
      },
    },
  },
  jsonapi: {
    version: '1.0',
  },
};
export const mockNewDriver = {
  data: {
    attributes: {
      inserted_at: '2018-05-08T23:00:42.075253Z',
      status: 'off_duty',
      name: 'Bob',
      phone_number: '123-123-1234',
      avatar_url:
        'https://images.weedmaps.com/users/002/120/830/avatar/square_fill/1510575803-1508943687-owl.png',
    },
    id: '3',
    type: 'driver_card',
    relationships: {
      in_progress_route_cards: {
        data: [],
      },
    },
  },
  jsonapi: {
    version: '1.0',
  },
};
export const mockDriverLocation = {
  data: {
    id: '1',
    type: 'driver_location',
    attributes: {
      latitude: 33.666629,
      longitude: -117.756304,
      occurred_at: '2018-05-08T23:00:42.075253Z',
    },
  },
  jsonapi: {
    version: '1.0',
  },
};
export const mockPackage = {
  data: {
    attributes: {
      contact_email: 'labron@weedmaps.com',
      contact_number: '555-555-5555',
      documents: [
        {
          image_url:
            'https://images-acceptance.internal-weedmaps.com/users/000/331/653/avatar/square_fill/1510567490-ShortRound.jpg',
          name: 'id',
        },
        {
          image_url:
            'https://images-acceptance.internal-weedmaps.com/users/002/306/378/avatar/square_fill/1531352592-download.jpeg',
          name: 'rec',
        },
      ],
      excise_tax: 1,
      inserted_at: '2018-05-08T23:00:42.075253Z',
      order_id: 'UUID-1234',
      order_items: [
        {
          name: 'Hardcore Og',
          price: 50,
          quantity: 1,
        },
      ],
      ordered_at: '2018-05-08T23:00:42.075253Z',
      recipient_name: 'Bob',
      recipient_note: 'Quick yo!',
      sales_tax: 1,
      subtotal: 1,
      total: 1,
      updated_at: '2018-05-08T23:00:42.075253Z',
    },
    id: '1234',
    type: 'package',
  },
  jsonapi: {
    version: '1.0',
  },
};
