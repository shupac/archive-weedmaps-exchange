// @flow
import React, { Component } from 'react';
import { ToggleSwitch } from '@ghostgroup/ui';
import LoadingButton from 'components/atoms/loading-button';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import { type SellerProductType } from 'models/seller-product';
import { type VariantType } from 'models/variant';
import { type ZoneType } from 'models/zone';
import { FieldArray } from 'formik';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import uniqueKey from 'lib/common/unique-key';
import VariantCard from './variant-card';

import {
  StyledForm,
  SellerProductWrapper,
  Layout,
  ProductName,
  ContentWrapper,
  AvailabilityWrapper,
  AvailabilityHeader,
  VariantHeader,
  VariantInfo,
  AddVariantButton,
  InstructionsWrapper,
  ZonesLink,
  VariantsWrapper,
  Footer,
} from './styles';

type Props = {
  zones: ZoneType[],
  values: SellerProductType,
  handleChange: mixed => void,
  handleSubmit: mixed => void,
  handleReset: mixed => void,
  dirty: boolean,
  isSubmitting: boolean,
};

type FormData = {
  variants: VariantType[],
  zones: ZoneType[],
};

type ArrayHelpers = {
  push: mixed => void,
  replace: (number, mixed) => void,
  remove: number => void,
};

class Variant {
  id = uniqueKey();
  name = '';
  size = '';
  sku = '';
  unit = '';
  allocations = [];
  isNew = true;
}

class ProductForm extends Component<Props> {
  addVariant: () => void;

  constructBreadcrumb = () => {
    const baseCrumb = {
      label: 'Products',
      route: '/seller/products',
    };

    return [baseCrumb];
  };

  render() {
    const {
      zones,
      values,
      handleChange,
      handleSubmit,
      handleReset,
      dirty,
      isSubmitting,
    } = this.props;

    const { product, active } = values;
    const { name, variants } = product;

    return (
      <StyledForm>
        <SellerProductWrapper>
          <Breadcrumbs
            links={this.constructBreadcrumb()}
            activeLabel="Product"
          />
          <ProductName>{name}</ProductName>
          <Layout>
            <ContentWrapper>
              <VariantHeader>Variants</VariantHeader>
              <VariantInfo>
                Add variants for each version of this product, like different
                weights or packs. Then you can configure the selling options for
                each variant and quantity to allocate to each zone.
              </VariantInfo>
              <AddVariantButton type="button" onClick={() => this.addVariant()}>
                Add Variant
              </AddVariantButton>
              <InstructionsWrapper>
                Modify the variants and zone allocations to be created:
                <ZonesLink>View Zones</ZonesLink>
              </InstructionsWrapper>
              <VariantsWrapper>
                <FieldArray
                  name="product.variants"
                  render={this.renderVariants({ variants, zones })}
                />
              </VariantsWrapper>
            </ContentWrapper>
            <AvailabilityWrapper>
              <AvailabilityHeader>Availability</AvailabilityHeader>
              <p>
                Once published, buyers can browse and purchase this product in
                the marketplace.
              </p>
              <div>
                Publish Product
                <ToggleSwitch
                  checked={values.active}
                  onChange={event => {
                    event.target = {
                      value: !active,
                      name: 'active',
                    };
                    handleChange(event);
                  }}
                />
              </div>
            </AvailabilityWrapper>
          </Layout>
        </SellerProductWrapper>
        {dirty && (
          <Footer>
            Unsaved Changes
            <ButtonWhiteNoHover onClick={handleReset}>
              Discard
            </ButtonWhiteNoHover>
            <LoadingButton
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              loadingText="Saving"
              size={{
                width: '100%',
                height: '40px',
              }}
            >
              Save
            </LoadingButton>
          </Footer>
        )}
      </StyledForm>
    );
  }

  renderVariants = (formData: FormData) => (arrayHelpers: ArrayHelpers) => {
    const { variants, zones } = formData;
    const { push, replace, remove } = arrayHelpers;

    this.addVariant = () => push(new Variant());

    return variants.map((variant, i) => (
      <VariantCard
        key={variant.id}
        index={i}
        variant={variant}
        zones={zones.map(zone => zone)}
        onUpdate={values => replace(i, { ...variant, ...values })}
        onDelete={() => remove(i)}
      />
    ));
  };
}

export default ProductForm;
