// @flow
export type ModifiedLicenseType = {
  id: string,
  type: string,
  number: string,
};

export type LicenseType = {
  type: string,
  number: string,
};

export type LocationAddress = {
  city: string,
  country: string,
  id: string,
  latitude: number,
  longitude: number,
  postalCode: string,
  streetAddress: string,
  territory: string,
};

export type LocationType = {
  name: string,
  address: LocationAddress,
  instructions: string,
  contact: string,
  phone: string,
  email: string,
  licenses: LicenseType[],
};
