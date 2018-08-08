// @flow
import Delivery from './delivery';
import Driver from './driver';

type CardId<T> = {
  type: T,
  id: string,
};

export type DriverCard = 'driver_card';
export type DriverLocation = 'driver_location';
export type IndexCard = 'index_card';
export type RouteCard = 'route_card';
export type DeliveryCard = 'delivery_card';
export type Package = 'package';

type DriverCardId = CardId<DriverCard>;
type DriverLocationId = CardId<DriverLocation>;
type RouteCardId = CardId<RouteCard>;
type DeliveryCardId = CardId<DeliveryCard>;
type PackageId = CardId<Package>;
type IndexCardId = CardId<IndexCard>;

type CardAttrs<Attrs> = {
  attributes: Attrs,
};

type CardAttrsAndRelationships<Attrs, Relations> = CardAttrs<Attrs> & {
  relationships: Relations,
};

type DeliveryAttrs = {
  inserted_at: string,
  status: string,
  destination_address: string,
  destination_latitude: number,
  destination_longitude: number,
  recipient_name: string,
  contact_email: string,
  ordered_at: string,
  contact_number: string,
  item_count: number,
  order_id: string,
  total: number,
};

export type FlatDeliveryData = DeliveryAttrs & {
  id: string,
  packageId: string,
};

type DeliveryRelationships = {
  package: {
    data: PackageId,
  },
};

export type DeliveryCardData = DeliveryCardId &
  CardAttrsAndRelationships<DeliveryAttrs, DeliveryRelationships>;

type RouteAttrs = {
  inserted_at: '2018-05-08T23:00:42.075253Z',
  status: 'assigned',
};

type RouteRelationships = {
  delivery_cards: {
    data: DeliveryCardId[],
  },
  driver: {
    data: DriverCardId,
  },
};

export type FlatRouteData = RouteAttrs & {
  id: string,
  driver: Driver,
  deliveries: Array<Delivery>,
};

export type RouteCardData = RouteCardId &
  CardAttrsAndRelationships<RouteAttrs, RouteRelationships>;

export type DriveAttrs = {
  inserted_at: string,
  status: string,
  name: string,
  phone_number: string,
  avatar_url: string,
};

export type FlatDriverData = DriveAttrs & {
  id: string,
};

type DriverRelationships = {
  in_progress_route_cards: {
    data: RouteCardId[],
  },
};

export type DriverCardData = DriverCardId &
  CardAttrsAndRelationships<DriveAttrs, DriverRelationships>;

type DriverLocationAttrs = {
  latitude: number,
  longitude: number,
  occurred_at: string,
};
type DriverLocationRelationships = {
  driver: {
    data: DriverCard,
  },
};
export type DriverLocationData = DriverLocationId &
  CardAttrsAndRelationships<DriverLocationAttrs, DriverLocationRelationships>;

type IndexCardData = IndexCardId & {
  relationships: {
    driver_cards: {
      data: DriverCardId[],
    },
    route_cards: {
      data: RouteCardId[],
    },
    delivery_cards: {
      data: DeliveryCardId[],
    },
  },
};

export type PackageCardData = PackageId &
  CardAttrs<{
    contact_email: string,
    contact_number: string,
    documents: Array<{
      image_url: string,
      name: string,
    }>,
    excise_tax: number,
    inserted_at: string,
    order_id: string,
    order_items: Array<{
      name: string,
      price: number,
      quantity: number,
    }>,
    ordered_at: string,
    recipient_name: string,
    recipient_note: string,
    sales_tax: number,
    subtotal: number,
    total: number,
    updated_at: string,
  }>;

export type CardDataTypes = Array<
  DeliveryCardData | RouteCardData | DriverCardData,
>;

type RawJSONApiVersion = {
  jsonapi: {
    version: string,
  },
};

type RawJSONApiData<Data> = RawJSONApiVersion & {
  data: Data,
};

type RawJSONApi<Data, Included> = RawJSONApiData<Data> & {
  included: Included,
};

export type RawJSONApiIndexCard = RawJSONApi<[IndexCardData], CardDataTypes>;

export type RawJSONApiRouteCard = RawJSONApi<RouteCardData, []>;

export type RawJSONApiDeliveryCard = RawJSONApiData<DeliveryCardData>;

export type RawJSONApiDriverCard = RawJSONApiData<DriverCardData>;

export type RawJSONApiPackageCard = RawJSONApiData<PackageCardData>;

export type RawJSONApiError = RawJSONApiVersion & {
  errors: Array<{
    code: string,
    title: string,
    detail: string,
  }>,
};

export interface Push {
  receive(status: string, callback: (any) => any): Push;
}

export type GeoJsonFeatureCollection = {
  type: 'FeatureCollection',
  features: Array<{
    type: 'Feature',
    properties: {
      type: string,
      id: string,
    },
    geometry: {
      type: 'Point',
      coordinates: [number, number],
    },
  }>,
};
