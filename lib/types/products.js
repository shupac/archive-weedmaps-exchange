// @flow

export type ProductImage = {
  small_url: string,
  medium_url: string,
  large_url: string,
};

export type RelationshipBrand = {
  type?: string,
  id?: string,
  uuid?: string,
};

export type RelationshipDepartment = {
  type?: string,
  id?: string,
  uuid?: string,
};

export type RelationshipCategory = {
  type?: string,
  id?: string,
  uuid?: string,
};

export type RelationshipVariant = {
  type?: string,
  id?: string,
  uuid?: string,
};

export type DetailsRelationship = {
  brand?: RelationshipBrand,
  department?: RelationshipDepartment,
  category?: RelationshipCategory,
  variants?: RelationshipVariant[],
};

export type DetailsAttributes = {
  id?: string,
  uuid?: string,
  name?: string,
  slug?: string,
  description?: string,
  priceMin: number,
  priceMax: number,
  images?: ProductImage[],
};

export type Details = {
  type?: string,
  id?: string,
  uuid?: string,
  attributes: DetailsAttributes,
  relationships?: DetailsRelationship,
};

export type AttributesLicenses = {
  number: string,
  type: string,
};

export type IncludedAttributes = {
  name: string,
  slug?: string,
  licenses: AttributesLicenses[],
};

export type IncludedTypes = {
  type?: string,
  id?: string,
  uuid?: string,
  attributes: IncludedAttributes,
};

export type VariantAttributes = {
  name: string,
  size: number,
  unit: string,
  amount: number,
  price: number,
  currency: string,
  inStock: boolean,
  hasQuantityAlert: boolean,
  id: string,
};

export type Variant = {
  id: string,
  attributes: VariantAttributes,
};

export type Included = IncludedTypes[];
